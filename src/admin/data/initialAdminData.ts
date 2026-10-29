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
    booked: 15,
    active: true,
    description: "Early dispatch for fresh morning bakes & office celebrations"
  },
  {
    id: "slot-afternoon",
    name: "Afternoon Slot",
    timeWindow: "1 PM–5 PM",
    capacity: 20,
    booked: 12,
    active: true,
    description: "Mid-day batch dispatch across NH-66 corridor"
  },
  {
    id: "slot-evening",
    name: "Evening Slot",
    timeWindow: "5 PM–9 PM",
    capacity: 20,
    booked: 20,
    active: true,
    description: "Prime dessert & family dinner delivery slot"
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "PROD-001",
    name: "The Original",
    category: "Signature Brownies",
    price: 450,
    salePrice: 420,
    weight: "500 g",
    dailyLimit: 25,
    booked: 18,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    description: "Classic chocolate indulgence. Our timeless signature recipe with dense, glossy crinkled top and molten fudge center.",
    ingredients: "Belgian Couverture Chocolate 70%, French Butter, Organic Cane Sugar, Free-Range Eggs, Dutch Cocoa, Sea Salt",
    allergens: ["Eggs", "Dairy", "Gluten"],
    freshToday: true,
    featured: true
  },
  {
    id: "PROD-002",
    name: "The Rasool",
    category: "Signature Brownies",
    price: 490,
    salePrice: 460,
    weight: "500 g",
    dailyLimit: 30,
    booked: 26,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80",
    description: "Our special creation, inspired by the love story behind our brand. Infused with Bourbon vanilla and Maldon sea salt crystals.",
    ingredients: "72% Belgian Couverture Chocolate, French Cultured Butter, Bourbon Vanilla Beans, Organic Cane Sugar, Eggs, Maldon Salt",
    allergens: ["Eggs", "Dairy", "Gluten"],
    freshToday: true,
    featured: true
  },
  {
    id: "PROD-003",
    name: "Double Chocolate",
    category: "Signature Brownies",
    price: 480,
    salePrice: 450,
    weight: "500 g",
    dailyLimit: 20,
    booked: 15,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=800&q=80",
    description: "Double the chocolate, double the delight. Loaded with molten pockets of dark and milk chocolate.",
    ingredients: "Belgian Dark Chocolate 70%, Swiss Milk Chocolate Chunks, Dutch Process Cocoa, French Butter, Eggs, Flour",
    allergens: ["Eggs", "Dairy", "Gluten"],
    freshToday: true,
    featured: true
  },
  {
    id: "PROD-004",
    name: "Nutella",
    category: "Signature Brownies",
    price: 520,
    salePrice: 490,
    weight: "500 g",
    dailyLimit: 25,
    booked: 21,
    status: "Limited Stock",
    image: "https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&w=800&q=80",
    description: "A rich chocolate-hazelnut treat with roasted hazelnuts and continuous molten rivers of pure Italian Nutella.",
    ingredients: "Italian Nutella, Roasted Hazelnuts, 60% Dark Cocoa, Butter, Eggs, Flour",
    allergens: ["Eggs", "Dairy", "Gluten", "Nuts"],
    freshToday: true,
    featured: true
  },
  {
    id: "PROD-005",
    name: "Biscoff",
    category: "Signature Brownies",
    price: 490,
    salePrice: 460,
    weight: "500 g",
    dailyLimit: 24,
    booked: 20,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1589218436045-ee320057f443?auto=format&fit=crop&w=800&q=80",
    description: "Chocolate brownies with a caramelised biscuit twist, swirled with Lotus Biscoff ribbons and spiced biscuit dust.",
    ingredients: "Lotus Biscoff Spread, Lotus Speculoos Biscuits, 64% Dark Chocolate, French Butter, Flour, Eggs",
    allergens: ["Eggs", "Dairy", "Gluten"],
    freshToday: true,
    featured: true
  },
  {
    id: "PROD-006",
    name: "The Rasoolicious Gift Box",
    category: "Gift Boxes",
    price: 850,
    salePrice: 850,
    weight: "Box of 4",
    dailyLimit: 15,
    booked: 12,
    status: "In Stock",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    description: "Share a little happiness with a box of brownies made for life's sweetest moments. Choose any four brownies from our signature collection.",
    ingredients: "Selection of 4 Signature Brownies crafted with Belgian Chocolate, French Butter, Lotus Biscoff, Nutella, and Pure Bourbon Vanilla.",
    allergens: ["Eggs", "Dairy", "Gluten", "Nuts"],
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

export const INITIAL_ORDERS: Order[] = [
  {
    id: "RAS1042",
    customerName: "Sarah Joseph",
    phone: "+91 98421 88390",
    altPhone: "+91 94432 10982",
    date: "Today, 13 Oct 2026",
    slot: "Morning, 9 AM–1 PM",
    slotId: "slot-morning",
    locality: "Nagercoil Central",
    pincode: "629001",
    address: "No. 42, Vadasery High Road, Near District Court, Nagercoil, Kanniyakumari Dist - 629001",
    paymentMethod: "UPI",
    paymentStatus: "Paid via UPI",
    paymentRef: "UPI/SBIN/8291039841",
    subtotal: 1280,
    deliveryFee: 40,
    discount: 80,
    total: 1240,
    status: "received",
    hasGiftMessage: true,
    giftMessage: {
      to: "Sarah Joseph",
      from: "Joshua & Rachel",
      message: "Happy Birthday dearest Sarah! May this year be as rich, sweet, and comforting as Rasolicious brownies! Can't wait to celebrate together this evening. With tons of love!"
    },
    items: [
      {
        name: "Dark Chocolate Fudge Brownie",
        quantity: 2,
        weight: "500 g each",
        unitPrice: 450,
        totalPrice: 900
      },
      {
        name: "Lotus Biscoff Swirl Brownie Slab",
        quantity: 1,
        weight: "500 g",
        unitPrice: 380,
        totalPrice: 380
      }
    ],
    notes: "Customer requested extra dusting of sea salt on brownies.",
    timeline: [
      { time: "08:15 AM", title: "Order Placed Online", desc: "Paid ₹1,240 via GooglePay UPI" },
      { time: "08:20 AM", title: "Order Confirmed by System", desc: "Allocated to Morning Dispatch (9 AM–1 PM)" }
    ]
  },
  {
    id: "RAS1043",
    customerName: "Ananthakrishnan M",
    phone: "+91 94431 23456",
    altPhone: "",
    date: "Today, 13 Oct 2026",
    slot: "Afternoon, 1 PM–5 PM",
    slotId: "slot-afternoon",
    locality: "Marthandam",
    pincode: "629165",
    address: "Flat 3B, Riverview Apartments, Near Kuzhithurai Bridge, Marthandam - 629165",
    paymentMethod: "UPI",
    paymentStatus: "Paid via UPI",
    paymentRef: "UPI/HDFC/1928374650",
    subtotal: 890,
    deliveryFee: 0,
    discount: 0,
    total: 890,
    status: "oven",
    hasGiftMessage: false,
    giftMessage: null,
    items: [
      {
        name: "Assorted Brownie Gift Box",
        quantity: 1,
        weight: "8 pcs (750 g)",
        unitPrice: 890,
        totalPrice: 890
      }
    ],
    notes: "Please pack with extra insulation for afternoon commute.",
    timeline: [
      { time: "09:05 AM", title: "Order Received", desc: "Verified payment via HDFC UPI" },
      { time: "09:40 AM", title: "Baking Started in Deck Oven #2", desc: "Tray #14 loaded by Chef Anand" }
    ]
  },
  {
    id: "RAS1044",
    customerName: "Maria Fernandez",
    phone: "+91 97890 54321",
    altPhone: "+91 97890 54322",
    date: "Today, 13 Oct 2026",
    slot: "Morning, 9 AM–1 PM",
    slotId: "slot-morning",
    locality: "Kanyakumari Town",
    pincode: "629702",
    address: "Seaview Villa, Beach Road, Near Sunset Point, Kanyakumari - 629702",
    paymentMethod: "Card",
    paymentStatus: "Paid via Card",
    paymentRef: "TXN/VISA/99281726",
    subtotal: 1680,
    deliveryFee: 70,
    discount: 210,
    total: 1540,
    status: "oven",
    hasGiftMessage: true,
    giftMessage: {
      to: "Maria & Francis",
      from: "David & Sharon (Chennai)",
      message: "Wishing you a truly magical 25th Wedding Anniversary overlooking the Indian Ocean! Treat yourselves to these warm delights."
    },
    items: [
      {
        name: "Red Velvet Cream Cheese Brownie Slab",
        quantity: 2,
        weight: "500 g each",
        unitPrice: 650,
        totalPrice: 1300
      },
      {
        name: "Nutella Hazelnut Molten Lava Brownie",
        quantity: 1,
        weight: "500 g",
        unitPrice: 380,
        totalPrice: 380
      }
    ],
    notes: "Keep brownie slabs insulated and freshly sealed during transport.",
    timeline: [
      { time: "08:30 AM", title: "Order Placed", desc: "Visa Credit Card verified" },
      { time: "09:15 AM", title: "Baking Commenced", desc: "Brownie Slabs in Deck Oven #1" }
    ]
  },
  {
    id: "RAS1045",
    customerName: "Dr. Kavitha Raman",
    phone: "+91 98422 11223",
    altPhone: "",
    date: "Today, 13 Oct 2026",
    slot: "Morning, 9 AM–1 PM",
    slotId: "slot-morning",
    locality: "Asaripallam",
    pincode: "629201",
    address: "Doctors Quarters, Government Medical College Campus, Asaripallam, Nagercoil - 629201",
    paymentMethod: "UPI",
    paymentStatus: "Paid via UPI",
    paymentRef: "UPI/ICIC/7733441199",
    subtotal: 930,
    deliveryFee: 0,
    discount: 0,
    total: 930,
    status: "cooling",
    hasGiftMessage: false,
    giftMessage: null,
    items: [
      {
        name: "Dark Chocolate Fudge Brownie",
        quantity: 1,
        weight: "500 g",
        unitPrice: 450,
        totalPrice: 450
      },
      {
        name: "Classic Walnut Brownie",
        quantity: 1,
        weight: "500 g",
        unitPrice: 480,
        totalPrice: 480
      }
    ],
    notes: "Leave with security at Dean's gate if busy in rounds.",
    timeline: [
      { time: "07:45 AM", title: "Order Placed", desc: "Paid via UPI" },
      { time: "08:30 AM", title: "Baking Done", desc: "Slabs pulled from oven" },
      { time: "09:30 AM", title: "Cooling & Slicing", desc: "Portioning into 9 squares" }
    ]
  },
  {
    id: "RAS1046",
    customerName: "Vignesh Kumar",
    phone: "+91 99445 66778",
    altPhone: "",
    date: "Today, 13 Oct 2026",
    slot: "Morning, 9 AM–1 PM",
    slotId: "slot-morning",
    locality: "Colachel",
    pincode: "629251",
    address: "Harbour Road, Opp. Fish Landing Centre, Colachel - 629251",
    paymentMethod: "COD",
    paymentStatus: "Cash on Delivery",
    paymentRef: "COD-PENDING",
    subtotal: 760,
    deliveryFee: 60,
    discount: 60,
    total: 760,
    status: "cooling",
    hasGiftMessage: false,
    giftMessage: null,
    items: [
      {
        name: "Slow-Roasted Kashmiri Walnut Brownie",
        quantity: 2,
        weight: "500 g each",
        unitPrice: 380,
        totalPrice: 760
      }
    ],
    notes: "Collect ₹760 cash on doorstep. Bring exact change if possible.",
    timeline: [
      { time: "08:00 AM", title: "COD Order Confirmed", desc: "Phone verification passed" },
      { time: "09:10 AM", title: "Freshly Baked", desc: "Rested on cooling racks" }
    ]
  },
  {
    id: "RAS1047",
    customerName: "Priya Soundar",
    phone: "+91 94888 33445",
    altPhone: "+91 94888 33446",
    date: "Today, 13 Oct 2026",
    slot: "Morning, 9 AM–1 PM",
    slotId: "slot-morning",
    locality: "Thuckalay",
    pincode: "629175",
    address: "71/B Palace Road, Near Royal Theater, Thuckalay - 629175",
    paymentMethod: "UPI",
    paymentStatus: "Paid via UPI",
    paymentRef: "UPI/PAYTM/4488229911",
    subtotal: 1540,
    deliveryFee: 0,
    discount: 200,
    total: 1340,
    status: "delivery",
    hasGiftMessage: true,
    giftMessage: {
      to: "Priya & Kids",
      from: "Aravind (Bangalore)",
      message: "Surprise treats for the vacation break! Enjoy the brownies hot with ice cream."
    },
    items: [
      {
        name: "Assorted Brownie Gift Box",
        quantity: 1,
        weight: "8 pcs",
        unitPrice: 890,
        totalPrice: 890
      },
      {
        name: "Sea Salt Amber Caramel Brownie Slab",
        quantity: 1,
        weight: "500 g",
        unitPrice: 650,
        totalPrice: 650
      }
    ],
    notes: "Hand to recipient directly.",
    timeline: [
      { time: "07:15 AM", title: "Order Confirmed", desc: "Paid ₹1,340" },
      { time: "08:45 AM", title: "Packed & Sealed", desc: "Foil embossed ribbon affixed" },
      { time: "09:30 AM", title: "Out for Delivery", desc: "Assigned to Courier Murugan on NH-66 Route" }
    ]
  },
  {
    id: "RAS1048",
    customerName: "Rahul Stephen",
    phone: "+91 94421 77889",
    altPhone: "",
    date: "Today, 13 Oct 2026",
    slot: "Morning, 9 AM–1 PM",
    slotId: "slot-morning",
    locality: "Nagercoil Central",
    pincode: "629001",
    address: "12, College Road, Near Scott Christian College, Nagercoil - 629001",
    paymentMethod: "UPI",
    paymentStatus: "Paid via UPI",
    paymentRef: "UPI/GPay/8811772233",
    subtotal: 450,
    deliveryFee: 40,
    discount: 40,
    total: 450,
    status: "delivery",
    hasGiftMessage: false,
    giftMessage: null,
    items: [
      {
        name: "Dark Chocolate Fudge Brownie",
        quantity: 1,
        weight: "500 g",
        unitPrice: 450,
        totalPrice: 450
      }
    ],
    notes: "Gate code: 1984.",
    timeline: [
      { time: "07:30 AM", title: "Order Processed", desc: "UPI Verified" },
      { time: "08:50 AM", title: "Boxed Warm", desc: "Thermal pouch inserted" },
      { time: "09:35 AM", title: "Out for Delivery", desc: "Rider Selvan en route" }
    ]
  },
  {
    id: "RAS1049",
    customerName: "Deepa S.",
    phone: "+91 98944 99001",
    altPhone: "",
    date: "Today, 13 Oct 2026",
    slot: "Morning, 9 AM–1 PM",
    slotId: "slot-morning",
    locality: "Kulasekharam",
    pincode: "629161",
    address: "Greenwood Estate Bungalow, Pechiparai Road, Kulasekharam - 629161",
    paymentMethod: "UPI",
    paymentStatus: "Paid via UPI",
    paymentRef: "UPI/AXIS/3300998811",
    subtotal: 1240,
    deliveryFee: 70,
    discount: 70,
    total: 1240,
    status: "completed",
    hasGiftMessage: true,
    giftMessage: {
      to: "Deepa",
      from: "Alumni Batch 2018",
      message: "Congratulations on opening your new clinic in Kulasekharam! Sweet success ahead!"
    },
    items: [
      {
        name: "Dark Chocolate Fudge Brownie",
        quantity: 2,
        weight: "500 g each",
        unitPrice: 450,
        totalPrice: 900
      },
      {
        name: "Lotus Biscoff Swirl Brownie Slab",
        quantity: 1,
        weight: "500 g",
        unitPrice: 380,
        totalPrice: 380
      }
    ],
    notes: "Delivered to reception desk at 09:45 AM. Received by Dr. Deepa.",
    timeline: [
      { time: "06:30 AM", title: "Early Morning Bake", desc: "Prioritized batch" },
      { time: "08:15 AM", title: "Dispatched", desc: "Courier Anand routed" },
      { time: "09:45 AM", title: "Delivered Successfully", desc: "Signed with OTP 4920" }
    ]
  },
  {
    id: "RAS1050",
    customerName: "Jerome Xavier",
    phone: "+91 97880 22334",
    altPhone: "",
    date: "Today, 13 Oct 2026",
    slot: "Evening, 5 PM–9 PM",
    slotId: "slot-evening",
    locality: "Nagercoil Central",
    pincode: "629001",
    address: "18, Water Tank Road, Carmel Nagar, Nagercoil - 629001",
    paymentMethod: "UPI",
    paymentStatus: "Paid via UPI",
    paymentRef: "UPI/SBIN/5544332211",
    subtotal: 890,
    deliveryFee: 40,
    discount: 40,
    total: 890,
    status: "received",
    hasGiftMessage: false,
    giftMessage: null,
    items: [
      {
        name: "Assorted Brownie Gift Box",
        quantity: 1,
        weight: "8 pcs",
        unitPrice: 890,
        totalPrice: 890
      }
    ],
    notes: "Family dessert after 7 PM.",
    timeline: [
      { time: "09:30 AM", title: "Order Booked", desc: "Reserved for Evening Slot" }
    ]
  },
  {
    id: "RAS1051",
    customerName: "Karthika Balan",
    phone: "+91 94877 66554",
    altPhone: "",
    date: "Today, 13 Oct 2026",
    slot: "Afternoon, 1 PM–5 PM",
    slotId: "slot-afternoon",
    locality: "Karungal",
    pincode: "629157",
    address: "Main Bazaar Road, Near Bus Stand, Karungal - 629157",
    paymentMethod: "Card",
    paymentStatus: "Paid via Card",
    paymentRef: "TXN/MAST/77889900",
    subtotal: 760,
    deliveryFee: 60,
    discount: 0,
    total: 820,
    status: "received",
    hasGiftMessage: false,
    giftMessage: null,
    items: [
      {
        name: "Lotus Biscoff Swirl Brownie Slab",
        quantity: 2,
        weight: "500 g each",
        unitPrice: 380,
        totalPrice: 760
      }
    ],
    notes: "Call before reaching Karungal junction.",
    timeline: [
      { time: "09:50 AM", title: "Order Booked", desc: "Awaiting Chef review" }
    ]
  }
];

export const INITIAL_ANALYTICS: AnalyticsData = {
  revenuePeriods: {
    today: {
      total: 24850,
      orders: 42,
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
