// Instant Quote Calculator - Pricing Engine  
// Based on CleanPro pricing matrix and business rules

const PRICING = {
  domesticMin: 80,
  commercialMin: 120,
  vatRate: 0.20,
  estimateBand: 0.10,
  endOfTenancy: {
    base: { 
      studio: { price: 100, hours: 3 }, 
      "1": { price: 120, hours: 4 }, 
      "2": { price: 160, hours: 6 }, 
      "3": { price: 220, hours: 8 }, 
      "4": { price: 280, hours: 10 }, 
      "5plus": { price: 340, hours: 12 } 
    }
  },
  deep: {
    base: { 
      studio: { price: 100, hours: 3 }, 
      "1": { price: 100, hours: 4 }, 
      "2": { price: 150, hours: 6 }, 
      "3": { price: 200, hours: 8 }, 
      "4": { price: 260, hours: 10 }, 
      "5plus": { price: 320, hours: 12 } 
    }
  },
  commercial: {
    ratePerHour: 20,
    m2PerCleanerHour: 60,
    minHours: 2
  },
  carpets: {
    room: 25, 
    stairs: 30, 
    rug: 30, 
    sofa2: 40, 
    sofa3: 55, 
    armchair: 20, 
    mattress: 35
  },
  addons: {
    oven: 35, 
    fridgeFreezer: 20, 
    cabinetsInside: 20, 
    limescalePack: 15,
    windowsPerUnit: 3, 
    windowsMin: 15
  },
  modifiers: {
    urgentPct: 0.20,
    weekendPct: 0.10,
    stairsNoLift: 10,
    outerArea: 10,
    bundleCarpetWithEoTDiscountPct: 0.10
  }
};

export interface QuoteInput {
  service: "endOfTenancy" | "deep" | "commercial" | "carpets";
  bedrooms?: "studio" | "1" | "2" | "3" | "4" | "5plus" | "5+";
  bathrooms?: number;
  toilets?: number;
  livingRooms?: number;
  kitchenSize?: "small" | "standard" | "large";
  area_m2?: number; // commercial
  items?: {
    carpetRooms?: number;
    stairs?: number;
    rugs?: number;
    sofa2?: number;
    sofa3?: number;
    armchair?: number;
    mattress?: number;
  }; // carpets
  addons?: {
    oven?: boolean;
    fridge?: boolean;
    windows?: number;
    cabinets?: boolean;
    limescale?: boolean;
  };
  modifiers?: {
    urgent?: boolean;
    weekend?: boolean;
    stairsNoLift?: boolean;
    outerArea?: boolean;
  };
  vat?: boolean; // true if VAT-registered
  bundleCarpetsWithEoT?: boolean;
}

export interface LineItem {
  label: string;
  amount: number;
}

export interface QuoteResult {
  currency: string;
  lineItems: LineItem[];
  subtotal: number;
  vat: number;
  total: number;
  estimateRange: { low: number; high: number };
  scheduling: { 
    baseHours: number | null; 
    crew: number; 
    durationHours: number | null; 
  };
  notes: string[];
}

