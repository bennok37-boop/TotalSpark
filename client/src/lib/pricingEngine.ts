// Standardized pricing engine for quote calculations
// Based on specification - integrates with React components

export interface PricingConfig {
  estimateBand: number;
  depositUrl: string;
  calendarUrl: string;
  domesticMin: number;
  commercialMin: number;
  vat: number;
  eot: Record<string, { price: number; hours: number }>;
  deep: Record<string, { price: number; hours: number }>;
  propertyTypeFactor: Record<string, number>;
  conditionFactor: Record<string, number>;
  extrasPct: Record<string, number>;
  addons: Record<string, number>;
  modifiers: Record<string, number>;
  commercial: {
    rate: number;
    minHours: number;
    m2ph: Record<string, number>;
    afterBuildersConsumables: number;
  };
  carpets: Record<string, number>;
}

export interface QuoteInput {
  service: string;
  property_type?: string;
  condition?: string;
  bedrooms?: string;
  bathrooms?: number;
  toilets?: number;
  living_rooms?: number;
  second_kitchen?: boolean;
  internal_stairs?: boolean;
  furnished?: boolean;
  occupied?: boolean;
  hmo_rooms?: number;
  waste_bags?: number;
  add_oven?: boolean;
  add_fridge?: boolean;
  add_cabinets?: boolean;
  add_limescale?: boolean;
  add_carpet?: boolean;
  add_upholstery?: boolean;
  windows_count?: number;
  urgent?: boolean;
  weekend?: boolean;
  above_2nd_no_lift?: boolean;
  address_full?: string;
  postcode?: string;
  notes?: string;
  commercial_type?: string;
  area_m2?: number;
  rooms_count?: number;
  cu?: {
    carpet_rooms?: number;
    stairs?: number;
    rugs?: number;
    sofa2?: number;
    sofa3?: number;
    armchairs?: number;
    mattresses?: number;
  };
}

export interface LineItem {
  label: string;
  amount: number;
}

export interface QuoteResult {
  lineItems: LineItem[];
  subtotal: number;
  total: number;
  low: number;
  high: number;
  crew: number;
  duration: number | null;
}

export interface SavedQuote {
  id: string;
  createdAt: string;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  address: string;
  postcode: string;
  serviceData: QuoteInput;
  estimate: {
    low: number;
    high: number;
    subtotal: number;
    crew: number;
    duration: number | null;
  };
  resumeUrl: string;
}

// Pricing configuration from specification
export const pricingConfig: PricingConfig = {
  estimateBand: 0.10, // ±10%
  depositUrl: "#", // GHL link later
  calendarUrl: "#", // GHL calendar later
  domesticMin: 80,
  commercialMin: 120,
  vat: 0, // handle VAT later in GHL if needed
  eot: {
    studio: { price: 100, hours: 3 },
    1: { price: 120, hours: 4 },
    2: { price: 160, hours: 6 },
    3: { price: 220, hours: 8 },
    4: { price: 280, hours: 10 },
    "5plus": { price: 340, hours: 12 }
  },
  deep: {
    studio: { price: 100, hours: 3 },
    1: { price: 100, hours: 4 },
    2: { price: 150, hours: 6 },
    3: { price: 200, hours: 8 },
    4: { price: 260, hours: 10 },
    "5plus": { price: 320, hours: 12 }
  },
  propertyTypeFactor: {
    flat: 1.0,
    terraced: 1.05,
    semi: 1.10,
    detached: 1.20,
    maisonette: 1.15,
    townhouse: 1.15
  },
  conditionFactor: {
    light: 0.9,
    standard: 1.0,
    heavy: 1.2,
    veryheavy: 1.4
  },
  extrasPct: {
    extraBath: 0.05,
    extraBathCap: 0.20,
    secondKitchen: 0.10,
    stairs: 0.05,
    furnished: 0.05,
    occupied: 0.10
  },
  addons: {
    oven: 35,
    fridge: 20,
    cabinets: 20,
    limescale: 15,
    windowsPer: 3,
    windowsMin: 15
  },
  modifiers: {
    urgent: 0.20,
    weekend: 0.10,
    stairsNoLift: 10,
    outerArea: 10,
    bundleCarpetWithEoT: 0.10
  },
  commercial: {
    rate: 20,
    minHours: 2,
    m2ph: {
      office: 60,
      retail: 55,
      education: 50,
      healthcare: 45,
      hospitality: 50,
      afterbuilders: 30
    },
    afterBuildersConsumables: 0.20
  },
  carpets: {
    room: 25,
    stairs: 30,
    rug: 30,
    sofa2: 40,
    sofa3: 55,
    armchair: 20,
    mattress: 35
  }
};

