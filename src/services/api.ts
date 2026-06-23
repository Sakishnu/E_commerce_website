import { Product, Review, Order } from "../types"

// Base Mock Products
const MOCK_BASE_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "AeroPulse Active Noise-Cancelling Headphones",
    description: "Experience acoustic perfection with hybrid active noise cancellation, smart ambient awareness, and up to 40 hours of high-fidelity audio playback on a single charge.",
    price: 299.99,
    discountPrice: 249.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80"],
    rating: 4.8,
    reviewsCount: 148,
    category: "electronics",
    subcategory: "accessories",
    stock: 25,
    tags: ["audio", "wireless", "premium", "anc"],
    specs: {
      "Driver Size": "40 mm Dynamic",
      "Battery Life": "Up to 40 hours",
      "Warranty": "2 Years"
    }
  },
  {
    id: "prod-2",
    name: "Apex Chrono Smartwatch V2",
    description: "A premium smartwatch blending classic style with advanced fitness tracking, GPS, heart rate monitor, sleep tracking, and a stunning AMOLED screen.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&h=600&q=80",
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&h=600&q=80"],
    rating: 4.5,
    reviewsCount: 92,
    category: "electronics",
    subcategory: "smart-devices",
    stock: 12,
    tags: ["wearable", "fitness", "smartwatch"],
    specs: {
      "Display": "1.43\" AMOLED Always-On",
      "Battery Life": "Up to 10 days"
    }
  }
]

