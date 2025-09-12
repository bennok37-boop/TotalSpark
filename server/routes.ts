import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuoteRequestSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

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

  const httpServer = createServer(app);

  return httpServer;
}
