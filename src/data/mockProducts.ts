import { Product, CategoryInfo } from '../types';

export const mockProducts: Product[] = [
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
    id: 'audio',
    name: 'Audio & Headphones',
    itemCount: '15,200+ Products',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    description: 'Noise cancelling over-ears, wireless earbuds, studio monitors, and soundbars.',
    featuredProduct: 'Sony WH-1000XM4'
  },
  {
    id: 'wearables',
    name: 'Wearables & Smartwatches',
    itemCount: '6,100+ Products',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    description: 'Fitness trackers, health monitors, GPS outdoor watches, and smart rings.',
    featuredProduct: 'Garmin Epix Gen 2'
  }
];

export const mockQuickPrompts = [
  'Ergonomic office chair for back pain under $300',
  'Noise-cancelling headphones for flights with 20h+ battery',
  'Smartphone with best zoom camera & OLED screen',
  'Lightweight laptop for college with silent cooling'
];
