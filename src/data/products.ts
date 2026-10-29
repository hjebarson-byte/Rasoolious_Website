import type { Product } from '../types';

export const SIGNATURE_FLAVOURS = [
  'The Original',
  'The Rasool',
  'Double Chocolate',
  'Nutella',
  'Biscoff',
] as const;

export const PRODUCTS: Product[] = [
  // ==================== 1. THE ORIGINAL ====================
  {
    id: 'br-original',
    name: 'The Original',
    slug: 'the-original',
    category: 'Signature Brownies',
    price: 450,
    originalPrice: 480,
    rating: 4.9,
    reviews: 154,
    shortDescription: 'Classic chocolate indulgence.',
    description: 'Our timeless signature recipe that started it all. Dense, glossy crinkled top with a deeply rich, melt-in-the-mouth chocolate fudge center made with single-origin Belgian chocolate and French cultured butter.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'BEST SELLER',
    ingredients: ['70% Belgian Dark Chocolate', 'French Cultured Butter', 'Organic Brown Sugar', 'Free-range Eggs', 'Wheat Flour', 'Maldon Sea Salt'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    storageInfo: 'Store in an airtight container at room temperature for up to 5 days, or chill for up to 10 days. Warm for 15 seconds for a warm molten centre.',
    deliveryInfo: 'Freshly baked every morning. Delivered in our signature Rasoolicious bakery box.',
    available: true,
    isSignature: true,
    weight: '500g Slab',
    pieces: 'Whole 500g Slab'
  },

  // ==================== 2. THE RASOOL ====================
  {
    id: 'br-rasool',
    name: 'The Rasool',
    slug: 'the-rasool',
    category: 'Signature Brownies',
    price: 490,
    originalPrice: 520,
    rating: 5.0,
    reviews: 198,
    shortDescription: 'Our special creation, inspired by the love story behind our brand.',
    description: 'The heart and soul of Rasoolicious. Born from the very first batch baked with devotion for Rasool, this special creation features ultra-luxe velvety dark chocolate, subtle Bourbon vanilla bean caviar, and hand-harvested Maldon sea salt crystals. A true testament to love and unforgettable flavour.',
    image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'CHEF SPECIAL',
    ingredients: ['72% Belgian Couverture Chocolate', 'French Cultured Butter', 'Bourbon Vanilla Beans', 'Organic Cane Sugar', 'Free-range Eggs', 'Maldon Salt Flakes'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    storageInfo: 'Store in an airtight container at room temperature for up to 6 days. Best enjoyed slightly warmed.',
    deliveryInfo: 'Bespoke daily morning bake. Hand-packed with care.',
    available: true,
    isSignature: true,
    weight: '500g Slab',
    pieces: 'Whole 500g Slab'
  },

  // ==================== 3. DOUBLE CHOCOLATE ====================
  {
    id: 'br-double-chocolate',
    name: 'Double Chocolate',
    slug: 'double-chocolate',
    category: 'Signature Brownies',
    price: 480,
    originalPrice: 510,
    rating: 4.9,
    reviews: 112,
    shortDescription: 'Double the chocolate, double the delight.',
    description: 'Created for true cocoa obsessives. Double the chocolate, double the delight! We fold generous chunks of molten Swiss milk chocolate and dark chocolate into rich Dutch cocoa fudge batter, creating irresistible molten chocolate pockets in every single bite.',
    image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'NEW',
    ingredients: ['Belgian Dark Chocolate 70%', 'Swiss Milk Chocolate Chunks', 'Dutch Process Cocoa', 'French Butter', 'Eggs', 'Flour'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    storageInfo: 'Room temperature for 5 days. Warm gently for flowing chocolate chunks.',
    deliveryInfo: 'Fresh morning bake sealed for maximum aroma.',
    available: true,
    isSignature: true,
    weight: '500g Slab',
    pieces: 'Whole 500g Slab'
  },

  // ==================== 4. NUTELLA ====================
  {
    id: 'br-nutella',
    name: 'Nutella',
    slug: 'nutella',
    category: 'Signature Brownies',
    price: 520,
    originalPrice: 550,
    rating: 4.9,
    reviews: 167,
    shortDescription: 'A rich chocolate-hazelnut treat.',
    description: 'A decadent chocolate-hazelnut masterpiece. Dark fudge batter layered with slow-roasted toasted hazelnuts and marbled with a generous, continuous molten river of pure Italian Nutella. Rich, nutty, and completely irresistible.',
    image: 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589218436045-ee320057f443?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'BEST SELLER',
    ingredients: ['Pure Italian Nutella', 'Roasted Piedmont Hazelnuts', 'Belgian Cocoa', 'French Butter', 'Eggs', 'Flour'],
    allergens: ['Tree Nuts', 'Dairy', 'Gluten', 'Eggs'],
    storageInfo: 'Store airtight. Keeps 6 days at room temperature, 2 weeks refrigerated.',
    deliveryInfo: 'Fresh daily batch dispatch.',
    available: true,
    isSignature: true,
    weight: '500g Slab',
    pieces: 'Whole 500g Slab'
  },

  // ==================== 5. BISCOFF ====================
  {
    id: 'br-biscoff',
    name: 'Biscoff',
    slug: 'biscoff',
    category: 'Signature Brownies',
    price: 490,
    originalPrice: 520,
    rating: 4.9,
    reviews: 145,
    shortDescription: 'Chocolate brownies with a caramelised biscuit twist.',
    description: 'Our proprietary dark chocolate fudge brownie layered with thick molten ribbons of Belgian Lotus Biscoff speculoos spread, then crowned with crisp caramelised spiced biscuit crumbs for a mesmerizing sweet crunch.',
    image: 'https://images.unsplash.com/photo-1589218436045-ee320057f443?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1589218436045-ee320057f443?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'BEST SELLER',
    ingredients: ['Lotus Biscoff Spread', 'Lotus Speculoos Biscuits', 'Belgian Dark Chocolate 64%', 'French Butter', 'Flour', 'Eggs'],
    allergens: ['Dairy', 'Gluten', 'Eggs', 'Soy'],
    storageInfo: 'Keeps fresh up to 6 days at room temperature.',
    deliveryInfo: 'Packed in signature gold-embossed box.',
    available: true,
    isSignature: true,
    weight: '500g Slab',
    pieces: 'Whole 500g Slab'
  },

  // ==================== 6. THE RASOOLICIOUS GIFT BOX ====================
  {
    id: 'rasoolicious-gift-box',
    name: 'The Rasoolicious Gift Box',
    slug: 'the-rasoolicious-gift-box',
    category: 'Gift Boxes',
    price: 850,
    originalPrice: 950,
    rating: 5.0,
    reviews: 210,
    shortDescription: "Share a little happiness with a box of brownies made for life's sweetest moments.",
    description: "Share a little happiness with a box of brownies made for life's sweetest moments. Build your own bespoke box: choose any four brownies from our five signature flavours (The Original, The Rasool, Double Chocolate, Nutella, Biscoff) to create your own delicious combination. Packed in our luxury gold-foiled keepsake gift box with a satin ribbon and personalized gift card.",
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'BEST SELLER',
    ingredients: ['Selection of 4 Signature Brownies crafted with Belgian Chocolate, French Butter, Lotus Biscoff, Nutella, and Pure Bourbon Vanilla.'],
    allergens: ['Dairy', 'Gluten', 'Eggs', 'Tree Nuts (Nutella)'],
    storageInfo: 'Keeps fresh up to 6 days at room temperature. Perfect for gifting and celebrations.',
    deliveryInfo: 'Packed in deluxe insulated gift box with satin bow and greeting card.',
    available: true,
    isSignature: true,
    weight: 'Box of 4',
    pieces: '4 Brownies (Build Your Own Box)'
  }
];

export const CATEGORIES_LIST = [
  {
    id: 'Signature Brownies',
    title: 'Signature Brownies',
    tagline: 'Discover our five signature flavours crafted with love',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    count: 5,
    slug: 'signature-brownies'
  },
  {
    id: 'Gift Boxes',
    title: 'The Rasoolicious Gift Box',
    tagline: "Build your own box of any four signature brownies for life's sweetest moments",
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
    count: 1,
    slug: 'gift-boxes'
  }
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Sarah M.',
    location: 'Nagercoil, Kanniyakumari',
    quote: 'The Rasool brownie is pure magic. You can taste the genuine love and passion that inspired it. That delicate Maldon salt with rich dark chocolate is unforgettable.',
    rating: 5,
    verified: true,
    treat: 'The Rasool'
  },
  {
    id: 't-2',
    name: 'Aakash V.',
    location: 'Marthandam, Kanniyakumari',
    quote: 'We ordered The Rasoolicious Gift Box with 4 different flavours for an anniversary. The Biscoff and Nutella brownies disappeared in minutes! The packaging is top-tier luxury.',
    rating: 5,
    verified: true,
    treat: 'The Rasoolicious Gift Box'
  },
  {
    id: 't-3',
    name: 'Dr. Kavitha Raman',
    location: 'Asaripallam, Kanniyakumari',
    quote: 'The Original has the exact glossy crinkle top and gooey fudge center I always crave. Pure classic chocolate indulgence.',
    rating: 5,
    verified: true,
    treat: 'The Original'
  },
  {
    id: 't-4',
    name: 'Vignesh Kumar',
    location: 'Colachel, Kanniyakumari',
    quote: 'Double Chocolate lives up to every promise — double the chocolate, double the delight! Chef Rasool has created something truly special.',
    rating: 5,
    verified: true,
    treat: 'Double Chocolate'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    caption: 'Fresh morning batch of The Original cooling on the marble racks. A little love in every bite ✨',
    likes: '1.4k'
  },
  {
    id: 'ig-2',
    image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=600&q=80',
    caption: 'The Rasool — our heart and soul creation inspired by the love story behind our brand ❤️',
    likes: '2.8k'
  },
  {
    id: 'ig-3',
    image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=600&q=80',
    caption: 'Double Chocolate: double the chocolate, double the delight! Look at those molten pockets 🍫',
    likes: '1.9k'
  },
  {
    id: 'ig-4',
    image: 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&w=600&q=80',
    caption: 'Nutella hazelnut brownies straight from the deck oven with continuous molten rivers ✨',
    likes: '3.2k'
  },
  {
    id: 'ig-5',
    image: 'https://images.unsplash.com/photo-1589218436045-ee320057f443?auto=format&fit=crop&w=600&q=80',
    caption: 'Biscoff speculoos ribbons swirled through warm dark cocoa with caramelised biscuit crunch.',
    likes: '2.1k'
  },
  {
    id: 'ig-6',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80',
    caption: 'The Rasoolicious Gift Box: Choose any four brownies and share a little happiness with someone special 🎁',
    likes: '1.7k'
  }
];
