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
      additionalDetails: insertQuote.additionalDetails ?? null,
      bedrooms: insertQuote.bedrooms ?? null,
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
    // Real city-specific before/after transformation images showing same spaces dirty vs clean
    const seedPairs: InsertBeforeAfterPair[] = [
      {
        citySlug: 'newcastle-upon-tyne',
        service: 'deep',
        beforeSrc: '/attached_assets/generated_images/Messy_Newcastle_living_room_7db9f580.png',
        afterSrc: '/attached_assets/generated_images/Clean_Newcastle_living_room_5001ab49.png',
        title: 'Newcastle Living Room Deep Clean',
        caption: 'Complete living room transformation - from cluttered mess to spotless comfort'
      },
      {
        citySlug: 'leeds',
        service: 'deep',
        beforeSrc: '/attached_assets/generated_images/Messy_Leeds_kitchen_93b8ad6e.png',
        afterSrc: '/attached_assets/generated_images/Clean_Leeds_kitchen_d40edaae.png',
        title: 'Leeds Kitchen Deep Clean',
        caption: 'Kitchen restoration - from grease and grime to sparkling surfaces'
      },
      {
        citySlug: 'york',
        service: 'deep',
        beforeSrc: '/attached_assets/generated_images/Dirty_York_bathroom_d8bf81f9.png',
        afterSrc: '/attached_assets/generated_images/Clean_York_bathroom_e19abd8d.png',
        title: 'York Bathroom Deep Clean',
        caption: 'Bathroom renovation - from soap scum to pristine shine'
      },
      {
        citySlug: 'sunderland',
        service: 'endOfTenancy',
        beforeSrc: '/attached_assets/generated_images/Messy_Sunderland_bedroom_9590095c.png',
        afterSrc: '/attached_assets/generated_images/Clean_Sunderland_bedroom_46db1d8c.png',
        title: 'Sunderland End of Tenancy Clean',
        caption: 'Move-out cleaning - from tenant mess to landlord-ready condition'
      },
      {
        citySlug: 'middlesbrough',
        service: 'commercial',
        beforeSrc: '/attached_assets/generated_images/Messy_Middlesbrough_office_aeede406.png',
        afterSrc: '/attached_assets/generated_images/Clean_Middlesbrough_office_ac4da46b.png',
        title: 'Middlesbrough Office Commercial Clean',
        caption: 'Workplace transformation - from cluttered chaos to professional space'
      }
    ];

    seedPairs.forEach(async pair => {
      await this.createBeforeAfterPair(pair);
    });
  }
}

export const storage = new MemStorage();
