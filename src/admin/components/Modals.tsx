import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Lock, 
  UserPlus, 
  ShieldCheck, 
  Package, 
  Clock, 
  MapPin, 
  Eye, 
  EyeOff, 
  Gift 
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import type { Product, User, Role, PermissionModule, DeliveryZone, DeliverySlot } from '../types/adminTypes';

export const Modals: React.FC = () => {
  const { 
    activeModal, 
    modalData, 
    closeModal, 
    addProduct, 
    updateProduct, 
    updateSlotCapacity, 
    addDeliveryZone, 
    addUser, 
    updateUser, 
    updateRole
  } = useAdmin();

  if (!activeModal) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={closeModal} 
        className="fixed inset-0 bg-chocolate-950/75 backdrop-blur-xs transition-opacity" 
      />

      {/* Modal Containers */}
      <div className="relative z-10 w-full max-w-2xl bg-chocolate-950 text-cream-50 border border-chocolate-850 rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* 1. PRODUCT MODAL (ADD / EDIT) */}
        {(activeModal === 'addProduct' || activeModal === 'editProduct') && (
          <ProductModalForm 
            isEdit={activeModal === 'editProduct'} 
            initialData={modalData} 
            onClose={closeModal} 
            onSave={(prod) => {
              if (activeModal === 'editProduct') {
                updateProduct(prod as Product);
              } else {
                addProduct(prod);
              }
              closeModal();
            }}
          />
        )}

        {/* 2. EDIT SLOT CAPACITY MODAL */}
        {activeModal === 'editSlot' && (
          <SlotCapacityModalForm 
            slot={modalData as DeliverySlot} 
            onClose={closeModal} 
            onSave={(capacity, active) => {
              updateSlotCapacity(modalData.id, capacity, active);
              closeModal();
            }} 
          />
        )}

        {/* 3. ADD DELIVERY ZONE / PINCODE MODAL */}
        {activeModal === 'addZone' && (
          <AddZoneModalForm 
            onClose={closeModal} 
            onSave={(zone) => {
              addDeliveryZone(zone);
              closeModal();
            }} 
          />
        )}

        {/* 4. USER MODAL (ADD / EDIT) */}
        {(activeModal === 'addUser' || activeModal === 'editUser') && (
          <UserModalForm 
            isEdit={activeModal === 'editUser'} 
            initialData={modalData} 
            onClose={closeModal} 
            onSave={(u) => {
              if (activeModal === 'editUser') {
                updateUser(u as User);
              } else {
                addUser(u);
              }
              closeModal();
            }} 
          />
        )}

        {/* 5. ROLE & PERMISSION MATRIX MODAL */}
        {activeModal === 'editRole' && (
          <RoleMatrixModalForm 
            role={modalData as Role} 
            onClose={closeModal} 
            onSave={(updated) => {
              updateRole(updated);
              closeModal();
            }} 
          />
        )}

        {/* 6. PRINT LUXURY GIFT CARD MODAL */}
        {activeModal === 'printGiftCard' && (
          <GiftCardModalView 
            order={modalData} 
            onClose={closeModal} 
          />
        )}

        {/* 7. VIEW USER PROFILE MODAL */}
        {activeModal === 'viewUser' && (
          <ViewUserProfileModal 
            user={modalData as User} 
            onClose={closeModal} 
          />
        )}

      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 1. PRODUCT MODAL FORM
// -------------------------------------------------------------
const ProductModalForm: React.FC<{
  isEdit: boolean;
  initialData?: Product;
  onClose: () => void;
  onSave: (prod: any) => void;
}> = ({ isEdit, initialData, onClose, onSave }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [category, setCategory] = useState(initialData?.category || 'Brownies');
  const [weight, setWeight] = useState(initialData?.weight || '500 g');
  const [price, setPrice] = useState(initialData?.price || 450);
  const [salePrice, setSalePrice] = useState(initialData?.salePrice || 420);
  const [dailyLimit, setDailyLimit] = useState(initialData?.dailyLimit || 25);
  const [description, setDescription] = useState(initialData?.description || '');
  const [ingredients, setIngredients] = useState(initialData?.ingredients || '');
  const [allergens, setAllergens] = useState<string[]>(initialData?.allergens || ['Eggs', 'Dairy', 'Gluten']);
  const [featured, setFeatured] = useState(initialData?.featured ?? true);

  const toggleAllergen = (item: string) => {
    setAllergens(prev =>
      prev.includes(item) ? prev.filter(a => a !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...(initialData || {}),
      name,
      category,
      weight,
      price: Number(price),
      salePrice: Number(salePrice),
      dailyLimit: Number(dailyLimit),
      booked: initialData?.booked || 0,
      status: initialData?.status || 'In Stock',
      image: initialData?.image || '/images/fudge_brownie.jpg',
      description,
      ingredients,
      allergens,
      freshToday: true,
      featured
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-5 border-b border-chocolate-850 flex items-center justify-between bg-chocolate-900/60">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-caramel-500/20 text-caramel-400">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-cream-50">
              {isEdit ? `Edit Treat: ${initialData?.name}` : '+ Add New Bakery Treat'}
            </h3>
            <p className="text-xs text-chocolate-400">Specify batch portions, daily kitchen limit and artisan pricing.</p>
          </div>
        </div>
        <button type="button" onClick={onClose} className="p-1.5 rounded-lg text-chocolate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 space-y-4 text-xs max-h-[75vh] overflow-y-auto">
        <div>
          <label className="block text-[11px] font-bold text-chocolate-300 uppercase mb-1">Treat Title *</label>
          <input
            type="text"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Belgian Dark Chocolate Molten Slab"
            className="w-full bg-chocolate-900 border border-chocolate-750 rounded-xl px-3.5 py-2.5 text-cream-50 focus:border-caramel-400 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-chocolate-300 uppercase mb-1">Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full bg-chocolate-900 border border-chocolate-750 rounded-xl px-3.5 py-2.5 text-cream-50 focus:border-caramel-400 focus:outline-none"
            >
              <option value="Brownies">Brownies</option>
              <option value="Cookies">Cookies</option>
              <option value="Cakes">Cakes</option>
              <option value="Gift Boxes">Gift Boxes</option>
              <option value="Specials">Specials</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-chocolate-300 uppercase mb-1">Portion / Weight</label>
            <input
              type="text"
              value={weight}
              onChange={e => setWeight(e.target.value)}
              placeholder="e.g. 500 g or 4 pcs (440 g)"
              className="w-full bg-chocolate-900 border border-chocolate-750 rounded-xl px-3.5 py-2.5 text-cream-50 focus:border-caramel-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-chocolate-300 uppercase mb-1">Regular Price (₹) *</label>
            <input
              type="number"
              required
              min="0"
              value={price}
              onChange={e => setPrice(Number(e.target.value))}
              className="w-full bg-chocolate-900 border border-chocolate-750 rounded-xl px-3.5 py-2.5 text-cream-50 focus:border-caramel-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-chocolate-300 uppercase mb-1">Offer Price (₹)</label>
            <input
              type="number"
              min="0"
              value={salePrice}
              onChange={e => setSalePrice(Number(e.target.value))}
              className="w-full bg-chocolate-900 border border-chocolate-750 rounded-xl px-3.5 py-2.5 text-cream-50 focus:border-caramel-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-chocolate-300 uppercase mb-1">Daily Limit (Trays) *</label>
            <input
              type="number"
              required
              min="1"
              value={dailyLimit}
              onChange={e => setDailyLimit(Number(e.target.value))}
              className="w-full bg-chocolate-900 border border-chocolate-750 rounded-xl px-3.5 py-2.5 text-cream-50 focus:border-caramel-400 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-chocolate-300 uppercase mb-1">Artisan Description</label>
          <textarea
            rows={2}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Tasting notes, cocoa percentage and texture..."
            className="w-full bg-chocolate-900 border border-chocolate-750 rounded-xl px-3.5 py-2.5 text-cream-50 focus:border-caramel-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-chocolate-300 uppercase mb-1">Ingredients</label>
          <input
            type="text"
            value={ingredients}
            onChange={e => setIngredients(e.target.value)}
            placeholder="e.g. 70% Callebaut Dark Chocolate, French Cultured Butter, Organic Sugar"
            className="w-full bg-chocolate-900 border border-chocolate-750 rounded-xl px-3.5 py-2.5 text-cream-50 focus:border-caramel-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-chocolate-300 uppercase mb-2">Allergens</label>
          <div className="flex flex-wrap gap-3">
            {['Eggs', 'Dairy', 'Gluten', 'Nuts', 'Soy'].map(allergen => (
              <label key={allergen} className="flex items-center gap-1.5 cursor-pointer text-chocolate-200">
                <input
                  type="checkbox"
                  checked={allergens.includes(allergen)}
                  onChange={() => toggleAllergen(allergen)}
                  className="rounded border-chocolate-700 text-caramel-500 focus:ring-caramel-400"
                />
                <span>{allergen}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="pt-1">
          <label className="flex items-center gap-2 cursor-pointer text-chocolate-200">
            <input
              type="checkbox"
              checked={featured}
              onChange={e => setFeatured(e.target.checked)}
              className="rounded border-chocolate-700 text-caramel-500 focus:ring-caramel-400"
            />
            <span className="font-semibold text-cream-100">Feature this treat prominently on storefront showcase</span>
          </label>
        </div>
      </div>

      <div className="p-4 border-t border-chocolate-850 bg-chocolate-900/60 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-chocolate-800 hover:bg-chocolate-700 text-cream-200 font-semibold transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-caramel-500 hover:bg-caramel-400 text-chocolate-950 font-bold transition-colors shadow-sm"
        >
          {isEdit ? 'Save Changes' : 'Create Treat'}
        </button>
      </div>
    </form>
  );
};

// -------------------------------------------------------------
// 2. EDIT SLOT CAPACITY MODAL
// -------------------------------------------------------------
const SlotCapacityModalForm: React.FC<{
  slot: DeliverySlot;
  onClose: () => void;
  onSave: (capacity: number, active: boolean) => void;
}> = ({ slot, onClose, onSave }) => {
  const [capacity, setCapacity] = useState(slot.capacity);
  const [active, setActive] = useState(slot.active);

  return (
    <div>
      <div className="p-5 border-b border-chocolate-850 flex items-center justify-between bg-chocolate-900/60">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-cream-50">Edit Delivery Slot Capacity</h3>
            <p className="text-xs text-chocolate-400">{slot.name} ({slot.timeWindow})</p>
          </div>
        </div>
        <button type="button" onClick={onClose} className="p-1.5 rounded-lg text-chocolate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 space-y-4 text-xs">
        <div className="bg-chocolate-900 border border-chocolate-800 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-chocolate-400">Current Booked for Today</div>
            <div className="text-xl font-bold font-mono text-caramel-300">{slot.booked} orders</div>
          </div>
          <div className="text-right">
            <div className="text-chocolate-400">Status</div>
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
              slot.booked >= slot.capacity ? 'bg-terracotta-500/20 text-terracotta-300' : 'bg-emerald-500/20 text-emerald-300'
            }`}>
              {slot.booked >= slot.capacity ? 'FULL' : 'AVAILABLE'}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-chocolate-300 uppercase mb-1">
            Maximum Order Capacity (Per Day)
          </label>
          <input
            type="number"
            min={slot.booked}
            max="100"
            value={capacity}
            onChange={e => setCapacity(Number(e.target.value))}
            className="w-full bg-chocolate-900 border border-chocolate-750 rounded-xl px-3.5 py-2.5 text-cream-50 focus:border-caramel-400 focus:outline-none font-mono text-sm"
          />
          <p className="text-[11px] text-chocolate-400 mt-1">
            Once orders reach this ceiling, the customer storefront automatically marks this slot SOLD OUT.
          </p>
        </div>

        <div className="pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={active}
              onChange={e => setActive(e.target.checked)}
              className="rounded border-chocolate-700 text-caramel-500 focus:ring-caramel-400"
            />
            <span className="font-semibold text-cream-100">Enable this slot for online customer checkout</span>
          </label>
        </div>
      </div>

      <div className="p-4 border-t border-chocolate-850 bg-chocolate-900/60 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-chocolate-800 hover:bg-chocolate-700 text-cream-200 font-semibold"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => onSave(capacity, active)}
          className="px-5 py-2 rounded-xl bg-caramel-500 hover:bg-caramel-400 text-chocolate-950 font-bold shadow-sm"
        >
          Update Capacity
        </button>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 3. ADD ZONE MODAL FORM
// -------------------------------------------------------------
const AddZoneModalForm: React.FC<{
  onClose: () => void;
  onSave: (zone: Omit<DeliveryZone, 'id'>) => void;
}> = ({ onClose, onSave }) => {
  const [pincode, setPincode] = useState('');
  const [locality, setLocality] = useState('');
  const [standardFee, setStandardFee] = useState(50);
  const [expressFee, setExpressFee] = useState(90);
  const [deliveryTime, setDeliveryTime] = useState('40–55 mins');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      pincode,
      locality,
      standardFee: Number(standardFee),
      expressFee: Number(expressFee),
      deliveryTime,
      status: 'Active'
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-5 border-b border-chocolate-850 flex items-center justify-between bg-chocolate-900/60">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-caramel-500/20 text-caramel-400">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-cream-50">+ Add Kanniyakumari Delivery Zone</h3>
            <p className="text-xs text-chocolate-400">Configure serviceable pincode and delivery courier fee tier.</p>
          </div>
        </div>
        <button type="button" onClick={onClose} className="p-1.5 rounded-lg text-chocolate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-chocolate-300 uppercase mb-1">Postal Pincode *</label>
            <input
              type="text"
              required
              maxLength={6}
              value={pincode}
              onChange={e => setPincode(e.target.value)}
              placeholder="e.g. 629165"
              className="w-full bg-chocolate-900 border border-chocolate-750 rounded-xl px-3.5 py-2.5 text-cream-50 focus:border-caramel-400 focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-chocolate-300 uppercase mb-1">Locality / Town Name *</label>
            <input
              type="text"
              required
              value={locality}
              onChange={e => setLocality(e.target.value)}
              placeholder="e.g. Kuzhithurai & Kaliakkavilai"
              className="w-full bg-chocolate-900 border border-chocolate-750 rounded-xl px-3.5 py-2.5 text-cream-50 focus:border-caramel-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-chocolate-300 uppercase mb-1">Standard Delivery Fee (₹)</label>
            <input
              type="number"
              min="0"
              value={standardFee}
              onChange={e => setStandardFee(Number(e.target.value))}
              className="w-full bg-chocolate-900 border border-chocolate-750 rounded-xl px-3.5 py-2.5 text-cream-50 focus:border-caramel-400 focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-chocolate-300 uppercase mb-1">Express Delivery Fee (₹)</label>
            <input
              type="number"
              min="0"
              value={expressFee}
              onChange={e => setExpressFee(Number(e.target.value))}
              className="w-full bg-chocolate-900 border border-chocolate-750 rounded-xl px-3.5 py-2.5 text-cream-50 focus:border-caramel-400 focus:outline-none font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-chocolate-300 uppercase mb-1">Estimated Courier Transit Time</label>
          <input
            type="text"
            value={deliveryTime}
            onChange={e => setDeliveryTime(e.target.value)}
            placeholder="e.g. 40–55 mins"
            className="w-full bg-chocolate-900 border border-chocolate-750 rounded-xl px-3.5 py-2.5 text-cream-50 focus:border-caramel-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="p-4 border-t border-chocolate-850 bg-chocolate-900/60 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-chocolate-800 hover:bg-chocolate-700 text-cream-200 font-semibold"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-caramel-500 hover:bg-caramel-400 text-chocolate-950 font-bold shadow-sm"
        >
          Add Delivery Zone
        </button>
      </div>
    </form>
  );
};

// -------------------------------------------------------------
// 4. USER MODAL FORM
// -------------------------------------------------------------
const UserModalForm: React.FC<{
  isEdit: boolean;
  initialData?: User;
  onClose: () => void;
  onSave: (user: any) => void;
}> = ({ isEdit, initialData, onClose, onSave }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState(initialData?.role || 'User');
  const [status, setStatus] = useState(initialData?.status || 'Active');
  const [phone, setPhone] = useState(initialData?.phone || '+91 ');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...(initialData || {}),
      name,
      email,
      role,
      status,
      phone
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-5 border-b border-chocolate-850 flex items-center justify-between bg-chocolate-900/60">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-cream-50">
              {isEdit ? `Edit User: ${initialData?.name}` : 'Create New Bakery Portal User'}
            </h3>
            <p className="text-xs text-chocolate-400">Assign role access and bakery management permissions.</p>
          </div>
        </div>
        <button type="button" onClick={onClose} className="p-1.5 rounded-lg text-chocolate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-chocolate-300 uppercase mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Arun Kumar P"
              className="w-full bg-chocolate-900 border border-chocolate-750 rounded-xl px-3.5 py-2.5 text-cream-50 focus:border-caramel-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-chocolate-300 uppercase mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="e.g. arun@example.com"
              className="w-full bg-chocolate-900 border border-chocolate-750 rounded-xl px-3.5 py-2.5 text-cream-50 focus:border-caramel-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-chocolate-300 uppercase mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder={isEdit ? 'Leave blank to keep unchanged' : 'Enter secure password'}
                className="w-full bg-chocolate-900 border border-chocolate-750 rounded-xl px-3.5 py-2.5 pr-10 text-cream-50 focus:border-caramel-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-chocolate-400 hover:text-cream-100"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-chocolate-300 uppercase mb-1">Role Position *</label>
            <select
              value={role}
              onChange={e => setRole(e.target.value as any)}
              className="w-full bg-chocolate-900 border border-chocolate-750 rounded-xl px-3.5 py-2.5 text-cream-50 focus:border-caramel-400 focus:outline-none"
            >
              <option value="Super Admin">Super Admin</option>
              <option value="Admin">Admin</option>
              <option value="Kitchen Staff">Kitchen Staff</option>
              <option value="User">User</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-chocolate-300 uppercase mb-1">Account Status</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value as any)}
              className="w-full bg-chocolate-900 border border-chocolate-750 rounded-xl px-3.5 py-2.5 text-cream-50 focus:border-caramel-400 focus:outline-none"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-chocolate-300 uppercase mb-1">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+91 98421 88390"
              className="w-full bg-chocolate-900 border border-chocolate-750 rounded-xl px-3.5 py-2.5 text-cream-50 focus:border-caramel-400 focus:outline-none font-mono"
            />
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-chocolate-850 bg-chocolate-900/60 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-chocolate-800 hover:bg-chocolate-700 text-cream-200 font-semibold"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-sm"
        >
          {isEdit ? 'Save User Changes' : 'Create User'}
        </button>
      </div>
    </form>
  );
};

// -------------------------------------------------------------
// 5. ROLE & PERMISSION MATRIX MODAL
// -------------------------------------------------------------
const RoleMatrixModalForm: React.FC<{
  role: Role;
  onClose: () => void;
  onSave: (role: Role) => void;
}> = ({ role, onClose, onSave }) => {
  const [name, setName] = useState(role.name);
  const [description, setDescription] = useState(role.description);
  const [permissions, setPermissions] = useState(JSON.parse(JSON.stringify(role.permissions)));

  const modules: { key: PermissionModule; label: string }[] = [
    { key: 'user', label: 'USER' },
    { key: 'role', label: 'ROLE' },
    { key: 'order', label: 'ORDER' },
    { key: 'payment', label: 'PAYMENT' },
    { key: 'product', label: 'PRODUCT' },
    { key: 'category', label: 'CATEGORY' },
    { key: 'delivery', label: 'DELIVERY' },
    { key: 'analytics', label: 'ANALYTICS' }
  ];

  const actions = ['list', 'view', 'create', 'edit', 'delete', 'export'] as const;

  const togglePermission = (mod: PermissionModule, act: typeof actions[number]) => {
    setPermissions((prev: any) => ({
      ...prev,
      [mod]: {
        ...prev[mod],
        [act]: !prev[mod][act]
      }
    }));
  };

  const toggleAll = (enable: boolean) => {
    const updated: any = {};
    modules.forEach(m => {
      updated[m.key] = {
        list: enable,
        view: enable,
        create: enable,
        edit: enable,
        delete: enable,
        export: enable
      };
    });
    setPermissions(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...role,
      name,
      description,
      permissions
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl">
      <div className="p-5 border-b border-chocolate-850 flex items-center justify-between bg-teal-800 text-white">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-white">Edit Role: {role.name}</h3>
            <div className="flex items-center gap-3 text-[11px] text-white/80 mt-0.5">
              <span>Created: {role.created}</span>
              <span>•</span>
              <span>ID: {role.id}</span>
            </div>
          </div>
        </div>
        <button type="button" onClick={onClose} className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 space-y-5 text-xs max-h-[75vh] overflow-y-auto">
        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold text-chocolate-300 uppercase mb-1">Role Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-chocolate-900 border border-chocolate-750 rounded-xl px-3.5 py-2.5 text-cream-50 focus:border-caramel-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-chocolate-300 uppercase mb-1">Role Description</label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full bg-chocolate-900 border border-chocolate-750 rounded-xl px-3.5 py-2.5 text-cream-50 focus:border-caramel-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Permission Matrix Card */}
        <div className="border border-chocolate-800 rounded-2xl overflow-hidden bg-chocolate-900/60 shadow-inner">
          <div className="p-3 bg-chocolate-900 border-b border-chocolate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-cream-100">
              <Lock className="w-4 h-4 text-teal-400" />
              <span>Permission Matrix (8 Modules × 6 Capabilities)</span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <button
                type="button"
                onClick={() => toggleAll(true)}
                className="text-teal-400 hover:text-teal-300 font-semibold"
              >
                Select All
              </button>
              <span className="text-chocolate-600">|</span>
              <button
                type="button"
                onClick={() => toggleAll(false)}
                className="text-chocolate-400 hover:text-white font-semibold"
              >
                Deselect All
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-chocolate-800 text-[10px] text-chocolate-400 uppercase tracking-wider bg-chocolate-950/40">
                  <th className="py-2.5 px-4 font-bold text-cream-200">MODULE</th>
                  <th className="py-2.5 px-3 text-center">LIST</th>
                  <th className="py-2.5 px-3 text-center">VIEW</th>
                  <th className="py-2.5 px-3 text-center">CREATE</th>
                  <th className="py-2.5 px-3 text-center">EDIT</th>
                  <th className="py-2.5 px-3 text-center">DELETE</th>
                  <th className="py-2.5 px-3 text-center">EXPORT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-chocolate-850">
                {modules.map(m => (
                  <tr key={m.key} className="hover:bg-chocolate-850/40 transition-colors">
                    <td className="py-2.5 px-4 font-bold text-cream-100 font-mono text-[11px]">
                      {m.label}
                    </td>
                    {actions.map(act => {
                      const isChecked = permissions[m.key]?.[act] ?? false;
                      return (
                        <td key={act} className="py-2.5 px-3 text-center">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => togglePermission(m.key, act)}
                            className="rounded border-chocolate-700 text-teal-600 focus:ring-teal-400 cursor-pointer"
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-chocolate-850 bg-chocolate-900/60 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-chocolate-800 hover:bg-chocolate-700 text-cream-200 font-semibold"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold shadow-sm"
        >
          Save Permissions Matrix
        </button>
      </div>
    </form>
  );
};

// -------------------------------------------------------------
// 6. PRINT LUXURY GIFT CARD MODAL
// -------------------------------------------------------------
const GiftCardModalView: React.FC<{
  order: any;
  onClose: () => void;
}> = ({ order, onClose }) => {
  const { showToast } = useAdmin();

  if (!order || !order.giftMessage) return null;

  const handlePrint = () => {
    window.print();
    showToast('Sent gift card to printer', 'success');
  };

  return (
    <div>
      <div className="p-5 border-b border-chocolate-850 flex items-center justify-between bg-chocolate-900/60">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-caramel-500/20 text-caramel-400">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-cream-50">Print Handcrafted Gift Card</h3>
            <p className="text-xs text-chocolate-400">Parchment greeting card for order #{order.id}</p>
          </div>
        </div>
        <button type="button" onClick={onClose} className="p-1.5 rounded-lg text-chocolate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 flex justify-center bg-chocolate-950">
        {/* Luxury Gold Border Card Preview */}
        <div className="w-full max-w-md bg-[#FFFDF9] text-[#2C1810] p-8 rounded-2xl border-4 border-[#C68037]/60 shadow-2xl relative">
          <div className="text-center pb-4 border-b border-[#C68037]/30">
            <span className="font-serif font-bold text-xl tracking-wider text-[#2C1810]">Rasolicious</span>
            <div className="text-[10px] uppercase tracking-widest text-[#A46322] font-semibold">Artisanal Bakery • Kanniyakumari</div>
          </div>

          <div className="py-6 space-y-4">
            <div className="font-serif italic text-base leading-relaxed text-[#3D2314]">
              "{order.giftMessage.message}"
            </div>

            <div className="pt-4 border-t border-[#C68037]/20 flex justify-between text-xs font-semibold text-[#8C6752]">
              <div>
                <span className="text-[10px] text-[#A46322] block font-normal">DEAREST</span>
                <span>{order.giftMessage.to}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#A46322] block font-normal">WITH LOVE FROM</span>
                <span>{order.giftMessage.from}</span>
              </div>
            </div>
          </div>

          <div className="text-center pt-3 text-[9px] text-[#A46322] tracking-wider uppercase">
            Freshly baked with 70% single-origin Belgian chocolate
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-chocolate-850 bg-chocolate-900/60 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-chocolate-800 hover:bg-chocolate-700 text-cream-200 font-semibold text-xs"
        >
          Close
        </button>
        <button
          type="button"
          onClick={handlePrint}
          className="px-5 py-2 rounded-xl bg-caramel-500 hover:bg-caramel-400 text-chocolate-950 font-bold text-xs flex items-center gap-2 shadow-sm"
        >
          <Printer className="w-4 h-4" />
          <span>Print Card Now</span>
        </button>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 7. VIEW USER PROFILE MODAL
// -------------------------------------------------------------
const ViewUserProfileModal: React.FC<{
  user: User;
  onClose: () => void;
}> = ({ user, onClose }) => {
  return (
    <div>
      <div className="p-5 border-b border-chocolate-850 flex items-center justify-between bg-chocolate-900/60">
        <h3 className="font-serif font-bold text-lg text-cream-50">User Profile & Access Level</h3>
        <button type="button" onClick={onClose} className="p-1.5 rounded-lg text-chocolate-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 space-y-4 text-xs">
        <div className="flex items-center gap-4 bg-chocolate-900/80 p-4 rounded-2xl border border-chocolate-800">
          <div 
            className="w-14 h-14 rounded-2xl font-serif font-bold text-lg flex items-center justify-center shrink-0 shadow-sm"
            style={{ backgroundColor: user.avatarBg || '#E0F2FE', color: user.avatarColor || '#0369A1' }}
          >
            {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h4 className="font-bold text-base text-cream-50">{user.name}</h4>
            <div className="text-chocolate-400 text-xs">{user.email}</div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-caramel-500/20 text-caramel-300">
                {user.role}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                user.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-chocolate-800 text-chocolate-400'
              }`}>
                {user.status}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="bg-chocolate-900/40 p-3 rounded-xl border border-chocolate-850">
            <span className="text-[10px] font-bold text-chocolate-400 uppercase block">Phone Contact</span>
            <span className="font-mono text-cream-100 font-semibold">{user.phone || 'Not provided'}</span>
          </div>
          <div className="bg-chocolate-900/40 p-3 rounded-xl border border-chocolate-850">
            <span className="text-[10px] font-bold text-chocolate-400 uppercase block">Member Since</span>
            <span className="font-mono text-cream-100 font-semibold">{user.joined}</span>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-chocolate-850 bg-chocolate-900/60 flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2 rounded-xl bg-chocolate-800 hover:bg-chocolate-700 text-cream-100 font-semibold text-xs"
        >
          Close Profile
        </button>
      </div>
    </div>
  );
};
