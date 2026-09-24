import { Product, CategoryInfo } from '../types';

export const mockProducts: Product[] = [
  // ================= LAPTOPS =================
  {
    id: 'lumina-pro-x',
    name: 'PrecisionCore X1 (Lumina Pro X)',
    brand: 'Lumina Systems',
    category: 'Laptops',
    price: 1299,
    originalPrice: 1499,
    matchScore: 98,
    badge: 'BEST OVERALL',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 1420,
    summary: 'Ultra-lightweight flagship laptop featuring Apple M-series level thermal efficiency, 3.2K 120Hz OLED screen, and 18-hour continuous battery life.',
    aiReason: 'Selected as #1 recommendation due to its industry-leading energy efficiency, silent vapor-chamber cooling, and exceptional color precision for creative workflows.',
    specs: {
      'Processor': 'PrecisionCore AI 12-Core 4.2GHz',
      'Memory': '32GB LPDDR5X Ultra-Fast',
      'Storage': '1TB NVMe PCIe 4.0 SSD',
      'Display': '14.2-inch 3.2K (3072x1920) OLED 120Hz',
      'Battery Life': 'Up to 18 Hours (70Wh Battery)',
      'Weight': '1.2 kg (2.64 lbs)',
      'Ports': '2x Thunderbolt 4, 1x HDMI 2.1, 3.5mm Audio',
      'Warranty': '2 Year Comprehensive Global Warranty'
    },
    pros: [
      'Vibrant 3.2K OLED panel with 100% DCI-P3 color gamut',
      'Whisper-quiet dual vapor chamber thermal design',
      '18-hour real-world battery runtime on standard usage',
      'Haptic glass trackpad with precise gesture feedback'
    ],
    cons: [
      'Memory is soldered onto the mainboard (non-upgradable)',
      'Webcam shutter is digital rather than physical slider'
    ],
    inStock: true
  },
  {
    id: 'macbook-air-m3',
    name: 'Apple MacBook Air 15" (M3)',
    brand: 'Apple',
    category: 'Laptops',
    price: 1299,
    originalPrice: 1399,
    matchScore: 96,
    badge: 'SILENT EFFICIENCY',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 3890,
    summary: 'Ultra-thin 11.5mm fanless laptop powered by Apple M3 silicon with 18-hour battery, MagSafe 3 charging, and 500-nit Liquid Retina display.',
    aiReason: 'Ideal for students, mobile professionals, and creators seeking zero fan noise, all-day battery endurance, and top-tier build quality.',
    specs: {
      'Processor': 'Apple M3 chip (8-core CPU, 10-core GPU)',
      'Memory': '16GB Unified Memory',
      'Storage': '512GB High-Speed SSD',
      'Display': '15.3-inch Liquid Retina Display (2880x1864)',
      'Battery Life': 'Up to 18 Hours wireless web',
      'Weight': '1.51 kg (3.3 lbs)',
      'Ports': 'MagSafe 3, 2x Thunderbolt / USB 4, 3.5mm Headphone Jack'
    },
    pros: [
      '100% silent fanless cooling architecture',
      'Class-leading battery efficiency and thermal management',
      'Exceptional six-speaker sound system with Spatial Audio'
    ],
    cons: [
      'Only supports dual external monitors when laptop lid is closed',
      'Base model starts with 8GB unless upgraded'
    ],
    inStock: true
  },
  {
    id: 'zenith-ultra',
    name: 'Zenith Ultra Studio 16',
    brand: 'Zenith Tech',
    category: 'Laptops',
    price: 1450,
    originalPrice: 1699,
    matchScore: 84,
    badge: 'PERFORMANCE KING',
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.6,
    reviewCount: 890,
    summary: 'Heavyweight creative workstation with 4K Mini-LED display and dedicated RTX graphics for heavy video rendering and AI workloads.',
    aiReason: 'Top choice if raw GPU performance and maximum display brightness (1600 nits) are prioritized over portability.',
    specs: {
      'Processor': 'Intel Core i9 14900HX 24-Core',
      'Memory': '64GB DDR5 5600MHz',
      'Storage': '2TB NVMe Gen4 SSD',
      'Display': '16-inch 4K Mini-LED 120Hz (1600 nits)',
      'Battery Life': 'Up to 12 Hours (99.9Wh Battery)',
      'Weight': '1.8 kg (3.96 lbs)',
      'Ports': '2x Thunderbolt 4, 2x USB-A 3.2, SD Card Reader, HDMI 2.1',
      'Warranty': '1 Year Limited Manufacturer Warranty'
    },
    pros: [
      'Blazing fast multi-threaded performance & GPU rendering',
      'Stunning 1600-nit Mini-LED HDR display',
      'Full-size SD card slot and extensive port layout'
    ],
    cons: [
      'Heavier chassis (1.8 kg) and larger power brick',
      'Fans can get audible under sustained maximum load'
    ],
    inStock: true
  },
  {
    id: 'dell-xps-14',
    name: 'Dell XPS 14 OLED Flagship',
    brand: 'Dell',
    category: 'Laptops',
    price: 1599,
    originalPrice: 1799,
    matchScore: 91,
    badge: 'CREATOR SLIM',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.7,
    reviewCount: 1120,
    summary: 'Sleek CNC machined aluminum workstation featuring 3.2K InfinityEdge touch OLED, NVIDIA RTX 4050, and seamless capacitive touch function row.',
    aiReason: 'Recommended for video editors and software architects looking for compact power with a studio-grade OLED touch screen.',
    specs: {
      'Processor': 'Intel Core Ultra 7 155H (16-Core)',
      'Graphics': 'NVIDIA GeForce RTX 4050 6GB GDDR6',
      'Memory': '32GB LPDDR5X 7467MHz',
      'Storage': '1TB PCIe Gen4 SSD',
      'Display': '14.5" 3.2K (3200x2000) OLED Touch 120Hz',
      'Weight': '1.68 kg (3.7 lbs)'
    },
    pros: [
      'Flawless 3.2K 120Hz OLED infinity touch screen',
      'Discrete RTX graphics in a compact 14-inch footprint',
      'Premium machined aluminum and gorilla glass palm rest'
    ],
    cons: [
      'All USB-C ports (requires adapters for legacy USB-A)',
      'Touch function row has no physical tactile key travel'
    ],
    inStock: true
  },
  {
    id: 'asus-zephyrus-g14',
    name: 'ASUS ROG Zephyrus G14 OLED Gaming',
    brand: 'Asus',
    category: 'Laptops',
    price: 1599,
    originalPrice: 1749,
    matchScore: 93,
    badge: 'GAMING CHAMPION',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    reviewCount: 2310,
    summary: 'Ultra-portable 1.5kg gaming notebook with 3K 120Hz ROG Nebula OLED, AMD Ryzen 9 8945HS, and NVIDIA RTX 4070.',
    aiReason: 'The absolute best gaming laptop for travel and daily work, combining thin-and-light portability with desktop-class ray tracing.',
    specs: {
      'Processor': 'AMD Ryzen 9 8945HS (8-Core / 16-Thread with Ryzen AI)',
      'Graphics': 'NVIDIA GeForce RTX 4070 8GB GDDR6',
      'Memory': '32GB LPDDR5X 6400MHz',
      'Storage': '1TB NVMe PCIe 4.0 SSD',
      'Display': '14" 3K (2880x1800) OLED 120Hz 0.2ms G-Sync',
      'Weight': '1.5 kg (3.31 lbs)'
    },
    pros: [
      'Incredible 3K OLED gaming panel with 0.2ms response time',
      'Lightweight 1.5kg all-metal chassis with slash lighting',
      'Deep bass audio with 4-speaker acoustic array'
    ],
    cons: [
      'Soldered RAM cannot be upgraded after purchase',
      'Surface can feel warm under intense AAA gaming sessions'
    ],
    inStock: true
  },
  {
    id: 'prime-core',
    name: 'Prime Core Slim 14',
    brand: 'Prime Mobility',
    category: 'Laptops',
    price: 899,
    originalPrice: 1099,
    matchScore: 72,
    badge: 'BUDGET VALUE',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.7,
    reviewCount: 2150,
    summary: 'Featherweight 1.1kg daily laptop offering robust aluminium construction, crisp IPS screen, and exceptional value under $900.',
    aiReason: 'Recommended for budget-conscious buyers who want reliable day-to-day speed, full metal body, and long battery without paying flagship prices.',
    specs: {
      'Processor': 'AMD Ryzen 7 8840U 8-Core',
      'Memory': '16GB LPDDR5',
      'Storage': '512GB PCIe SSD',
      'Display': '14-inch 2.5K IPS 90Hz Anti-glare',
      'Battery Life': 'Up to 14 Hours (65Wh Battery)',
      'Weight': '1.1 kg (2.42 lbs)',
      'Ports': '2x USB-C, 1x USB-A, 3.5mm Headphone Jack',
      'Warranty': '1 Year Standard Warranty'
    },
    pros: [
      'Unbeatable price-to-performance ratio',
      'Featherweight 1.1 kg magnesium-aluminum body',
      'Matte display handles reflective office lighting well'
    ],
    cons: [
      'IPS panel peak brightness tops out at 400 nits',
      'No HDMI port (requires USB-C dongle for external monitors)'
    ],
    inStock: true
  },
  {
    id: 'lenovo-thinkpad-x1',
    name: 'Lenovo ThinkPad X1 Carbon Gen 12',
    brand: 'Lenovo',
    category: 'Laptops',
    price: 1420,
    originalPrice: 1650,
    matchScore: 92,
    badge: 'BUSINESS ELITE',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    reviewCount: 1670,
    summary: 'Legendary business ultrabook with aerospace-grade carbon fiber lid, iconic tactile keyboard, TrackPoint, and MIL-SPEC durability.',
    aiReason: 'The benchmark for corporate productivity, keyboard typing ergonomics, and enterprise-grade privacy security.',
    specs: {
      'Processor': 'Intel Core Ultra 7 165U vPro',
      'Memory': '32GB LPDDR5X',
      'Storage': '1TB NVMe Opal Gen4 SSD',
      'Display': '14" 2.8K (2880x1800) OLED 120Hz Anti-Reflection',
      'Weight': '1.09 kg (2.42 lbs)',
      'Ports': '2x Thunderbolt 4, 2x USB-A 3.2, HDMI 2.1, Nano SIM'
    },
    pros: [
      'Best-in-class tactile keyboard and TrackPoint system',
      'Featherlight 1.09kg weight with MIL-STD 810H durability',
      'Comprehensive port selection including legacy USB-A & full HDMI'
    ],
    cons: [
      'Integrated graphics not suited for heavy 3D rendering',
      'OLED option slightly reduces battery longevity'
    ],
    inStock: true
  },

  // ================= HEADPHONES & EARBUDS =================
  {
    id: 'sony-wh1000xm4',
    name: 'Sony WH-1000XM4 Wireless Headphones',
    brand: 'Sony',
    category: 'Headphones',
    price: 198,
    originalPrice: 348,
    matchScore: 98,
    badge: 'BEST OVERALL',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    reviewCount: 5430,
    summary: 'Industry standard active noise cancelling over-ear headphones with multipoint Bluetooth, speak-to-chat, and 30-hour battery life.',
    aiReason: 'Matches your request for long flights and ANC under $200. Delivers unmatched cabin engine noise isolation and plush ear cushions for 8+ hour wearing sessions.',
    specs: {
      'Driver Size': '40mm Dome Type (CCAW Voice Coil)',
      'Battery Life': '30 Hours (ANC On) / 38 Hours (ANC Off)',
      'Fast Charging': '10 min charge = 5 hours playback',
      'Weight': '254 g',
      'Bluetooth Version': '5.0 with LDAC, AAC, SBC',
      'Noise Cancelling': 'Dual Noise Sensor Technology HD QN1',
      'Microphones': '5 Mics for Beamforming Voice Calls'
    },
    pros: [
      'Top-tier active noise isolation for airplane cabin noise',
      'Collapsible design with durable hard travel case',
      'Seamless multi-point device switching'
    ],
    cons: [
      'Not rated for water resistance (IPX0)',
      'Touch controls take a small learning curve'
    ],
    inStock: true
  },
  {
    id: 'bose-qc45',
    name: 'Bose QuietComfort 45 Headphones',
    brand: 'Bose',
    category: 'Headphones',
    price: 189,
    originalPrice: 329,
    matchScore: 94,
    badge: 'BUDGET PICK',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.7,
    reviewCount: 3820,
    summary: 'Iconic Bose comfort featuring physical button controls, Aware mode ambient pass-through, and effortless lightweight clamping force.',
    aiReason: 'The highest comfort rating in its class. Perfect if touch gesture controls annoy you and you prefer classic physical buttons.',
    specs: {
      'Driver Tech': 'TriPort Acoustic Headphone Architecture',
      'Battery Life': '24 Hours continuous listening',
      'Weight': '240 g',
      'Bluetooth': '5.1 up to 30 feet range',
      'Charging': 'USB-C quick charge'
    },
    pros: [
      'Extremely plush earcups with zero crown pressure',
      'Simple, intuitive tactile button controls',
      'Instant Bluetooth pairing & stable connectivity'
    ],
    cons: [
      'Equalizer customization is basic compared to Sony app',
      'ANC cannot be completely turned off (Quiet/Aware modes)'
    ],
    inStock: true
  },
  {
    id: 'sony-wf1000xm5',
    name: 'Sony WF-1000XM5 True Wireless Earbuds',
    brand: 'Sony',
    category: 'Headphones',
    price: 279,
    originalPrice: 299,
    matchScore: 95,
    badge: 'COMPACT ANC',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    reviewCount: 3100,
    summary: 'Flagship in-ear noise cancellation with Dynamic Driver X, dual feedback microphones, AI bone conduction sensors, and LDAC Hi-Res audio.',
    aiReason: 'Pocket-sized noise isolation king that rivals full-size over-ear cans in ambient reduction and vocal clarity.',
    specs: {
      'Driver Size': '8.4mm Dynamic Driver X',
      'Battery Life': '8 Hours (Earbuds) + 16 Hours (Case)',
      'Water Resistance': 'IPX4 Splash Resistant',
      'Weight': '5.9 g per earbud',
      'Bluetooth': '5.3 with LDAC, LC3, AAC'
    },
    pros: [
      'Incredible active noise cancellation in tiny earbud format',
      'High-resolution LDAC audio with rich bass response',
      'Comfortable memory foam ear tips in 4 sizes'
    ],
    cons: [
      'Glossy finish can be slippery to extract from case',
      'Microphone clarity in windy environments is average'
    ],
    inStock: true
  },
  {
    id: 'airpods-pro-2',
    name: 'Apple AirPods Pro 2 (USB-C)',
    brand: 'Apple',
    category: 'Headphones',
    price: 249,
    originalPrice: 249,
    matchScore: 97,
    badge: 'ALL-ROUNDER',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 6540,
    summary: 'Apple H2 chip, adaptive audio, personalized spatial audio with head tracking, and MagSafe case with Precision Finding speaker.',
    aiReason: 'The absolute standard for iPhone and Mac users wanting seamless device handoff, conversational awareness, and class-leading transparency.',
    specs: {
      'Chipset': 'Apple H2 headphone chip + U1/H2 in case',
      'Battery Life': '6 Hours (ANC On) / 30 Hours total with Case',
      'Water Resistance': 'IP54 Dust & Water Resistant',
      'Charging': 'USB-C, MagSafe, Apple Watch Charger, Qi'
    },
    pros: [
      'Unsurpassed transparency mode and conversation awareness',
      'Case includes speaker and lanyard loop for easy locating',
      'Swipe volume control directly on earbud stems'
    ],
    cons: [
      'Advanced features limited on Android/Windows devices',
      'Non-replaceable batteries'
    ],
    inStock: true
  },
  {
    id: 'sennheiser-m4',
    name: 'Sennheiser Momentum 4 Wireless',
    brand: 'Sennheiser',
    category: 'Headphones',
    price: 229,
    originalPrice: 379,
    matchScore: 89,
    badge: 'BATTERY KING',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.6,
    reviewCount: 1940,
    summary: 'Audiophile grade 42mm transducer acoustic system packed with a staggering 60-hour battery life on a single charge.',
    aiReason: 'Recommended if high fidelity sound staging and ultimate battery longevity (60 hours) are higher priority than compact folding size.',
    specs: {
      'Driver Size': '42mm Audiophile Transducer System',
      'Battery Life': '60 Hours (ANC Enabled)',
      'Weight': '293 g',
      'Bluetooth Codecs': 'aptX Adaptive, aptX, AAC, SBC',
      'Equalizer': 'Built-in 5-Band EQ'
    },
    pros: [
      'Massive 60-hour real battery life',
      'Rich, warm audiophile soundstage with aptX Adaptive support',
      'Effective customizable wind noise reduction'
    ],
    cons: [
      'Flat folding headband does not fold inward',
      'Slightly heavier earcups (293g)'
    ],
    inStock: true
  },
  {
    id: 'apple-airpods-max',
    name: 'Apple AirPods Max',
    brand: 'Apple',
    category: 'Headphones',
    price: 479,
    originalPrice: 549,
    matchScore: 85,
    badge: 'PREMIUM BUILD',
    image: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    reviewCount: 4210,
    summary: 'Custom dynamic driver over-ear headphones with custom acoustic mesh canopy, H1 chip spatial audio, and premium anodized aluminum earcups.',
    aiReason: 'Luxury design and best-in-class transparency mode if you operate inside the Apple ecosystem and budget allows.',
    specs: {
      'Chipset': 'Apple H1 chip (in each ear cup)',
      'Battery Life': '20 Hours with ANC / Spatial Audio',
      'Weight': '384.8 g',
      'Sensors': 'Optical, Position, Case detect, Accelerometer, Gyroscope'
    },
    pros: [
      'Unrivaled acoustic transparency mode',
      'Dynamic head tracking spatial audio',
      'Luxurious breathable knit mesh canopy'
    ],
    cons: [
      'Heavier weight at 384g',
      'Smart case provides minimal physical protection'
    ],
    inStock: true
  },
  {
    id: 'soundcore-space-one',
    name: 'Anker Soundcore Space One ANC',
    brand: 'Anker',
    category: 'Headphones',
    price: 99,
    originalPrice: 129,
    matchScore: 88,
    badge: 'BEST UNDER $100',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.5,
    reviewCount: 2890,
    summary: 'Budget powerhouse with 2x stronger voice reduction, 40mm dynamic drivers, LDAC Hi-Res wireless, and 55-hour battery life.',
    aiReason: 'Top budget pick under $100 offering exceptional ANC performance, long battery life, and comfortable lightweight ear cushions.',
    specs: {
      'Driver Size': '40mm Customized Dynamic Drivers',
      'Battery Life': '40 Hours (ANC On) / 55 Hours (ANC Off)',
      'Bluetooth': '5.3 with LDAC support',
      'Weight': '259 g'
    },
    pros: [
      'Superb active noise cancellation for under $100',
      '55-hour battery runtime with 5-minute fast charge',
      'Customizable Soundcore app with HearID sound profile'
    ],
    cons: [
      'Plastics feel lighter and less premium than $300 flagships',
      'Microphone pickup can be soft in noisy rooms'
    ],
    inStock: true
  },

  // ================= SMARTPHONES =================
  {
    id: 'samsung-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra AI',
    brand: 'Samsung',
    category: 'Smartphones',
    price: 1199,
    originalPrice: 1299,
    matchScore: 96,
    badge: 'CAMERA KING',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    reviewCount: 3120,
    summary: 'Flagship smartphone featuring built-in Galaxy AI features, 200MP Quad Telephoto camera, titanium frame, and bright Dynamic AMOLED 2X display.',
    aiReason: 'Top recommendation for photography and productivity with 100x zoom capability and S-Pen integration.',
    specs: {
      'Processor': 'Snapdragon 8 Gen 3 for Galaxy',
      'Display': '6.8" Quad HD+ Dynamic AMOLED 2X (2600 nits)',
      'Camera': '200MP Main + 50MP Periscope (5x) + 10MP (3x) + 12MP Ultra-wide',
      'Battery': '5000 mAh (45W Fast Charging)',
      'Storage': '256GB / 512GB / 1TB'
    },
    pros: [
      'Versatile 200MP quad camera setup with incredible optical zoom',
      'Integrated S-Pen stylus for quick note taking and sketching',
      'Bright 2600 nits anti-reflective Gorilla Armor glass'
    ],
    cons: [
      'Large form factor may feel bulky for single-handed use',
      'Premium price point'
    ],
    inStock: true
  },
  {
    id: 'apple-iphone-15-pro',
    name: 'Apple iPhone 15 Pro Max',
    brand: 'Apple',
    category: 'Smartphones',
    price: 1199,
    originalPrice: 1249,
    matchScore: 94,
    badge: 'TOP PERFORMANCE',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 4890,
    summary: 'Aerospace-grade titanium design with A17 Pro chip, customizable Action button, USB-C 10Gbps speeds, and 5x optical telephoto lens.',
    aiReason: 'Best choice for seamless iOS ecosystem integration, ProRes video recording, and console-quality gaming.',
    specs: {
      'Processor': 'A17 Pro (6-core CPU, 6-core GPU)',
      'Display': '6.7" Super Retina XDR OLED ProMotion 120Hz',
      'Camera': '48MP Main + 12MP 5x Telephoto + 12MP Ultra Wide',
      'Battery': 'Up to 29 hours video playback',
      'Weight': '221 g'
    },
    pros: [
      'Lightweight titanium frame with contoured edges',
      'Console level gaming support (Death Stranding, Resident Evil)',
      'Industry leading 4K 60fps ProRes video recording'
    ],
    cons: [
      'Charging speeds capped at 27W',
      'No physical SIM tray in US models'
    ],
    inStock: true
  },
  {
    id: 'pixel-8-pro',
    name: 'Google Pixel 8 Pro AI Flagship',
    brand: 'Google',
    category: 'Smartphones',
    price: 899,
    originalPrice: 999,
    matchScore: 93,
    badge: 'AI MAGIC',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.7,
    reviewCount: 2780,
    summary: 'Google Tensor G3 chip with 7 years of OS updates, Super Actua 2400-nit display, Best Take, Magic Audio Eraser, and built-in temperature sensor.',
    aiReason: 'Pure Android experience with computational photography wizardry and long-term 7-year software support commitment.',
    specs: {
      'Processor': 'Google Tensor G3 with Titan M2 security',
      'Display': '6.7" Super Actua LTPO OLED 1-120Hz (2400 nits)',
      'Camera': '50MP Main + 48MP 5x Telephoto + 48MP Ultra-wide with Macro Focus',
      'Battery': '5050 mAh (30W Fast Charging / Qi Wireless)',
      'Updates': '7 Years of Full OS, Security & Feature Drops'
    },
    pros: [
      'Industry-leading computational photography and Best Take',
      '7 years of guaranteed software and security updates',
      'Extremely bright 2400-nit Super Actua display'
    ],
    cons: [
      'Tensor G3 benchmark scores trail Snapdragon in raw graphics compute',
      'Charging speed takes over 75 minutes for full top-up'
    ],
    inStock: true
  },
  {
    id: 'oneplus-12',
    name: 'OnePlus 12 5G Hasselblad',
    brand: 'OnePlus',
    category: 'Smartphones',
    price: 799,
    originalPrice: 899,
    matchScore: 92,
    badge: 'VALUE FLAGSHIP',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    reviewCount: 1840,
    summary: 'Blistering fast 80W wired / 50W wireless charging, Snapdragon 8 Gen 3, 5400mAh dual-cell battery, 4500-nit 2K ProXDR display, and 4th Gen Hasselblad camera.',
    aiReason: 'Unbeatable flagship hardware specs per dollar spent. Recharges from 0 to 100% in under 30 minutes.',
    specs: {
      'Processor': 'Snapdragon 8 Gen 3',
      'Memory': '16GB LPDDR5X',
      'Display': '6.82" 2K 120Hz ProXDR LTPO (4500 nits peak)',
      'Battery': '5400 mAh (80W SUPERVOOC + 50W AIRVOOC)',
      'Camera': '50MP LYT-808 + 64MP 3x Periscope + 48MP Ultra-wide'
    },
    pros: [
      'Lightning-fast 80W charging fills battery in 30 mins',
      'Massive 5400 mAh battery delivers 2 full days of normal use',
      'Spectacular 4500-nit peak brightness screen'
    ],
    cons: [
      'Curved glass edges may have occasional palm touches',
      'IP65 water resistance rating rather than IP68'
    ],
    inStock: true
  },

  // ================= WEARABLES =================
  {
    id: 'garmin-epix-gen2',
    name: 'Garmin Epix Pro Gen 2 GPS Watch',
    brand: 'Garmin',
    category: 'Wearables',
    price: 799,
    originalPrice: 899,
    matchScore: 97,
    badge: 'OUTDOOR KING',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 1280,
    summary: 'Ultimate multisport GPS smartwatch with crystal clear AMOLED display, built-in LED flashlight, and up to 16 days of smartwatch battery life.',
    aiReason: 'Unmatched GPS tracking accuracy, topo maps, endurance metrics, and multi-band satellite technology for athletes and outdoor explorers.',
    specs: {
      'Display': '1.3" Sapphire AMOLED Touchscreen',
      'Battery Life': '16 Days Smartwatch / 42 Hours GPS Mode',
      'Sensors': 'Multi-Band GPS, Elevate V5 Heart Rate, Pulse Ox, Barometer',
      'Water Rating': '10 ATM (100 meters)',
      'Weight': '70 g'
    },
    pros: [
      '16-day real battery life with bright AMOLED display',
      'Built-in multi-mode LED flashlight for night trail runs',
      'Comprehensive topo maps and offline navigation'
    ],
    cons: [
      'Higher price point compared to standard smartwatches',
      'Thicker casing'
    ],
    inStock: true
  },
  {
    id: 'apple-watch-ultra-2',
    name: 'Apple Watch Ultra 2 Titanium',
    brand: 'Apple',
    category: 'Wearables',
    price: 799,
    originalPrice: 799,
    matchScore: 95,
    badge: 'RUGGED SMARTWATCH',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 3410,
    summary: '49mm aerospace titanium case, 3000-nit display, S9 SiP with Double Tap gesture, precision dual-frequency GPS, and up to 72 hours in Low Power Mode.',
    aiReason: 'The ultimate smartwatch for iPhone users doing scuba diving, trail running, mountaineering, or demanding maximum screen brightness.',
    specs: {
      'Case': '49mm Aerospace-Grade Titanium',
      'Display': 'Always-On Retina OLED (3000 nits)',
      'Battery Life': 'Up to 36 hours standard / 72 hours Low Power Mode',
      'Water Resistance': '100m water resistant / EN13319 dive certified (40m)',
      'Sensors': 'ECG, Blood Oxygen, Depth Gauge, Water Temp, Dual GPS'
    },
    pros: [
      'Blindingly bright 3000-nit sapphire screen',
      'Full recreational dive computer certification (Oceanic+ app)',
      'Customizable high-visibility Action button'
    ],
    cons: [
      'Large 49mm case may overpower smaller wrists',
      'Strictly requires an iPhone to pair and setup'
    ],
    inStock: true
  },
  {
    id: 'garmin-forerunner-965',
    name: 'Garmin Forerunner 965 AMOLED',
    brand: 'Garmin',
    category: 'Wearables',
    price: 599,
    originalPrice: 599,
    matchScore: 94,
    badge: 'RUNNER CHOICE',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    reviewCount: 940,
    summary: 'Premium lightweight titanium bezel running watch with 1.4" AMOLED touchscreen, full color onboard mapping, Training Readiness score, and 23-day battery.',
    aiReason: 'The gold standard for marathoners and triathletes seeking lightweight wrist feel with deep training load metrics.',
    specs: {
      'Display': '1.4" AMOLED Touchscreen (454x454)',
      'Battery Life': 'Up to 23 Days smartwatch / 31 Hours GPS',
      'Weight': '53 g',
      'Metrics': 'VO2 Max, HRV Status, Stamina Insights, Race Predictor'
    },
    pros: [
      'Lightweight 53g construction barely felt during marathons',
      'Vivid 1.4-inch AMOLED display with full topographic maps',
      'Over 3 weeks of battery life on a single charge'
    ],
    cons: [
      'No built-in microphone for wrist phone calls',
      'Garmin Pay bank support is more limited than Apple Pay'
    ],
    inStock: true
  },
  {
    id: 'samsung-galaxy-watch-6',
    name: 'Samsung Galaxy Watch 6 Classic',
    brand: 'Samsung',
    category: 'Wearables',
    price: 349,
    originalPrice: 399,
    matchScore: 90,
    badge: 'ROTATING BEZEL',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.6,
    reviewCount: 1980,
    summary: 'Classic stainless steel design with tactile rotating bezel, advanced sleep coaching, BIA body composition analysis, and Wear OS powered by Samsung.',
    aiReason: 'The best smartwatch companion for Android and Samsung Galaxy users with traditional timepiece aesthetics and physical rotating ring navigation.',
    specs: {
      'Case': 'Stainless Steel 47mm / 43mm',
      'Display': '1.5" Super AMOLED Sapphire Crystal (2000 nits)',
      'Battery': 'Up to 40 Hours (WPC wireless fast charging)',
      'Sensors': 'BioActive Sensor (HR, ECG, BIA), Temp sensor, Barometer'
    },
    pros: [
      'Satisfying physical rotating bezel navigation',
      'Comprehensive body composition and sleep tracking',
      'Crisp sapphire crystal glass protection'
    ],
    cons: [
      '1 to 1.5 day battery life requires daily recharging',
      'Certain health features (ECG/BP) require Samsung phone'
    ],
    inStock: true
  },

  // ================= CAMERAS =================
  {
    id: 'sony-a7iv-camera',
    name: 'Sony Alpha 7 IV Full-Frame Camera',
    brand: 'Sony',
    category: 'Cameras',
    price: 2398,
    originalPrice: 2498,
    matchScore: 95,
    badge: 'PRO CHOICE',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 1670,
    summary: 'Hybrid 33MP full-frame mirrorless camera with real-time eye autofocus, 4K 60p video, 15+ stops dynamic range, and 5-axis body stabilization.',
    aiReason: 'Ideal for photo/video creators demanding hybrid flexibility, industry-leading autofocus tracking, and rich color profiles.',
    specs: {
      'Sensor': '33MP Full-Frame Exmor R CMOS',
      'Video': '4K 60p 10-bit 4:2:2 / FHD 120p',
      'Autofocus': '759 Phase-Detection Points with AI Real-Time Eye AF',
      'Stabilization': '5-Axis Optical In-Body Image Stabilization (5.5 stops)',
      'Screen': '3.0" Vari-Angle Touchscreen LCD'
    },
    pros: [
      'Outstanding 33MP detail with 15+ stops dynamic range',
      'Real-time eye AF tracks humans, animals, and birds flawlessly',
      'Fully articulating flip-out touch screen'
    ],
    cons: [
      '4K 60p video incurs a 1.5x Super35 crop',
      'No charger included in box'
    ],
    inStock: true
  },
  {
    id: 'fujifilm-xt5',
    name: 'Fujifilm X-T5 Mirrorless Camera',
    brand: 'Fujifilm',
    category: 'Cameras',
    price: 1699,
    originalPrice: 1699,
    matchScore: 94,
    badge: 'FILM SIMULATION',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 1420,
    summary: 'Classic retro photography camera with 40.2MP X-Trans CMOS 5 HR sensor, 19 film simulation modes, 7-stop IBIS, and analog dial controls.',
    aiReason: 'Unmatched color rendering straight out of camera without post-processing, beloved by street, travel, and documentary photographers.',
    specs: {
      'Sensor': '40.2MP APS-C X-Trans CMOS 5 HR',
      'Video': '6.2K 30p / 4K 60p 10-bit 4:2:2',
      'Stabilization': '7.0-Stop 5-Axis In-Body Image Stabilization',
      'Shutter Speed': 'Up to 1/180,000 sec electronic shutter',
      'Controls': 'Dedicated physical ISO, Shutter Speed, and Exposure dials'
    },
    pros: [
      'Legendary Fujifilm Film Simulations produce stunning JPEGs',
      'Tactile analog physical dials provide pure photography joy',
      'Impressive 40.2MP high-resolution sensor with 7-stop IBIS'
    ],
    cons: [
      'Three-way tilting screen is photo-oriented (does not flip for vlogging)',
      'Continuous buffer fills quickly at max burst rates'
    ],
    inStock: true
  },
  {
    id: 'dji-osmo-pocket-3',
    name: 'DJI Osmo Pocket 3 Creator Combo',
    brand: 'DJI',
    category: 'Cameras',
    price: 519,
    originalPrice: 669,
    matchScore: 96,
    badge: 'CREATOR VLOG',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 2950,
    summary: 'Pocket-sized gimbal camera with 1-inch CMOS sensor, rotatable 2-inch OLED touchscreen, 4K/120fps recording, and 3-axis mechanical stabilization.',
    aiReason: 'The absolute best vlogging and travel video tool on the market. Produces silky smooth cinematic footage in low light in a palm-sized package.',
    specs: {
      'Sensor': '1-Inch CMOS Sensor with D-Log M 10-Bit color',
      'Stabilization': '3-Axis Mechanical Gimbal Hardware',
      'Display': '2-inch Rotatable OLED Touchscreen',
      'Battery Life': '166 Minutes (80% charge in 16 mins)',
      'Audio': 'Omnidirectional stereo recording + DJI Mic 2 support'
    },
    pros: [
      'True 1-inch sensor performs brilliantly in night/low-light',
      'Mechanical 3-axis gimbal eliminates all handheld walking shake',
      'Rotatable screen allows instant switching between vertical & horizontal'
    ],
    cons: [
      'Fixed focal length lens has no optical zoom',
      'Gimbal mechanism requires careful storage in provided case'
    ],
    inStock: true
  },

  // ================= AUDIO & SPEAKERS =================
  {
    id: 'sonos-era-300',
    name: 'Sonos Era 300 Spatial Audio Speaker',
    brand: 'Sonos',
    category: 'Audio',
    price: 449,
    originalPrice: 449,
    matchScore: 95,
    badge: 'SPATIAL AUDIO',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    reviewCount: 1530,
    summary: 'Revolutionary acoustic architecture with six optimally positioned drivers all around front, sides, and top to support Dolby Atmos Spatial Audio.',
    aiReason: 'Pioneering home spatial audio speaker that projects music in three dimensions, filling rooms with immersive multidirectional sound.',
    specs: {
      'Amplifiers': 'Six Class-D digital amplifiers',
      'Drivers': '4 tweeters + 2 woofers angled for multidirectional projection',
      'Connectivity': 'Wi-Fi 6, Bluetooth 5.0, Apple AirPlay 2, USB-C Line-In',
      'Tuning': 'Trueplay tuning software for automatic acoustic room calibration'
    },
    pros: [
      'Mind-blowing Dolby Atmos spatial audio immersion',
      'Trueplay auto-calibrates acoustics to your room layout',
      'Supports Wi-Fi streaming, Bluetooth, and line-in input'
    ],
    cons: [
      'Requires AC wall power (not a portable battery speaker)',
      'Dolby Atmos requires compatible streaming services (Apple Music, Amazon Music)'
    ],
    inStock: true
  },
  {
    id: 'marshall-stanmore-3',
    name: 'Marshall Stanmore III Bluetooth Speaker',
    brand: 'Marshall',
    category: 'Audio',
    price: 379,
    originalPrice: 399,
    matchScore: 91,
    badge: 'ICONIC DESIGN',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    reviewCount: 2190,
    summary: 'Vintage rock-and-roll aesthetic with brass analog knobs, 80W total output power, outward angled tweeters, and dynamic loudness compensation.',
    aiReason: 'Statement centerpiece speaker delivering punchy, room-shaking rock & acoustic sound with tactile brass bass and treble control dials.',
    specs: {
      'Power Output': '80W Class-D Amplification (1x 50W Woofer + 2x 15W Tweeters)',
      'Frequency Range': '45 – 20,000 Hz',
      'Connectivity': 'Bluetooth 5.2, 3.5mm AUX, RCA Input',
      'Dimensions': '350 x 203 x 188 mm (4.25 kg)'
    },
    pros: [
      'Gorgeously detailed vintage textured vinyl and brass trim',
      'Rich, warm, thunderous bass response that easily fills large rooms',
      'Analog rotary knobs provide immediate EQ adjustment'
    ],
    cons: [
      'Stationary plug-in design with no rechargeable internal battery',
      'No built-in Wi-Fi streaming or AirPlay'
    ],
    inStock: true
  },
  {
    id: 'jbl-flip-6',
    name: 'JBL Flip 6 Waterproof Portable Speaker',
    brand: 'JBL',
    category: 'Audio',
    price: 99,
    originalPrice: 129,
    matchScore: 93,
    badge: 'OUTDOOR PORTABLE',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.7,
    reviewCount: 8420,
    summary: 'Rugged IP67 waterproof and dustproof portable Bluetooth speaker with 2-way racetrack woofer, separate tweeter, and 12-hour playtime.',
    aiReason: 'The ultimate compact travel speaker for beach trips, pool parties, camping, and hikes under $100.',
    specs: {
      'Output Power': '20W RMS Woofer + 10W RMS Tweeter (30W Total)',
      'Battery Life': '12 Hours Playtime (2.5 Hour recharge)',
      'Water Rating': 'IP67 Waterproof and Dustproof',
      'Bluetooth': '5.1 with JBL PartyBoost linking'
    },
    pros: [
      'Completely waterproof and floats in water without damage',
      'Surprising bass punch and clarity for its compact water-bottle size',
      'PartyBoost allows chaining multiple JBL speakers together'
    ],
    cons: [
      'No microphone for speakerphone phone calls',
      'No auxiliary 3.5mm line-in port'
    ],
    inStock: true
  },
  // ================= EXPANDED CATALOG =================
  // --- Additional Laptops ---
  {
    id: 'thinkpad-x1-carbon-gen12',
    name: 'Lenovo ThinkPad X1 Carbon Gen 12',
    brand: 'Lenovo',
    category: 'Laptops',
    price: 1549,
    originalPrice: 1799,
    matchScore: 97,
    badge: 'ENTERPRISE GOLD',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 1650,
    summary: 'Ultra-durable 1.09kg carbon-fiber business ultrabook featuring Intel Core Ultra 7 155H, 32GB LPDDR5X RAM, and 14-inch 2.8K 120Hz OLED Communications Bar.',
    aiReason: 'The undisputed gold standard for enterprise developers, consultants, and executives needing unmatched keyboard ergonomics, military-grade MIL-STD 810H durability, and lightweight portability.',
    specs: {
      'Processor': 'Intel Core Ultra 7 155H (16 cores, up to 4.8GHz)',
      'Memory': '32GB LPDDR5X-6400MHz',
      'Storage': '1TB PCIe Gen4 Performance SSD',
      'Display': '14.0" 2.8K (2880 x 1800) OLED 120Hz 400 nits 100% DCI-P3',
      'Battery Life': 'Up to 15 Hours (57Wh Battery with Rapid Charge)',
      'Weight': '1.09 kg (2.42 lbs)',
      'Ports': '2x Thunderbolt 4, 2x USB-A 3.2, 1x HDMI 2.1, 3.5mm Audio'
    },
    pros: [
      'Legendary spill-resistant ThinkPad keyboard with TrackPoint and haptic trackpad',
      'Ultralight 1.09kg carbon fiber and recycled magnesium chassis',
      '2.8K 120Hz OLED display with vibrant colors and HDR500 True Black'
    ],
    cons: [
      'OLED panel reduces battery life by ~15% compared to low-power IPS option',
      'Premium pricing outside strict budget constraints'
    ],
    inStock: true
  },
  {
    id: 'asus-zenbook-14-oled',
    name: 'ASUS Zenbook 14 OLED (UX3405)',
    brand: 'ASUS',
    category: 'Laptops',
    price: 999,
    originalPrice: 1149,
    matchScore: 95,
    badge: 'VALUE CHAMPION',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    reviewCount: 980,
    summary: 'Sleek 1.2kg all-metal laptop with a 14" 3K 120Hz ASUS Lumina OLED display, Intel Core Ultra 7 with built-in NPU AI engine, and massive 75Wh battery.',
    aiReason: 'Exceptional sub-$1000 value offering premium 3K OLED visuals, 15+ hours real battery life, and modern Intel Meteor Lake AI processing.',
    specs: {
      'Processor': 'Intel Core Ultra 7 155H with Intel AI Boost NPU',
      'Memory': '16GB LPDDR5X RAM',
      'Storage': '1TB M.2 NVMe PCIe 4.0 SSD',
      'Display': '14.0" 3K (2880 x 1800) OLED 120Hz 16:10 600-nit HDR',
      'Battery Life': 'Up to 16 Hours (75Wh high-capacity battery)',
      'Weight': '1.20 kg (2.65 lbs)',
      'Ports': '2x Thunderbolt 4, 1x USB 3.2 Gen 1 Type-A, 1x HDMI 2.1 TMDS'
    },
    pros: [
      'Unbeatable sub-$1000 pricing for a 3K 120Hz OLED screen and 1TB SSD',
      'Generous 75Wh battery delivers genuine all-day endurance',
      'Harman Kardon tuned speakers with Dolby Atmos support'
    ],
    cons: [
      'RAM is soldered to the motherboard',
      'Webcam privacy cover is a manual plastic notch'
    ],
    inStock: true
  },
  {
    id: 'framework-laptop-13',
    name: 'Framework Laptop 13 (AMD Ryzen 7)',
    brand: 'Framework',
    category: 'Laptops',
    price: 1199,
    originalPrice: 1299,
    matchScore: 92,
    badge: '100% REPAIRABLE',
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    reviewCount: 740,
    summary: 'Revolutionary modular laptop engineered for right-to-repair with fully swappable expansion cards, upgradable mainboard, and vibrant 2.8K 120Hz display.',
    aiReason: 'The premier choice for sustainability enthusiasts, Linux developers, and long-term hardware owners who demand full modularity and zero planned obsolescence.',
    specs: {
      'Processor': 'AMD Ryzen 7 7840U (8 cores / 16 threads, Radeon 780M graphics)',
      'Memory': '32GB DDR5-5600MHz (2x User-accessible SO-DIMM slots)',
      'Storage': '1TB M.2 2280 NVMe SSD (Upgradable)',
      'Display': '13.5" 2.8K (2880 x 1920) 120Hz matte display (3:2 aspect ratio)',
      'Battery Life': 'Up to 12 Hours (61Wh Battery)',
      'Weight': '1.30 kg (2.86 lbs)',
      'Ports': '4x User-customizable Modular Expansion Cards (USB-C, USB-A, HDMI, DP, MicroSD)'
    },
    pros: [
      '10/10 iFixit repairability score with QR codes and replacement parts marketplace',
      '3:2 aspect ratio display is ideal for coding and reading documentation',
      'Hot-swappable I/O modular ports to adapt to any desk setup'
    ],
    cons: [
      'Speakers are slightly tinny compared to MacBook Air',
      'Touchpad click mechanism requires moderate pressure'
    ],
    inStock: true
  },

  // --- Additional Headphones & Earbuds ---
  {
    id: 'bose-quietcomfort-ultra',
    name: 'Bose QuietComfort Ultra Headphones',
    brand: 'Bose',
    category: 'Headphones',
    price: 379,
    originalPrice: 429,
    matchScore: 98,
    badge: 'SUPREME ANC',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 3120,
    summary: 'Flagship over-ear headphones featuring Bose CustomTune active noise cancellation, revolutionary Bose Immersive Audio spatial sound, and ultra-plush protein leather earcups.',
    aiReason: 'The undisputed #1 recommendation for frequent flyers, train commuters, and open-plan office workers requiring the quietest acoustic silence money can buy.',
    specs: {
      'Battery Life': '24 Hours (18 Hours with Immersive Audio turned on)',
      'Noise Cancellation': 'CustomTune Active Noise Cancelling with Aware Mode',
      'Weight': '250g (8.8 oz)',
      'Bluetooth': '5.3 with Snapdragon Sound (aptX Adaptive)',
      'Charging': 'USB-C fast charge (15 min = 2.5 hours)'
    },
    pros: [
      'World-class noise cancellation that eliminates airplane cabin drone and speech',
      'Featherlight 250g weight with cloud-like clamping force for 10+ hour flights',
      'CustomTune acoustic calibration tailors sound specifically to your ear canals'
    ],
    cons: [
      'Cannot listen over USB-C digital audio directly without powering on',
      'Immersive Audio mode decreases battery life by 6 hours'
    ],
    inStock: true
  },
  {
    id: 'airpods-pro-2-usbc',
    name: 'Apple AirPods Pro (2nd Gen, USB-C)',
    brand: 'Apple',
    category: 'Headphones',
    price: 249,
    originalPrice: 249,
    matchScore: 96,
    badge: 'ECOSYSTEM KING',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 9400,
    summary: 'Industry-leading true wireless earbuds with Apple H2 silicon, 2x stronger Active Noise Cancellation, Adaptive Audio, and MagSafe USB-C case with Precision Finding.',
    aiReason: 'The definitive daily audio companion for iPhone and Mac users wanting seamless device handover, unmatched transparency mode, and rich computational audio.',
    specs: {
      'Chipset': 'Apple H2 Headphone Chip + U1 Case Chip',
      'Battery Life': '6 Hours with ANC (30 Hours total with charging case)',
      'Water Resistance': 'IP54 Dust, Sweat, and Water Resistant (Earbuds & Case)',
      'Audio Features': 'Personalized Spatial Audio with dynamic head tracking, Adaptive Audio, Conversation Awareness',
      'Charging': 'USB-C, MagSafe, Apple Watch Charger, Qi Wireless'
    },
    pros: [
      'Transparency mode sounds completely indistinguishable from real-world hearing',
      'Adaptive Audio dynamically blends ANC and ambient awareness based on your environment',
      'Built-in case speaker and U1 Ultra Wideband chip for finding lost cases'
    ],
    cons: [
      'Advanced features (Spatial Audio, auto-switch) are restricted to Apple devices',
      'Eartips are proprietary silicone fit'
    ],
    inStock: true
  },
  {
    id: 'sennheiser-momentum-4',
    name: 'Sennheiser Momentum 4 Wireless',
    brand: 'Sennheiser',
    category: 'Headphones',
    price: 299,
    originalPrice: 379,
    matchScore: 94,
    badge: '60H BATTERY',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    reviewCount: 2180,
    summary: 'Audiophile-grade wireless headphones delivering 60-hour battery life on a single charge, 42mm audiophile transducers, and adaptive hybrid noise cancellation.',
    aiReason: 'Perfect for long-distance travelers and audiophiles who want to go weeks without recharging while enjoying hi-fi acoustic fidelity and rich sub-bass.',
    specs: {
      'Battery Life': 'Massive 60 Hours (with ANC enabled)',
      'Drivers': '42mm Audiophile-inspired Dynamic Transducer',
      'Bluetooth': '5.2 with aptX, aptX Adaptive, AAC, and SBC',
      'Weight': '293g (10.3 oz)',
      'Frequency Response': '6 Hz - 22,000 Hz'
    },
    pros: [
      'Staggering 60-hour battery life is nearly triple that of Sony and Bose competitors',
      'Audiophile-tuned sound profile with clear mids and punchy textured bass',
      'Smart Pause sensor automatically stops playback when taken off your head'
    ],
    cons: [
      'ANC is very solid but slightly behind Bose QC Ultra on high-frequency voices',
      'Headband does not fold inward (lays flat in travel case only)'
    ],
    inStock: true
  },
  {
    id: 'sony-wf-1000xm5',
    name: 'Sony WF-1000XM5 Noise Cancelling Earbuds',
    brand: 'Sony',
    category: 'Headphones',
    price: 278,
    originalPrice: 299,
    matchScore: 93,
    badge: 'HI-RES WIRELESS',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.7,
    reviewCount: 1890,
    summary: 'Compact flagship earbuds with dual noise sensor processors, Dynamic Driver X, LDAC lossless streaming, and polyurethane foam tips for passive isolation.',
    aiReason: 'High-resolution audio fidelity in a 25% smaller chassis with deep ANC and AI-powered bone conduction voice call clarity.',
    specs: {
      'Battery Life': '8 Hours (24 Hours with Case)',
      'Noise Cancelling': 'Integrated Processor V2 + HD Noise Cancelling Processor QN2e',
      'Codecs': 'LDAC, LC3, AAC, SBC (Hi-Res Audio Wireless)',
      'Water Rating': 'IPX4 Water Resistant',
      'Weight': '5.9g per earbud'
    },
    pros: [
      'LDAC codec support delivers 990kbps studio-quality lossless audio on Android',
      'Polyurethane foam tips create an airtight seal blocking high frequencies',
      'Precise Voice Pickup technology uses bone conduction sensors for wind-free calls'
    ],
    cons: [
      'Glossy plastic edge finish can be slippery to remove from case',
      'Foam tips require replacement every 8-12 months of daily use'
    ],
    inStock: true
  },

  // --- Additional Smartphones ---
  {
    id: 'samsung-galaxy-z-flip-5',
    name: 'Samsung Galaxy Z Flip 5 Foldable',
    brand: 'Samsung',
    category: 'Smartphones',
    price: 999,
    originalPrice: 999,
    matchScore: 94,
    badge: 'FOLDABLE ICON',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.7,
    reviewCount: 2150,
    summary: 'Pocket-sized folding smartphone with expanded 3.4" Flex Window cover screen, zero-gap Flex Hinge, Snapdragon 8 Gen 2 for Galaxy, and hands-free FlexCam mode.',
    aiReason: 'The premier choice for creators and style-conscious buyers who want compact pocketability combined with hands-free tabletop camera shooting.',
    specs: {
      'Processor': 'Qualcomm Snapdragon 8 Gen 2 for Galaxy',
      'Memory': '8GB LPDDR5X RAM',
      'Storage': '256GB / 512GB UFS 4.0',
      'Main Display': '6.7" FHD+ Dynamic AMOLED 2X Infinity Flex (1-120Hz)',
      'Cover Display': '3.4" Super AMOLED Flex Window 60Hz',
      'Cameras': '12MP Wide Dual Pixel OIS + 12MP Ultra-wide, 10MP Selfie',
      'Battery': '3700mAh Dual Battery with 25W Fast Charging'
    },
    pros: [
      '3.4" Flex Window allows replying to texts and taking selfies without unfolding',
      'Folds completely flat with no hinge gap into any shirt or jeans pocket',
      'Flex Mode acts as a built-in tripod for hands-free video calls and long exposures'
    ],
    cons: [
      '3700mAh battery requires charging before late evening during heavy usage',
      'No dedicated telephoto optical zoom lens'
    ],
    inStock: true
  },
  {
    id: 'iphone-15-pro-max',
    name: 'Apple iPhone 15 Pro Max',
    brand: 'Apple',
    category: 'Smartphones',
    price: 1199,
    originalPrice: 1199,
    matchScore: 95,
    badge: 'PRO VIDEOGRAPHY',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 5200,
    summary: 'Aerospace-grade Grade 5 titanium smartphone featuring 3nm A17 Pro chip, 5x optical tetraprism telephoto lens, USB-C 10Gbps, and 4K 60fps ProRes Log recording directly to external SSDs.',
    aiReason: 'Unmatched mobile video production tool with console-quality ray tracing graphics, featherweight titanium build, and class-leading battery endurance.',
    specs: {
      'Processor': 'Apple A17 Pro (3nm 6-core CPU, 6-core GPU with hardware ray tracing)',
      'Memory': '8GB RAM',
      'Storage': '256GB NVMe',
      'Display': '6.7" Super Retina XDR OLED (2796 x 1290) 120Hz ProMotion',
      'Cameras': '48MP Main + 12MP Ultrawide + 12MP 5x Tetraprism Zoom',
      'Battery Life': '4422mAh (Up to 29 hours video playback)'
    },
    pros: [
      'Record 4K 60fps ProRes Log video directly to external USB-C drive for color grading',
      'Lightweight contoured titanium frame makes it comfortable for one-handed use',
      'A17 Pro GPU runs native AAA games like Resident Evil Village and Death Stranding'
    ],
    cons: [
      'Premium starting price tag of $1199',
      '20W standard charging is slower than Android competitors'
    ],
    inStock: true
  },
  {
    id: 'asus-rog-phone-8-pro',
    name: 'ASUS ROG Phone 8 Pro Gaming Flagship',
    brand: 'ASUS',
    category: 'Smartphones',
    price: 1199,
    originalPrice: 1199,
    matchScore: 95,
    badge: 'ULTIMATE GAMING',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    reviewCount: 960,
    summary: 'Extreme mobile gaming titan powered by Snapdragon 8 Gen 3, AniMe Vision customizable mini-LED rear matrix, 165Hz Samsung AMOLED, ultrasonic shoulder triggers, and IP68 water resistance.',
    aiReason: 'The absolute champion for hardcore mobile gamers, esports competitors, and power users demanding sustained frame rates and gaming ergonomics.',
    specs: {
      'Processor': 'Qualcomm Snapdragon 8 Gen 3 (Active Matrix cooling)',
      'Memory': '16GB LPDDR5X RAM',
      'Storage': '512GB UFS 4.0 Storage',
      'Display': '6.78" FHD+ 165Hz Samsung E6 Flexible AMOLED (2500 nits peak)',
      'Controls': 'AirTrigger ultrasonic shoulder triggers with vibration feedback',
      'Battery & Charging': '5500mAh dual battery with 65W HyperCharge (0-100% in 39 mins)',
      'Audio': 'Dual front-facing stereo speakers + 3.5mm Hi-Res headphone jack'
    },
    pros: [
      'AirTrigger ultrasonic shoulder buttons provide console gamepad ergonomics',
      'Smooth 165Hz display with 720Hz touch sampling rate for instantaneous reaction times',
      '3.5mm headphone jack with Quad DAC for zero latency gaming audio'
    ],
    cons: [
      'Gamer aesthetic and AniMe matrix might not suit formal boardroom environments',
      'Heavier than standard everyday smartphones (225g)'
    ],
    inStock: true
  },

  // --- Additional Wearables & Smartwatches ---
  {
    id: 'galaxy-watch-6-classic',
    name: 'Samsung Galaxy Watch 6 Classic',
    brand: 'Samsung',
    category: 'Wearables',
    price: 399,
    originalPrice: 429,
    matchScore: 94,
    badge: 'ROTATING BEZEL',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    reviewCount: 3120,
    summary: 'Sophisticated stainless steel timepiece with iconic physical rotating navigation bezel, Sapphire Crystal glass, Advanced Sleep Coaching, ECG, and Bioelectrical Impedance (BIA) body composition analysis.',
    aiReason: 'The best Android smartwatch experience with a timeless analog watch aesthetic and satisfying physical tactile navigation.',
    specs: {
      'Case Material': '47mm Stainless Steel with Physical Rotating Bezel',
      'Display': '1.5" Super AMOLED (480 x 480) Sapphire Crystal',
      'Sensors': 'BioActive Sensor (Optical Heart Rate + Electrical Heart Signal + BIA Body Composition), Temp Sensor',
      'Operating System': 'Wear OS 4 powered by Samsung (One UI 5 Watch)',
      'Durability': '5ATM + IP68 / MIL-STD-810H military certified'
    },
    pros: [
      'Mechanical rotating bezel provides effortless and precise UI navigation without blocking the screen',
      'BioActive sensor measures body fat percentage, skeletal muscle, and body water directly on wrist',
      'Seamless integration with Samsung Galaxy ecosystem and Google Play Store apps'
    ],
    cons: [
      'Battery lasts 30-40 hours (requires daily charging)',
      'Blood pressure and ECG features require a paired Samsung Galaxy smartphone'
    ],
    inStock: true
  },
  {
    id: 'oura-ring-gen-3-horizon',
    name: 'Oura Ring Gen 3 Horizon Smart Ring',
    brand: 'Oura',
    category: 'Wearables',
    price: 349,
    originalPrice: 349,
    matchScore: 95,
    badge: 'SCREEN-FREE HEALTH',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    reviewCount: 2310,
    summary: 'Ultra-discreet circular titanium smart ring delivering medical-grade sleep staging, 24/7 heart rate, Daytime Stress Detection, and Readiness scoring with zero screen distractions.',
    aiReason: 'The ideal health companion for executives and athletes who hate wearing wrist smartwatches to bed but want pinpoint recovery and HRV insights.',
    specs: {
      'Material': 'Ultralight Titanium with scratch-resistant PVD coating',
      'Weight': '4 to 6 grams (featherlight and imperceptible)',
      'Battery Life': 'Up to 7 Days on a single charge',
      'Sensors': 'Infrared photoplethysmography (PPG), negative temperature coefficient (NTC) body temp sensors, 3D accelerometer',
      'Water Resistance': 'Water resistant up to 100 meters (swim and sauna safe)'
    },
    pros: [
      'Completely screen-free with zero notifications, buzzes, or sleep interruptions',
      'Measures biometrics from finger arteries which are significantly more accurate than wrist skin',
      '7-day battery life and sleek jewelry design matches any outfit or wedding band'
    ],
    cons: [
      'Requires an active Oura monthly membership ($5.99/mo) after 30-day trial for full metrics',
      'No display to view time or real-time running pace during workouts'
    ],
    inStock: true
  },

  // --- Additional Cameras & Creator Tech ---
  {
    id: 'canon-eos-r6-mark-ii',
    name: 'Canon EOS R6 Mark II Mirrorless Camera',
    brand: 'Canon',
    category: 'Cameras',
    price: 1999,
    originalPrice: 2299,
    matchScore: 97,
    badge: 'HYBRID MASTER',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewCount: 1840,
    summary: 'Full-frame powerhouse featuring 24.2MP CMOS sensor, 40fps electronic burst shooting, 6K oversampled uncropped 4K/60p video, and Dual Pixel CMOS AF II with Deep Learning subject detection.',
    aiReason: 'The benchmark hybrid camera for wildlife, sports, wedding shooters, and video professionals who cannot afford to miss a single moment.',
    specs: {
      'Sensor': '24.2MP Full-Frame CMOS Sensor',
      'Stabilization': 'In-Body Image Stabilizer up to 8.0 stops with coordinated IS lenses',
      'Video': 'Uncropped 4K 60p (6K oversampled), 6K 60p RAW external via HDMI, Canon Log 3',
      'Continuous Burst': 'Up to 40fps electronic shutter with AF/AE tracking (12fps mechanical)',
      'Autofocus': 'Dual Pixel CMOS AF II with AI vehicle, aircraft, animal, and eye detection'
    },
    pros: [
      'Uncropped 6K-oversampled 4K 60p video delivers stunning edge-to-edge sharpness with no crop',
      'Blazing 40fps silent electronic shooting captures high-speed sports action perfectly',
      'Class-leading 8-stop image stabilization allows handheld shutter speeds down to 1 second'
    ],
    cons: [
      '24.2MP resolution provides less cropping latitude compared to 45MP+ sensors',
      'Micro-HDMI port rather than full-sized Type-A HDMI port'
    ],
    inStock: true
  },
  {
    id: 'gopro-hero12-creator',
    name: 'GoPro HERO12 Black Creator Edition',
    brand: 'GoPro',
    category: 'Cameras',
    price: 499,
    originalPrice: 599,
    matchScore: 95,
    badge: 'ACTION WORKHORSE',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    reviewCount: 3100,
    summary: 'All-in-one content capture powerhouse with 5.3K 60fps HDR video, Emmy-winning HyperSmooth 6.0 stabilization, Volta battery grip with 5+ hours recording, Media Mod, and LED Light Mod.',
    aiReason: 'The most rugged, waterproof, and complete action filming setup for extreme sports, motorcycle vloggers, and adventure travelers.',
    specs: {
      'Sensor': '1/1.9" Sensor (8:7 full-height aspect ratio for vertical/horizontal export)',
      'Video': '5.3K 60fps, 4K 120fps, 2.7K 240fps slow-motion with GP-Log & Timecode sync',
      'Stabilization': 'HyperSmooth 6.0 with 360° Horizon Lock',
      'Waterproof': 'Rugged and submersible to 33ft (10m) without housing',
      'Included Rig': 'Volta Battery Grip (4900mAh), Media Mod with directional mic, and Light Mod'
    },
    pros: [
      'HyperSmooth 6.0 with 360-degree Horizon Lock keeps footage rock-steady even if camera rotates upside down',
      '8:7 sensor allows shooting once and cropping to both 9:16 TikTok and 16:9 YouTube without loss',
      'Volta battery grip provides over 5 hours of continuous 4K recording time and built-in tripod legs'
    ],
    cons: [
      'Low-light performance trails 1-inch sensor cameras like the DJI Pocket 3',
      'No built-in GPS sensor in HERO12 generation'
    ],
    inStock: true
  },

  // --- Additional Audio & Home Spatial Speakers ---
  {
    id: 'bose-soundlink-max',
    name: 'Bose SoundLink Max Portable Speaker',
    brand: 'Bose',
    category: 'Audio',
    price: 399,
    originalPrice: 399,
    matchScore: 96,
    badge: 'BOOMING STEREO',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    reviewCount: 890,
    summary: 'Heavy-hitting portable Bluetooth boombox speaker with deep stereo bass, IP67 waterproof/dustproof/rustproof silicone build, 20-hour battery, and USB-C smartphone power bank charging.',
    aiReason: 'The premier choice for pool parties, beach trips, backyard barbecues, and road trips needing deep room-filling sound with high durability.',
    specs: {
      'Battery Life': 'Up to 20 Hours Playtime',
      'Durability': 'IP67 Waterproof, Dustproof, Rustproof, Shock-resistant silicone body',
      'Audio Architecture': 'Articulated 3-transducer array + Dual custom passive radiators',
      'Bluetooth': '5.3 with aptX Adaptive and multipoint pairing',
      'Extras': 'Removable soft climbing-rope handle, USB-C phone charge out port'
    },
    pros: [
      'Surprisingly massive stereo soundstage with deep bass that doesn\'t distort at max volume',
      'Rugged silicone body withstands drops, pool splashes, sand, and heavy rain',
      'Built-in power bank functionality charges your smartphone on the go'
    ],
    cons: [
      'Weighs 2.22 kg (4.9 lbs) — heavier than small bottle speakers',
      'No built-in Wi-Fi streaming (Bluetooth and 3.5mm Aux only)'
    ],
    inStock: true
  },
  {
    id: 'marshall-acton-iii',
    name: 'Marshall Acton III Bluetooth Home Speaker',
    brand: 'Marshall',
    category: 'Audio',
    price: 279,
    originalPrice: 279,
    matchScore: 94,
    badge: 'VINTAGE AESTHETIC',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.8,
    reviewCount: 1320,
    summary: 'Iconic retro home speaker with outward-angled tweeters for an immersive stereo soundstage, analog brass control knobs for Bass and Treble, and Dynamic Loudness balance.',
    aiReason: 'Ideal for design-conscious homeowners and music lovers wanting an elegant statement piece with rich acoustic warmth and tactile physical controls.',
    specs: {
      'Amplifiers': 'One 30W Class D amplifier for woofer + Two 15W Class D amplifiers for tweeters (60W Total)',
      'Frequency Range': '45 Hz – 20,000 Hz',
      'Controls': 'Brass analog knobs for Volume, Bass, and Treble + Source button + Power toggle lever',
      'Connectivity': 'Bluetooth 5.2 + 3.5mm Aux Line-In',
      'Design': '70% recycled plastic, PVC-free vegan leather finish with vintage Marshall script'
    },
    pros: [
      'Iconic vintage rock-and-roll styling that enhances any bookshelf or coffee table',
      'Tactile analog brass dials allow instant fine-tuning of bass and treble on the fly',
      'Angled tweeters and updated waveguides project sound wider across the room'
    ],
    cons: [
      'Plugs into wall AC power (no internal portable battery)',
      'Does not support Apple AirPlay 2 or Google Cast Wi-Fi streaming'
    ],
    inStock: true
  }
];

