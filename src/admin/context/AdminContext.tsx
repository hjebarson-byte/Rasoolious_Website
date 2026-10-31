import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  AdminScreen,
  Order,
  OrderStatus,
  Product,
  DeliverySlot,
  DeliveryZone,
  User,
  Role,
  UserRole,
  PermissionModule,
  StoreInfo,
  ProductStatus
} from '../types/adminTypes';
import {
  INITIAL_STORE_INFO,
  INITIAL_DELIVERY_SLOTS,
  INITIAL_PRODUCTS,
  INITIAL_DELIVERY_ZONES,
  INITIAL_ORDERS,
  INITIAL_ROLES,
  INITIAL_USERS
} from '../data/initialAdminData';
import { rasooliciousApi } from '../../services/api';

export interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
}

export interface AdminNotification {
  id: string;
  title: string;
  desc: string;
  type: 'warning' | 'oven' | 'dispatch';
  screen: AdminScreen;
}

const STORAGE_KEYS = {
  ORDERS: 'rasoolicious_orders',
  PRODUCTS: 'rasoolicious_products',
  STORE: 'rasoolicious_store_info',
  SLOTS: 'rasoolicious_delivery_slots',
  ZONES: 'rasoolicious_delivery_zones',
  USERS: 'rasoolicious_users',
  ROLES: 'rasoolicious_roles'
};

export interface AdminContextType {
  // Navigation & Shell
  currentScreen: AdminScreen;
  setCurrentScreen: (screen: AdminScreen) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  hasPermission: (module: PermissionModule, action: 'list' | 'view' | 'create' | 'edit' | 'delete' | 'export') => boolean;

  // Data
  store: StoreInfo;
  orders: Order[];
  products: Product[];
  deliverySlots: DeliverySlot[];
  deliveryZones: DeliveryZone[];
  users: User[];
  roles: Role[];

  // Mutations
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  advanceOrderStatus: (orderId: string) => void;
  addProduct: (prod: Omit<Product, 'id'>) => void;
  updateProduct: (prod: Product) => void;
  toggleProductStatus: (productId: string) => void;
  updateSlotCapacity: (slotId: string, capacity: number, active: boolean) => void;
  addDeliveryZone: (zone: Omit<DeliveryZone, 'id'>) => void;
  toggleZoneStatus: (zoneId: string) => void;
  addUser: (user: Omit<User, 'id' | 'joined'>) => void;
  updateUser: (user: User) => void;
  deleteUser: (userId: string) => void;
  toggleUserStatus: (userId: string) => void;
  updateRole: (role: Role) => void;

  // Drawer
  selectedOrder: Order | null;
  openOrderDrawer: (order: Order) => void;
  closeOrderDrawer: () => void;

  // Modals
  activeModal: string | null;
  modalData: any;
  openModal: (modal: string, data?: any) => void;
  closeModal: () => void;

  // Filtering
  orderFilters: {
    search: string;
    status: string;
    slot: string;
    payment: string;
  };
  setOrderFilters: React.Dispatch<React.SetStateAction<{
    search: string;
    status: string;
    slot: string;
    payment: string;
  }>>;
  inventoryCategory: string;
  setInventoryCategory: (cat: string) => void;
  inventorySearch: string;
  setInventorySearch: (search: string) => void;
  zoneSearch: string;
  setZoneSearch: (search: string) => void;
  userSearch: string;
  setUserSearch: (search: string) => void;
  userRoleFilter: string;
  setUserRoleFilter: (role: string) => void;

  // Notifications
  notifications: AdminNotification[];
  removeNotification: (id: string) => void;

