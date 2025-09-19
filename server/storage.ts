import { type User, type InsertUser, type QuoteRequest, type InsertQuoteRequest, type BeforeAfterPair, type InsertBeforeAfterPair, type CitySlug, type ServiceType } from "@shared/schema";
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
  listBeforeAfterPairs(params: { citySlug?: CitySlug; service?: ServiceType }): Promise<BeforeAfterPair[]>;
  createBeforeAfterPair(pair: InsertBeforeAfterPair): Promise<BeforeAfterPair>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private quoteRequests: Map<string, QuoteRequest>;
  private beforeAfterPairs: Map<string, BeforeAfterPair>;

  constructor() {
    this.users = new Map();
    this.quoteRequests = new Map();
    this.beforeAfterPairs = new Map();
    this.seedBeforeAfterPairs();
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
      ...insertQuote,
      id,
      postcode: insertQuote.postcode ?? null,
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

  async listBeforeAfterPairs(params: { citySlug?: CitySlug; service?: ServiceType }): Promise<BeforeAfterPair[]> {
    let pairs = Array.from(this.beforeAfterPairs.values());
    
    if (params.citySlug) {
      pairs = pairs.filter(pair => pair.citySlug === params.citySlug);
    }
    
    if (params.service) {
      pairs = pairs.filter(pair => pair.service === params.service);
    }
    
    return pairs;
  }

  async createBeforeAfterPair(insertPair: InsertBeforeAfterPair): Promise<BeforeAfterPair> {
    const id = randomUUID();
    const pair: BeforeAfterPair = {
      ...insertPair,
      id,
      caption: insertPair.caption ?? null,
      takenAt: insertPair.takenAt ?? null,
      tags: insertPair.tags ?? null,
      createdAt: new Date()
    };
    this.beforeAfterPairs.set(id, pair);
    return pair;
  }

  private seedBeforeAfterPairs() {
    // Placeholder - will be populated with actual image pairs later
    const seedPairs: InsertBeforeAfterPair[] = [
      {
        citySlug: 'newcastle-upon-tyne',
        service: 'endOfTenancy',
        beforeSrc: '/placeholder-before.jpg',
        afterSrc: '/placeholder-after.jpg',
        title: 'Newcastle End of Tenancy Clean',
        caption: 'Complete property transformation for deposit return'
      },
      {
        citySlug: 'leeds',
        service: 'deep',
        beforeSrc: '/placeholder-before.jpg',
        afterSrc: '/placeholder-after.jpg',
        title: 'Leeds Deep Clean',
        caption: 'Comprehensive house cleaning service'
      },
      {
        citySlug: 'york',
        service: 'commercial',
        beforeSrc: '/placeholder-before.jpg',
        afterSrc: '/placeholder-after.jpg',
        title: 'York Office Clean',
        caption: 'Professional commercial space restoration'
      }
    ];

    seedPairs.forEach(async pair => {
      await this.createBeforeAfterPair(pair);
    });
  }
}

export const storage = new MemStorage();