// Templates for programmatic product generation
const SUBCATEGORY_TEMPLATES: Record<string, {
  names: string[]
  description: string
  priceRange: [number, number]
  tags: string[]
  imageKeyword: string
}> = {
  // Electronics
  "smartphones": {
    names: ["Nexus Ultra-Phone 15", "Quantum Phone X", "Zeta Lite Smartphone", "Aero Pro Mobile", "Orion Foldable Phone"],
    description: "High performance mobile device with advanced camera arrays, long lasting battery cycles, and high resolution display panels.",
    priceRange: [499.99, 1199.99],
    tags: ["mobile", "phone", "5g"],
    imageKeyword: "smartphone"
  },
  "laptops": {
    names: ["Titan Book Pro 15", "Nova Slim Laptop", "Matrix Creator Workstation", "Aero Air Notebook", "Zenith Gaming Laptop"],
    description: "High speed portable computation system equipped with multicore processors, dedicated graphic engines, and high color accuracy monitors.",
    priceRange: [699.99, 1999.99],
    tags: ["computer", "portable", "pc", "work"],
    imageKeyword: "laptop"
  },
  "accessories": {
    names: ["ProCharge 3-in-1 Dock", "Vanguard Leather Sleeve", "MultiPort Hub Adaptor", "Apex Stylus Pen", "SoundLink Wireless Receiver"],
    description: "Essential accessories engineered to expand connectivity, protection, and performance profiles.",
    priceRange: [19.99, 99.99],
    tags: ["utility", "charger", "cable", "essential"],
    imageKeyword: "charger"
  },
  "smart-devices": {
    names: ["AeroLink Smart Gateway", "Lumina Smart Bulb Pack", "Nexus Voice Hub V3", "Apex Motion Sensor", "ThermosSmart Climate Dial"],
    description: "Connected internet-of-things devices designed for automatic smart monitoring and environmental controls.",
    priceRange: [29.99, 149.99],
    tags: ["smart", "iot", "wireless", "home"],
    imageKeyword: "smartdevice"
  },
  // Fashion
  "men": {
    names: ["Tailored Slim Fit Chinos", "Classic Linen Blend Shirt", "Premium Brushed Cotton Hoodie", "Raw Selvedge Denim Jeans", "Merino Wool Crewneck Sweater"],
    description: "Premium apparel designed with modern silhouettes and breathable knit patterns for everyday durability.",
    priceRange: [39.99, 129.99],
    tags: ["apparel", "clothing", "menswear", "style"],
    imageKeyword: "men-clothing"
  },
  "women": {
    names: ["Pleated A-Line Midi Skirt", "Silk Knit Wrap Blouse", "Casual Stretch Linen Blazer", "High-Rise Wide Leg Trousers", "Bohemian Cotton Midi Dress"],
    description: "Artfully draped silhouettes crafted from sustainable linen and silk blends for clean modern finishes.",
    priceRange: [49.99, 179.99],
    tags: ["apparel", "clothing", "womenswear", "fashion"],
    imageKeyword: "women-clothing"
  },
  "kids": {
    names: ["Organic Cotton Play Suit", "Breathable Mesh Joggers", "Warm Fleece Pullover", "Patterned Cotton T-Shirt Set", "Water-Resistant Rain Jacket"],
    description: "Ultra soft clothing coordinates made from organic certified cotton and flexible seams for active movement.",
    priceRange: [14.99, 49.99],
    tags: ["children", "baby", "play", "organic"],
    imageKeyword: "kids-clothing"
  },
  "footwear": {
    names: ["Apex Court Leather Sneakers", "Vanguard Knit Slip-on Trainers", "Urban Explorer Waterproof Boots", "Classic Comfort Suede Loafers", "FlexiFit Active Running Shoes"],
    description: "Ergonomic insoles, non-marking rubber outsoles, and breathable uppers for premium walking comfort.",
    priceRange: [59.99, 199.99],
    tags: ["shoes", "sneakers", "boots", "comfort"],
    imageKeyword: "shoes"
  },
  // Home & Living
  "furniture": {
    names: ["ErgoFlow Mesh Office Chair", "Walnut Finish Dining Table", "Matte Steel Minimal Desk", "Upholstered 3-Seater Sofa", "Modular Pine Bookshelf Unit"],
    description: "Minimalist structured furniture built with load-tested frames and sustainable wood finishes.",
    priceRange: [149.99, 799.99],
    tags: ["furniture", "decor", "office", "wood"],
    imageKeyword: "furniture"
  },
  "home-decor": {
    names: ["Minimalist Ceramic Vase Set", "Woven Cotton Area Rug", "Geometric Metal Wall Art", "Linen Accent Pillow Cover", "Scented Soy Wax Candle Trio"],
    description: "Curated objects and textile coordinates that bring subtle textures and cozy notes to living zones.",
    priceRange: [19.99, 119.99],
    tags: ["decor", "home", "design", "cozy"],
    imageKeyword: "decor"
  },
  "kitchen": {
    names: ["Cast Iron Signature Dutch Oven", "Precision Steel Chef Knife Set", "Stackable Glass Food Containers", "Matte Ceramic Tea Infuser Mug", "Electric Gooseneck Water Kettle"],
    description: "High-density heat retention and ergonomic tools tailored for precise cooking and brewing experiences.",
    priceRange: [29.99, 249.99],
    tags: ["kitchen", "cooking", "ceramic", "coffee"],
    imageKeyword: "kitchen"
  },
  "lighting": {
    names: ["Minimalist Arc Desk Lamp", "Glass Orb Pendant Ceiling Light", "Adjustable Metal Floor Lamp", "Wireless Bedside Charger Lamp", "Motion Sensor Under-Cabinet LED Bar"],
    description: "Flicker-free color temperatures and architectural steel bodies that distribute ambient workspace light.",
    priceRange: [39.99, 179.99],
    tags: ["lighting", "decor", "minimalist", "lamp"],
    imageKeyword: "lamp"
  },
  // Sports & Fitness
  "gym-equipment": {
    names: ["Rapid Dial Adjustable Dumbbells V2", "Multi-Angle Foldable Bench", "Heavy Duty Suspension Trainer", "Apex Power Resistance Bands", "Non-Slip Push-up Stands"],
    description: "Space-saving strength systems built from high-tensile steel alloys and textured slip resistant handles.",
    priceRange: [19.99, 299.99],
    tags: ["workout", "weights", "strength", "fitness"],
    imageKeyword: "gym"
  },
  "sports-gear": {
    names: ["Vanguard Premium Tennis Racket", "Official Size Composite Leather Basketball", "Apex Carbon Fiber Badminton Set", "Pro Grip Leather Baseball Glove", "FIB A-Grade Soccer Ball"],
    description: "Calibrated balance lines and synthetic compound cases engineered for tournament durability.",
    priceRange: [14.99, 149.99],
    tags: ["sports", "game", "outdoors", "gear"],
    imageKeyword: "sports"
  },
  "outdoor-activities": {
    names: ["Ultralight Double Camp Hammock", "Waterproof 4-Person Pop-up Tent", "Apex Carbon Hiking Poles Set", "Tactical Multi-Pocket Daypack", "Rechargeable 500LM Headlamp"],
    description: "Compact packing weights and water-resistant materials engineered for mountain hikes and camping routes.",
    priceRange: [24.99, 199.99],
    tags: ["camping", "hiking", "outdoors", "nature"],
    imageKeyword: "hiking"
  },
  "fitness-accessories": {
    names: ["Double-Wall Insulated Thermo Bottle", "Apex Bluetooth Body Weight Scale", "Breathable Sweat-Wicking Wristbands", "Fast-Speed Weighted Jump Rope", "Rapid Cooling Microfiber Towel Set"],
    description: "Hydration utilities and training trackers that support performance goals during high heart-rate sets.",
    priceRange: [9.99, 59.99],
    tags: ["workout", "accessories", "utility", "health"],
    imageKeyword: "fitness"
  },
  // Beauty & Personal Care
  "skincare": {
    names: ["Hydrating Hyaluronic Acid Serum", "Mineral Sunscreen SPF 50+", "Soothing Green Tea Facial Cleanser", "Ceramide Whipped Moisturizer", "Apex Exfoliating Clay Mask"],
    description: "Dermatologist approved plant-based serums formulated to restore hydration, barrier resilience, and glow.",
    priceRange: [14.99, 59.99],
    tags: ["skincare", "beauty", "cosmetics", "face"],
    imageKeyword: "skincare"
  },
  "hair-care": {
    names: ["Strengthening Argan Oil Shampoo", "Deep Repair Keratin Mask", "Heat Protection Blow-Dry Spray", "Apex Botanical Scalp Treatment", "Anti-Frizz Silk Serum"],
    description: "Sulfate free scalp cleansing formulas that lock in cellular amino-acids and shield locks from heat damage.",
    priceRange: [12.99, 49.99],
    tags: ["hair", "beauty", "shampoo", "care"],
    imageKeyword: "haircare"
  },
  "makeup": {
    names: ["Matte Finish Longwear Foundation", "Apex Velvet Liquid Lipstick", "Waterproof Volumizing Mascara", "Precision Fine Gel Eyeliner", "Soft Glow Highlighter Palette"],
    description: "Highly pigmented cosmetics that blend effortlessly and resist smudge for up to 16 hours of display.",
    priceRange: [9.99, 39.99],
    tags: ["makeup", "beauty", "cosmetics", "color"],
    imageKeyword: "makeup"
  },
  "grooming": {
    names: ["Apex 5-Blade Safety Razor", "Dual Heat Beard Straightening Comb", "Botanical Sandalwood Shaving Cream", "Nourishing Cedarwood Beard Oil", "Premium Multi-Grooming Kit"],
    description: "High-grade steel blades and organic moisturizing emollients built for accurate shape trimming.",
    priceRange: [8.99, 69.99],
    tags: ["grooming", "shaving", "beard", "care"],
    imageKeyword: "grooming"
  },
  // Books & Stationery
  "books": {
    names: ["The Creative Mind by Sterling", "Silent Echoes Novel", "Code Patterns & Abstractions", "Journey Beyond the Stars", "Artistic Form & Minimalism"],
    description: "Printed hardcover editions containing creative theories, technical templates, or immersive narratives.",
    priceRange: [9.99, 29.99],
    tags: ["book", "reading", "paperback", "hardcover"],
    imageKeyword: "book"
  },
  "notebooks": {
    names: ["Apex Grid Bullet Journal", "Aero Hardcover Sketchbook", "Pocket Pocket Notepad Set", "Washed Linen Writer Notebook", "Thread-Bound Dotted Journal"],
    description: "Premium acid-free thick ivory paper blocks that lay flat for smooth ink writing and sketch lines.",
    priceRange: [7.99, 24.99],
    tags: ["notebook", "paper", "stationery", "journal"],
    imageKeyword: "notebook"
  },
  "office-supplies": {
    names: ["Fine-Point Brass Gel Pen", "Heavy Duty Steel Stapler", "Matte Acrylic Desk Organizer", "Leather Desk Pad Blotter", "Stainless Scissors & Ruler Set"],
    description: "Architectural metal desk coordinates that streamline papers and organize writing surfaces.",
    priceRange: [12.99, 59.99],
    tags: ["stationery", "desk", "office", "supplies"],
    imageKeyword: "desk-organizer"
  },
  "study-materials": {
    names: ["Aero Flashcards Learning Kit", "Pre-Printed Sticky Notes Pack", "Highlighter Chisel Tip Pen Set", "Mathematics Drafting Set", "Document Expansion Folder Desk Box"],
    description: "Anatomical drafting tools and high-contrast marker colors that summarize notes for visual indexing.",
    priceRange: [4.99, 19.99],
    tags: ["study", "stationery", "school", "learning"],
    imageKeyword: "stationery"
  },
  // Toys & Games
  "educational-toys": {
    names: ["Robotics Coding Starter Kit", "Solar Power Engine Building Block", "Apex Wooden Anatomy Puzzle", "Interactive Science Chemistry Flasks", "Magnetic Geometry Shape Blocks"],
    description: "Kinetic building parts designed to build primary spatial reasoning, mathematical curves, and coding logic.",
    priceRange: [24.99, 129.99],
    tags: ["educational", "toys", "children", "learning"],
    imageKeyword: "educational-toy"
  },
  "board-games": {
    names: ["Apex Tactics Strategy Board", "Nexus Mystery Mansion Card Game", "Double Deck Word Puzzle Game", "Classic Wood Chess Board Set", "Cooperative Forest Search Game"],
    description: "High quality card tokens, wooden coordinates, and rulebooks tailored for family table nights.",
    priceRange: [19.99, 59.99],
    tags: ["games", "boardgame", "play", "party"],
    imageKeyword: "boardgame"
  },
  "kids-toys": {
    names: ["Plush Bear Eco Cotton Doll", "Wooden Track Mini Train Set", "Apex Bubble Spray Launcher", "Silicone Animal Bath Blocks", "Fleece Sleeping Nest Doll"],
    description: "Organic dye threads and splinter-free wood coordinates made for kids playtime.",
    priceRange: [9.99, 39.99],
    tags: ["toys", "kids", "play", "doll"],
    imageKeyword: "toy"
  },
  "puzzles": {
    names: ["Apex 1000-Piece Forest Calm Jigsaw", "Spherical Mechanical 3D Gear Puzzle", "Mind Bender Steel Ring Clues", "High Contrast Art Print Puzzle", "Magnetic Rubik Speed Cube"],
    description: "High-density interlocking cardboard segments and smooth rotation hinges that challenge focus filters.",
    priceRange: [7.99, 34.99],
    tags: ["puzzles", "games", "focus", "jigsaw"],
    imageKeyword: "puzzle"
  },
  // Automotive
  "car-accessories": {
    names: ["Apex 4K Dash Camera Dual", "Aero QI Smart Mount Charger", "Heavy Duty Trunk Cargo Organizer", "Premium Memory Foam Seat Cushion", "Compact 150PSI Digital Air Pump"],
    description: "High resolution optical lenses and secure phone suction brackets that augment dash configurations.",
    priceRange: [19.99, 149.99],
    tags: ["car", "automotive", "accessories", "utility"],
    imageKeyword: "caraccessories"
  },
  "bike-accessories": {
    names: ["High-Security Steel U-Lock Set", "Aero Silicone Phone Handlebar Mount", "Apex 500LM LED Bike Lights", "Waterproof Bike Frame Saddle Bag", "Rapid Dual Action Mini Hand Pump"],
    description: "Durable bracket straps and hardened locks built to secure bikes during city commutes.",
    priceRange: [11.99, 49.99],
    tags: ["bike", "cycling", "automotive", "accessories"],
    imageKeyword: "bicycle"
  },
  "helmets": {
    names: ["Apex Carbon Full-Face Helmet", "Vanguard Aero Road Helmet", "Nexus Urban Commuter Skate Helmet", "Pro-Shield Visor MIPS Helmet", "Kids Safety Gear Helmet Combo"],
    description: "Polycarbonate MIPS shells and dense EPS layers designed to deflect structural impact safely.",
    priceRange: [29.99, 199.99],
    tags: ["helmet", "safety", "cycling", "moto"],
    imageKeyword: "helmet"
  },
  "vehicle-care": {
    names: ["Signature Carnauba Liquid Wax Kit", "Aero Microfiber Drying Towels Pack", "High-Foam PH-Neutral Car Wash Shampoo", "Clay Bar Paint Decontamination Set", "Interior Protective Matte Finish Spray"],
    description: "Ultra fine detailing spray compounds and wash mitts built to restore glossy protective coats without swirls.",
    priceRange: [14.99, 45.99],
    tags: ["carcare", "detailing", "wax", "clean"],
    imageKeyword: "carwash"
  },
  // Health & Wellness
  "fitness-equipment": {
    names: ["FlexiCore Eco TPE Yoga Mat V2", "Rapid Dial 40lbs Dumbbell Solo", "Home Workout Doorway Pullup Bar", "Apex Smart Activity Band V3", "Steel Wire Speed Jump Rope V2"],
    description: "Portable training setups engineered to calibrate movement arcs inside home workout spaces.",
    priceRange: [14.99, 189.99],
    tags: ["fitness", "health", "workout", "equipment"],
    imageKeyword: "fitness-gear"
  },
  "yoga-accessories": {
    names: ["High-Density EVA Foam Yoga Blocks", "Cotton Yoga Stretching Strap Set", "Nonslip Microfiber Yoga Towel", "Apex Cork Yoga Roller Board", "Aromatic Aromatherapy Mist Diffuser"],
    description: "Ergonomic alignment blocks and straps that aid joint flexibility during extension holds.",
    priceRange: [9.99, 39.99],
    tags: ["yoga", "accessories", "pilates", "wellness"],
    imageKeyword: "yoga"
  },
  "health-devices": {
    names: ["Apex Blood Pressure Cuff Smart", "Instant Read Infrared Thermometer", "Fingertip Pulse Oximeter Tracker", "Nexus Dual-Channel TENS Therapy Unit", "Smart Digital Basal Thermometer"],
    description: "Precision sensor components certified to trace vital wellness indices and record daily logs.",
    priceRange: [19.99, 79.99],
    tags: ["health", "devices", "monitoring", "wellness"],
    imageKeyword: "healthdevice"
  },
  "nutrition-products": {
    names: ["Organic Plant-Based Protein Vanilla", "Daily Essential Multivitamin Capsules", "Omega-3 Triple Strength Fish Oil", "Apex Hydration Electrolyte Mix", "Botanical Adaptogen Ashwagandha Gummies"],
    description: "Premium micronutrients and botanical compounds formulated to support immune systems and daily cell recovery.",
    priceRange: [14.99, 49.99],
    tags: ["nutrition", "protein", "vitamins", "supplement"],
    imageKeyword: "supplement"
  }
}