  // Toasts
  toasts: ToastItem[];
  showToast: (message: string, type?: 'success' | 'warning' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<AdminScreen>('overview');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return true;
  });
  const [activeRole, setActiveRole] = useState<UserRole>('Super Admin');

  // Entities initialized from persistent localStorage with default fallbacks
  const [store] = useState<StoreInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STORE);
      if (saved) return JSON.parse(saved);
    } catch { /* ignore */ }
    return INITIAL_STORE_INFO;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (saved) {
        const parsed: Order[] = JSON.parse(saved);
        // Exclude hardcoded legacy mock dummy orders
        const mockNames = ["Sarah Joseph", "Ananthakrishnan M", "Maria Fernandez", "Priya Nair", "Vignesh Kumar", "Priya Soundar", "Rahul Stephen", "Deepa S.", "Jerome Xavier", "Karthika Balan"];
        const cleanOrders = parsed.filter(o => !mockNames.includes(o.customerName));
        return cleanOrders;
      }
    } catch { /* ignore */ }
    return INITIAL_ORDERS;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (saved) return JSON.parse(saved);
    } catch { /* ignore */ }
    return INITIAL_PRODUCTS;
  });

  const [deliverySlots, setDeliverySlots] = useState<DeliverySlot[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SLOTS);
      if (saved) return JSON.parse(saved);
    } catch { /* ignore */ }
    return INITIAL_DELIVERY_SLOTS;
  });

  const [deliveryZones, setDeliveryZones] = useState<DeliveryZone[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ZONES);
      if (saved) return JSON.parse(saved);
    } catch { /* ignore */ }
    return INITIAL_DELIVERY_ZONES;
  });

  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [roles, setRoles] = useState<Role[]>(INITIAL_ROLES);

  // Sync state to localStorage whenever modified
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to sync orders to localStorage', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to sync products to localStorage', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SLOTS, JSON.stringify(deliverySlots));
    } catch (e) {
      console.error('Failed to sync delivery slots to localStorage', e);
    }
  }, [deliverySlots]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ZONES, JSON.stringify(deliveryZones));
    } catch (e) {
      console.error('Failed to sync delivery zones to localStorage', e);
    }
  }, [deliveryZones]);

  // Real-time cross-tab & custom event listener
  useEffect(() => {
    const handleStorageSync = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.ORDERS && e.newValue) {
        try {
          setOrders(JSON.parse(e.newValue));
        } catch { /* ignore */ }
      }
      if (e.key === STORAGE_KEYS.PRODUCTS && e.newValue) {
        try {
          setProducts(JSON.parse(e.newValue));
        } catch { /* ignore */ }
      }
    };

    window.addEventListener('storage', handleStorageSync);
    return () => {
      window.removeEventListener('storage', handleStorageSync);
    };
  }, []);

  // Drawer & Modal State
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalData, setModalData] = useState<any>(null);

  // Filter States
  const [orderFilters, setOrderFilters] = useState({
    search: '',
    status: 'all',
    slot: 'all',
    payment: 'all'
  });
  const [inventoryCategory, setInventoryCategory] = useState<string>('All');
  const [inventorySearch, setInventorySearch] = useState<string>('');
  const [zoneSearch, setZoneSearch] = useState<string>('');
  const [userSearch, setUserSearch] = useState<string>('');
  const [userRoleFilter, setUserRoleFilter] = useState<string>('All');

  // Toast System
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const showToast = (message: string, type: 'success' | 'warning' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Notifications - start clean
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);

  // Fetch live database catalog and real orders from FastAPI backend on mount
  useEffect(() => {
    let isMounted = true;
    const loadBackendData = async () => {
      try {
        const health = await rasooliciousApi.checkHealth();
        if (health && isMounted) {
          const [backendProducts, backendOrders] = await Promise.all([
            rasooliciousApi.getProducts().catch(() => null),
            rasooliciousApi.getOrders().catch(() => null)
          ]);

          if (backendProducts && backendProducts.length > 0 && isMounted) {
            setProducts(backendProducts.map(bp => ({
              id: bp.id,
              name: bp.name,
              slug: bp.slug,
              category: bp.category,
              price: bp.price,
              salePrice: bp.sale_price,
              originalPrice: bp.original_price,
              weight: bp.weight,
              dailyLimit: bp.daily_limit,
              booked: bp.booked,
              status: bp.status,
              available: bp.available,
              image: bp.image,
              description: bp.description || '',
              shortDescription: bp.short_description || '',
              ingredients: bp.ingredients || '',
              allergens: bp.allergens ? bp.allergens.split(', ') : [],
              rating: bp.rating,
              reviews: bp.reviews,
              gallery: [bp.image],
              storageInfo: 'Store in an airtight container at room temperature.',
              deliveryInfo: 'Fresh morning bake sealed for maximum aroma.',
              pieces: bp.weight
            })));
          }

          if (backendOrders && isMounted) {
            const normalizePaymentMethod = (pm: string): 'UPI' | 'Card' | 'COD' => {
              const upper = (pm || '').toUpperCase();
              if (upper.includes('CARD') || upper.includes('VISA') || upper.includes('MAST')) return 'Card';
              if (upper.includes('COD') || upper.includes('CASH')) return 'COD';
              return 'UPI';
            };

            setOrders(backendOrders.map(bo => ({
              id: bo.id,
              customerName: bo.customer_name,
              phone: bo.phone,
              altPhone: bo.alt_phone || '',
              date: new Date(bo.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
              slot: bo.slot || 'Standard',
              slotId: 'slot-morning',
              locality: bo.locality || 'Nagercoil',
              pincode: bo.pincode || '629001',
              address: bo.address,
              paymentMethod: normalizePaymentMethod(bo.payment_method),
              paymentStatus: bo.payment_status,
              paymentRef: bo.payment_ref || '',
              subtotal: bo.subtotal,
              deliveryFee: bo.delivery_fee || 0,
              discount: bo.discount || 0,
              total: bo.total,
              status: (bo.status === 'completed' ? 'completed' : 'pending') as OrderStatus,
              hasGiftMessage: bo.has_gift_message || false,
              giftMessage: bo.gift_message ? { to: bo.customer_name, from: '', message: bo.gift_message } : null,
              items: bo.items.map(bi => ({
                name: bi.product_name,
                quantity: bi.quantity,
                weight: bi.weight || '500g Slab',
                unitPrice: bi.unit_price,
                totalPrice: bi.total_price
              })),
              notes: bo.notes || '',
              timeline: [
                { time: new Date(bo.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), title: 'Order Placed', desc: `Payment: ${bo.payment_status}` }
              ]
            })));
          }
        }
      } catch (err) {
        console.warn('Backend not reached, running in standalone mode:', err);
      }
    };

    loadBackendData();
    return () => { isMounted = false; };
  }, []);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Permission Checker
  const hasPermission = (module: PermissionModule, action: 'list' | 'view' | 'create' | 'edit' | 'delete' | 'export') => {
    const roleObj = roles.find(r => r.name.toLowerCase() === activeRole.toLowerCase());
    if (!roleObj) return true;
    return roleObj.permissions[module]?.[action] ?? false;
  };

  // Mutations
  const addOrder = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);

    // Persist to FastAPI MySQL/SQLite database
    rasooliciousApi.createOrder({
      customer_name: newOrder.customerName,
      phone: newOrder.phone,
      alt_phone: newOrder.altPhone,
      address: newOrder.address,
      locality: newOrder.locality,
      pincode: newOrder.pincode,
      slot: newOrder.slot,
      payment_method: newOrder.paymentMethod,
      payment_status: newOrder.paymentStatus,
      payment_ref: newOrder.paymentRef,
      subtotal: newOrder.subtotal,
      delivery_fee: newOrder.deliveryFee,
      discount: newOrder.discount,
      total: newOrder.total,
      notes: newOrder.notes,
      has_gift_message: newOrder.hasGiftMessage,
      gift_message: newOrder.giftMessage?.message,
      items: newOrder.items.map(i => ({
        product_name: i.name,
        quantity: i.quantity,
        weight: i.weight,
        unit_price: i.unitPrice,
        total_price: i.totalPrice
      }))
    }).catch(err => console.warn('Backend database sync note:', err));

    // Dynamically increment booked count for ordered brownies
    setProducts(prevProducts =>
      prevProducts.map(p => {
        const itemMatch = newOrder.items.find(
          item => item.name.toLowerCase().includes(p.name.toLowerCase()) || (p.id && item.name.toLowerCase().includes(p.id.toLowerCase()))
        );
        if (itemMatch) {
          const updatedBooked = (p.booked || 0) + itemMatch.quantity;
          const isNowSoldOut = updatedBooked >= (p.dailyLimit || 25);
          const isNowLimited = updatedBooked >= (p.dailyLimit || 25) - 4;
          const nextStatus: ProductStatus = isNowSoldOut 
            ? 'Sold Out' 
            : isNowLimited 
            ? 'Limited Stock' 
            : p.status;

          return {
            ...p,
            booked: updatedBooked,
            status: nextStatus,
            available: nextStatus !== 'Sold Out'
          };
        }
        return p;
      })
    );

    showToast(`Order #${newOrder.id} confirmed for ${newOrder.customerName}`, 'success');
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    rasooliciousApi.updateOrderStatus(orderId, newStatus).catch(() => null);

    const statusMapTitle: Record<string, string> = {
      pending: 'Order Confirmed & Pending',
      received: 'Order Confirmed',
      oven: 'In Progress',
      cooling: 'In Progress',
      delivery: 'Out for Delivery',
      completed: 'Delivered Successfully',
      cancelled: 'Order Cancelled'
    };

    setOrders(prev =>
      prev.map(ord => {
        if (ord.id !== orderId) return ord;
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const updatedTimeline = [
          ...ord.timeline,
          {
            time: timeStr,
            title: statusMapTitle[newStatus] || String(newStatus),
            desc: `Status updated by ${activeRole}`
          }
        ];
        return {
          ...ord,
          status: newStatus,
          timeline: updatedTimeline
        };
      })
    );

    setSelectedOrder(prev => (prev && prev.id === orderId ? { ...prev, status: newStatus } : prev));
    showToast(`Order #${orderId} marked as ${newStatus === 'completed' ? 'DELIVERED' : 'PENDING'}`, 'success');
  };

  const advanceOrderStatus = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    if (order.status !== 'completed') {
      updateOrderStatus(orderId, 'completed');
    } else {
      updateOrderStatus(orderId, 'pending');
    }
  };

  const addProduct = (prodData: Omit<Product, 'id'>) => {
    const newId = `br-custom-${Date.now()}`;
    const newProd: Product = { 
      ...prodData, 
      id: newId,
      available: prodData.status !== 'Sold Out'
    };
    setProducts(prev => [newProd, ...prev]);
    showToast(`Added ${newProd.name} to catalogue`, 'success');
  };

  const updateProduct = (prod: Product) => {
    setProducts(prev => prev.map(p => (p.id === prod.id ? {
      ...prod,
      available: prod.status !== 'Sold Out'
    } : p)));
    showToast(`Updated ${prod.name}`, 'success');
  };

  const toggleProductStatus = (productId: string) => {
    rasooliciousApi.toggleProductStatus(productId).catch(() => null);

    setProducts(prev =>
      prev.map(p => {
        if (p.id !== productId) return p;
        const nextStatus: ProductStatus = p.status === 'In Stock' ? 'Sold Out' : 'In Stock';
        return { 
          ...p, 
          status: nextStatus,
          available: nextStatus !== 'Sold Out'
        };
      })
    );
    showToast('Product status updated', 'info');
  };

  const updateSlotCapacity = (slotId: string, capacity: number, active: boolean) => {
    setDeliverySlots(prev =>
      prev.map(s => (s.id === slotId ? { ...s, capacity, active } : s))
    );
    showToast('Slot capacity updated', 'success');
  };

  const addDeliveryZone = (zoneData: Omit<DeliveryZone, 'id'>) => {
    const newId = `ZONE-${String(deliveryZones.length + 1).padStart(2, '0')}`;
    const newZone: DeliveryZone = { ...zoneData, id: newId };
    setDeliveryZones(prev => [...prev, newZone]);
    showToast(`Service zone ${newZone.locality} (${newZone.pincode}) added`, 'success');
  };

  const toggleZoneStatus = (zoneId: string) => {
    setDeliveryZones(prev =>
      prev.map(z => {
        if (z.id !== zoneId) return z;
        return { ...z, status: z.status === 'Active' ? 'Inactive' : 'Active' };
      })
    );
    showToast('Delivery zone updated', 'info');
  };

  const addUser = (userData: Omit<User, 'id' | 'joined'>) => {
    const newId = `usr-${String(users.length + 1).padStart(3, '0')}`;
    const today = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');
    const newUser: User = {
      ...userData,
      id: newId,
      joined: today,
      avatarBg: '#E0F2FE',
      avatarColor: '#0369A1'
    };
    setUsers(prev => [newUser, ...prev]);
    showToast(`User ${newUser.name} created successfully`, 'success');
  };

  const updateUser = (updatedUser: User) => {
    setUsers(prev => prev.map(u => (u.id === updatedUser.id ? updatedUser : u)));
    showToast(`User ${updatedUser.name} updated`, 'success');
  };

  const deleteUser = (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    showToast('User removed from system', 'warning');
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(prev =>
      prev.map(u => {
        if (u.id !== userId) return u;
        return { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' };
      })
    );
    showToast('User status changed', 'info');
  };

  const updateRole = (updatedRole: Role) => {
    setRoles(prev => prev.map(r => (r.id === updatedRole.id ? updatedRole : r)));
    showToast(`Permissions updated for role ${updatedRole.name}`, 'success');
  };

  // Drawer
  const openOrderDrawer = (order: Order) => {
    setSelectedOrder(order);
  };
  const closeOrderDrawer = () => {
    setSelectedOrder(null);
  };

  // Modals
  const openModal = (modal: string, data?: any) => {
    setActiveModal(modal);
    setModalData(data || null);
  };
  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
  };

  return (
    <AdminContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        sidebarOpen,
        setSidebarOpen,
        activeRole,
        setActiveRole,
        hasPermission,
        store,
        orders,
        products,
        deliverySlots,
        deliveryZones,
        users,
        roles,
        addOrder,
        updateOrderStatus,
        advanceOrderStatus,
        addProduct,
        updateProduct,
        toggleProductStatus,
        updateSlotCapacity,
        addDeliveryZone,
        toggleZoneStatus,
        addUser,
        updateUser,
        deleteUser,
        toggleUserStatus,
        updateRole,
        selectedOrder,
        openOrderDrawer,
        closeOrderDrawer,
        activeModal,
        modalData,
        openModal,
        closeModal,
        orderFilters,
        setOrderFilters,
        inventoryCategory,
        setInventoryCategory,
        inventorySearch,
        setInventorySearch,
        zoneSearch,
        setZoneSearch,
        userSearch,
        setUserSearch,
        userRoleFilter,
        setUserRoleFilter,
        notifications,
        removeNotification,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const useProducts = () => {
  const { products, toggleProductStatus, updateProduct } = useAdmin();
  return { products, toggleProductStatus, updateProduct };
};

export const useOrders = () => {
  const { orders, addOrder, updateOrderStatus, advanceOrderStatus } = useAdmin();
  return { orders, addOrder, updateOrderStatus, advanceOrderStatus };
};
