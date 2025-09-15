import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuoteRequestSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { ObjectStorageService, ObjectNotFoundError } from "./objectStorage.js";
import { GHLApi } from "./ghl.js";

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

  // GHL Integration endpoints
  app.post('/api/ghl/lead', async (req, res) => {
    try {
      const { name, email, phone, address, postcode } = req.body;
      
      if (!name || !email || !phone) {
        return res.status(400).json({ error: 'Name, email, and phone are required' });
      }

      const result = await GHLApi.submitLead({
        name,
        email,
        phone,
        address: address || '',
        postcode: postcode || ''
      });

      if (result.success) {
        res.json({ success: true, contactId: result.contactId });
      } else {
        console.error('GHL lead submission failed:', result.error);
        res.status(500).json({ success: false, error: result.error });
      }
    } catch (error) {
      console.error('Error submitting lead to GHL:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  });

  app.post('/api/ghl/quote', async (req, res) => {
    try {
      const { contactId, quoteId, serviceName, estimateLow, estimateHigh, quoteUrl } = req.body;
      
      if (!contactId || !quoteId || !serviceName) {
        return res.status(400).json({ error: 'contactId, quoteId, and serviceName are required' });
      }

      const result = await GHLApi.submitQuote({
        contactId,
        quoteId,
        serviceName,
        estimateLow: estimateLow || 0,
        estimateHigh: estimateHigh || 0,
        quoteUrl: quoteUrl || ''
      });

      if (result.success) {
        res.json({ success: true, opportunityId: result.opportunityId });
      } else {
        console.error('GHL quote submission failed:', result.error);
        res.status(500).json({ success: false, error: result.error });
      }
    } catch (error) {
      console.error('Error submitting quote to GHL:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
