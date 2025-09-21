import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Debug endpoint to test Vercel environment
  console.log('🔍 DEBUG: Starting debug endpoint');
  
  try {
    // Check environment variables
    const hasResendKey = !!process.env.RESEND_API_KEY;
    const resendKeyFormat = process.env.RESEND_API_KEY?.startsWith('re_') ? 'valid' : 'invalid';
    const notificationEmail = process.env.NOTIFICATION_EMAIL || 'not set';
    
    console.log('🔍 DEBUG: Environment check:', {
      hasResendKey,
      resendKeyFormat,
      notificationEmail
    });
    
    // Try to initialize Resend
    let resendStatus = 'not initialized';
    let resend: any = null;
    
    if (hasResendKey && resendKeyFormat === 'valid') {
      try {
        resend = new Resend(process.env.RESEND_API_KEY);
        resendStatus = 'initialized successfully';
        console.log('🔍 DEBUG: Resend initialized');
      } catch (error) {
        resendStatus = `initialization failed: ${error}`;
        console.log('🔍 DEBUG: Resend init error:', error);
      }
    }
    
    // Try to send a test email if POST request
    let emailResult: any = null;
    if (req.method === 'POST' && resend) {
      try {
        console.log('🔍 DEBUG: Attempting to send test email');
        
        const result = await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: notificationEmail,
          subject: '🔍 Vercel Email Test - TotalSpark Solutions',
          text: `
TEST EMAIL FROM VERCEL DEPLOYMENT
================================

This is a test email sent from your Vercel serverless function.
If you receive this, your email configuration is working!

Timestamp: ${new Date().toISOString()}
Environment: Vercel Production
Function: /api/debug

This confirms:
✅ RESEND_API_KEY is configured correctly
✅ Email service is working
✅ Serverless function can send emails

Your quote and booking forms should now work properly.
          `.trim()
        });
        
        emailResult = {
          success: true,
          emailId: result.data?.id,
          error: result.error
        };
        
        console.log('🔍 DEBUG: Email sent successfully:', result);
        
      } catch (error) {
        emailResult = {
          success: false,
          error: error.message
        };
        console.log('🔍 DEBUG: Email sending failed:', error);
      }
    }
    
    // Return debug information
    return res.status(200).json({
      success: true,
      debug: {
        method: req.method,
        environment: 'vercel',
        timestamp: new Date().toISOString(),
        resendKey: hasResendKey ? 'present' : 'missing',
        resendKeyFormat,
        resendStatus,
        emailConfigured: notificationEmail !== 'not set',
        emailResult
      }
    });
    
  } catch (error) {
    console.log('🔍 DEBUG: Endpoint error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
      debug: {
        environment: 'vercel',
        timestamp: new Date().toISOString()
      }
    });
  }
}