// Core pricing computation function
export function computeQuote(input: QuoteInput): QuoteResult {
  const cfg = pricingConfig;
  let subtotal = 0;
  let hours = 0;
  const lineItems: LineItem[] = [];

  const add = (label: string, amt: number) => {
    if (Math.abs(amt) > 0.0001) {
      lineItems.push({ label, amount: +amt.toFixed(2) });
      subtotal += amt;
    }
  };

  // DOMESTIC (End of Tenancy / Deep)
  if (["End of Tenancy Cleaning", "Deep Cleaning"].includes(input.service)) {
    const table = input.service === "End of Tenancy Cleaning" ? cfg.eot : cfg.deep;
    const key = input.bedrooms === "studio" ? "studio" : 
                (Number(input.bedrooms) >= 5 ? "5plus" : String(input.bedrooms || 1));
    const base = table[key];
    
    // Scale by property type & condition & structure
    const pt = cfg.propertyTypeFactor[(input.property_type || "flat").toLowerCase()] || 1;
    const cond = cfg.conditionFactor[(input.condition || "standard").toLowerCase()] || 1;
    const baths = Math.max(1, Number(input.bathrooms || 1));
    const bathPct = Math.min(cfg.extrasPct.extraBathCap, (baths - 1) * cfg.extrasPct.extraBath);
    
    let mult = pt * cond * (1 + bathPct);
    if (input.second_kitchen) mult *= (1 + cfg.extrasPct.secondKitchen);
    if (input.internal_stairs) mult *= (1 + cfg.extrasPct.stairs);
    if (input.furnished) mult *= (1 + cfg.extrasPct.furnished);
    if (input.occupied) mult *= (1 + cfg.extrasPct.occupied);

    const basePrice = base.price * mult;
    const baseHours = base.hours * mult;
    add(`${input.service} (${key} beds)`, basePrice);
    hours += baseHours;

    if (input.add_oven) add("Oven deep clean", cfg.addons.oven);
    if (input.add_fridge) add("Fridge/Freezer", cfg.addons.fridge);
    if (input.add_cabinets) add("Inside cabinets", cfg.addons.cabinets);
    if (input.add_limescale) add("Limescale pack", cfg.addons.limescale);
    if (Number(input.windows_count) > 0) {
      add(`Interior windows x${input.windows_count}`, 
          Math.max(cfg.addons.windowsMin, (input.windows_count || 0) * cfg.addons.windowsPer));
    }
  }

  // COMMERCIAL / OFFICE
  if (input.service === "Commercial/Office Cleaning") {
    const cat = (input.commercial_type || "office").toLowerCase();
    const m2ph = cfg.commercial.m2ph[cat] || cfg.commercial.m2ph.office;
    let hrs = Math.max(cfg.commercial.minHours, 
                      (Number(input.area_m2 || 0) > 0 ? 
                       (input.area_m2 || 0) / m2ph : 
                       (input.rooms_count || 0) * 0.75));
    
    // Condition factor
    const cond = cfg.conditionFactor[(input.condition || "standard").toLowerCase()] || 1;
    hrs *= cond;
    hours += hrs;
    const base = hrs * cfg.commercial.rate;
    add(`Commercial – ${cat} (${hrs.toFixed(1)} hrs @ £${cfg.commercial.rate}/hr)`, base);
    
    if (cat === "afterbuilders") {
      add("After builders consumables", base * cfg.commercial.afterBuildersConsumables);
    }
  }

  // CARPET & UPHOLSTERY (standalone)
  if (input.service === "Carpet & Upholstery Cleaning") {
    const c = cfg.carpets;
    const it = input.cu || {};
    if (it.carpet_rooms) add(`Carpet rooms x${it.carpet_rooms}`, it.carpet_rooms * c.room);
    if (it.stairs) add(`Stairs & landing x${it.stairs}`, it.stairs * c.stairs);
    if (it.rugs) add(`Rugs x${it.rugs}`, it.rugs * c.rug);
    if (it.sofa2) add(`2-seater sofas x${it.sofa2}`, it.sofa2 * c.sofa2);
    if (it.sofa3) add(`3-seater sofas x${it.sofa3}`, it.sofa3 * c.sofa3);
    if (it.armchairs) add(`Armchairs x${it.armchairs}`, it.armchairs * c.armchair);
    if (it.mattresses) add(`Mattresses x${it.mattresses}`, it.mattresses * c.mattress);
  }

  // Surcharges
  if (input.urgent) subtotal *= (1 + cfg.modifiers.urgent);
  if (input.weekend) subtotal *= (1 + cfg.modifiers.weekend);
  if (input.above_2nd_no_lift) add("Access surcharge (no lift, 3rd+)", cfg.modifiers.stairsNoLift);

  // Minimums
  const min = (input.service === "Commercial/Office Cleaning") ? cfg.commercialMin :
              (input.service === "Carpet & Upholstery Cleaning") ? cfg.domesticMin : cfg.domesticMin;
  if (subtotal < min) {
    add("Minimum job value adjustment", (min - subtotal));
    subtotal = min;
  }

  // Suggest crew/time (4 cleaner-hours per cleaner)
  const crew = Math.max(1, Math.ceil((hours || 0) / 4));
  const duration = hours ? Math.ceil(hours / crew) : null;

  const total = subtotal; // VAT omitted here (handled in invoicing if needed)
  const band = cfg.estimateBand;
  
  return {
    lineItems,
    subtotal: +subtotal.toFixed(2),
    total: +total.toFixed(2),
    low: +(total * (1 - band)).toFixed(2),
    high: +(total * (1 + band)).toFixed(2),
    crew,
    duration
  };
}

// Helper to format money
export const formatMoney = (n: number): string => "£" + n.toFixed(2);