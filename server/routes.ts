import type { Express } from "express";
import { createServer, type Server } from "http";
import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';
import { Resend } from 'resend';
import { storage } from "./storage";
import { insertQuoteRequestSchema, insertBookingRequestSchema, CITY_SLUGS, SERVICE_TYPES } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { ObjectStorageService, ObjectNotFoundError } from "./objectStorage.js";
import fs from 'fs';
import path from 'path';

// Initialize email services - Prefer Resend for reliability
let resend: Resend | null = null;
if (process.env.RESEND_API_KEY) {
  if (process.env.RESEND_API_KEY.startsWith('re_')) {
    try {
      resend = new Resend(process.env.RESEND_API_KEY);
      console.log('✅ Resend email service initialized successfully');
    } catch (error) {
      console.warn('❌ Resend initialization failed:', error);
      resend = null;
    }
  } else {
    console.warn('❌ Invalid Resend API key format. Key should start with "re_"');
    console.log('🔗 Get a valid key from: https://resend.com/api-keys');
  }
} else {
  console.log('⚠️  No RESEND_API_KEY found - using SMTP fallback');
}

// Security: Secure image fetching with SSRF protection and resource limits
async function fetchImageSecurely(imageUrl: string, maxSizeBytes: number = 5 * 1024 * 1024, redirectDepth: number = 0): Promise<{ buffer: Buffer; contentType: string } | null> {
  // Prevent infinite redirect loops
  if (redirectDepth > 3) {
    console.warn(`🚫 Too many redirects (${redirectDepth})`);
    return null;
  }
  
  // Declare validatedUrl at function scope so error handlers can access it
  let validatedUrl: string | undefined;
  
  try {
    // Validate URL format and allowed domains
    
    if (imageUrl.startsWith('/objects/')) {
      // Handle local object storage paths - convert to signed URL
      console.log(`🔗 Local object path detected: ${imageUrl}`);
      try {
        const objectStorageService = new ObjectStorageService();
        const objectFile = await objectStorageService.getObjectEntityFile(imageUrl);
        
        // Get a signed URL for secure access
        const [signedUrls] = await objectFile.getSignedUrl({
          action: 'read',
          expires: Date.now() + 15 * 60 * 1000, // 15 minutes
        });
        
        // Validate the signed URL for security
        const signedUrlParsed = new URL(signedUrls);
        if (signedUrlParsed.protocol !== 'https:') {
          console.warn(`🚫 Signed URL is not HTTPS: ${signedUrlParsed.protocol}`);
          return null;
        }
        
        const allowedHosts = [
          'storage.googleapis.com',
          'storage.cloud.google.com'
        ];
        
        if (!allowedHosts.includes(signedUrlParsed.hostname)) {
          console.warn(`🚫 Signed URL from unauthorized domain: ${signedUrlParsed.hostname}`);
          return null;
        }
        
        validatedUrl = signedUrls;
        console.log(`🔗 Generated signed URL for local object from ${signedUrlParsed.hostname}`);
      } catch (localError) {
        console.warn(`🚫 Failed to handle local object path: ${localError instanceof Error ? localError.message : String(localError)}`);
        return null;
      }
    } else {
      // Validate external URLs
      const parsedUrl = new URL(imageUrl);
      
      // Enforce HTTPS only
      if (parsedUrl.protocol !== 'https:') {
        console.warn(`🚫 Non-HTTPS URL rejected: ${parsedUrl.protocol}`);
        return null;
      }
      
      const allowedHosts = [
        'storage.googleapis.com',
        'storage.cloud.google.com'
      ];
      
      if (!allowedHosts.includes(parsedUrl.hostname)) {
        console.warn(`🚫 Blocked URL from unauthorized domain: ${parsedUrl.hostname}`);
        return null;
      }
      
      validatedUrl = imageUrl;
    }

    // Log safely without exposing sensitive query parameters
    const logUrl = new URL(validatedUrl);
    console.log(`🔒 Fetching validated image from ${logUrl.hostname}${logUrl.pathname}`);
    
    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    try {
      // Secure redirect handling - disable automatic redirects
      const response = await fetch(validatedUrl, { 
        signal: controller.signal,
        redirect: 'manual',
        headers: {
          'User-Agent': 'TotalSpark/1.0'
        }
      });
      
      // Handle redirects manually and validate
      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get('location');
        if (!location) {
          console.warn(`🚫 Redirect without location header`);
          return null;
        }
        
        // Validate redirect URL against allowlist (handle both absolute and relative)
        try {
          // Handle relative redirects by resolving against the current URL
          const redirectUrl = new URL(location, validatedUrl);
          
          if (redirectUrl.protocol !== 'https:') {
            console.warn(`🚫 Redirect to non-HTTPS URL rejected: ${redirectUrl.protocol}`);
            return null;
          }
          
          const allowedHosts = [
            'storage.googleapis.com',
            'storage.cloud.google.com'
          ];
          
          if (!allowedHosts.includes(redirectUrl.hostname)) {
            console.warn(`🚫 Redirect to unauthorized domain: ${redirectUrl.hostname}`);
            return null;
          }
          
          console.log(`🔄 Following validated redirect to: ${redirectUrl.hostname}`);
          // Recursively fetch with the validated redirect URL (with depth limit)
          return await fetchImageSecurely(redirectUrl.href, maxSizeBytes, redirectDepth + 1);
        } catch (redirectError) {
          console.warn(`🚫 Invalid redirect URL: ${location}`);
          return null;
        }
      }
      
      if (!response.ok) {
        console.warn(`🚫 Image fetch failed: ${response.status}`);
        return null;
      }
      
      const contentType = response.headers.get('content-type') || '';
      if (!contentType.startsWith('image/')) {
        console.warn(`🚫 Invalid content type: ${contentType}`);
        return null;
      }
      
      // Check content-length if available
      const contentLength = response.headers.get('content-length');
      if (contentLength && parseInt(contentLength) > maxSizeBytes) {
        console.warn(`🚫 Image too large: ${contentLength} bytes (max: ${maxSizeBytes})`);
        return null;
      }
      
      // Stream the response with size checking to avoid memory exhaustion
      const reader = response.body?.getReader();
      if (!reader) {
        console.warn(`🚫 Unable to read response body`);
        return null;
      }
      
      const chunks: Uint8Array[] = [];
      let totalSize = 0;
      
      try {
        while (true) {
          const { done, value } = await reader.read();
          
          if (done) break;
          
          if (value) {
            totalSize += value.length;
            
            // Check size limit during streaming
            if (totalSize > maxSizeBytes) {
              console.warn(`🚫 Image too large during streaming: ${totalSize} bytes`);
              return null;
            }
            
            chunks.push(value);
          }
        }
      } finally {
        reader.releaseLock();
      }
      
      // Combine all chunks
      const combinedArray = new Uint8Array(totalSize);
      let offset = 0;
      for (const chunk of chunks) {
        combinedArray.set(chunk, offset);
        offset += chunk.length;
      }
      
      console.log(`✅ Successfully fetched image: ${totalSize} bytes`);
      return {
        buffer: Buffer.from(combinedArray),
        contentType: contentType
      };
      
    } finally {
      clearTimeout(timeoutId);
    }
    
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      // Log timeout without exposing sensitive query parameters
      try {
        const urlToLog = validatedUrl || imageUrl;
        const logUrl = new URL(urlToLog);
        console.warn(`⏰ Image fetch timeout for ${logUrl.hostname}${logUrl.pathname}`);
      } catch {
        console.warn(`⏰ Image fetch timeout for request`);
      }
    } else {
      console.warn(`🚫 Image fetch error: ${error instanceof Error ? error.message : String(error)}`);
    }
    return null;
  }
}

