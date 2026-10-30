import React, { createContext, useContext, useState } from 'react';
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
  StoreInfo
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

interface AdminContextType {
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
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  advanceOrderStatus: (orderId: string) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  toggleProductStatus: (productId: string) => void;
  updateSlotCapacity: (slotId: string, capacity: number, active: boolean) => void;
  addDeliveryZone: (zone: Omit<DeliveryZone, 'id'>) => void;
  toggleZoneStatus: (zoneId: string) => void;
  addUser: (user: Omit<User, 'id' | 'joined'>) => void;
  updateUser: (user: User) => void;
  deleteUser: (userId: string) => void;
  toggleUserStatus: (userId: string) => void;
  updateRole: (role: Role) => void;

  // Drawer & Modals
  selectedOrder: Order | null;
  openOrderDrawer: (order: Order) => void;
  closeOrderDrawer: () => void;
  activeModal: string | null;
  modalData: any;
  openModal: (modal: string, data?: any) => void;
  closeModal: () => void;

  // Filters & Search
  orderFilters: { search: string; status: string; slot: string; payment: string };
  setOrderFilters: React.Dispatch<React.SetStateAction<{ search: string; status: string; slot: string; payment: string }>>;
  inventoryCategory: string;
  setInventoryCategory: (cat: string) => void;
  inventorySearch: string;
  setInventorySearch: (s: string) => void;
  zoneSearch: string;
  setZoneSearch: (s: string) => void;
  userSearch: string;
  setUserSearch: (s: string) => void;
  userRoleFilter: string;
  setUserRoleFilter: (r: string) => void;

  // Notifications & Toasts
  notifications: AdminNotification[];
  removeNotification: (id: string) => void;
  toasts: ToastItem[];
  showToast: (message: string, type?: 'success' | 'warning' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<AdminScreen>('overview');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [activeRole, setActiveRole] = useState<UserRole>('Super Admin');

  // Entities
  const [store] = useState<StoreInfo>(INITIAL_STORE_INFO);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [deliverySlots, setDeliverySlots] = useState<DeliverySlot[]>(INITIAL_DELIVERY_SLOTS);
  const [deliveryZones, setDeliveryZones] = useState<DeliveryZone[]>(INITIAL_DELIVERY_ZONES);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [roles, setRoles] = useState<Role[]>(INITIAL_ROLES);

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

  // Notifications
  const [notifications, setNotifications] = useState<AdminNotification[]>([
    {
      id: 'notif-1',
      title: 'Evening Slot Full (20/20)',
      desc: 'Kanniyakumari delivery capacity reached for today',
      type: 'warning',
      screen: 'delivery-slots'
    },
    {
      id: 'notif-2',
      title: 'Deck Oven #1 Batch Ready',
      desc: 'Fudge brownies ready for cooling & slicing rack',
      type: 'oven',
      screen: 'kitchen-orders'
    },
    {
      id: 'notif-3',
      title: '8 Orders Pending Dispatch',
      desc: 'NH-66 courier pickup arriving in 15 mins',
      type: 'dispatch',
      screen: 'kitchen-orders'
    }
  ]);

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
  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
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

    // Also update selectedOrder if open
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
    const newId = `PROD-${String(products.length + 1).padStart(3, '0')}`;
    const newProd: Product = { ...prodData, id: newId };
    setProducts(prev => [newProd, ...prev]);
    showToast(`Added ${newProd.name} to catalogue`, 'success');
  };

  const updateProduct = (prod: Product) => {
    setProducts(prev => prev.map(p => (p.id === prod.id ? prod : p)));
    showToast(`Updated ${prod.name}`, 'success');
  };

  const toggleProductStatus = (productId: string) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id !== productId) return p;
        const nextStatus = p.status === 'In Stock' ? 'Sold Out' : 'In Stock';
        return { ...p, status: nextStatus };
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
