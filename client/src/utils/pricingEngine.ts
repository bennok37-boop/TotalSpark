// Instant Quote Calculator - Enhanced Pricing Engine  
// Property type, condition, and commercial category factors

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
  propertyTypeFactor: {
    flat: 1.00, 
    terraced: 1.05, 
    semi: 1.10, 
    detached: 1.20, 
    maisonette: 1.15, 
    townhouse: 1.15
  },
  conditionFactor: { 
    light: 0.90, 
    standard: 1.00, 
    heavy: 1.20, 
    veryheavy: 1.40 
  },
  domesticExtras: { 
    extraBathroomPct: 0.05, 
    extraBathroomCapPct: 0.20, 
    secondKitchenPct: 0.10, 
    internalStairsPct: 0.05, 
    furnishedPct: 0.05, 
    occupiedPct: 0.10, 
    hmoRoomPackEach: 10, 
    wasteBag: 10 
  },
  commercial: {
    ratePerHour: 20,
    categories: {
      office: { m2PerHour: 60 },
      retail: { m2PerHour: 55 },
      education: { m2PerHour: 50 },
      healthcare: { m2PerHour: 45 },
      hospitality: { m2PerHour: 50 },
      afterbuilders: { m2PerHour: 30, consumablesPct: 0.20 }
    } as Record<string, { m2PerHour: number; consumablesPct?: number }>,
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
    windowsMin: 15,
    carpetClean: 80,
    upholsteryClean: 60
  },
  modifiers: {
    urgentPct: 0.20,
    weekendPct: 0.10,
    stairsNoLift: 10,
    bundleCarpetWithEoTDiscountPct: 0.10
  }
};

export interface QuoteInput {
  service: "endOfTenancy" | "deep" | "commercial" | "carpets";
  bedrooms?: "studio" | "1" | "2" | "3" | "4" | "5plus" | "5+";
  bathrooms?: number;
  toilets?: number;
  livingRooms?: number;
  
  // Enhanced domestic factors
  propertyType?: "flat" | "terraced" | "semi" | "detached" | "maisonette" | "townhouse";
  condition?: "light" | "standard" | "heavy" | "veryheavy";
  secondKitchen?: boolean;
  internalStairs?: boolean;
  furnished?: boolean;
  occupied?: boolean;
  hmoRooms?: number;
  wasteBags?: number;
  
