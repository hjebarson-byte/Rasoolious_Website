/**
 * Rasoolicious API Service
 * Connects the React Frontend to the FastAPI + MySQL Backend
 * Base URL defaults to http://127.0.0.1:8000/api (or custom VITE_API_BASE_URL)
 */

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api').replace(/\/$/, '');

export interface ApiProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  sale_price?: number;
  original_price?: number;
  weight: string;
  daily_limit: number;
  booked: number;
  status: 'In Stock' | 'Limited Stock' | 'Sold Out';
  available: boolean;
  image: string;
  short_description?: string;
  description?: string;
  ingredients?: string;
  allergens?: string;
  rating: number;
  reviews: number;
}

export interface ApiOrderItem {
  id?: number;
  product_id?: string;
  product_name: string;
  quantity: number;
  weight?: string;
  unit_price: number;
  total_price: number;
  selected_flavours?: string;
}

export interface ApiOrderCreatePayload {
  customer_name: string;
  phone: string;
  alt_phone?: string;
  address: string;
  locality?: string;
  pincode?: string;
  slot?: string;
  payment_method: string;
  payment_status: string;
  payment_ref?: string;
  subtotal: number;
  delivery_fee?: number;
  discount?: number;
  total: number;
  notes?: string;
  has_gift_message?: boolean;
  gift_message?: string;
  items: ApiOrderItem[];
}

export interface ApiOrderOut extends ApiOrderCreatePayload {
  id: string;
  status: string;
  created_at: string;
  whatsapp_owner_slip?: string;
  whatsapp_customer_chat?: string;
}

export interface ApiAnalyticsSummary {
  today_revenue: number;
  total_revenue: number;
  total_orders: number;
  pending_orders: number;
  delivered_orders: number;
  total_slabs_sold: number;
  best_sellers: Array<{
    name: string;
    units_sold: number;
    revenue: number;
  }>;
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error [${response.status}]: ${errorText || response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export const rasooliciousApi = {
  /**
   * Check if FastAPI backend is online and running
   */
  async checkHealth(): Promise<{ status: string; database: string; owner_phone: string } | null> {
    try {
      const rootUrl = API_BASE_URL.replace(/\/api$/, '');
      const res = await fetch(`${rootUrl}/health`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) return await res.json();
      return null;
    } catch {
      return null;
    }
  },

  /**
   * Fetch all products or by category
   */
  async getProducts(category?: string): Promise<ApiProduct[]> {
    const query = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
    return request<ApiProduct[]>(`/products${query}`);
  },

  /**
   * Fetch single product by ID or slug
   */
  async getProduct(productId: string): Promise<ApiProduct> {
    return request<ApiProduct>(`/products/${productId}`);
  },

  /**
   * Toggle product stock status (In Stock <-> Sold Out)
   */
  async toggleProductStatus(productId: string, status?: string): Promise<ApiProduct> {
    return request<ApiProduct>(`/products/${productId}/status`, {
      method: 'PATCH',
      body: status ? JSON.stringify({ status }) : undefined
    });
  },

  /**
   * Fetch all orders with optional status or search filter
   */
  async getOrders(status?: string, search?: string): Promise<ApiOrderOut[]> {
    const params = new URLSearchParams();
    if (status && status !== 'all') params.append('status', status);
    if (search && search.trim()) params.append('search', search.trim());
    const query = params.toString() ? `?${params.toString()}` : '';
    return request<ApiOrderOut[]>(`/orders${query}`);
  },

  /**
   * Submit a new customer order (from Checkout or Admin Modal)
   */
  async createOrder(payload: ApiOrderCreatePayload): Promise<ApiOrderOut> {
    return request<ApiOrderOut>('/orders', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  /**
   * Toggle or update order status (pending <-> completed)
   */
  async updateOrderStatus(orderId: string, status?: string): Promise<ApiOrderOut> {
    return request<ApiOrderOut>(`/orders/${orderId}/status`, {
      method: 'PATCH',
      body: status ? JSON.stringify({ status }) : undefined
    });
  },

  /**
   * Fetch live analytics and revenue statistics
   */
  async getAnalyticsSummary(): Promise<ApiAnalyticsSummary> {
    return request<ApiAnalyticsSummary>('/analytics/summary');
  },

  /**
   * Fetch daily summary WhatsApp direct dispatch link for Chef Rasool (9486518486)
   */
  async getDailySummaryUrl(): Promise<{ date: string; whatsapp_url: string; orders_count: number }> {
    return request<{ date: string; whatsapp_url: string; orders_count: number }>('/whatsapp/daily-summary');
  },

  /**
   * Fetch WhatsApp order slip link for a specific order
   */
  async getOrderSlipUrl(orderId: string): Promise<{ order_id: string; whatsapp_url: string }> {
    return request<{ order_id: string; whatsapp_url: string }>(`/whatsapp/order-slip/${orderId}`);
  },

  /**
   * Get payment gateway configuration (Razorpay key)
   */
  async getPaymentConfig(): Promise<{ gateway: string; key_id: string; currency: string; is_live: boolean; owner_whatsapp: string }> {
    return request<{ gateway: string; key_id: string; currency: string; is_live: boolean; owner_whatsapp: string }>('/payments/config');
  },

  /**
   * Create Razorpay Order session
   */
  async createPaymentOrder(amount: number, receipt?: string): Promise<{ order_id: string; amount: number; currency: string; key_id: string; note?: string }> {
    return request<{ order_id: string; amount: number; currency: string; key_id: string; note?: string }>('/payments/create-order', {
      method: 'POST',
      body: JSON.stringify({ amount, currency: 'INR', receipt })
    });
  },

  /**
   * Verify Razorpay payment and trigger automated WhatsApp notification to owner
   */
  async verifyPayment(payload: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature?: string;
    order_data: ApiOrderCreatePayload;
  }): Promise<{ status: string; message: string; order: ApiOrderOut; whatsapp_dispatch: any }> {
    return request<{ status: string; message: string; order: ApiOrderOut; whatsapp_dispatch: any }>('/payments/verify', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }
};

