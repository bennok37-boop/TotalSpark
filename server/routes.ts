import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuoteRequestSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { ObjectStorageService, ObjectNotFoundError } from "./objectStorage.js";

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
    total_estimate: quote.estimatedTotal || null,
    vat_included: quote.vat || false
  };

  // In a real implementation, this would be sent to your webhook endpoint
  // For now, we'll just log the formatted data for setup with Zapier/Make.com
  console.log('GoHighLevel Lead Data (ready for webhook):', JSON.stringify(ghlData, null, 2));
  
  // Example webhook URL (replace with your actual automation platform webhook)
  // await fetch('YOUR_ZAPIER_OR_MAKE_WEBHOOK_URL', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(ghlData)
  // });
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
