import { type User, type InsertUser, type QuoteRequest, type InsertQuoteRequest } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createQuoteRequest(quote: InsertQuoteRequest): Promise<QuoteRequest>;
  getQuoteRequests(): Promise<QuoteRequest[]>;
  getQuoteRequest(id: string): Promise<QuoteRequest | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private quoteRequests: Map<string, QuoteRequest>;

  constructor() {
    this.users = new Map();
    this.quoteRequests = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createQuoteRequest(insertQuote: InsertQuoteRequest): Promise<QuoteRequest> {
    const id = randomUUID();
    const quote: QuoteRequest = {
      id,
      name: insertQuote.name,
      email: insertQuote.email,
      phone: insertQuote.phone,
      city: insertQuote.city,
      propertyType: insertQuote.propertyType ?? null,
      bedrooms: insertQuote.bedrooms ?? null,
      service: insertQuote.service ?? null,
      extras: insertQuote.extras ?? null,
      estimatedPrice: insertQuote.estimatedPrice ?? null,
      createdAt: new Date()
    };
    this.quoteRequests.set(id, quote);
    return quote;
  }

  async getQuoteRequests(): Promise<QuoteRequest[]> {
    return Array.from(this.quoteRequests.values());
  }

  async getQuoteRequest(id: string): Promise<QuoteRequest | undefined> {
    return this.quoteRequests.get(id);
  }
}

export const storage = new MemStorage();