// Pre-selected high-quality Unsplash image URLs indexed by keywords
const keywordImages: Record<string, string[]> = {
  smartphone: [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1565849906461-0e440904a216?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1573148195900-7845dcb9b127?auto=format&fit=crop&w=600&h=600&q=80"
  ],
  laptop: [
    "https://images.unsplash.com/photo-1496181130204-7552cc145cd5?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&h=600&q=80"
  ],
  charger: [
    "https://images.unsplash.com/photo-1622445262465-2481c4574875?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1615813951163-f40f0c4f3d2e?auto=format&fit=crop&w=600&h=600&q=80"
  ],
  smartdevice: [
    "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?auto=format&fit=crop&w=600&h=600&q=80"
  ],
  "men-clothing": [
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&h=600&q=80"
  ],
  "women-clothing": [
    "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&h=600&q=80"
  ],
  "kids-clothing": [
    "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=600&h=600&q=80"
  ],
  shoes: [
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=600&h=600&q=80"
  ],
  furniture: [
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&h=600&q=80"
  ],
  decor: [
    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=600&h=600&q=80"
  ],
  kitchen: [
    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=600&h=600&q=80"
  ],
  lamp: [
    "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1534224039826-c7a0dea0e66a?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=600&h=600&q=80"
  ],
  gym: [
    "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&h=600&q=80"
  ],
  sports: [
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600&h=600&q=80"
  ],
  hiking: [
    "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1533240332313-0db49b439ad3?auto=format&fit=crop&w=600&h=600&q=80"
  ],
  fitness: [
    "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?auto=format&fit=crop&w=600&h=600&q=80"
  ],
  skincare: [
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=600&h=600&q=80"
  ],
  haircare: [
    "https://images.unsplash.com/photo-1527799851257-3593d843806e?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&h=600&q=80"
  ],
  makeup: [
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&h=600&q=80"
  ],
  grooming: [
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&w=600&h=600&q=80"
  ],
  book: [
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&h=600&q=80"
  ],
  notebook: [
    "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&h=600&q=80"
  ],
  "desk-organizer": [
    "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=600&h=600&q=80"
  ],
  stationery: [
    "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&h=600&q=80"
  ],
  "educational-toy": [
    "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=600&h=600&q=80"
  ],
  boardgame: [
    "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=600&h=600&q=80"
  ],
  toy: [
    "https://images.unsplash.com/photo-1559251606-c623743a6d76?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&h=600&q=80"
  ],
  puzzle: [
    "https://images.unsplash.com/photo-1585250004683-154a37651c5e?auto=format&fit=crop&w=600&h=600&q=80"
  ],
  caraccessories: [
    "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&h=600&q=80"
  ],
  bicycle: [
    "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=600&h=600&q=80"
  ],
  helmet: [
    "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=600&h=600&q=80"
  ],
  carwash: [
    "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=600&h=600&q=80"
  ],
  "fitness-gear": [
    "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&h=600&q=80"
  ],
  yoga: [
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&h=600&q=80"
  ],
  healthdevice: [
    "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&h=600&q=80"
  ],
  supplement: [
    "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&h=600&q=80"
  ]
}

