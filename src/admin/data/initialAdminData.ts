import type {
  StoreInfo,
  Product,
  DeliverySlot,
  DeliveryZone,
  Order,
  AnalyticsData,
  Role,
  User
} from '../types/adminTypes';

export const INITIAL_STORE_INFO: StoreInfo = {
  name: "Rasolicious",
  tagline: "A Little Love in Every Bite.",
  location: "Nagercoil Central Hub, Kanniyakumari District, TN",
  fssaiLicense: "12423001000492",
  gstin: "33AABCR1234F1Z5",
  currency: "₹",
  freeDeliveryThreshold: 999,
  standardDeliveryFee: 40,
  expressDeliveryFee: 80,
  date: "Tuesday, 13 Oct 2026"
};

export const INITIAL_DELIVERY_SLOTS: DeliverySlot[] = [
  {
    id: "slot-morning",
    name: "Morning Slot",
    timeWindow: "9 AM–1 PM",
    capacity: 20,
    booked: 0,
    active: true,
    description: "Early dispatch for fresh morning bakes & office celebrations"
  },
  {
    id: "slot-afternoon",
    name: "Afternoon Slot",
    timeWindow: "1 PM–5 PM",
    capacity: 20,
    booked: 0,
    active: true,
    description: "Mid-day batch dispatch across NH-66 corridor"
  },
  {
    id: "slot-evening",
    name: "Evening Slot",
    timeWindow: "5 PM–9 PM",
    capacity: 20,
    booked: 0,
    active: true,
    description: "Prime dessert & family dinner delivery slot"
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "br-original",
    name: "The Original",
    slug: "the-original",
    category: "Signature Brownies",
    price: 450,
    salePrice: 420,
    originalPrice: 480,
    weight: "500g Slab",
    dailyLimit: 25,
    booked: 0,
    status: "In Stock",
    available: true,
    rating: 4.9,
    reviews: 154,
    shortDescription: "Classic chocolate indulgence.",
    description: "Our timeless signature recipe with dense, glossy crinkled top and molten fudge center. Handcrafted with single-origin Belgian chocolate and French cultured butter.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&w=800&q=80"
    ],
    badge: "BEST SELLER",
    ingredients: "Belgian Couverture Chocolate 70%, French Butter, Organic Cane Sugar, Free-Range Eggs, Dutch Cocoa, Sea Salt",
    allergens: ["Eggs", "Dairy", "Gluten"],
    storageInfo: "Store in an airtight container at room temperature for up to 5 days, or chill for up to 10 days. Warm for 15 seconds for a molten centre.",
    deliveryInfo: "Freshly baked every morning. Delivered in our signature Rasoolicious bakery box.",
    pieces: "Whole 500g Slab",
    isSignature: true,
    freshToday: true,
    featured: true
  },
  {
    id: "br-rasool",
    name: "The Rasool",
    slug: "the-rasool",
    category: "Signature Brownies",
    price: 490,
    salePrice: 460,
    originalPrice: 520,
    weight: "500g Slab",
    dailyLimit: 30,
    booked: 0,
    status: "In Stock",
    available: true,
    rating: 5.0,
    reviews: 198,
    shortDescription: "Our special creation, inspired by the love story behind our brand.",
    description: "Our special creation, inspired by the love story behind our brand. Infused with Bourbon vanilla and Maldon sea salt crystals. Ultra-luxe velvety dark chocolate.",
    image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80"
    ],
    badge: "CHEF SPECIAL",
    ingredients: "72% Belgian Couverture Chocolate, French Cultured Butter, Bourbon Vanilla Beans, Organic Cane Sugar, Eggs, Maldon Salt",
    allergens: ["Eggs", "Dairy", "Gluten"],
    storageInfo: "Store in an airtight container at room temperature for up to 6 days. Best enjoyed slightly warmed.",
    deliveryInfo: "Bespoke daily morning bake. Hand-packed with care.",
    pieces: "Whole 500g Slab",
    isSignature: true,
    freshToday: true,
    featured: true
  },
  {
    id: "br-double-chocolate",
    name: "Double Chocolate",
    slug: "double-chocolate",
    category: "Signature Brownies",
    price: 480,
    salePrice: 450,
    originalPrice: 510,
    weight: "500g Slab",
    dailyLimit: 20,
    booked: 0,
    status: "In Stock",
    available: true,
    rating: 4.9,
    reviews: 112,
    shortDescription: "Double the chocolate, double the delight.",
    description: "Double the chocolate, double the delight. Loaded with molten pockets of dark and milk chocolate folded into rich Dutch cocoa fudge batter.",
    image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80"
    ],
    badge: "NEW",
    ingredients: "Belgian Dark Chocolate 70%, Swiss Milk Chocolate Chunks, Dutch Process Cocoa, French Butter, Eggs, Flour",
    allergens: ["Eggs", "Dairy", "Gluten"],
    storageInfo: "Room temperature for 5 days. Warm gently for flowing chocolate chunks.",
    deliveryInfo: "Fresh morning bake sealed for maximum aroma.",
    pieces: "Whole 500g Slab",
    isSignature: true,
    freshToday: true,
    featured: true
  },
  {
    id: "br-nutella",
    name: "Nutella",
    slug: "nutella",
    category: "Signature Brownies",
    price: 520,
    salePrice: 490,
    originalPrice: 550,
    weight: "500g Slab",
    dailyLimit: 25,
    booked: 0,
    status: "In Stock",
    available: true,
    rating: 4.9,
    reviews: 167,
    shortDescription: "A rich chocolate-hazelnut treat.",
    description: "A rich chocolate-hazelnut treat with roasted hazelnuts and continuous molten rivers of pure Italian Nutella. Decadent, nutty, and irresistible.",
    image: "https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589218436045-ee320057f443?auto=format&fit=crop&w=800&q=80"
    ],
    badge: "BEST SELLER",
    ingredients: "Italian Nutella, Roasted Hazelnuts, 60% Dark Cocoa, French Cultured Butter, Free-Range Eggs, Flour",
    allergens: ["Eggs", "Dairy", "Gluten", "Nuts"],
    storageInfo: "Store airtight. Keeps 6 days at room temperature, 2 weeks refrigerated.",
    deliveryInfo: "Fresh daily batch dispatch.",
    pieces: "Whole 500g Slab",
    isSignature: true,
    freshToday: true,
    featured: true
  },
  {
    id: "br-biscoff",
    name: "Biscoff",
    slug: "biscoff",
    category: "Signature Brownies",
    price: 490,
    salePrice: 460,
    originalPrice: 520,
    weight: "500g Slab",
    dailyLimit: 24,
    booked: 0,
    status: "In Stock",
    available: true,
    rating: 4.9,
    reviews: 145,
    shortDescription: "Chocolate brownies with a caramelised biscuit twist.",
    description: "Chocolate brownies with a caramelised biscuit twist, swirled with thick molten ribbons of Belgian Lotus Biscoff speculoos spread and crowned with spiced biscuit dust.",
    image: "https://images.unsplash.com/photo-1589218436045-ee320057f443?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1589218436045-ee320057f443?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80"
    ],
    badge: "BEST SELLER",
    ingredients: "Lotus Biscoff Spread, Lotus Speculoos Biscuits, 64% Dark Chocolate, French Butter, Flour, Eggs",
    allergens: ["Eggs", "Dairy", "Gluten"],
    storageInfo: "Keeps fresh up to 6 days at room temperature.",
    deliveryInfo: "Packed in signature gold-embossed box.",
    pieces: "Whole 500g Slab",
    isSignature: true,
    freshToday: true,
    featured: true
  },
  {
    id: "rasoolicious-gift-box",
    name: "The Rasoolicious Gift Box",
    slug: "the-rasoolicious-gift-box",
    category: "Gift Boxes",
    price: 850,
    salePrice: 850,
    originalPrice: 950,
    weight: "Box of 4",
    dailyLimit: 15,
    booked: 0,
    status: "In Stock",
    available: true,
    rating: 5.0,
    reviews: 210,
    shortDescription: "Share a little happiness with a box of brownies made for life's sweetest moments.",
    description: "Share a little happiness with a box of brownies made for life's sweetest moments. Choose any four brownies from our five signature flavours to create your own delicious combination. Packed in our luxury keepsake gift box with satin bow.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&w=800&q=80"
    ],
    badge: "BEST SELLER",
    ingredients: "Selection of 4 Signature Brownies crafted with Belgian Chocolate, French Butter, Lotus Biscoff, Nutella, and Pure Bourbon Vanilla.",
    allergens: ["Eggs", "Dairy", "Gluten", "Nuts"],
    storageInfo: "Keeps fresh up to 6 days at room temperature. Perfect for gifting and celebrations.",
    deliveryInfo: "Packed in deluxe insulated gift box with satin bow and greeting card.",
    pieces: "4 Brownies (Build Your Own Box)",
    isSignature: true,
    freshToday: true,
    featured: true
  }
];

