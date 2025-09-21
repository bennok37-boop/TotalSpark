import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import sgMail from '@sendgrid/mail';
import nodemailer from 'nodemailer';

// Initialize email services
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
  }
} else {
  console.log('⚠️  No RESEND_API_KEY found - using SMTP fallback');
}

// Helper functions
function getServiceDisplayName(service: string): string {
  const serviceMap: { [key: string]: string } = {
    'end-of-tenancy': 'End of Tenancy Cleaning',
    'deep-cleaning': 'Deep Cleaning',
    'commercial-cleaning': 'Commercial Cleaning',
    'carpet-upholstery': 'Carpet & Upholstery Cleaning'
  };
  return serviceMap[service] || service;
}

// Email notification service
async function sendEmailNotification(quote: any) {
  const serviceDisplayName = getServiceDisplayName(quote.service);
  const estimateText = quote.estimatedPrice 
    ? `£${quote.estimatedPrice}`
    : 'Quote calculation pending';

  const emailSubject = `🔔 NEW LEAD: ${serviceDisplayName} - ${quote.address?.split(',').pop()?.trim() || 'Location'}`;
  
  const emailBody = `
NEW LEAD NOTIFICATION
═══════════════════════════════════════

📍 CONTACT DETAILS
Name: ${quote.name}
Email: ${quote.email}
Phone: ${quote.phone}
Address: ${quote.address || 'Not provided'}
Postcode: ${quote.postcode || 'Not provided'}

🏠 SERVICE REQUIREMENTS
Service: ${serviceDisplayName}
${quote.bedrooms ? `Bedrooms: ${quote.bedrooms}` : ''}
${quote.bathrooms ? `Bathrooms: ${quote.bathrooms}` : ''}
${quote.propertyType ? `Property Type: ${quote.propertyType}` : ''}

💷 QUOTE ESTIMATE
Range: ${estimateText}

📝 ADDITIONAL NOTES
${quote.additionalDetails || 'None provided'}

═══════════════════════════════════════
Quote ID: ${quote.id}
Submitted: ${new Date().toLocaleString('en-GB', { 
  timeZone: 'Europe/London',
  dateStyle: 'full',
  timeStyle: 'short'
})}

This lead is ready for follow-up!
  `.trim();

  const targetEmail = process.env.NOTIFICATION_EMAIL || 'leads@totalsparksolutions.co.uk';
  
  // Try Resend first (if configured)
  if (resend) {
    try {
      console.log(`📧 Sending quote email via Resend to: ${targetEmail}`);

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
        </div>`
      });
      
      if (result.error) {
        console.error('❌ Resend error details:', result.error);
        throw new Error(`Resend failed: ${result.error.message}`);
      }
      
      console.log('✅ Quote email sent successfully via Resend');
      return;
    } catch (resendError) {
      console.warn('❌ Resend quote email failed, falling back to SMTP:', resendError);
    }
  }
  
  // Fallback to SMTP if Resend not available or failed
  console.log(`📧 Sending quote email via SMTP to: ${targetEmail}`);
  try {
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
      text: emailBody
    });
    
    console.log(`✅ Quote email sent successfully via SMTP`);
  } catch (smtpError) {
    console.error('SMTP email failed. Quote saved successfully but no email sent:', smtpError);
    throw smtpError;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse request body
    const data = req.body || {};

    // Basic validation - ensure required fields exist
    const requiredFields = ['name', 'phone', 'service'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        error: 'Missing required fields', 
        missing: missingFields 
      });
    }

    // Create quote object with unique ID
    const quoteId = `QUOTE-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const quote = {
      id: quoteId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      service: data.service,
      address: data.address,
      postcode: data.postcode,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      propertyType: data.propertyType,
      additionalDetails: data.additionalDetails,
      estimatedPrice: data.estimatedPrice,
      timestamp: new Date().toISOString()
    };

    // Log the quote submission
    console.log('Quote submission received:', {
      quoteId: quote.id,
      name: quote.name,
      service: quote.service,
      timestamp: quote.timestamp
    });

    try {
      // Send email notification
      await sendEmailNotification(quote);
      console.log('✅ Quote email notification sent successfully');
    } catch (emailError) {
      console.error('❌ Failed to send quote email notification:', emailError);
      // Continue with success response even if email fails
    }

    // Return success
    return res.status(200).json({ 
      success: true, 
      message: 'Quote submitted successfully',
      quoteId: quote.id
    });

  } catch (error) {
    console.error('Quote submission error:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
}