import type { Express } from "express";
import { createServer, type Server } from "http";
import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';
import { storage } from "./storage";
import { insertQuoteRequestSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { ObjectStorageService, ObjectNotFoundError } from "./objectStorage.js";

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log('SendGrid initialized successfully');
} else {
  console.warn('SendGrid API key not found - email notifications will use SMTP fallback');
}

// Email notification service using SendGrid (reliable) with SMTP fallback
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

═══════════════════════════════════════
Quote ID: ${quote.id}
Submitted: ${new Date().toLocaleString('en-GB', { 
  timeZone: 'Europe/London',
  dateStyle: 'full',
  timeStyle: 'short'
})}

This lead is ready to copy-paste into GoHighLevel!
  `.trim();

  // Skip SendGrid API (credits exceeded) - go straight to SMTP
  console.log('Using SendGrid SMTP relay (bypassing API due to credit limits)...');
  
  // Use SendGrid SMTP (more reliable than API with credit limits)
  try {
    const smtpConfig = {
      host: 'smtp.sendgrid.net',
      port: 465,
      secure: true, // Use SSL for port 465
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY
      },
      connectionTimeout: 15000,
      socketTimeout: 15000
    };
    
    const transporter = nodemailer.createTransport(smtpConfig);
    
    await transporter.sendMail({
      from: `"TotalSpark Solutions" <noreply@totalsparksolutions.co.uk>`,
      to: 'leads@totalsparksolutions.co.uk',
      replyTo: quote.email,
      subject: emailSubject,
      text: emailBody
    });
    
    console.log('✅ Email notification sent successfully via SendGrid SMTP to leads@totalsparksolutions.co.uk');
  } catch (smtpError) {
    console.error('Both SendGrid API and SMTP email failed. Lead saved successfully but no email sent:', smtpError);
    // Don't throw - quote should still save successfully
  }
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
      const uploadURL = await objectStorageService.getObjectEntityUploadURL();
      res.json({ uploadURL });
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

  const httpServer = createServer(app);

  return httpServer;
}