// Security: Fetch multiple images safely with concurrency limits
async function fetchImagesSecurely(imageUrls: string[]): Promise<Array<{filename: string; content: Buffer; contentType?: string}>> {
  const maxConcurrency = 3;
  const maxTotalSize = 15 * 1024 * 1024; // 15MB total limit
  const attachments: Array<{filename: string; content: Buffer; contentType?: string}> = [];
  let totalSize = 0;
  
  console.log(`🔒 Fetching ${imageUrls.length} images with security controls`);
  
  // Process images in parallel with concurrency limit
  const chunks = [];
  for (let i = 0; i < imageUrls.length; i += maxConcurrency) {
    chunks.push(imageUrls.slice(i, i + maxConcurrency));
  }
  
  for (const chunk of chunks) {
    const results = await Promise.allSettled(
      chunk.map((url, index) => fetchImageSecurely(url))
    );
    
    results.forEach((result, index) => {
      if (result.status === 'fulfilled' && result.value) {
        const imageData = result.value;
        
        if (totalSize + imageData.buffer.length > maxTotalSize) {
          console.warn(`🚫 Skipping image - would exceed total size limit`);
          return;
        }
        
        totalSize += imageData.buffer.length;
        
        attachments.push({
          filename: `job-image-${attachments.length + 1}.jpg`,
          content: imageData.buffer,
          contentType: imageData.contentType
        });
        
        console.log(`✅ Added image ${attachments.length}: ${imageData.buffer.length} bytes`);
      }
    });
  }
  
  console.log(`🔒 Prepared ${attachments.length}/${imageUrls.length} images (${totalSize} bytes total)`);
  return attachments;
}

