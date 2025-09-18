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
  
  // Job images
  jobImages: jsonb("job_images").default([]), // Array of image URLs
  
  // Booking status and tracking
  bookedOnline: boolean("booked_online").default(false),
  bookingDate: timestamp("booking_date"),
  bookingStatus: text("booking_status").default('quote_requested'), // 'quote_requested' | 'booking_requested' | 'booking_confirmed' | 'completed' | 'cancelled'
  preferredDate: text("preferred_date"),
  preferredTimeSlot: text("preferred_time_slot"), // 'morning' | 'afternoon' | 'evening' | 'flexible'
  leadSource: text("lead_source").default('website'), // 'website' | 'phone' | 'email' | 'referral'
  
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

// Booking request schema with additional validation for booking-specific fields
export const insertBookingRequestSchema = insertQuoteRequestSchema.extend({
  preferredDate: z.string().min(1, 'Preferred date is required'),
  preferredTimeSlot: z.enum(['morning', 'afternoon', 'evening', 'flexible']),
  additionalNotes: z.string().optional(),
  bookedOnline: z.boolean().default(true),
  bookingStatus: z.enum(['quote_requested', 'booking_requested', 'booking_confirmed', 'completed', 'cancelled']).default('booking_requested'),
  leadSource: z.string().default('website')
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertQuoteRequest = z.infer<typeof insertQuoteRequestSchema>;
export type InsertBookingRequest = z.infer<typeof insertBookingRequestSchema>;
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
