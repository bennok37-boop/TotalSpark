import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const quoteRequests = pgTable("quote_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  
  // Contact details
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  postcode: text("postcode"),
  additionalDetails: text("additional_details"),
  
  // Service details
  service: text("service").notNull(), // 'endOfTenancy' | 'deep' | 'commercial' | 'carpets'
  bedrooms: text("bedrooms"), // 'studio' | '1' | '2' | '3' | '4' | '5plus'
  area_m2: integer("area_m2"), // For commercial cleaning
  commercialRooms: integer("commercial_rooms"), // Alternative to area for commercial
  commercialToilets: integer("commercial_toilets").default(0), // Toilets for commercial
  
  // Carpet items (for carpet service)
  carpetRooms: integer("carpet_rooms").default(0),
  stairs: integer("stairs").default(0),
  rugs: integer("rugs").default(0),
  sofa2: integer("sofa2").default(0),
  sofa3: integer("sofa3").default(0),
  armchair: integer("armchair").default(0),
  mattress: integer("mattress").default(0),
  
  // Add-ons
  oven: boolean("oven").default(false),
  fridge: boolean("fridge").default(false),
  windows: integer("windows").default(0),
  cabinets: boolean("cabinets").default(false),
  limescale: boolean("limescale").default(false),
  addOnCarpets: boolean("add_on_carpets").default(false),
  addOnUpholstery: boolean("add_on_upholstery").default(false),
  
  // Modifiers
  urgent: boolean("urgent").default(false),
  weekend: boolean("weekend").default(false),
  stairsNoLift: boolean("stairs_no_lift").default(false),
  
  // Pricing options
  bundleCarpetsWithEoT: boolean("bundle_carpets_with_eot").default(false),
  vat: boolean("vat").default(false),
  
  // Quote result (stored as JSON)
  quoteResult: jsonb("quote_result"), // Stores the complete QuoteResult object
  
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertQuoteRequestSchema = createInsertSchema(quoteRequests).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertQuoteRequest = z.infer<typeof insertQuoteRequestSchema>;
export type QuoteRequest = typeof quoteRequests.$inferSelect;

// City and service types
export const CITIES = ['Newcastle', 'Leeds', 'Sunderland', 'York', 'Durham', 'Middlesbrough'] as const;
export const SERVICE_TYPES = ['endOfTenancy', 'deep', 'commercial', 'carpets'] as const;
export const BEDROOM_OPTIONS = ['studio', '1', '2', '3', '4', '5plus'] as const;

export type City = typeof CITIES[number];
export type ServiceType = typeof SERVICE_TYPES[number];
export type BedroomOption = typeof BEDROOM_OPTIONS[number];

// Quote result type for JSON storage
export type QuoteResultBreakdown = {
  item: string;
  price: number;
};

export type StoredQuoteResult = {
  priceRange: [number, number];
  crew: number;
  duration: number;
  breakdown: QuoteResultBreakdown[];
};