// Email notification service - Resend primary, SMTP fallback
async function sendEmailNotification(quote: any) {

  const serviceDisplayName = getServiceDisplayName(quote.service);
  const addOnsText = formatAddOns(quote);
  const tagsText = generateGHLTags(quote).join(', ');
  const estimateText = quote.quoteResult 
    ? `£${quote.quoteResult.estimateRange?.low || 0} - £${quote.quoteResult.estimateRange?.high || 0}`
    : 'Quote calculation pending';

  const emailSubject = `🔔 NEW LEAD: ${serviceDisplayName} - ${quote.address.split(',').pop()?.trim() || 'Location'}`;
  
  const emailBody = `
NEW LEAD NOTIFICATION
═══════════════════════════════════════

📍 CONTACT DETAILS
Name: ${quote.name}
Email: ${quote.email}
Phone: ${quote.phone}
Address: ${quote.address}
Postcode: ${quote.postcode || 'Not provided'}

🏠 SERVICE REQUIREMENTS
Service: ${serviceDisplayName}
${quote.bedrooms ? `Bedrooms: ${quote.bedrooms}` : ''}
${quote.bathrooms ? `Bathrooms: ${quote.bathrooms}` : ''}
${quote.livingRooms ? `Living Rooms: ${quote.livingRooms}` : ''}
${quote.commercialRooms ? `Commercial Rooms: ${quote.commercialRooms}` : ''}
${quote.propertyType ? `Property Type: ${quote.propertyType}` : ''}
${quote.condition ? `Property Condition: ${quote.condition}` : ''}

💎 ADD-ONS & EXTRAS
${addOnsText || 'None selected'}

⚡ PRIORITY INDICATORS
${quote.urgent ? '🚨 URGENT REQUEST - Needs immediate attention!' : ''}
${quote.weekend ? '📅 Weekend service requested' : ''}
${quote.vat ? '💰 VAT required (business/commercial)' : ''}

💷 QUOTE ESTIMATE
Range: ${estimateText}

🏷️ GHL TAGS FOR AUTOMATION
${tagsText}

📝 ADDITIONAL NOTES
${quote.additionalDetails || 'None provided'}

📷 JOB IMAGES
${quote.jobImages && quote.jobImages.length > 0 ? `${quote.jobImages.length} image(s) uploaded (see attachments)` : 'No images provided'}

═══════════════════════════════════════
Quote ID: ${quote.id}
Submitted: ${new Date().toLocaleString('en-GB', { 
  timeZone: 'Europe/London',
  dateStyle: 'full',
  timeStyle: 'short'
})}

This lead is ready to copy-paste into GoHighLevel!
  `.trim();

  const targetEmail = process.env.NOTIFICATION_EMAIL || 'leads@totalsparksolutions.co.uk';
  
  // Prepare attachments from job images using secure fetching
  let attachments: Array<{filename: string; content: Buffer; contentType?: string}> = [];
  if (quote.jobImages && quote.jobImages.length > 0) {
    try {
      attachments = await fetchImagesSecurely(quote.jobImages);
    } catch (attachmentError) {
      console.warn('⚠️ Failed to prepare image attachments:', attachmentError);
      // Continue with email without attachments
      attachments = [];
    }
  }
  
  // Try Resend first (if configured)
  if (resend) {
    try {
      console.log(`📧 Sending quote email via Resend to: ${targetEmail} ${attachments.length > 0 ? `with ${attachments.length} attachments` : ''}`);
      
      // Convert attachments to base64 format for Resend
      const resendAttachments = attachments.map(att => ({
        filename: att.filename,
        content: att.content.toString('base64'),
        type: att.contentType || 'image/jpeg'
      }));

      const result = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: targetEmail,
        replyTo: quote.email,
        subject: emailSubject,
        text: emailBody,
        html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">New Quote Request - TotalSpark Solutions</h2>
          <pre style="background: #f8f9fa; padding: 15px; border-radius: 5px; white-space: pre-wrap; font-family: monospace;">${emailBody}</pre>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">This email was automatically generated from the TotalSpark Solutions website.</p>
        </div>`,
        attachments: resendAttachments.length > 0 ? resendAttachments : undefined
      });
      
      if (result.error) {
        console.error('❌ Resend error details:', result.error);
        throw new Error(`Resend failed: ${result.error.message}`);
      }
      
      console.log('✅ Quote email sent successfully via Resend');
      console.log('📧 Resend Response:', JSON.stringify(result, null, 2));
      console.log('📫 Email ID:', result.data?.id || 'No ID received');
      return;
    } catch (resendError) {
      console.warn('❌ Resend quote email failed, falling back to SMTP:', resendError);
    }
  }
  
  // Fallback to SMTP if Resend not available or failed
  console.log(`📧 Sending quote email via SMTP to: ${targetEmail}`);
  try {
    console.log('Using SMTP fallback configuration...');
    const smtpConfig = {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // Use STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      connectionTimeout: 15000,
      socketTimeout: 15000
    };
    
    const transporter = nodemailer.createTransport(smtpConfig);
    
    await transporter.sendMail({
      from: `"TotalSpark Solutions" <${process.env.SMTP_USER}>`,
      to: targetEmail,
      replyTo: quote.email,
      subject: emailSubject,
      text: emailBody,
      attachments: attachments.length > 0 ? attachments : undefined
    });
    
    console.log(`✅ Quote email sent successfully via SMTP`);
  } catch (smtpError) {
    console.error('SMTP email failed. Quote saved successfully but no email sent:', smtpError);
    // Don't throw - quote should still save successfully
  }
}

// Booking-specific email notification function
async function sendBookingEmailNotification(booking: any) {
  const serviceDisplayName = getServiceDisplayName(booking.service);
  const addOnsText = formatAddOns(booking);
  const tagsText = generateGHLTags(booking).join(', ');
  const estimateText = booking.quoteResult 
    ? `£${booking.quoteResult.estimateRange?.low || 0} - £${booking.quoteResult.estimateRange?.high || 0}`
    : 'Quote calculation pending';

  const bookingDate = booking.preferredDate ? new Date(booking.preferredDate).toLocaleDateString('en-GB') : 'Not specified';
  const timeSlot = booking.preferredTimeSlot || 'Not specified';

  const emailSubject = `🗓️ BOOKING REQUEST: ${serviceDisplayName} - ${booking.address.split(',').pop()?.trim() || 'Location'} (${bookingDate})`;
  
  const emailBody = `
🔥 BOOKING REQUEST NOTIFICATION
═══════════════════════════════════════

⭐ CUSTOMER WANTS TO BOOK ONLINE!
Service Date: ${bookingDate}
Time Preference: ${timeSlot}
Lead Source: ${booking.leadSource || 'website'} (${booking.bookedOnline ? 'ONLINE BOOKING' : 'Phone booking'})

📍 CONTACT DETAILS
Name: ${booking.name}
Email: ${booking.email}
Phone: ${booking.phone}
Address: ${booking.address}
Postcode: ${booking.postcode || 'Not provided'}

🏠 SERVICE REQUIREMENTS
Service: ${serviceDisplayName}
${booking.bedrooms ? `Bedrooms: ${booking.bedrooms}` : ''}
${booking.bathrooms ? `Bathrooms: ${booking.bathrooms}` : ''}

💷 QUOTE ESTIMATE
Range: ${estimateText}

🗓️ BOOKING DETAILS
Preferred Date: ${bookingDate}
Preferred Time: ${timeSlot}
Booking Status: ${booking.bookingStatus || 'booking_requested'}
Additional Notes: ${booking.additionalNotes || 'None provided'}

📷 JOB IMAGES
${booking.jobImages && booking.jobImages.length > 0 ? `${booking.jobImages.length} image(s) uploaded (see attachments)` : 'No images provided'}

⚠️ ACTION REQUIRED: Confirm booking within 30 minutes!
This is a hot lead - customer is ready to book!

Booking ID: ${booking.id}
Submitted: ${new Date().toLocaleString('en-GB')}
  `.trim();

  const targetEmail = process.env.NOTIFICATION_EMAIL || 'leads@totalsparksolutions.co.uk';
  
  // Prepare attachments from job images using secure fetching
  let attachments: Array<{filename: string; content: Buffer; contentType?: string}> = [];
  if (booking.jobImages && booking.jobImages.length > 0) {
    try {
      attachments = await fetchImagesSecurely(booking.jobImages);
    } catch (attachmentError) {
      console.warn('⚠️ Failed to prepare booking image attachments:', attachmentError);
      // Continue with email without attachments
      attachments = [];
    }
  }
  
  // Try Resend first (if configured)
  if (resend) {
    try {
      console.log(`📧 Sending booking email via Resend to: ${targetEmail}`);
      
      // Convert attachments to base64 format for Resend
      const resendAttachments = attachments.map(att => ({
        filename: att.filename,
        content: att.content.toString('base64'),
        type: att.contentType || 'image/jpeg'
      }));

      const result = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: targetEmail,
        replyTo: booking.email,
        subject: emailSubject,
        text: emailBody,
        html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #28a745; padding-bottom: 10px;">New Booking Request - TotalSpark Solutions</h2>
          <pre style="background: #f8f9fa; padding: 15px; border-radius: 5px; white-space: pre-wrap; font-family: monospace;">${emailBody}</pre>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">This email was automatically generated from the TotalSpark Solutions website.</p>
        </div>`,
        attachments: resendAttachments.length > 0 ? resendAttachments : undefined
      });
      
      if (result.error) {
        console.error('❌ Resend booking error details:', result.error);
        throw new Error(`Resend booking failed: ${result.error.message}`);
      }
      
      console.log('✅ Booking email sent successfully via Resend');
      console.log('📧 Resend Booking Response:', JSON.stringify(result, null, 2));
      console.log('📫 Email ID:', result.data?.id || 'No ID received');
      return;
    } catch (resendError) {
      console.warn('❌ Resend booking email failed, falling back to SMTP:', resendError);
    }
  }
  
  // Fallback to SMTP if Resend not available or failed
  console.log(`📧 Sending booking email via SMTP to: ${targetEmail}`);
  try {
    const smtpConfig = {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    };
    
    const transporter = nodemailer.createTransport(smtpConfig);
    
    await transporter.sendMail({
      from: `"TotalSpark Booking System" <${process.env.SMTP_USER}>`,
      to: targetEmail,
      replyTo: booking.email,
      subject: emailSubject,
      text: emailBody,
      priority: 'high',
      attachments: attachments.length > 0 ? attachments : undefined
    });
    
    console.log(`✅ Booking email sent successfully via SMTP`);
  } catch (error) {
    console.warn('Booking email notification failed (non-blocking):', error);
    // Don't throw - booking should succeed even if email fails
  }
}