// Generate the full database of products
const generateProducts = (): Product[] => {
  const generated: Product[] = [...MOCK_BASE_PRODUCTS]
  let prodCounter = 13
  
  // Find which template maps to which main category
  const subcategoryToCategoryMap: Record<string, string> = {
    // Electronics
    smartphones: "electronics",
    laptops: "electronics",
    accessories: "electronics",
    "smart-devices": "electronics",
    // Fashion
    men: "fashion",
    women: "fashion",
    kids: "fashion",
    footwear: "fashion",
    // Home & Living
    furniture: "home-living",
    "home-decor": "home-living",
    kitchen: "home-living",
    lighting: "home-living",
    // Sports & Fitness
    "gym-equipment": "sports-fitness",
    "sports-gear": "sports-fitness",
    "outdoor-activities": "sports-fitness",
    "fitness-accessories": "sports-fitness",
    // Beauty & Personal Care
    skincare: "beauty-personal-care",
    "hair-care": "beauty-personal-care",
    makeup: "beauty-personal-care",
    grooming: "beauty-personal-care",
    // Books & Stationery
    books: "books-stationery",
    notebooks: "books-stationery",
    "office-supplies": "books-stationery",
    "study-materials": "books-stationery",
    // Toys & Games
    "educational-toys": "toys-games",
    "board-games": "toys-games",
    "kids-toys": "toys-games",
    puzzles: "toys-games",
    // Automotive
    "car-accessories": "automotive",
    "bike-accessories": "automotive",
    helmets: "automotive",
    "vehicle-care": "automotive",
    // Health & Wellness
    "fitness-equipment": "health-wellness",
    "yoga-accessories": "health-wellness",
    "health-devices": "health-wellness",
    "nutrition-products": "health-wellness"
  }

  // Iterate over each subcategory template and create 5 realistic items
  Object.entries(SUBCATEGORY_TEMPLATES).forEach(([subSlug, template]) => {
    const mainCategory = subcategoryToCategoryMap[subSlug]
    if (!mainCategory) return
    
    const imagesList = keywordImages[template.imageKeyword] || [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80"
    ]

    template.names.forEach((pName, index) => {
      const price = parseFloat(
        (template.priceRange[0] + Math.random() * (template.priceRange[1] - template.priceRange[0])).toFixed(2)
      )
      // 30% chance of a discount
      const hasDiscount = Math.random() < 0.3
      const discountPrice = hasDiscount ? parseFloat((price * 0.85).toFixed(2)) : undefined

      const rating = parseFloat((4.0 + Math.random() * 1.0).toFixed(1))
      const reviewsCount = Math.floor(5 + Math.random() * 200)
      const stock = Math.floor(Math.random() * 40)
      const isFeatured = index === 0 && Math.random() < 0.5
      const isTrending = index === 1 && Math.random() < 0.5
      
      const img = imagesList[index % imagesList.length]

      generated.push({
        id: `gen-${subSlug}-${index + 1}`,
        name: pName,
        description: template.description,
        price,
        discountPrice,
        image: img,
        images: [img],
        rating,
        reviewsCount,
        category: mainCategory, // e.g. "electronics"
        subcategory: subSlug, // e.g. "smartphones"
        stock,
        tags: [...template.tags, subSlug],
        isFeatured,
        isTrending,
        specs: {
          "Standard": "Calibrated Performance Grade",
          "Condition": "Brand New Sealed",
          "Shipping": "Secure Box Shipping",
          "Availability": stock > 0 ? "In Stock" : "Out of Stock"
        }
      })
    })
  })

  return generated
}