  // Commercial enhancements
  commercialType?: "office" | "retail" | "education" | "healthcare" | "hospitality" | "afterbuilders";
  area_m2?: number; // commercial
  commercialRooms?: number; // alternative to area_m2
  commercialToilets?: number; // toilets for commercial
  
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
    carpets?: boolean;
    upholstery?: boolean;
  };
  modifiers?: {
    urgent?: boolean;
    weekend?: boolean;
    stairsNoLift?: boolean;
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
    if (Math.abs(amount) > 0.0001) { 
      lineItems.push({ label, amount: +amount.toFixed(2) }); 
      subtotal += amount; 
    }
  };

  const applyDomesticScaling = (startPrice: number, startHours: number) => {
    const pType = cfg.propertyTypeFactor[input.propertyType || "flat"] ?? 1.00;
    const cond = cfg.conditionFactor[input.condition || "standard"] ?? 1.00;

    let pct = 1.0 * pType * cond;

    // Bathrooms scaling
    const baths = Math.max(1, Number(input.bathrooms || 1));
    const extraBaths = Math.max(0, baths - 1);
    const bathPct = Math.min(cfg.domesticExtras.extraBathroomCapPct, extraBaths * cfg.domesticExtras.extraBathroomPct);
    pct *= (1 + bathPct);

    // Additional property factors
    if (input.secondKitchen) pct *= (1 + cfg.domesticExtras.secondKitchenPct);
    if (input.internalStairs) pct *= (1 + cfg.domesticExtras.internalStairsPct);
    if (input.furnished) pct *= (1 + cfg.domesticExtras.furnishedPct);
    if (input.occupied) pct *= (1 + cfg.domesticExtras.occupiedPct);

    const scaledPrice = startPrice * pct;
    const scaledHours = startHours * pct;
    return { scaledPrice, scaledHours };
  };

  // SERVICE LOGIC
  if (input.service === "endOfTenancy" || input.service === "deep") {
    const table = cfg[input.service].base;
    const key = (input.bedrooms === "5plus" || input.bedrooms === "5+") ? "5plus"
               : (input.bedrooms === "studio" ? "studio" : String(input.bedrooms || ""));
    const base = table[key as keyof typeof table];
    
    if (base) {
      // Apply domestic scaling factors
      const scaled = applyDomesticScaling(base.price, base.hours);
      add(`${input.service === "endOfTenancy" ? "End of Tenancy" : "Deep"} clean (${key === "5plus" ? "5+" : key} ${key === "studio" ? "" : "beds"})`, scaled.scaledPrice);
      baseHours = scaled.scaledHours;
    }

    // Add-ons
    if (input.addons?.oven) add("Oven deep clean", cfg.addons.oven);
    if (input.addons?.fridge) add("Fridge/Freezer clean", cfg.addons.fridgeFreezer);
    if (input.addons?.cabinets) add("Inside kitchen cabinets", cfg.addons.cabinetsInside);
    if (input.addons?.limescale) add("Bathroom limescale pack", cfg.addons.limescalePack);
    if (input.addons?.carpets) add("Carpet cleaning add-on", cfg.addons.carpetClean);
    if (input.addons?.upholstery) add("Upholstery cleaning add-on", cfg.addons.upholsteryClean);
    if (input.addons && Number(input.addons.windows) > 0) {
      const win = Math.max(cfg.addons.windowsMin, (input.addons.windows || 0) * cfg.addons.windowsPerUnit);
      add(`Interior windows x${input.addons.windows}`, win);
    }

    // HMO and waste removal
    if (Number(input.hmoRooms) > 0) add(`HMO handover pack x${input.hmoRooms}`, Number(input.hmoRooms) * cfg.domesticExtras.hmoRoomPackEach);
    if (Number(input.wasteBags) > 0) add(`Waste bag removal x${input.wasteBags}`, Number(input.wasteBags) * cfg.domesticExtras.wasteBag);

    // Bundle discount logic
    if (input.bundleCarpetsWithEoT && input.service === "endOfTenancy" && input.items) {
      const it = input.items, c = cfg.carpets;
      const carpetTotal = (it.carpetRooms||0)*c.room + (it.stairs||0)*c.stairs + (it.rugs||0)*c.rug + (it.sofa2||0)*c.sofa2 + (it.sofa3||0)*c.sofa3 + (it.armchair||0)*c.armchair + (it.mattress||0)*c.mattress;
      if (carpetTotal > 0) add("Bundle discount (carpets with End of Tenancy)", -carpetTotal * cfg.modifiers.bundleCarpetWithEoTDiscountPct);
    }

  } else if (input.service === "commercial") {
    const catKey = input.commercialType || "office";
    const cat = cfg.commercial.categories[catKey] || cfg.commercial.categories.office;
    const m2ph = cat.m2PerHour;
    
    let area = 0;
    let hours = cfg.commercial.minHours;
    
    // Apply condition multiplier
    const cond = cfg.conditionFactor[input.condition || "standard"] ?? 1.00;
    
    // Calculate area from rooms if provided, otherwise use area_m2
    if (Number(input.commercialRooms) > 0) {
      // Estimate area based on room count (average 15m² per room)
      area = Number(input.commercialRooms) * 15;
      hours = Math.max(cfg.commercial.minHours, area / m2ph);
      // Apply condition factor to hours and price calculation
      hours *= cond;
      add(`Commercial cleaning – ${catKey} (${input.commercialRooms} rooms ≈ ${area}m²)`, hours * cfg.commercial.ratePerHour);
    } else {
      area = Math.max(0, Number(input.area_m2 || 0));
      hours = Math.max(cfg.commercial.minHours, area / m2ph);
      // Apply condition factor to hours and price calculation
      hours *= cond;
      add(`Commercial cleaning – ${catKey} (${area}m² @ ${hours.toFixed(1)} hrs)`, hours * cfg.commercial.ratePerHour);
    }

    // Add toilet cleaning if specified
    if (Number(input.commercialToilets) > 0) {
      add(`Additional toilet cleaning x${input.commercialToilets}`, Number(input.commercialToilets) * 15);
    }
    
    baseHours = hours;

    // After builders consumables surcharge
    if (cat.consumablesPct) add("After builders consumables surcharge", hours * cfg.commercial.ratePerHour * cat.consumablesPct);
    
    // Add-ons for commercial services
    if (input.addons?.oven) add("Oven deep clean", cfg.addons.oven);
    if (input.addons?.fridge) add("Fridge/Freezer clean", cfg.addons.fridgeFreezer);
    if (input.addons?.cabinets) add("Inside kitchen cabinets", cfg.addons.cabinetsInside);
    if (input.addons?.limescale) add("Bathroom limescale pack", cfg.addons.limescalePack);
    if (input.addons?.carpets) add("Carpet cleaning add-on", cfg.addons.carpetClean);
    if (input.addons?.upholstery) add("Upholstery cleaning add-on", cfg.addons.upholsteryClean);
    if (input.addons && Number(input.addons.windows) > 0) {
      const win = Math.max(cfg.addons.windowsMin, (input.addons.windows || 0) * cfg.addons.windowsPerUnit);
      add(`Interior windows x${input.addons.windows}`, win);
    }

  } else if (input.service === "carpets") {
    const it = input.items || {}, c = cfg.carpets;
    add(`Carpet rooms x${it.carpetRooms||0}`, (it.carpetRooms||0) * c.room);
    add(`Stairs & landing x${it.stairs||0}`, (it.stairs||0) * c.stairs);
    add(`Rugs x${it.rugs||0}`, (it.rugs||0) * c.rug);
    add(`Sofa 2-seater x${it.sofa2||0}`, (it.sofa2||0) * c.sofa2);
    add(`Sofa 3-seater x${it.sofa3||0}`, (it.sofa3||0) * c.sofa3);
    add(`Armchairs x${it.armchair||0}`, (it.armchair||0) * c.armchair);
    add(`Mattresses x${it.mattress||0}`, (it.mattress||0) * c.mattress);
  }

  // Flat surcharges
  if (input.modifiers?.stairsNoLift) add("Access surcharge (no lift, 3rd+ floor)", cfg.modifiers.stairsNoLift);

  // Percentage surcharges
  let percentMult = 1;
  if (input.modifiers?.urgent) percentMult *= (1 + cfg.modifiers.urgentPct);
  if (input.modifiers?.weekend) percentMult *= (1 + cfg.modifiers.weekendPct);
  subtotal *= percentMult;

  // Minimums
  const min = (input.service === "commercial") ? cfg.commercialMin : cfg.domesticMin;
  if (subtotal < min) add(`Minimum job value adjustment`, (min - subtotal));

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
      "This instant estimate adjusts for property type, size, and condition. Final price confirmed after access.",
      "After builders cleans require dust-cycle passes; surcharge covers consumables and filtration.",
      "Deposit-Back / 48-hour Reclean applies to End of Tenancy when the property is emptied and accessible."
    ]
  };
}