// Enhanced GHL webhook for booking requests
async function sendBookingToGHLWebhook(booking: any) {
  const ghlData = generateGHLWebhookData(booking);
  
  const bookingData = {
    ...ghlData,
    // Enhanced booking-specific data
    booking_status: booking.bookingStatus || 'booking_requested',
    preferred_date: booking.preferredDate,
    preferred_time_slot: booking.preferredTimeSlot,
    booked_online: booking.bookedOnline || false,
    lead_source: booking.leadSource || 'website',
    booking_notes: booking.additionalNotes,
    tags: [
      ...generateGHLTags(booking),
      'Booking_Request',
      'Online_Booking'
    ]
  };

  // Log only non-PII fields for privacy compliance
  console.log('Booking webhook data (PII redacted):', {
    service_type: bookingData.service_type,
    service_category: bookingData.service_category,
    booking_status: bookingData.booking_status,
    preferred_time_slot: bookingData.preferred_time_slot,
    urgent_request: bookingData.urgent_request,
    weekend_request: bookingData.weekend_request,
    tags: bookingData.tags
  });
  
  const webhookUrl = process.env.GHL_WEBHOOK_URL;
  if (!webhookUrl) {
    console.log('No GHL_WEBHOOK_URL configured - booking webhook data logged for setup');
    return;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    
    if (!response.ok) {
      console.warn(`Booking webhook failed: ${response.status} ${response.statusText}`);
      return; // Don't throw, just warn
    }
    console.log('Booking webhook sent to GHL successfully');
  } catch (error) {
    console.warn('Booking GHL webhook failed (non-blocking):', error instanceof Error ? error.message : 'Unknown error');
    // Don't throw - this should be non-blocking
  }
}

