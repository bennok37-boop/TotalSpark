import type { VercelRequest, VercelResponse } from '@vercel/node';

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

    // Log the quote submission (in production, you'd save to database or send to CRM)
    console.log('Quote submission received:', {
      name: data.name,
      email: data.email,
      phone: data.phone,
      service: data.service,
      address: data.address,
      postcode: data.postcode,
      timestamp: new Date().toISOString()
    });

    // In production, you would:
    // 1. Save to database
    // 2. Send notification email via SendGrid/Resend
    // 3. Send to CRM/GHL if configured
    // 4. Trigger automated follow-up sequences

    // For now, return success
    return res.status(200).json({ 
      success: true, 
      message: 'Quote submitted successfully',
      quoteId: `QUOTE-${Date.now()}` // Simple ID for now
    });

  } catch (error) {
    console.error('Quote submission error:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
}