import type { Product } from '../types';

export const PRODUCTS: Product[] = [
  // ==================== 12 SIGNATURE ARTISANAL BROWNIES ====================
  {
    id: 'br-01',
    name: 'Belgian Dark Chocolate Fudge Slab',
    slug: 'belgian-dark-chocolate-fudge-slab',
    category: 'Classic Fudgy',
    price: 450,
    originalPrice: 480,
    rating: 4.9,
    reviews: 142,
    shortDescription: '70% Callebaut dark chocolate, Maldon sea salt flakes, molten fudgy core.',
    description: 'Our signature whole brownie slab made with 70% Single-Origin Belgian Callebaut chocolate, French cultured butter, and hand-harvested Maldon sea salt flakes. Dense, glossy crinkled top with a molten fudge center that melts like ganache.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'BEST SELLER',
    ingredients: ['70% Belgian Dark Chocolate', 'French Cultured Butter', 'Organic Brown Sugar', 'Free-range Eggs', 'Wheat Flour', 'Maldon Sea Salt'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    storageInfo: 'Store in an airtight container at room temperature for up to 5 days, or chill for up to 10 days. Warm for 15 seconds for a flowing molten centre.',
    deliveryInfo: 'Freshly baked every morning. Delivered in insulated artisanal bakery slab box.',
    available: true,
    isSignature: true,
    weight: '500g',
    pieces: 'Whole 500g Slab'
  },
  {
    id: 'br-02',
    name: 'Lotus Biscoff Swirl Brownie Slab',
    slug: 'lotus-biscoff-swirl-brownie-slab',
    category: 'Molten Centers',
    price: 480,
    originalPrice: 510,
    rating: 4.9,
    reviews: 130,
    shortDescription: 'Layered with molten spiced Lotus Biscoff speculoos ribbons & biscuit dust.',
    description: 'Our proprietary dark chocolate fudge slab with warm Belgian Lotus Biscoff speculoos spread marbled generously through the center and crusted with crispy caramelized speculoos crumbs.',
    image: 'https://images.unsplash.com/photo-1589218436045-ee320057f443?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1589218436045-ee320057f443?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'BEST SELLER',
    ingredients: ['Lotus Biscoff Spread', 'Belgian Dark Chocolate 64%', 'French Butter', 'Flour', 'Spiced Speculoos Crumbs', 'Eggs'],
    allergens: ['Dairy', 'Gluten', 'Eggs', 'Soy'],
    storageInfo: 'Keeps fresh up to 6 days at room temperature.',
    deliveryInfo: 'Packed in signature gold-lined box.',
    available: true,
    isSignature: true,
    weight: '500g',
    pieces: 'Whole 500g Slab'
  },
  {
    id: 'br-03',
    name: 'Nutella Hazelnut Molten Lava Brownie',
    slug: 'nutella-hazelnut-molten-lava-brownie',
    category: 'Molten Centers',
    price: 520,
    originalPrice: 550,
    rating: 4.8,
    reviews: 86,
    shortDescription: 'Slow-roasted Piedmont hazelnuts with a continuous molten Nutella core.',
    description: 'Deep roasted hazelnut fudge batter folded with 60% dark cocoa and harboring a continuous molten reservoir of pure Italian Nutella. Every slice gushes warm hazelnut chocolate.',
    image: 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'CHEF SPECIAL',
    ingredients: ['Pure Italian Nutella', 'Roasted Piedmont Hazelnuts', 'Belgian Cocoa', 'French Butter', 'Eggs', 'Flour'],
    allergens: ['Tree Nuts', 'Dairy', 'Gluten', 'Eggs'],
    storageInfo: 'Store airtight. Keeps 6 days room temperature, 2 weeks refrigerated.',
    deliveryInfo: 'Fresh morning bake with warm dispatch.',
    available: true,
    weight: '500g',
    pieces: 'Whole 500g Slab'
  },
  {
    id: 'br-04',
    name: 'Slow-Roasted Kashmiri Walnut Brownie',
    slug: 'slow-roasted-kashmiri-walnut-brownie',
    category: 'Nut & Crunch',
    price: 480,
    originalPrice: 500,
    rating: 4.9,
    reviews: 98,
    shortDescription: 'Golden butter-toasted Kashmiri walnuts folded into dense dark chocolate.',
    description: 'A classic heritage recipe packed with fresh slow-roasted Kashmiri walnuts. The buttery crunch of the nuts provides a breathtaking textural balance to the bittersweet fudge batter.',
    image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'BEST SELLER',
    ingredients: ['Kashmiri Walnuts', 'Callebaut 60% Dark Chocolate', 'French Cultured Butter', 'Organic Sugar', 'Dutch Cocoa', 'Flour', 'Eggs'],
    allergens: ['Nuts', 'Dairy', 'Gluten', 'Eggs'],
    storageInfo: 'Room temperature for 6 days.',
    deliveryInfo: 'Sealed for maximum crisp nuttiness.',
    available: true,
    weight: '500g',
    pieces: 'Whole 500g Slab'
  },
  {
    id: 'br-05',
    name: 'Sea Salt Amber Caramel Brownie Slab',
    slug: 'sea-salt-amber-caramel-brownie-slab',
    category: 'Molten Centers',
    price: 490,
    originalPrice: 520,
    rating: 4.9,
    reviews: 114,
    shortDescription: 'Artisanal golden butter caramel marbled with Guerande French sea salt.',
    description: 'Slow-cooked artisanal amber butter caramel swirled in thick waves through dark chocolate brownie batter, sprinkled with coarse French grey sea salt for the ultimate sweet-savory finish.',
    image: 'https://images.unsplash.com/photo-1589218436045-ee320057f443?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1589218436045-ee320057f443?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'BEST SELLER',
    ingredients: ['Housemade Amber Caramel', '70% Dark Chocolate', 'Heavy Whipping Cream', 'Guerande Sea Salt', 'Butter', 'Eggs', 'Flour'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    storageInfo: 'Ambient storage for 5 days.',
    deliveryInfo: 'Fresh batch delivered daily.',
    available: true,
    weight: '500g',
    pieces: 'Whole 500g Slab'
  },
  {
    id: 'br-06',
    name: 'Triple Chocolate Chunk Fudge Brownie',
    category: 'Classic Fudgy',
    slug: 'triple-chocolate-chunk-fudge-brownie',
    price: 460,
    rating: 4.9,
    reviews: 73,
    shortDescription: 'Loaded with hand-chopped 70% dark, 45% milk & creamy white chocolate chunks.',
    description: 'Three distinct chocolate profiles: intense dark chocolate batter folded with hand-chopped creamy Swiss milk chocolate and sweet velvet white chocolate chunks that puddle in the oven.',
    image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'BEST SELLER',
    ingredients: ['Belgian Dark Chocolate', 'Swiss Milk Chocolate', 'Ivory White Chocolate', 'Butter', 'Cocoa Powder', 'Flour', 'Eggs'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    storageInfo: 'Room temperature for 5 days.',
    deliveryInfo: 'Freshly baked.',
    available: true,
    weight: '500g',
    pieces: 'Whole 500g Slab'
  },
  {
    id: 'br-07',
    name: 'Red Velvet Cream Cheese Brownie',
    slug: 'red-velvet-cream-cheese-brownie',
    category: 'Special Editions',
    price: 520,
    rating: 4.8,
    reviews: 62,
    shortDescription: 'Crimson cocoa batter marbled with tangy Philadelphia cream cheese swirls.',
    description: 'Vibrant crimson cocoa brownie crowned with delicate artisan swirls of rich Philadelphia cream cheese. Delicately tart and supremely fudgy.',
    image: 'https://images.unsplash.com/photo-1534432182912-63863115e106?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1534432182912-63863115e106?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'NEW',
    ingredients: ['Philadelphia Cream Cheese', 'Pure Dutch Cocoa', 'Cultured Buttermilk', 'Bourbon Vanilla', 'Butter', 'Eggs', 'Flour'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    storageInfo: 'Keep chilled; consume within 5 days.',
    deliveryInfo: 'Temperature controlled packaging.',
    available: true,
    weight: '500g',
    pieces: 'Whole 500g Slab'
  },
  {
    id: 'br-08',
    name: 'Roasted Almond Praline Brownie Slab',
    slug: 'roasted-almond-praline-brownie-slab',
    category: 'Nut & Crunch',
    price: 510,
    rating: 4.8,
    reviews: 51,
    shortDescription: 'Golden caramelized Mamra almond brittle pressed into rich dark cocoa.',
    description: 'Crisp honeyed almond praline shards folded through dense 65% dark chocolate batter, delivering a fragrant toasty crunch in every single bite.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'LIMITED',
    ingredients: ['Mamra Almonds', 'Caramelized Praline', '65% Dark Chocolate', 'Butter', 'Cane Sugar', 'Eggs', 'Sea Salt'],
    allergens: ['Tree Nuts', 'Dairy', 'Gluten', 'Eggs'],
    storageInfo: 'Store airtight in cool place for 6 days.',
    deliveryInfo: 'Made in artisan small batches.',
    available: true,
    weight: '500g',
    pieces: 'Whole 500g Slab'
  },
  {
    id: 'br-09',
    name: 'Wayanad Espresso Dark Roast Brownie',
    slug: 'wayanad-espresso-dark-roast-brownie',
    category: 'Artisan Slabs',
    price: 470,
    originalPrice: 490,
    rating: 4.9,
    reviews: 67,
    shortDescription: 'Infused with freshly pulled South Indian filter coffee espresso reduction.',
    description: 'Infused with double-shot espresso reduction from Wayanad high-elevation Arabica beans. The aromatic coffee bitterness deepens and electrifies the 70% dark Belgian cocoa.',
    image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'CHEF SPECIAL',
    ingredients: ['Wayanad Arabica Espresso', '70% Dark Chocolate', 'French Cultured Butter', 'Organic Sugar', 'Eggs', 'Flour'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    storageInfo: 'Room temperature for 5 days.',
    deliveryInfo: 'Fresh morning bake.',
    available: true,
    weight: '500g',
    pieces: 'Whole 500g Slab'
  },
  {
    id: 'br-10',
    name: 'Grand Cru Orange Zest Dark Brownie',
    slug: 'grand-cru-orange-zest-dark-brownie',
    category: 'Artisan Slabs',
    price: 490,
    rating: 4.8,
    reviews: 44,
    shortDescription: 'Sun-ripened candied orange peel and Valencia orange oil in 72% dark cocoa.',
    description: 'A classic European pairing: natural Valencia orange essential oil and house-candied citrus peel infused into 72% single-origin dark chocolate fudge batter.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'NEW',
    ingredients: ['Valencia Orange Oil', 'Candied Orange Peel', '72% Dark Couverture', 'French Butter', 'Eggs', 'Flour'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    storageInfo: 'Store airtight in cool place for 6 days.',
    deliveryInfo: 'Delivered in luxury carton.',
    available: true,
    weight: '500g',
    pieces: 'Whole 500g Slab'
  },
  {
    id: 'br-11',
    name: 'White Chocolate Wild Raspberry Brownie',
    slug: 'white-chocolate-wild-raspberry-brownie',
    category: 'Special Editions',
    price: 540,
    originalPrice: 570,
    rating: 4.9,
    reviews: 58,
    shortDescription: 'Organic wild raspberry coulis reduction atop velvet Belgian white chocolate.',
    description: 'Tart wild raspberry compote swirled through rich dark cocoa batter and studded with sweet Belgian ivory white chocolate chunks for an exquisite tart-sweet contrast.',
    image: 'https://images.unsplash.com/photo-1534432182912-63863115e106?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1534432182912-63863115e106?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'BEST SELLER',
    ingredients: ['Organic Wild Raspberries', 'Belgian White Chocolate', 'Dark Chocolate 70%', 'French Butter', 'Eggs', 'Flour'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    storageInfo: 'Refrigerate upon arrival; best within 5 days.',
    deliveryInfo: 'Insulated packaging with cold gel pack.',
    available: true,
    weight: '500g',
    pieces: 'Whole 500g Slab'
  },
  {
    id: 'br-12',
    name: 'Roasted Salted Peanut Butter Swirl Brownie',
    slug: 'roasted-salted-peanut-butter-swirl-brownie',
    category: 'Nut & Crunch',
    price: 480,
    rating: 4.8,
    reviews: 79,
    shortDescription: 'Thick rivers of house-ground roasted peanut butter and Himalayan sea salt.',
    description: 'Thick creamy rivers of roasted salted peanut butter marbled into bittersweet 60% dark chocolate fudge, topped with chopped roasted peanuts for pure decadence.',
    image: 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&w=800&q=80',
    ],
    badge: 'BEST SELLER',
    ingredients: ['House-Ground Peanut Butter', 'Roasted Peanuts', 'Dark Chocolate 60%', 'Himalayan Pink Salt', 'Butter', 'Eggs', 'Flour'],
    allergens: ['Peanuts', 'Dairy', 'Gluten', 'Eggs'],
    storageInfo: 'Room temperature for 6 days.',
    deliveryInfo: 'Fresh morning bake guaranteed.',
    available: true,
    weight: '500g',
    pieces: 'Whole 500g Slab'
  }
];

export const CATEGORIES_LIST = [
  {
    id: 'Classic Fudgy',
    title: 'Classic Fudgy',
    tagline: '70% Callebaut dark chocolate molten fudge slabs',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    count: 2,
    slug: 'classic-fudgy'
  },
  {
    id: 'Molten Centers',
    title: 'Molten Centers',
    tagline: 'Nutella lava, Biscoff speculoos & amber caramel rivers',
    image: 'https://images.unsplash.com/photo-1589218436045-ee320057f443?auto=format&fit=crop&w=800&q=80',
    count: 3,
    slug: 'molten-centers'
  },
  {
    id: 'Nut & Crunch',
    title: 'Nut & Crunch',
    tagline: 'Roasted Kashmiri walnuts, Georgia pecans & Mamra almonds',
    image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80',
    count: 3,
    slug: 'nut-and-crunch'
  },
  {
    id: 'Artisan Slabs',
    title: 'Artisan Slabs',
    tagline: 'Wayanad espresso & Grand Cru orange zest reductions',
    image: 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&w=800&q=80',
    count: 2,
    slug: 'artisan-slabs'
  },
  {
    id: 'Special Editions',
    title: 'Special Editions',
    tagline: 'Red velvet cream cheese & wild raspberry swirls',
    image: 'https://images.unsplash.com/photo-1534432182912-63863115e106?auto=format&fit=crop&w=800&q=80',
    count: 2,
    slug: 'special-editions'
  }
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Sarah M.',
    location: 'Nagercoil, Kanniyakumari',
    quote: 'The Belgian Dark Chocolate Fudge slab is ridiculously good. That crinkle top and molten centre remind me of boutique pâtisseries in Paris.',
    rating: 5,
    verified: true,
    treat: 'Belgian Dark Chocolate Fudge Slab'
  },
  {
    id: 't-2',
    name: 'Aakash V.',
    location: 'Marthandam, Kanniyakumari',
    quote: 'Ordered the Lotus Biscoff Swirl slab for my family. It disappeared within ten minutes. Packaging looks like high-end luxury fashion.',
    rating: 5,
    verified: true,
    treat: 'Lotus Biscoff Swirl Brownie Slab'
  },
  {
    id: 't-3',
    name: 'Dr. Kavitha Raman',
    location: 'Asaripallam, Kanniyakumari',
    quote: 'Finding brownies that are truly fudgy and decadent is rare. The Kashmiri Walnut Brownie blew all my expectations away!',
    rating: 5,
    verified: true,
    treat: 'Slow-Roasted Kashmiri Walnut Brownie'
  },
  {
    id: 't-4',
    name: 'Vignesh Kumar',
    location: 'Colachel, Kanniyakumari',
    quote: 'The Sea Salt Amber Caramel Brownie slab had that authentic gooey molten centre. Chef Rasool’s creations are pure indulgence.',
    rating: 5,
    verified: true,
    treat: 'Sea Salt Amber Caramel Brownie Slab'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    caption: 'Fresh morning batch of our 70% Belgian dark chocolate fudge slabs cooling on the marble racks ✨',
    likes: '1.4k'
  },
  {
    id: 'ig-2',
    image: 'https://images.unsplash.com/photo-1589218436045-ee320057f443?auto=format&fit=crop&w=600&q=80',
    caption: 'Lotus Biscoff and golden salted caramel rivers swirled into hot dark cocoa batter 🍫',
    likes: '1.8k'
  },
  {
    id: 'ig-3',
    image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=600&q=80',
    caption: 'Slow-roasted Kashmiri walnuts folded into dense Callebaut fudge batter. Pure crunch.',
    likes: '2.1k'
  },
  {
    id: 'ig-4',
    image: 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&w=600&q=80',
    caption: 'Freshly baked molten Nutella brownie slabs out of the oven. Look at that crackly gloss ✨',
    likes: '3.2k'
  },
  {
    id: 'ig-5',
    image: 'https://images.unsplash.com/photo-1534432182912-63863115e106?auto=format&fit=crop&w=600&q=80',
    caption: 'Tangy wild raspberry reduction with Belgian white chocolate puddles. Exquisite contrast 🍓',
    likes: '1.6k'
  },
  {
    id: 'ig-6',
    image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=600&q=80',
    caption: 'Behind the scenes at Rasoolicious Atelier: hand-cutting 500g artisanal slabs for dispatch.',
    likes: '950'
  }
];