export const INITIAL_DELIVERY_ZONES: DeliveryZone[] = [
  {
    id: "ZONE-01",
    pincode: "629001",
    locality: "Nagercoil Central (Kottar, Vadasery, Tower)",
    status: "Active",
    standardFee: 40,
    expressFee: 80,
    deliveryTime: "30–45 mins"
  },
  {
    id: "ZONE-02",
    pincode: "629165",
    locality: "Marthandam & Kuzhithurai Junction",
    status: "Active",
    standardFee: 60,
    expressFee: 100,
    deliveryTime: "45–60 mins"
  },
  {
    id: "ZONE-03",
    pincode: "629702",
    locality: "Kanyakumari Town & Coastal Shore",
    status: "Active",
    standardFee: 70,
    expressFee: 120,
    deliveryTime: "50–70 mins"
  },
  {
    id: "ZONE-04",
    pincode: "629251",
    locality: "Colachel Harbour & Port Area",
    status: "Active",
    standardFee: 60,
    expressFee: 110,
    deliveryTime: "45–65 mins"
  },
  {
    id: "ZONE-05",
    pincode: "629175",
    locality: "Thuckalay & Padmanabhapuram Palace Zone",
    status: "Active",
    standardFee: 50,
    expressFee: 90,
    deliveryTime: "40–55 mins"
  },
  {
    id: "ZONE-06",
    pincode: "629161",
    locality: "Kulasekharam & Rubber Plantation Hills",
    status: "Active",
    standardFee: 70,
    expressFee: 120,
    deliveryTime: "50–70 mins"
  },
  {
    id: "ZONE-07",
    pincode: "629157",
    locality: "Karungal & Thingalnagar",
    status: "Active",
    standardFee: 60,
    expressFee: 100,
    deliveryTime: "45–60 mins"
  },
  {
    id: "ZONE-08",
    pincode: "629201",
    locality: "Asaripallam Medical College Area",
    status: "Active",
    standardFee: 35,
    expressFee: 70,
    deliveryTime: "25–40 mins"
  }
];