export const MOCK_PRODUCTS: Product[] = generateProducts()

export const MOCK_CATEGORIES = [
  { slug: "electronics", name: "Electronics", count: 20, icon: "Smartphone", bg: "bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400" },
  { slug: "fashion", name: "Fashion & Apparel", count: 20, icon: "Shirt", bg: "bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400" },
  { slug: "home-living", name: "Home & Living", count: 20, icon: "Home", bg: "bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400" },
  { slug: "sports-fitness", name: "Sports & Fitness", count: 20, icon: "Dumbbell", bg: "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" },
  { slug: "beauty-personal-care", name: "Beauty & Personal Care", count: 20, icon: "Sparkles", bg: "bg-pink-500/10 hover:bg-pink-500/20 text-pink-600 dark:text-pink-400" },
  { slug: "books-stationery", name: "Books & Stationery", count: 20, icon: "BookOpen", bg: "bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400" },
  { slug: "toys-games", name: "Toys & Games", count: 20, icon: "Gamepad", bg: "bg-teal-500/10 hover:bg-teal-500/20 text-teal-600 dark:text-teal-400" },
  { slug: "automotive", name: "Automotive", count: 20, icon: "Car", bg: "bg-slate-500/10 hover:bg-slate-500/20 text-slate-600 dark:text-slate-400" },
  { slug: "health-wellness", name: "Health & Wellness", count: 20, icon: "HeartPulse", bg: "bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400" },
]

