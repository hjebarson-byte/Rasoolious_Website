export type OrderStatus = 'received' | 'oven' | 'cooling' | 'delivery' | 'completed';

export type UserRole = 'Super Admin' | 'Admin' | 'Kitchen Staff' | 'User';

export type ProductStatus = 'In Stock' | 'Limited Stock' | 'Sold Out';

export type ProductCategory = 'All' | 'Brownies' | 'Cookies' | 'Cakes' | 'Gift Boxes' | 'Specials';

export interface GiftMessage {
  to: string;
  from: string;
  message: string;
}

export interface OrderItem {
  name: string;
  quantity: number;
  weight: string;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderTimeline {
  time: string;
  title: string;
  desc: string;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  altPhone?: string;
  date: string;
  slot: string;
  slotId: string;
  locality: string;
  pincode: string;
  address: string;
  paymentMethod: 'UPI' | 'Card' | 'COD';
  paymentStatus: string;
  paymentRef: string;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  hasGiftMessage: boolean;
  giftMessage?: GiftMessage | null;
  items: OrderItem[];
  notes?: string;
  timeline: OrderTimeline[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  salePrice?: number;
  weight: string;
  dailyLimit: number;
  booked: number;
  status: ProductStatus;
  image: string;
  description: string;
  ingredients: string;
  allergens: string[];
  freshToday: boolean;
  featured: boolean;
}

export interface DeliverySlot {
  id: string;
  name: string;
  timeWindow: string;
  capacity: number;
  booked: number;
  active: boolean;
  description: string;
}

export interface DeliveryZone {
  id: string;
  pincode: string;
  locality: string;
  status: 'Active' | 'Inactive';
  standardFee: number;
  expressFee: number;
  deliveryTime: string;
}

export interface ModulePermissions {
  list: boolean;
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
  export: boolean;
}

export type PermissionModule = 
  | 'user' 
  | 'role' 
  | 'order' 
  | 'payment' 
  | 'product' 
  | 'category' 
  | 'delivery' 
  | 'analytics';

export interface Role {
  id: string;
  name: string;
  description: string;
  created: string;
  isSystem: boolean;
  permissions: Record<PermissionModule, ModulePermissions>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'Active' | 'Inactive';
  joined: string;
  phone: string;
  avatarBg?: string;
  avatarColor?: string;
}

export interface StoreInfo {
  name: string;
  tagline: string;
  location: string;
  fssaiLicense: string;
  gstin: string;
  currency: string;
  freeDeliveryThreshold: number;
  standardDeliveryFee: number;
  expressDeliveryFee: number;
  date: string;
}

export interface AnalyticsPeriodData {
  total: number;
  orders: number;
  labels: string[];
  data: number[];
}

export interface LeaderboardItem {
  rank: number;
  name: string;
  unitsSold: number;
  revenue: number;
  salesShare: number;
  image: string;
  category: string;
}

export interface StatusDistributionItem {
  status: string;
  count: number;
  percentage: number;
  color: string;
}

export interface BakeryInsight {
  type: 'warning' | 'success' | 'error' | 'info';
  title: string;
  text: string;
  icon: string;
}

export interface AnalyticsData {
  revenuePeriods: {
    today: AnalyticsPeriodData;
    week: AnalyticsPeriodData;
    month: AnalyticsPeriodData;
  };
  topTreatsLeaderboard: LeaderboardItem[];
  statusDistribution: StatusDistributionItem[];
  insights: BakeryInsight[];
}

export type AdminScreen = 
  | 'overview' 
  | 'kitchen-orders' 
  | 'inventory' 
  | 'delivery-slots' 
  | 'analytics' 
  | 'users' 
  | 'roles';