export const INITIAL_ORDERS: Order[] = [];

export const INITIAL_ANALYTICS: AnalyticsData = {
  revenuePeriods: {
    today: {
      total: 0,
      orders: 0,
      labels: ["8 AM", "10 AM", "12 PM", "2 PM", "4 PM", "6 PM", "8 PM"],
      data: [2400, 5800, 4200, 3100, 6200, 2150, 1000]
    },
    week: {
      total: 168400,
      orders: 284,
      labels: ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Today"],
      data: [21400, 22800, 26900, 34200, 38250, 0, 24850]
    },
    month: {
      total: 684200,
      orders: 1148,
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      data: [154000, 172000, 189700, 168500]
    }
  },
  topTreatsLeaderboard: [
    {
      rank: 1,
      name: "The Rasool",
      unitsSold: 28,
      revenue: 13720,
      salesShare: 34.5,
      image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80",
      category: "Signature Brownies"
    },
    {
      rank: 2,
      name: "The Original",
      unitsSold: 24,
      revenue: 10800,
      salesShare: 27.2,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
      category: "Signature Brownies"
    },
    {
      rank: 3,
      name: "Nutella",
      unitsSold: 21,
      revenue: 10920,
      salesShare: 27.5,
      image: "https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&w=800&q=80",
      category: "Signature Brownies"
    },
    {
      rank: 4,
      name: "Biscoff",
      unitsSold: 20,
      revenue: 9800,
      salesShare: 24.6,
      image: "https://images.unsplash.com/photo-1589218436045-ee320057f443?auto=format&fit=crop&w=800&q=80",
      category: "Signature Brownies"
    },
    {
      rank: 5,
      name: "Double Chocolate",
      unitsSold: 15,
      revenue: 7200,
      salesShare: 18.1,
      image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=800&q=80",
      category: "Signature Brownies"
    },
    {
      rank: 6,
      name: "The Rasoolicious Gift Box",
      unitsSold: 12,
      revenue: 10200,
      salesShare: 25.7,
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
      category: "Gift Boxes"
    }
  ],
  statusDistribution: [
    { status: "Received", count: 8, percentage: 19, color: "#904D0B" },
    { status: "In the Oven", count: 12, percentage: 29, color: "#FFA761" },
    { status: "Cooling & Packing", count: 6, percentage: 14, color: "#B7791F" },
    { status: "Out for Delivery", count: 8, percentage: 19, color: "#2B160E" },
    { status: "Completed", count: 8, percentage: 19, color: "#16803D" }
  ],
  insights: [
    {
      type: "warning",
      title: "Products Near Batch Limits",
      text: "Lotus Biscoff Swirl Brownie Slab has 32/40 booked (8 remaining). Classic Walnut Brownie is fully booked & sold out for today.",
      icon: "Package"
    },
    {
      type: "success",
      title: "Most Popular Treat Today",
      text: "Dark Chocolate Fudge Brownie leads total daily sales with 18 units sold (₹8,100 revenue, 32.6% share).",
      icon: "Sparkles"
    },
    {
      type: "error",
      title: "Evening Delivery Slot Full",
      text: "Evening Slot (5 PM–9 PM) has reached 100% capacity (20/20 orders). System is redirecting customers to Tomorrow Morning slot.",
      icon: "Clock"
    },
    {
      type: "info",
      title: "Pending Dispatch Queue",
      text: "8 orders are packed and awaiting courier allocation for Marthandam & Nagercoil NH-66 corridor route.",
      icon: "Truck"
    }
  ]
};