// Helper function to generate GHL webhook data (used by both quote and booking webhooks)
function generateGHLWebhookData(data: any) {
  return {
    first_name: data.name.split(' ')[0] || '',
    last_name: data.name.split(' ').slice(1).join(' ') || '',
    email: data.email,
    phone: data.phone,
    address1: data.address,
    postal_code: data.postcode || '',
    website: 'TotalSpark Solutions',
    source: 'Website Form',
    service_type: getServiceDisplayName(data.service),
    service_category: data.service,
    bedrooms: data.bedrooms || 'Not specified',
    add_ons: formatAddOns(data),
    urgent_request: data.urgent || false,
    weekend_request: data.weekend || false,
    notes: data.additionalDetails || '',
    tags: generateGHLTags(data),
    quote_id: data.id,
    submitted_at: new Date().toISOString()
  };
}

// GoHighLevel webhook integration function
async function sendToGHLWebhook(quote: any) {
  // Format the data for GoHighLevel integration
  const ghlData = {
    // Contact Information
    first_name: quote.name.split(' ')[0] || '',
    last_name: quote.name.split(' ').slice(1).join(' ') || '',
    email: quote.email,
    phone: quote.phone,
    address1: quote.address,
    postal_code: quote.postcode || '',
    
    // Custom Fields for GoHighLevel
    website: 'TotalSpark Solutions',
    source: 'Website Quote Form',
    
    // Service-specific tags and information
    service_type: getServiceDisplayName(quote.service),
    service_category: quote.service,
    bedrooms: quote.bedrooms || 'Not specified',
    area_m2: quote.area_m2 || null,
    commercial_rooms: quote.commercialRooms || null,
    
    // Add-ons as a formatted string
    add_ons: formatAddOns(quote),
    
    // Pricing modifiers
    urgent_request: quote.urgent || false,
    weekend_request: quote.weekend || false,
    
    // Additional details
    notes: quote.additionalDetails || '',
    
    // Tags for automation workflows
    tags: generateGHLTags(quote),
    
    // Quote metadata
    quote_id: quote.id,
    submitted_at: new Date().toISOString(),
    total_estimate: quote.quoteResult?.totalInclVAT || quote.quoteResult?.totalExclVAT || null,
    estimate_range: quote.quoteResult ? `£${quote.quoteResult.estimateRange?.low || 0} - £${quote.quoteResult.estimateRange?.high || 0}` : null,
    vat_included: quote.vat || false
  };

  // Log the formatted data for debugging (remove PII in production)
  console.log('GoHighLevel Lead Data (formatted for webhook):', {
    service_type: ghlData.service_type,
    tags: ghlData.tags,
    add_ons: ghlData.add_ons,
    urgent: ghlData.urgent_request,
    weekend: ghlData.weekend_request
  });
  
  // Send to configured webhook URL if available
  const webhookUrl = process.env.GHL_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'User-Agent': 'TotalSpark-Solutions/1.0'
        },
        body: JSON.stringify(ghlData),
        // Add timeout to prevent hanging
        signal: AbortSignal.timeout(10000)
      });
      
      if (!response.ok) {
        throw new Error(`Webhook failed: ${response.status} ${response.statusText}`);
      }
      
      console.log('Webhook delivered successfully to:', webhookUrl.replace(/\/[^\/]*$/, '/***'));
    } catch (error) {
      console.error('Webhook delivery failed:', error);
      throw error; // Re-throw to trigger catch in calling function
    }
  } else {
    console.log('No GHL_WEBHOOK_URL configured - webhook data ready for Zapier/Make.com setup');
  }
}

function getServiceDisplayName(service: string): string {
  const serviceNames = {
    'endOfTenancy': 'End of Tenancy Cleaning',
    'deep': 'Deep Cleaning',
    'commercial': 'Commercial Cleaning',
    'carpets': 'Carpet & Upholstery Cleaning',
    'cleaning': 'General Cleaning Services'
  };
  return serviceNames[service as keyof typeof serviceNames] || service;
}

function formatAddOns(quote: any): string {
  const addOns = [];
  if (quote.oven) addOns.push('Oven Cleaning');
  if (quote.fridge) addOns.push('Fridge Cleaning');
  if (quote.windows > 0) addOns.push(`${quote.windows} Windows`);
  if (quote.cabinets) addOns.push('Cabinet Cleaning');
  if (quote.limescale) addOns.push('Limescale Removal');
  if (quote.addOnCarpets) addOns.push('Additional Carpets');
  if (quote.addOnUpholstery) addOns.push('Additional Upholstery');
  return addOns.join(', ') || 'None';
}

