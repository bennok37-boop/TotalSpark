// North East England locations data for cleaning service coverage
export interface LocationData {
  name: string;
  slug: string;
  phone: string;
  region: string;
  nearby: string[];
  population?: string;
  description?: string;
}

export interface RegionData {
  name: string;
  slug: string;
  description: string;
  locations: LocationData[];
}

export const REGIONS: Record<string, RegionData> = {
  "tyne-and-wear": {
    name: "Tyne & Wear",
    slug: "tyne-and-wear",
    description: "Urban communities across Newcastle, Sunderland, Gateshead and surrounding areas",
    locations: [
      {
        name: "Newcastle upon Tyne",
        slug: "newcastle-upon-tyne",
        phone: "0191 743 6925", // CallRail tracking - Tyne & Wear pool
        region: "Tyne & Wear",
        nearby: ["Gateshead", "Gosforth", "Jesmond", "Heaton"]
      },
      {
        name: "Sunderland",
        slug: "sunderland",
        phone: "0191 743 6925", // CallRail tracking - Tyne & Wear pool  
        region: "Tyne & Wear",
        nearby: ["Washington", "Houghton-le-Spring", "Seaham", "South Shields"]
      },
      {
        name: "Gateshead",
        slug: "gateshead",
        phone: "0191 345 6789",
        region: "Tyne & Wear",
        nearby: ["Newcastle upon Tyne", "Blaydon-on-Tyne", "Felling", "Birtley"]
      },
      {
        name: "South Shields",
        slug: "south-shields",
        phone: "0191 456 7890",
        region: "Tyne & Wear",
        nearby: ["North Shields", "Jarrow", "Hebburn", "Tynemouth"]
      },
      {
        name: "Washington",
        slug: "washington",
        phone: "0191 567 8901",
        region: "Tyne & Wear",
        nearby: ["Sunderland", "Houghton-le-Spring", "Chester-le-Street", "Birtley"]
      },
      {
        name: "North Shields",
        slug: "north-shields",
        phone: "0191 678 9012",
        region: "Tyne & Wear",
        nearby: ["Tynemouth", "Whitley Bay", "Wallsend", "South Shields"]
      },
      {
        name: "Tynemouth",
        slug: "tynemouth",
        phone: "0191 789 0123",
        region: "Tyne & Wear",
        nearby: ["North Shields", "Whitley Bay", "South Shields", "Wallsend"]
      },
      {
        name: "Whitley Bay",
        slug: "whitley-bay",
        phone: "0191 890 1234",
        region: "Tyne & Wear",
        nearby: ["Tynemouth", "North Shields", "Blyth", "Cramlington"]
      },
      {
        name: "Wallsend",
        slug: "wallsend",
        phone: "0191 901 2345",
        region: "Tyne & Wear",
        nearby: ["North Shields", "Tynemouth", "Longbenton", "Killingworth"]
      },
      {
        name: "Jarrow",
        slug: "jarrow",
        phone: "0191 012 3456",
        region: "Tyne & Wear",
        nearby: ["South Shields", "Hebburn", "Gateshead", "Felling"]
      },
      {
        name: "Hebburn",
        slug: "hebburn",
        phone: "0191 123 4567",
        region: "Tyne & Wear",
        nearby: ["Jarrow", "South Shields", "Gateshead", "Felling"]
      },
      {
        name: "Houghton-le-Spring",
        slug: "houghton-le-spring",
        phone: "0191 234 5678",
        region: "Tyne & Wear",
        nearby: ["Sunderland", "Washington", "Chester-le-Street", "Seaham"]
      },
      {
        name: "Boldon",
        slug: "boldon",
        phone: "0191 345 6789",
        region: "Tyne & Wear",
        nearby: ["South Shields", "Sunderland", "Washington", "Jarrow"]
      },
      {
        name: "Ryhope",
        slug: "ryhope",
        phone: "0191 456 7890",
        region: "Tyne & Wear",
        nearby: ["Sunderland", "Seaham", "Houghton-le-Spring", "Boldon"]
      },
      {
        name: "Killingworth",
        slug: "killingworth",
        phone: "0191 567 8901",
        region: "Tyne & Wear",
        nearby: ["Wallsend", "Longbenton", "Cramlington", "Forest Hall"]
      },
      {
        name: "Longbenton",
        slug: "longbenton",
        phone: "0191 678 9012",
        region: "Tyne & Wear",
        nearby: ["Wallsend", "Killingworth", "Gosforth", "Forest Hall"]
      },
      {
        name: "Blaydon-on-Tyne",
        slug: "blaydon-on-tyne",
        phone: "0191 789 0123",
        region: "Tyne & Wear",
        nearby: ["Gateshead", "Ryton", "Winlaton", "Prudhoe"]
      },
      {
        name: "Felling",
        slug: "felling",
        phone: "0191 890 1234",
        region: "Tyne & Wear",
        nearby: ["Gateshead", "Jarrow", "Hebburn", "Birtley"]
      },
      {
        name: "Birtley",
        slug: "birtley",
        phone: "0191 901 2345",
        region: "Tyne & Wear",
        nearby: ["Gateshead", "Washington", "Chester-le-Street", "Felling"]
      }
    ]
  },
  "county-durham": {
    name: "County Durham",
    slug: "county-durham",
    description: "Historic market towns and former mining communities across County Durham",
    locations: [
      {
        name: "Durham",
        slug: "durham",
        phone: "0191 123 4567",
        region: "County Durham",
        nearby: ["Chester-le-Street", "Bishop Auckland", "Consett", "Seaham"]
      },
      {
        name: "Chester-le-Street",
        slug: "chester-le-street",
        phone: "0191 234 5678",
        region: "County Durham",
        nearby: ["Durham", "Washington", "Stanley", "Birtley"]
      },
      {
        name: "Consett",
        slug: "consett",
        phone: "01207 123 456",
        region: "County Durham",
        nearby: ["Stanley", "Durham", "Hexham", "Prudhoe"]
      },
      {
        name: "Stanley",
        slug: "stanley",
        phone: "01207 234 567",
        region: "County Durham",
        nearby: ["Consett", "Chester-le-Street", "Durham", "Annfield Plain"]
      },
      {
        name: "Seaham",
        slug: "seaham",
        phone: "0191 345 6789",
        region: "County Durham",
        nearby: ["Sunderland", "Houghton-le-Spring", "Peterlee", "Durham"]
      },
      {
        name: "Peterlee",
        slug: "peterlee",
        phone: "0191 456 7890",
        region: "County Durham",
        nearby: ["Seaham", "Hartlepool", "Easington", "Wingate"]
      },
      {
        name: "Newton Aycliffe",
        slug: "newton-aycliffe",
        phone: "01325 123 456",
        region: "County Durham",
        nearby: ["Bishop Auckland", "Darlington", "Shildon", "Sedgefield"]
      },
      {
        name: "Bishop Auckland",
        slug: "bishop-auckland",
        phone: "01388 123 456",
        region: "County Durham",
        nearby: ["Durham", "Newton Aycliffe", "Crook", "Spennymoor"]
      },
      {
        name: "Spennymoor",
        slug: "spennymoor",
        phone: "01388 234 567",
        region: "County Durham",
        nearby: ["Bishop Auckland", "Durham", "Ferryhill", "Crook"]
      },
      {
        name: "Ferryhill",
        slug: "ferryhill",
        phone: "01740 123 456",
        region: "County Durham",
        nearby: ["Spennymoor", "Sedgefield", "Newton Aycliffe", "Chilton"]
      },
      {
        name: "Shildon",
        slug: "shildon",
        phone: "01388 345 678",
        region: "County Durham",
        nearby: ["Newton Aycliffe", "Bishop Auckland", "Darlington", "Heighington"]
      },
      {
        name: "Crook",
        slug: "crook",
        phone: "01388 456 789",
        region: "County Durham",
        nearby: ["Bishop Auckland", "Spennymoor", "Willington", "Tow Law"]
      },
      {
        name: "Barnard Castle",
        slug: "barnard-castle",
        phone: "01833 123 456",
        region: "County Durham",
        nearby: ["Bishop Auckland", "Darlington", "Richmond", "Middleton-in-Teesdale"]
      },
      {
        name: "Sedgefield",
        slug: "sedgefield",
        phone: "01740 234 567",
        region: "County Durham",
        nearby: ["Newton Aycliffe", "Ferryhill", "Stockton-on-Tees", "Trimdon"]
      },
      {
        name: "Horden",
        slug: "horden",
        phone: "0191 567 8901",
        region: "County Durham",
        nearby: ["Peterlee", "Easington", "Blackhall Colliery", "Shotton Colliery"]
      },
      {
        name: "Easington",
        slug: "easington",
        phone: "0191 678 9012",
        region: "County Durham",
        nearby: ["Peterlee", "Horden", "Seaham", "Shotton Colliery"]
      },
      {
        name: "Trimdon",
        slug: "trimdon",
        phone: "01740 345 678",
        region: "County Durham",
        nearby: ["Sedgefield", "Ferryhill", "Wingate", "Trimdon Station"]
      },
      {
        name: "Shotton Colliery",
        slug: "shotton-colliery",
        phone: "0191 789 0123",
        region: "County Durham",
        nearby: ["Horden", "Easington", "Peterlee", "Wheatley Hill"]
      },
      {
        name: "Wheatley Hill",
        slug: "wheatley-hill",
        phone: "0191 890 1234",
        region: "County Durham",
        nearby: ["Shotton Colliery", "Wingate", "Thornley", "Trimdon"]
      }
    ]
  },
  "northumberland": {
    name: "Northumberland",
    slug: "northumberland",
    description: "Coastal towns, market settlements and rural communities across England's northernmost county",
    locations: [
      {
        name: "Morpeth",
        slug: "morpeth",
        phone: "01670 123 456",
        region: "Northumberland",
        nearby: ["Ashington", "Blyth", "Cramlington", "Ponteland"]
      },
      {
        name: "Ashington",
        slug: "ashington",
        phone: "01670 234 567",
        region: "Northumberland",
        nearby: ["Blyth", "Morpeth", "Newbiggin-by-the-Sea", "Cramlington"]
      },
      {
        name: "Blyth",
        slug: "blyth",
        phone: "01670 345 678",
        region: "Northumberland",
        nearby: ["Ashington", "Cramlington", "Whitley Bay", "Newbiggin-by-the-Sea"]
      },
      {
        name: "Cramlington",
        slug: "cramlington",
        phone: "01670 456 789",
        region: "Northumberland",
        nearby: ["Blyth", "Morpeth", "Ponteland", "Killingworth"]
      },
      {
        name: "Alnwick",
        slug: "alnwick",
        phone: "01665 123 456",
        region: "Northumberland",
        nearby: ["Amble", "Rothbury", "Seahouses", "Warkworth"]
      },
      {
        name: "Berwick-upon-Tweed",
        slug: "berwick-upon-tweed",
        phone: "01289 123 456",
        region: "Northumberland",
        nearby: ["Wooler", "Coldstream", "Eyemouth", "Norham"]
      },
      {
        name: "Hexham",
        slug: "hexham",
        phone: "01434 123 456",
        region: "Northumberland",
        nearby: ["Corbridge", "Prudhoe", "Haltwhistle", "Consett"]
      },
      {
        name: "Ponteland",
        slug: "ponteland",
        phone: "01661 123 456",
        region: "Northumberland",
        nearby: ["Cramlington", "Morpeth", "Newcastle upon Tyne", "Woolsington"]
      },
      {
        name: "Prudhoe",
        slug: "prudhoe",
        phone: "01661 234 567",
        region: "Northumberland",
        nearby: ["Hexham", "Corbridge", "Ryton", "Blaydon-on-Tyne"]
      },
      {
        name: "Bedlington",
        slug: "bedlington",
        phone: "01670 567 890",
        region: "Northumberland",
        nearby: ["Ashington", "Cramlington", "Blyth", "Wansbeck"]
      },
      {
        name: "Amble",
        slug: "amble",
        phone: "01665 234 567",
        region: "Northumberland",
        nearby: ["Alnwick", "Seahouses", "Warkworth", "Coquet Island"]
      },
      {
        name: "Seahouses",
        slug: "seahouses",
        phone: "01665 345 678",
        region: "Northumberland",
        nearby: ["Alnwick", "Amble", "Bamburgh", "Farne Islands"]
      },
      {
        name: "Rothbury",
        slug: "rothbury",
        phone: "01669 123 456",
        region: "Northumberland",
        nearby: ["Alnwick", "Morpeth", "Otterburn", "Cragside"]
      },
      {
        name: "Newbiggin-by-the-Sea",
        slug: "newbiggin-by-the-sea",
        phone: "01670 678 901",
        region: "Northumberland",
        nearby: ["Ashington", "Blyth", "Woodhorn", "Lynemouth"]
      },
      {
        name: "Wooler",
        slug: "wooler",
        phone: "01668 123 456",
        region: "Northumberland",
        nearby: ["Berwick-upon-Tweed", "Alnwick", "Coldstream", "Cheviot Hills"]
      },
      {
        name: "Haltwhistle",
        slug: "haltwhistle",
        phone: "01434 234 567",
        region: "Northumberland",
        nearby: ["Hexham", "Brampton", "Greenhead", "Hadrian's Wall"]
      },
      {
        name: "Corbridge",
        slug: "corbridge",
        phone: "01434 345 678",
        region: "Northumberland",
        nearby: ["Hexham", "Prudhoe", "Riding Mill", "Ovingham"]
      }
    ]
  },
  "tees-valley": {
    name: "Tees Valley",
    slug: "tees-valley",
    description: "Industrial heritage and coastal communities from Darlington to the North Sea",
    locations: [
      {
        name: "Middlesbrough",
        slug: "middlesbrough",
        phone: "01642 123 456",
        region: "Tees Valley",
        nearby: ["Stockton-on-Tees", "Redcar", "Thornaby", "Acklam"]
      },
      {
        name: "Stockton-on-Tees",
        slug: "stockton-on-tees",
        phone: "01642 234 567",
        region: "Tees Valley",
        nearby: ["Middlesbrough", "Thornaby", "Billingham", "Yarm"]
      },
      {
        name: "Thornaby",
        slug: "thornaby",
        phone: "01642 345 678",
        region: "Tees Valley",
        nearby: ["Stockton-on-Tees", "Middlesbrough", "Yarm", "Ingleby Barwick"]
      },
      {
        name: "Ingleby Barwick",
        slug: "ingleby-barwick",
        phone: "01642 456 789",
        region: "Tees Valley",
        nearby: ["Thornaby", "Yarm", "Stockton-on-Tees", "Eaglescliffe"]
      },
      {
        name: "Yarm",
        slug: "yarm",
        phone: "01642 567 890",
        region: "Tees Valley",
        nearby: ["Stockton-on-Tees", "Ingleby Barwick", "Eaglescliffe", "Thornaby"]
      },
      {
        name: "Billingham",
        slug: "billingham",
        phone: "01642 678 901",
        region: "Tees Valley",
        nearby: ["Stockton-on-Tees", "Norton", "Wynyard", "Wolviston"]
      },
      {
        name: "Hartlepool",
        slug: "hartlepool",
        phone: "01429 123 456",
        region: "Tees Valley",
        nearby: ["Peterlee", "Billingham", "Seaton Carew", "Wingate"]
      },
      {
        name: "Darlington",
        slug: "darlington",
        phone: "01325 234 567",
        region: "Tees Valley",
        nearby: ["Newton Aycliffe", "Barnard Castle", "Richmond", "Northallerton"]
      },
      {
        name: "Redcar",
        slug: "redcar",
        phone: "01642 789 012",
        region: "Tees Valley",
        nearby: ["Middlesbrough", "Saltburn-by-the-Sea", "Marske-by-the-Sea", "Coatham"]
      },
      {
        name: "Saltburn-by-the-Sea",
        slug: "saltburn-by-the-sea",
        phone: "01287 123 456",
        region: "Tees Valley",
        nearby: ["Redcar", "Marske-by-the-Sea", "Guisborough", "Skelton-in-Cleveland"]
      },
      {
        name: "Guisborough",
        slug: "guisborough",
        phone: "01287 234 567",
        region: "Tees Valley",
        nearby: ["Saltburn-by-the-Sea", "Skelton-in-Cleveland", "Great Ayton", "Whitby"]
      },
      {
        name: "Marske-by-the-Sea",
        slug: "marske-by-the-sea",
        phone: "01642 890 123",
        region: "Tees Valley",
        nearby: ["Redcar", "Saltburn-by-the-Sea", "New Marske", "Brotton"]
      },
      {
        name: "Norton",
        slug: "norton",
        phone: "01642 901 234",
        region: "Tees Valley",
        nearby: ["Stockton-on-Tees", "Billingham", "Wynyard", "Wolviston"]
      },
      {
        name: "Eaglescliffe",
        slug: "eaglescliffe",
        phone: "01642 012 345",
        region: "Tees Valley",
        nearby: ["Yarm", "Ingleby Barwick", "Stockton-on-Tees", "Thornaby"]
      },
      {
        name: "Eston",
        slug: "eston",
        phone: "01642 123 456",
        region: "Tees Valley",
        nearby: ["Middlesbrough", "Redcar", "Grangetown", "Normanby"]
      },
      {
        name: "Grangetown",
        slug: "grangetown",
        phone: "01642 234 567",
        region: "Tees Valley",
        nearby: ["Middlesbrough", "Redcar", "Eston", "South Bank"]
      },
      {
        name: "Loftus",
        slug: "loftus",
        phone: "01287 345 678",
        region: "Tees Valley",
        nearby: ["Saltburn-by-the-Sea", "Easington", "Skinningrove", "Brotton"]
      },
      {
        name: "Skelton-in-Cleveland",
        slug: "skelton-in-cleveland",
        phone: "01287 456 789",
        region: "Tees Valley",
        nearby: ["Guisborough", "Saltburn-by-the-Sea", "Brotton", "New Skelton"]
      }
    ]
  }
};

// Helper function to get all locations as a flat array
export const getAllLocations = (): LocationData[] => {
  return Object.values(REGIONS).flatMap(region => region.locations);
};

// Helper function to get location by slug
export const getLocationBySlug = (slug: string): LocationData | undefined => {
  return getAllLocations().find(location => location.slug === slug);
};

// Helper function to get locations by region
export const getLocationsByRegion = (regionSlug: string): LocationData[] => {
  const region = REGIONS[regionSlug];
  return region ? region.locations : [];
};

// Search function for locations
export const searchLocations = (query: string): LocationData[] => {
  const lowercaseQuery = query.toLowerCase();
  return getAllLocations().filter(location => 
    location.name.toLowerCase().includes(lowercaseQuery) ||
    location.slug.toLowerCase().includes(lowercaseQuery)
  );
};