export const MOCK_REVIEWS: Record<string, Review[]> = {
  "prod-1": [
    { id: "rev-1", userName: "Sarah K.", rating: 5, comment: "Absolutely incredible sound. The active noise cancelling blocks out my noisy office entirely. Worth every penny!", date: "2026-05-12", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80" },
    { id: "rev-2", userName: "Michael M.", rating: 4, comment: "Sound quality is top-notch, battery is huge. Just slightly tight on my head after about 4 hours of wearing.", date: "2026-05-28", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80" }
  ],
  "prod-2": [
    { id: "rev-3", userName: "Emily R.", rating: 5, comment: "I use the GPS tracker for run paths and it connects super fast. Bright screen even in high afternoon sun.", date: "2026-06-02" }
  ]
}

// Simulating API Latency helper
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const api = {
  getProducts: async (filters?: {
    category?: string
    subcategory?: string
    search?: string
    minPrice?: number
    maxPrice?: number
    rating?: number
    sortBy?: string
    page?: number
    limit?: number
  }) => {
    await wait(200) // simulated delay
    let products = [...MOCK_PRODUCTS]

    if (filters?.category) {
      products = products.filter((p) => p.category === filters.category)
    }

    if (filters?.subcategory) {
      products = products.filter((p) => p.subcategory === filters.subcategory)
    }

    if (filters?.search) {
      const q = filters.search.toLowerCase()
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
    }

    if (filters?.minPrice !== undefined) {
      products = products.filter((p) => (p.discountPrice || p.price) >= filters.minPrice!)
    }

    if (filters?.maxPrice !== undefined) {
      products = products.filter((p) => (p.discountPrice || p.price) <= filters.maxPrice!)
    }

    if (filters?.rating !== undefined) {
      products = products.filter((p) => p.rating >= filters.rating!)
    }

    if (filters?.sortBy) {
      if (filters.sortBy === "price-low-high") {
        products.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price))
      } else if (filters.sortBy === "price-high-low") {
        products.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price))
      } else if (filters.sortBy === "rating") {
        products.sort((a, b) => b.rating - a.rating)
      }
    }

    const page = filters?.page || 1
    const limit = filters?.limit || 6
    const total = products.length
    const startIndex = (page - 1) * limit
    const paginatedProducts = products.slice(startIndex, startIndex + limit)

    return {
      products: paginatedProducts,
      total,
      hasMore: startIndex + limit < total,
    }
  },

  getProductById: async (id: string): Promise<Product | null> => {
    await wait(100)
    const product = MOCK_PRODUCTS.find((p) => p.id === id)
    return product || null
  },

  getReviews: async (productId: string): Promise<Review[]> => {
    await wait(100)
    return MOCK_REVIEWS[productId] || [
      { id: "rev-d1", userName: "Jane Doe", rating: 5, comment: "Absolutely love this item! Exceeded all expectations.", date: "2026-06-15" }
    ]
  },

  getCategories: async () => {
    await wait(100)
    return MOCK_CATEGORIES
  },

  submitOrder: async (orderData: Omit<Order, "id" | "date" | "status" | "trackingNumber">): Promise<Order> => {
    await wait(500)
    return {
      ...orderData,
      id: "ord-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      date: new Date().toISOString().split("T")[0],
      status: "processing",
      trackingNumber: "TRK" + Math.floor(1000000000 + Math.random() * 9000000000),
    }
  },
}