export function computeQuote(input: QuoteInput): QuoteResult {
  const cfg = PRICING;
  let lineItems: LineItem[] = [];
  let baseHours = 0;
  let subtotal = 0;

  const add = (label: string, amount: number) => { 
    if (amount > 0) {
      lineItems.push({ label, amount: +amount.toFixed(2) }); 
    }
    subtotal += amount; 
  };

  if (input.service === "endOfTenancy" || input.service === "deep") {
    const table = cfg[input.service].base;
    const key = (input.bedrooms === "5plus" || input.bedrooms === "5+") ? "5plus"
               : (input.bedrooms === "studio" ? "studio" : String(input.bedrooms || ""));
    const base = table[key as keyof typeof table];
    
    if (base) {
      add(`${input.service === "endOfTenancy" ? "End of Tenancy" : "Deep"} clean (${key === "5plus" ? "5+" : key} ${key === "studio" ? "" : "beds"})`, base.price);
      baseHours = base.hours;
    }

    // Add-ons
    if (input.addons?.oven) add("Oven deep clean", cfg.addons.oven);
    if (input.addons?.fridge) add("Fridge/Freezer clean", cfg.addons.fridgeFreezer);
    if (input.addons?.cabinets) add("Inside kitchen cabinets", cfg.addons.cabinetsInside);
    if (input.addons?.limescale) add("Bathroom limescale pack", cfg.addons.limescalePack);
    if (input.addons && Number(input.addons.windows) > 0) {
      const win = Math.max(cfg.addons.windowsMin, (input.addons.windows || 0) * cfg.addons.windowsPerUnit);
      add(`Interior windows x${input.addons.windows}`, win);
    }

  } else if (input.service === "commercial") {
    const hours = Math.max(cfg.commercial.minHours, (input.area_m2 || 0) / cfg.commercial.m2PerCleanerHour);
    const cost = hours * cfg.commercial.ratePerHour;
    add(`Commercial cleaning (${hours.toFixed(1)} hrs @ £${cfg.commercial.ratePerHour}/hr)`, cost);
    baseHours = hours;

  } else if (input.service === "carpets") {
    const it = input.items || {};
    add(`Carpet rooms x${it.carpetRooms||0}`, (it.carpetRooms||0) * cfg.carpets.room);
    add(`Stairs & landing x${it.stairs||0}`, (it.stairs||0) * cfg.carpets.stairs);
    add(`Rugs x${it.rugs||0}`, (it.rugs||0) * cfg.carpets.rug);
    add(`Sofa 2-seater x${it.sofa2||0}`, (it.sofa2||0) * cfg.carpets.sofa2);
    add(`Sofa 3-seater x${it.sofa3||0}`, (it.sofa3||0) * cfg.carpets.sofa3);
    add(`Armchairs x${it.armchair||0}`, (it.armchair||0) * cfg.carpets.armchair);
    add(`Mattresses x${it.mattress||0}`, (it.mattress||0) * cfg.carpets.mattress);
  }

  // Bundle discount: carpets with EoT only (apply to carpet lines)
  if (input.bundleCarpetsWithEoT && input.service === "endOfTenancy" && input.items) {
    const carpetTotal = (input.items.carpetRooms||0)*cfg.carpets.room
      + (input.items.stairs||0)*cfg.carpets.stairs
      + (input.items.rugs||0)*cfg.carpets.rug
      + (input.items.sofa2||0)*cfg.carpets.sofa2
      + (input.items.sofa3||0)*cfg.carpets.sofa3
      + (input.items.armchair||0)*cfg.carpets.armchair
      + (input.items.mattress||0)*cfg.carpets.mattress;
    if (carpetTotal > 0) {
      const disc = carpetTotal * cfg.modifiers.bundleCarpetWithEoTDiscountPct;
      add("Bundle discount (carpets with End of Tenancy)", -disc);
    }
  }

  // Flat surcharges
  if (input.modifiers?.stairsNoLift) add("Access surcharge (no lift, 3rd+ floor)", cfg.modifiers.stairsNoLift);
  if (input.modifiers?.outerArea) add("Outer area call-out", cfg.modifiers.outerArea);

  // Percentage surcharges (apply after flat items)
  let percentMultiplier = 1;
  if (input.modifiers?.urgent) percentMultiplier *= (1 + cfg.modifiers.urgentPct);
  if (input.modifiers?.weekend) percentMultiplier *= (1 + cfg.modifiers.weekendPct);
  subtotal *= percentMultiplier;

  // Minimums
  const min = (input.service === "commercial") ? cfg.commercialMin
              : (input.service === "carpets" ? cfg.domesticMin : cfg.domesticMin);
  if (subtotal < min) {
    add(`Minimum job value adjustment`, (min - subtotal));
  }

  // VAT
  const vat = input.vat ? subtotal * cfg.vatRate : 0;
  const total = subtotal + vat;

  // Estimate band
  const band = cfg.estimateBand;
  const estLow = total * (1 - band);
  const estHigh = total * (1 + band);

  // Crew suggestion
  const crew = Math.max(1, Math.ceil((baseHours || 0) / 4));
  const duration = baseHours ? Math.ceil(baseHours / crew) : null;

  return {
    currency: "GBP",
    lineItems,
    subtotal: +subtotal.toFixed(2),
    vat: +vat.toFixed(2),
    total: +total.toFixed(2),
    estimateRange: { low: +estLow.toFixed(2), high: +estHigh.toFixed(2) },
    scheduling: { baseHours: baseHours ? +baseHours.toFixed(1) : null, crew, durationHours: duration },
    notes: [
      "This is an instant estimate. Final price may vary after site conditions are confirmed.",
      "Deposit-Back or 48-hour Reclean Guarantee applies to End of Tenancy when the property is emptied and accessible."
    ]
  };
}