export const INITIAL_ROLES: Role[] = [
  {
    id: "role-super-admin",
    name: "Super Admin",
    description: "Full root access to all store modules, user security, financials and settings.",
    created: "06-02-2026",
    isSystem: true,
    permissions: {
      user:      { list: true, view: true, create: true, edit: true, delete: true, export: true },
      role:      { list: true, view: true, create: true, edit: true, delete: true, export: true },
      order:     { list: true, view: true, create: true, edit: true, delete: true, export: true },
      payment:   { list: true, view: true, create: true, edit: true, delete: true, export: true },
      product:   { list: true, view: true, create: true, edit: true, delete: true, export: true },
      category:  { list: true, view: true, create: true, edit: true, delete: true, export: true },
      delivery:  { list: true, view: true, create: true, edit: true, delete: true, export: true },
      analytics: { list: true, view: true, create: true, edit: true, delete: true, export: true }
    }
  },
  {
    id: "role-admin",
    name: "Admin",
    description: "Bakery store managers handling daily orders, customer menus, inventory and staff.",
    created: "06-02-2026",
    isSystem: true,
    permissions: {
      user:      { list: true, view: true, create: true, edit: true, delete: false, export: true },
      role:      { list: true, view: true, create: false, edit: false, delete: false, export: true },
      order:     { list: true, view: true, create: true, edit: true, delete: true, export: true },
      payment:   { list: true, view: true, create: true, edit: true, delete: false, export: true },
      product:   { list: true, view: true, create: true, edit: true, delete: true, export: true },
      category:  { list: true, view: true, create: true, edit: true, delete: true, export: true },
      delivery:  { list: true, view: true, create: true, edit: true, delete: false, export: true },
      analytics: { list: true, view: true, create: false, edit: false, delete: false, export: true }
    }
  },
  {
    id: "role-kitchen-staff",
    name: "Kitchen Staff",
    description: "Head bakers, oven operators & packing team managing live oven pipeline and stock.",
    created: "06-02-2026",
    isSystem: true,
    permissions: {
      user:      { list: false, view: false, create: false, edit: false, delete: false, export: false },
      role:      { list: false, view: false, create: false, edit: false, delete: false, export: false },
      order:     { list: true, view: true, create: false, edit: true, delete: false, export: false },
      payment:   { list: false, view: false, create: false, edit: false, delete: false, export: false },
      product:   { list: true, view: true, create: false, edit: false, delete: false, export: false },
      category:  { list: true, view: true, create: false, edit: true, delete: false, export: false },
      delivery:  { list: true, view: true, create: false, edit: false, delete: false, export: false },
      analytics: { list: false, view: false, create: false, edit: false, delete: false, export: false }
    }
  },
  {
    id: "role-user",
    name: "User",
    description: "Registered bakery patrons ordering artisanal confections & tracking deliveries.",
    created: "06-02-2026",
    isSystem: true,
    permissions: {
      user:      { list: false, view: false, create: false, edit: false, delete: false, export: false },
      role:      { list: false, view: false, create: false, edit: false, delete: false, export: false },
      order:     { list: true, view: true, create: true, edit: false, delete: false, export: false },
      payment:   { list: true, view: true, create: true, edit: false, delete: false, export: false },
      product:   { list: true, view: true, create: false, edit: false, delete: false, export: false },
      category:  { list: false, view: false, create: false, edit: false, delete: false, export: false },
      delivery:  { list: true, view: true, create: false, edit: false, delete: false, export: false },
      analytics: { list: false, view: false, create: false, edit: false, delete: false, export: false }
    }
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: "usr-001",
    name: "Shyam Ji",
    email: "sj.1871487@gmail.com",
    role: "User",
    status: "Active",
    joined: "30-09-2026",
    phone: "+91 97890 12345",
    avatarBg: "#E0F2FE",
    avatarColor: "#0369A1"
  },
  {
    id: "usr-002",
    name: "Arun Kumar P",
    email: "arunprabakaran219@gmail.com",
    role: "User",
    status: "Active",
    joined: "28-09-2026",
    phone: "+91 99430 54321",
    avatarBg: "#CCFBF1",
    avatarColor: "#0F766E"
  },
  {
    id: "usr-003",
    name: "Mahima Devan",
    email: "mahimadevan18@gmail.com",
    role: "User",
    status: "Active",
    joined: "28-09-2026",
    phone: "+91 98421 98765",
    avatarBg: "#FCE7F3",
    avatarColor: "#BE185D"
  },
  {
    id: "usr-004",
    name: "Bharathi",
    email: "lincybharathi5@gmail.com",
    role: "User",
    status: "Active",
    joined: "26-09-2026",
    phone: "+91 94420 33445",
    avatarBg: "#FEF3C7",
    avatarColor: "#B45309"
  },
  {
    id: "usr-005",
    name: "Muthu Kumar",
    email: "muthu.oven@rasolicious.com",
    role: "Kitchen Staff",
    status: "Active",
    joined: "23-09-2026",
    phone: "+91 94431 88201",
    avatarBg: "#DCFCE7",
    avatarColor: "#15803D"
  },
  {
    id: "usr-006",
    name: "Gayathri Gayu",
    email: "gayathrigayu3156@gmail.com",
    role: "User",
    status: "Active",
    joined: "19-09-2026",
    phone: "+91 94862 11223",
    avatarBg: "#EDE9FE",
    avatarColor: "#6D28D9"
  },
  {
    id: "usr-007",
    name: "Chef Rasool",
    email: "admin@rasolicious.com",
    role: "Super Admin",
    status: "Active",
    joined: "15-09-2026",
    phone: "+91 94892 01823",
    avatarBg: "#2B160E",
    avatarColor: "#FFDCC4"
  },
  {
    id: "usr-008",
    name: "Preethi S",
    email: "preethisadmin@gmail.com",
    role: "Kitchen Staff",
    status: "Active",
    joined: "14-09-2026",
    phone: "+91 98942 55190",
    avatarBg: "#FEF3C7",
    avatarColor: "#B45309"
  },
  {
    id: "usr-009",
    name: "Arun Kumar",
    email: "a.arunkumar766@gmail.com",
    role: "User",
    status: "Active",
    joined: "09-09-2026",
    phone: "+91 99944 67890",
    avatarBg: "#F1F5F9",
    avatarColor: "#475569"
  },
  {
    id: "usr-010",
    name: "Ananya Sundaram",
    email: "ananya.baker@rasolicious.com",
    role: "Admin",
    status: "Active",
    joined: "01-09-2026",
    phone: "+91 94892 01824",
    avatarBg: "#FAF1E8",
    avatarColor: "#904D0B"
  }
];
