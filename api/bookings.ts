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

// Booking-specific email notification function
async function sendBookingEmailNotification(booking: any) {
  const serviceDisplayName = getServiceDisplayName(booking.service);
  const estimateText = booking.estimatedPrice 
    ? `£${booking.estimatedPrice}`
    : 'Quote calculation pending';

  const bookingDate = booking.preferredDate ? new Date(booking.preferredDate).toLocaleDateString('en-GB') : 'Not specified';
  const timeSlot = booking.preferredTimeSlot || 'Not specified';

  const emailSubject = `🗓️ BOOKING REQUEST: ${serviceDisplayName} - ${booking.address?.split(',').pop()?.trim() || 'Location'} (${bookingDate})`;
  
  const emailBody = `
🔥 BOOKING REQUEST NOTIFICATION
═══════════════════════════════════════

⭐ CUSTOMER WANTS TO BOOK ONLINE!
Service Date: ${bookingDate}
Time Preference: ${timeSlot}

📍 CONTACT DETAILS
Name: ${booking.name}
Email: ${booking.email}
Phone: ${booking.phone}
Address: ${booking.address || 'Not provided'}
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
Additional Notes: ${booking.additionalNotes || 'None provided'}

⚠️ ACTION REQUIRED: Confirm booking within 30 minutes!
This is a hot lead - customer is ready to book!

Booking ID: ${booking.id}
Submitted: ${new Date().toLocaleString('en-GB')}
  `.trim();

  const targetEmail = process.env.NOTIFICATION_EMAIL || 'leads@totalsparksolutions.co.uk';
  
  // Try Resend first (if configured)
  if (resend) {
    try {
      console.log(`📧 Sending booking email via Resend to: ${targetEmail}`);

      const result = await resend.emails.send({
        from: 'bookings@totalsparksolutions.co.uk',
        to: targetEmail,
        replyTo: booking.email,
        subject: emailSubject,
        text: emailBody,
        html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #28a745; padding-bottom: 10px;">New Booking Request - TotalSpark Solutions</h2>
          <pre style="background: #f8f9fa; padding: 15px; border-radius: 5px; white-space: pre-wrap; font-family: monospace;">${emailBody}</pre>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">This email was automatically generated from the TotalSpark Solutions website.</p>
        </div>`
      });
      
      if (result.error) {
        console.error('❌ Resend booking error details:', result.error);
        throw new Error(`Resend booking failed: ${result.error.message}`);
      }
      
      console.log('✅ Booking email sent successfully via Resend');
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
      priority: 'high'
    });
    
    console.log(`✅ Booking email sent successfully via SMTP`);
  } catch (error) {
    console.error('Booking email notification failed:', error);
    throw error;
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
    const requiredFields = ['name', 'phone', 'service', 'preferredDate'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        error: 'Missing required fields', 
        missing: missingFields 
      });
    }

    // Create booking object with unique ID
    const bookingId = `BOOK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const booking = {
      id: bookingId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      service: data.service,
      preferredDate: data.preferredDate,
      preferredTimeSlot: data.preferredTimeSlot,
      address: data.address,
      postcode: data.postcode,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      additionalNotes: data.additionalNotes,
      estimatedPrice: data.estimatedPrice,
      timestamp: new Date().toISOString()
    };

    // Log the booking submission
    console.log('Booking submission received:', {
      bookingId: booking.id,
      name: booking.name,
      service: booking.service,
      preferredDate: booking.preferredDate,
      timestamp: booking.timestamp
    });

    try {
      // Send email notification
      await sendBookingEmailNotification(booking);
      console.log('✅ Booking email notification sent successfully');
    } catch (emailError) {
      console.error('❌ Failed to send booking email notification:', emailError);
      // Continue with success response even if email fails
    }

    // Return success
    return res.status(200).json({ 
      success: true, 
      message: 'Booking request submitted successfully',
      bookingId: booking.id,
      estimatedResponse: '30 minutes'
    });

  } catch (error) {
    console.error('Booking submission error:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
}