export const mockCategories: CategoryInfo[] = [
  {
    id: 'laptops',
    name: 'High Performance Laptops',
    itemCount: '12,400+ Products',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    description: 'Ultrabooks, workstation laptops, creative notebooks, and gaming rigs analyzed by AI.',
    featuredProduct: 'PrecisionCore X1'
  },
  {
    id: 'smartphones',
    name: 'Smartphones & Mobile',
    itemCount: '8,900+ Products',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    description: 'Flagships, camera phones, compact devices, and folding phones categorized by battery and optics.',
    featuredProduct: 'Galaxy Ultra AI'
  },
  {
    id: 'headphones',
    name: 'Headphones & Earbuds',
    itemCount: '15,200+ Products',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    description: 'Noise cancelling over-ears, wireless earbuds, studio monitors, and audiophile gear.',
    featuredProduct: 'Sony WH-1000XM4'
  },
  {
    id: 'wearables',
    name: 'Wearables & Smartwatches',
    itemCount: '6,100+ Products',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    description: 'Fitness trackers, health monitors, GPS outdoor watches, and smart rings.',
    featuredProduct: 'Garmin Epix Gen 2'
  },
  {
    id: 'cameras',
    name: 'Cameras & Creator Gear',
    itemCount: '4,800+ Products',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    description: 'Full-frame mirrorless, vlogging gimbals, cinema lenses, and action cameras.',
    featuredProduct: 'Sony Alpha 7 IV'
  },
  {
    id: 'audio',
    name: 'Home Audio & Speakers',
    itemCount: '7,300+ Products',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    description: 'Spatial audio home sound systems, rugged portable speakers, and studio monitors.',
    featuredProduct: 'Sonos Era 300'
  }
];

export const mockQuickPrompts = [
  'Noise-cancelling headphones for flights with 20h+ battery',
  'Lightweight laptop for college and coding under $1000',
  'Smartphone with best optical zoom camera & OLED screen',
  'Waterproof portable speaker for outdoor adventures under $150',
  'Rugged GPS multisport smartwatch with multi-week battery'
];
