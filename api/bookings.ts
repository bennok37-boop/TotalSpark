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
    const requiredFields = ['name', 'phone', 'service', 'preferredDate'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        error: 'Missing required fields', 
        missing: missingFields 
      });
    }

    // Log the booking submission (in production, you'd save to database or send to CRM)
    console.log('Booking submission received:', {
      name: data.name,
      email: data.email,
      phone: data.phone,
      service: data.service,
      preferredDate: data.preferredDate,
      preferredTimeSlot: data.preferredTimeSlot,
      address: data.address,
      timestamp: new Date().toISOString()
    });

    // In production, you would:
    // 1. Save booking to database
    // 2. Send confirmation email to customer
    // 3. Send booking notification to operations team
    // 4. Create calendar event
    // 5. Send to scheduling system

    // For now, return success
    return res.status(200).json({ 
      success: true, 
      message: 'Booking request submitted successfully',
      bookingId: `BOOK-${Date.now()}`,
      estimatedResponse: '30 minutes'
    });

  } catch (error) {
    console.error('Booking submission error:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
}