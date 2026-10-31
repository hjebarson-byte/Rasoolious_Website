export type CategoryType = 
  | 'All' 
  | 'Signature Brownies' 
  | 'Gift Boxes';

export type ProductStatus = 'In Stock' | 'Limited Stock' | 'Sold Out';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CategoryType;
  price: number;
  originalPrice?: number;
  salePrice?: number;
  dailyLimit?: number;
  booked?: number;
  status?: ProductStatus;
  rating: number;
  reviews: number;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
  badge?: 'BEST SELLER' | 'NEW' | 'LIMITED' | 'SALE' | 'CHEF SPECIAL';
  ingredients: string[] | string;
  allergens: string[];
  storageInfo: string;
  deliveryInfo: string;
  available: boolean;
  isEggless?: boolean;
  isSignature?: boolean;
  weight?: string;
  pieces?: string;
  freshToday?: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedFlavours?: string[];
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  deliveryOption: 'standard' | 'express' | 'pickup';
  paymentMethod: 'upi' | 'card' | 'cod';
  notes?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  customer: CustomerInfo;
  status: 'Confirmed' | 'Baking' | 'Out for Delivery' | 'Delivered';
}