function generateGHLTags(quote: any): string[] {
  const tags = ['TotalSpark_Lead', 'Website_Quote'];
  
  // Service type tag
  tags.push(`Service_${quote.service}`);
  
  // Priority tags
  if (quote.urgent) tags.push('Urgent_Request');
  if (quote.weekend) tags.push('Weekend_Service');
  
  // Size/scale tags
  if (quote.bedrooms) tags.push(`Bedrooms_${quote.bedrooms}`);
  if (quote.area_m2 && quote.area_m2 > 500) tags.push('Large_Commercial');
  
  // High-value indicators
  if (quote.addOnCarpets || quote.addOnUpholstery) tags.push('Add_On_Services');
  if (quote.oven || quote.fridge || quote.limescale) tags.push('Premium_Services');
  
  return tags;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Quote calculation endpoint - returns instant pricing without creating a quote request
  app.post('/api/quotes/calculate', async (req, res) => {
    try {
      const { service, bedrooms, bathrooms, propertyType, condition } = req.body;
      
      // Base pricing by service type
      const basePrices: Record<string, number> = {
        'tenancy': 120,
        'deep': 150,
        'commercial': 200,
        'carpets': 80
      };
      
      const basePrice = basePrices[service as string] || 120;
      
      // Property size multiplier based on bedrooms
      const bedroomMultiplier = 1 + ((bedrooms || 1) - 1) * 0.3;
      
      // Property type multiplier
      const propertyMultipliers: Record<string, number> = {
        'flat': 1.0,
        'terraced': 1.2,
        'semi': 1.3,
        'detached': 1.5,
        'maisonette': 1.25,
        'townhouse': 1.35
      };
      const propertyMultiplier = propertyMultipliers[propertyType as string] || 1.0;
      
      // Condition multiplier
      const conditionMultipliers: Record<string, number> = {
        'light': 0.9,
        'standard': 1.0,
        'heavy': 1.3,
        'veryheavy': 1.6
      };
      const conditionMultiplier = conditionMultipliers[condition as string] || 1.0;
      
      // Calculate total
      const total = Math.round(basePrice * bedroomMultiplier * propertyMultiplier * conditionMultiplier);
      
      // Return quote result
      res.json({
        basePrice,
        total,
        breakdown: {
          base: basePrice,
          bedrooms: bedrooms || 1,
          bathrooms: bathrooms || 1,
          propertyType: propertyType || 'flat',
          condition: condition || 'standard'
        }
      });
    } catch (error) {
      console.error('Error calculating quote:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Quote requests endpoints
  app.post('/api/quotes', async (req, res) => {
    try {
      const result = insertQuoteRequestSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          error: fromZodError(result.error).toString()
        });
      }

      const quote = await storage.createQuoteRequest(result.data);
      
      // Send email notification
      try {
        await sendEmailNotification(quote);
      } catch (emailError) {
        console.warn('Email notification failed (quote still saved):', emailError);
      }
      
      // Send to GoHighLevel webhook (for automation platforms like Zapier/Make.com)
      try {
        await sendToGHLWebhook(quote);
      } catch (webhookError) {
        console.warn('Webhook delivery failed (quote still saved):', webhookError);
        // Don't fail the main request if webhook fails
      }
      
      res.status(201).json(quote);
    } catch (error) {
      console.error('Error creating quote request:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/api/quotes', async (req, res) => {
    try {
      const quotes = await storage.getQuoteRequests();
      res.json(quotes);
    } catch (error) {
      console.error('Error fetching quote requests:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/api/quotes/:id', async (req, res) => {
    try {
      const quote = await storage.getQuoteRequest(req.params.id);
      if (!quote) {
        return res.status(404).json({ error: 'Quote request not found' });
      }
      res.json(quote);
    } catch (error) {
      console.error('Error fetching quote request:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // GET /api/media/before-after - Fetch city-specific before/after image pairs
  app.get('/api/media/before-after', async (req, res) => {
    try {
      const { city, service } = req.query;
      
      // Validate parameters
      const citySlug = typeof city === 'string' && CITY_SLUGS.includes(city as any) ? city : undefined;
      const serviceType = typeof service === 'string' && SERVICE_TYPES.includes(service as any) ? service : undefined;
      
      const pairs = await storage.listBeforeAfterPairs({ 
        citySlug: citySlug as any, 
        service: serviceType as any 
      });
      
      res.json(pairs);
    } catch (error) {
      console.error('Error fetching before/after pairs:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Booking request endpoint
  app.post('/api/bookings', async (req, res) => {
    try {
      const result = insertBookingRequestSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          error: fromZodError(result.error).toString()
        });
      }

      // Create booking request (which is an updated quote request)
      const booking = await storage.createQuoteRequest(result.data);
      
      // Send booking notification email (non-blocking)
      sendBookingEmailNotification(booking).catch(emailError => {
        console.warn('Booking email notification failed (booking still saved):', emailError);
      });
      
      // Send booking to GoHighLevel webhook (non-blocking)
      sendBookingToGHLWebhook(booking).catch(webhookError => {
        console.warn('Booking webhook delivery failed (booking still saved):', webhookError);
      });
      
      res.status(201).json(booking);
    } catch (error) {
      console.error('Error creating booking request:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Direct webhook endpoint for automation platforms (Zapier, Make.com, etc.)
  app.post('/webhook/ghl', async (req, res) => {
    try {
      console.log('GHL Webhook received data:', JSON.stringify(req.body, null, 2));
      
      // This endpoint can be used by external automation platforms
      // to send data to GoHighLevel or receive data from your website
      
      res.status(200).json({ 
        success: true, 
        message: 'Webhook received successfully',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(500).json({ error: 'Webhook processing failed' });
    }
  });

  // Email webhook endpoint for automation platforms (Zapier/Make.com) 
  app.post('/webhook/email', async (req, res) => {
    try {
      console.log('Email webhook received for lead:', {
        to: req.body.to,
        subject: req.body.subject,
        leadName: req.body.leadData?.name,
        service: req.body.leadData?.service,
        urgent: req.body.leadData?.urgent
      });
      
      res.status(200).json({ 
        success: true, 
        message: 'Email webhook received - ready for automation platform to send email',
        emailData: req.body,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Email webhook error:', error);
      res.status(500).json({ error: 'Email webhook processing failed' });
    }
  });

  // Dynamic sitemap generation for all 365 location pages plus core pages
  app.get('/api/sitemap.xml', (req, res) => {
    try {
      const siteUrl = process.env.SITE_URL || 'https://totalsparksolutions.co.uk';
      const lastMod = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
      
      // Use process.cwd() for more reliable path resolution in Vite dev environment
      const routesPath = path.resolve(process.cwd(), 'client/src/routes/generated-routes.ts');
      let generatedRoutes: string[] = [];
      
      console.log('📄 Sitemap: Reading routes from:', routesPath);
      console.log('📄 File exists:', fs.existsSync(routesPath));
      
      try {
        const routesContent = fs.readFileSync(routesPath, 'utf-8');
        console.log('📄 File size:', routesContent.length, 'characters');
        
        // Extract path values from the routes file using more robust regex
        const pathMatches = routesContent.match(/path:\s*"([^"]+)"/g);
        console.log('📄 Regex matches found:', pathMatches ? pathMatches.length : 0);
        
        if (pathMatches) {
          generatedRoutes = pathMatches.map(match => {
            // Extract the actual path from: path: "/some-path"
            const pathMatch = match.match(/path:\s*"([^"]+)"/);
            return pathMatch ? pathMatch[1] : '';
          }).filter(path => path.length > 0);
          
          console.log('📄 Extracted routes:', generatedRoutes.length);
          console.log('📄 First 5 routes:', generatedRoutes.slice(0, 5));
        }
      } catch (fileError) {
        console.error('❌ Could not read generated routes for sitemap:', fileError);
        // Fallback - return sitemap with just static pages
      }
      
      // Core static pages with additional important pages
      const staticPages = [
        '/', // homepage
        '/quote', // quote form page
        '/about', // about page
        '/areas', // areas page
        '/carpet-upholstery', // carpet cleaning page
        '/commercial-cleaning', // commercial cleaning
        '/deep-cleaning', // deep cleaning
        '/end-of-tenancy', // end of tenancy
        '/complaints', // complaints page
        '/guarantee', // guarantee page
      ];
      
      // Combine all pages
      const allPages = [...staticPages, ...generatedRoutes];
      console.log('📄 Total pages for sitemap:', allPages.length);
      
      // Generate XML sitemap with proper formatting
      const urlEntries = allPages.map(page => {
        const priority = page === '/' ? '1.0' : 
                        page === '/quote' ? '0.9' : 
                        staticPages.includes(page) ? '0.7' : '0.8';
        
        return `  <url>
    <loc>${siteUrl}${page}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
      }).join('\n');

      const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

      res.set('Content-Type', 'application/xml');
      res.set('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
      res.send(sitemapXml);
      
      console.log(`✅ Sitemap generated successfully with ${allPages.length} URLs (${generatedRoutes.length} generated + ${staticPages.length} static)`);
      
    } catch (error) {
      console.error('❌ Error generating sitemap:', error);
      res.set('Content-Type', 'text/plain');
      res.status(500).send(`Error generating sitemap: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });

  // Test endpoint to simulate quote submission for webhook testing
  app.post('/webhook/test', async (req, res) => {
    try {
      const testQuote = {
        id: 'test-' + Date.now(),
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '07123456789',
        address: '123 Test Street, Newcastle',
        postcode: 'NE1 4ST',
        service: 'endOfTenancy',
        bedrooms: '2',
        oven: true,
        windows: 3,
        urgent: false,
        additionalDetails: 'Test webhook integration for GoHighLevel'
      };
      
      await sendToGHLWebhook(testQuote);
      
      res.status(200).json({ 
        success: true, 
        message: 'Test webhook sent',
        data: testQuote
      });
    } catch (error) {
      console.error('Test webhook error:', error);
      res.status(500).json({ error: 'Test webhook failed' });
    }
  });

  // Object storage endpoints for public file uploading (job images)
  // This endpoint is used to serve uploaded objects that can be accessed publicly
  app.get("/objects/:objectPath(*)", async (req, res) => {
    const objectStorageService = new ObjectStorageService();
    try {
      const objectFile = await objectStorageService.getObjectEntityFile(
        req.path,
      );
      objectStorageService.downloadObject(objectFile, res);
    } catch (error) {
      console.error("Error checking object access:", error);
      if (error instanceof ObjectNotFoundError) {
        return res.sendStatus(404);
      }
      return res.sendStatus(500);
    }
  });

  // This endpoint is used to get the upload URL for job images
  app.post("/api/objects/upload", async (req, res) => {
    const objectStorageService = new ObjectStorageService();
    try {
      // Extract content-type and filename from request body for logging
      const { contentType = 'image/jpeg', filename = 'image.jpg' } = req.body;
      
      console.log(`📸 Generating upload URL for file: ${filename}, type: ${contentType}`);
      
      const uploadURL = await objectStorageService.getObjectEntityUploadURL();
      
      // Extract object key from the upload URL to provide stable path
      let objectKey = '';
      let stablePath = '';
      try {
        const url = new URL(uploadURL);
        const pathMatch = url.pathname.match(/\/replit-objstore-[^/]+\/(.+)$/);
        if (pathMatch) {
          objectKey = pathMatch[1];
          stablePath = `/objects/${objectKey}`;
        }
      } catch (e) {
        console.warn('Failed to extract object key from upload URL:', uploadURL);
      }
      
      res.json({ 
        uploadURL,
        objectKey,
        stablePath 
      });
    } catch (error) {
      console.error("Error getting upload URL:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Endpoint for storing job image URLs with quote requests 
  app.put("/api/job-images", async (req, res) => {
    if (!req.body.imageURL) {
      return res.status(400).json({ error: "imageURL is required" });
    }

    try {
      const objectStorageService = new ObjectStorageService();
      const objectPath = objectStorageService.normalizeObjectEntityPath(
        req.body.imageURL,
      );

      // For job images, we make them publicly accessible since they're part of quote requests
      // No authentication required for this public use case
      res.status(200).json({
        objectPath: objectPath,
      });
    } catch (error) {
      console.error("Error processing job image:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Root-level sitemap.xml for Google Search Console submission
  app.get('/sitemap.xml', (req, res) => {
    try {
      // Get the current domain from the request
      const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'https';
      const host = req.headers.host || req.headers['x-forwarded-host'];
      const baseUrl = `${protocol}://${host}`;
      
      console.log(`📄 Generating sitemap for domain: ${baseUrl}`);
      
      const lastMod = new Date().toISOString().split('T')[0];
      
      // Core pages with priorities
      const pages = [
        { url: '/', priority: '1.0' },
        { url: '/quote', priority: '0.9' },
        { url: '/end-of-tenancy-cleaning', priority: '0.9' },
        { url: '/deep-cleaning', priority: '0.9' },
        { url: '/commercial-cleaning', priority: '0.9' },
        { url: '/carpet-upholstery-cleaning', priority: '0.9' },
        { url: '/end-of-tenancy-cleaning-newcastle', priority: '0.8' },
        { url: '/about', priority: '0.7' },
        { url: '/areas', priority: '0.8' },
        { url: '/reviews', priority: '0.7' },
        { url: '/insurance', priority: '0.6' },
        { url: '/guarantee', priority: '0.6' },
        { url: '/privacy', priority: '0.3' },
        { url: '/terms', priority: '0.3' },
        { url: '/complaints', priority: '0.3' },
      ];

      // Add city pages
      const cities = [
        'newcastle-upon-tyne', 'sunderland', 'middlesbrough', 'durham', 'gateshead',
        'south-shields', 'north-shields', 'darlington', 'hartlepool', 'stockton-on-tees',
        'washington', 'consett', 'stanley', 'chester-le-street', 'houghton-le-spring',
        'seaham', 'peterlee', 'newton-aycliffe', 'spennymoor', 'ferryhill',
        'bishop-auckland', 'crook', 'morpeth', 'cramlington', 'hexham',
        'alnwick', 'berwick-upon-tweed', 'prudhoe', 'ponteland', 'wallsend',
        'tynemouth', 'whitley-bay', 'blyth', 'killingworth', 'longbenton'
      ];

      cities.forEach(city => {
        pages.push({ url: `/cleaning/${city}`, priority: '0.7' });
      });

      // Add service-city combinations for major cities
      const services = ['end-of-tenancy-cleaning', 'deep-cleaning', 'commercial-cleaning', 'carpet-cleaning'];
      const majorCities = ['newcastle-upon-tyne', 'sunderland', 'middlesbrough', 'durham', 'gateshead'];
      
      services.forEach(service => {
        majorCities.forEach(city => {
          pages.push({ url: `/${service}/${city}`, priority: '0.6' });
        });
      });

      const urlEntries = pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n');

      const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

      console.log(`✅ Generated sitemap with ${pages.length} URLs`);
      
      res.set({
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      });
      res.send(sitemapXml);
    } catch (error) {
      console.error('❌ Sitemap generation error:', error);
      res.status(500).send('Sitemap generation failed');
    }
  });

  // Root-level robots.txt for search engines
  app.get('/robots.txt', (req, res) => {
    try {
      const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'https';
      const host = req.headers.host || req.headers['x-forwarded-host'];
      const baseUrl = `${protocol}://${host}`;
      
      const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin and api paths
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /wordpress/

# Allow important pages
Allow: /cleaning/
Allow: /end-of-tenancy-cleaning/
Allow: /deep-cleaning/
Allow: /commercial-cleaning/
Allow: /carpet-upholstery-cleaning/`;

      console.log(`📄 Generated robots.txt for domain: ${baseUrl}`);
      
      res.set({
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=3600'
      });
      res.send(robotsTxt);
    } catch (error) {
      console.error('❌ Robots.txt generation error:', error);
      res.status(500).send('Robots.txt generation failed');
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
