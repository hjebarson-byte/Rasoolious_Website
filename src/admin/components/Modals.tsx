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
        className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity" 
      />

      {/* Modal Containers */}
      <div className="relative z-10 w-full max-w-2xl bg-white text-chocolate-950 border border-stone-200 rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
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
  const [category, setCategory] = useState(initialData?.category || 'Classic Fudgy');
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
      <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-caramel-50 text-caramel-600 border border-caramel-200">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-chocolate-950">
              {isEdit ? `Edit Brownie: ${initialData?.name}` : '+ Add New Brownie Recipe'}
            </h3>
            <p className="text-xs text-stone-500">Specify cocoa %, batch portions, daily kitchen limit and artisan pricing.</p>
          </div>
        </div>
        <button type="button" onClick={onClose} className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 space-y-4 text-xs max-h-[75vh] overflow-y-auto">
        <div>
          <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">Brownie Recipe Title *</label>
          <input
            type="text"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Belgian Dark Chocolate Molten Slab"
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-chocolate-950 focus:border-caramel-500 focus:bg-white focus:outline-none transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">Brownie Style / Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-chocolate-950 focus:border-caramel-500 focus:bg-white focus:outline-none transition-colors"
            >
              <option value="Classic Fudgy">Classic Fudgy</option>
              <option value="Molten Centers">Molten Centers</option>
              <option value="Nut & Crunch">Nut & Crunch</option>
              <option value="Artisan Slabs">Artisan Slabs</option>
              <option value="Special Editions">Special Editions</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">Portion / Weight</label>
            <input
              type="text"
              value={weight}
              onChange={e => setWeight(e.target.value)}
              placeholder="e.g. 500 g or 4 pcs (440 g)"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-chocolate-950 focus:border-caramel-500 focus:bg-white focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">Regular Price (₹) *</label>
            <input
              type="number"
              required
              min="0"
              value={price}
              onChange={e => setPrice(Number(e.target.value))}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-chocolate-950 focus:border-caramel-500 focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">Offer Price (₹)</label>
            <input
              type="number"
              min="0"
              value={salePrice}
              onChange={e => setSalePrice(Number(e.target.value))}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-chocolate-950 focus:border-caramel-500 focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">Daily Limit (Trays) *</label>
            <input
              type="number"
              required
              min="1"
              value={dailyLimit}
              onChange={e => setDailyLimit(Number(e.target.value))}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-chocolate-950 focus:border-caramel-500 focus:bg-white focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">Artisan Description</label>
          <textarea
            rows={2}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Tasting notes, cocoa percentage and texture..."
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-chocolate-950 focus:border-caramel-500 focus:bg-white focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">Ingredients</label>
          <input
            type="text"
            value={ingredients}
            onChange={e => setIngredients(e.target.value)}
            placeholder="e.g. 70% Callebaut Dark Chocolate, French Cultured Butter, Organic Sugar"
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-chocolate-950 focus:border-caramel-500 focus:bg-white focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-stone-600 uppercase mb-2">Allergens</label>
          <div className="flex flex-wrap gap-3">
            {['Eggs', 'Dairy', 'Gluten', 'Nuts', 'Soy'].map(allergen => (
              <label key={allergen} className="flex items-center gap-1.5 cursor-pointer text-stone-700">
                <input
                  type="checkbox"
                  checked={allergens.includes(allergen)}
                  onChange={() => toggleAllergen(allergen)}
                  className="rounded border-stone-300 text-caramel-500 focus:ring-caramel-400"
                />
                <span>{allergen}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="pt-1">
          <label className="flex items-center gap-2 cursor-pointer text-stone-800">
            <input
              type="checkbox"
              checked={featured}
              onChange={e => setFeatured(e.target.checked)}
              className="rounded border-stone-300 text-caramel-500 focus:ring-caramel-400"
            />
            <span className="font-semibold text-chocolate-900">Feature this brownie prominently on storefront showcase</span>
          </label>
        </div>
      </div>

      <div className="p-4 border-t border-stone-200 bg-stone-50/80 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-caramel-500 hover:bg-caramel-600 text-white font-bold transition-colors shadow-sm"
        >
          {isEdit ? 'Save Changes' : 'Create Brownie'}
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
      <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-chocolate-950">Edit Delivery Slot Capacity</h3>
            <p className="text-xs text-stone-500">{slot.name} ({slot.timeWindow})</p>
          </div>
        </div>
        <button type="button" onClick={onClose} className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 space-y-4 text-xs">
        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-stone-500">Current Booked for Today</div>
            <div className="text-xl font-bold font-mono text-chocolate-950">{slot.booked} orders</div>
          </div>
          <div className="text-right">
            <div className="text-stone-500">Status</div>
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
              slot.booked >= slot.capacity ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            }`}>
              {slot.booked >= slot.capacity ? 'FULL' : 'AVAILABLE'}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">
            Maximum Order Capacity (Per Day)
          </label>
          <input
            type="number"
            min={slot.booked}
            max="100"
            value={capacity}
            onChange={e => setCapacity(Number(e.target.value))}
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-chocolate-950 focus:border-caramel-500 focus:bg-white focus:outline-none font-mono text-sm transition-colors"
          />
          <p className="text-[11px] text-stone-500 mt-1">
            Once orders reach this ceiling, the customer storefront automatically marks this slot SOLD OUT.
          </p>
        </div>

        <div className="pt-2">
          <label className="flex items-center gap-2 cursor-pointer text-stone-800">
            <input
              type="checkbox"
              checked={active}
              onChange={e => setActive(e.target.checked)}
              className="rounded border-stone-300 text-caramel-500 focus:ring-caramel-400"
            />
            <span className="font-semibold text-chocolate-900">Enable this slot for online customer checkout</span>
          </label>
        </div>
      </div>

      <div className="p-4 border-t border-stone-200 bg-stone-50/80 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => onSave(capacity, active)}
          className="px-5 py-2 rounded-xl bg-caramel-500 hover:bg-caramel-600 text-white font-bold shadow-sm transition-colors"
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
      <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-caramel-50 text-caramel-600 border border-caramel-200">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-chocolate-950">+ Add Kanniyakumari Delivery Zone</h3>
            <p className="text-xs text-stone-500">Configure serviceable pincode and delivery courier fee tier.</p>
          </div>
        </div>
        <button type="button" onClick={onClose} className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">Postal Pincode *</label>
            <input
              type="text"
              required
              maxLength={6}
              value={pincode}
              onChange={e => setPincode(e.target.value)}
              placeholder="e.g. 629165"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-chocolate-950 focus:border-caramel-500 focus:bg-white focus:outline-none font-mono transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">Locality / Town Name *</label>
            <input
              type="text"
              required
              value={locality}
              onChange={e => setLocality(e.target.value)}
              placeholder="e.g. Kuzhithurai & Kaliakkavilai"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-chocolate-950 focus:border-caramel-500 focus:bg-white focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">Standard Delivery Fee (₹)</label>
            <input
              type="number"
              min="0"
              value={standardFee}
              onChange={e => setStandardFee(Number(e.target.value))}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-chocolate-950 focus:border-caramel-500 focus:bg-white focus:outline-none font-mono transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">Express Delivery Fee (₹)</label>
            <input
              type="number"
              min="0"
              value={expressFee}
              onChange={e => setExpressFee(Number(e.target.value))}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-chocolate-950 focus:border-caramel-500 focus:bg-white focus:outline-none font-mono transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">Estimated Courier Transit Time</label>
          <input
            type="text"
            value={deliveryTime}
            onChange={e => setDeliveryTime(e.target.value)}
            placeholder="e.g. 40–55 mins"
            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-chocolate-950 focus:border-caramel-500 focus:bg-white focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div className="p-4 border-t border-stone-200 bg-stone-50/80 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-caramel-500 hover:bg-caramel-600 text-white font-bold shadow-sm transition-colors"
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
      <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-chocolate-950">
              {isEdit ? `Edit User: ${initialData?.name}` : 'Create New Bakery Portal User'}
            </h3>
            <p className="text-xs text-stone-500">Assign role access and bakery management permissions.</p>
          </div>
        </div>
        <button type="button" onClick={onClose} className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Arun Kumar P"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-chocolate-950 focus:border-caramel-500 focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="e.g. arun@example.com"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-chocolate-950 focus:border-caramel-500 focus:bg-white focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder={isEdit ? 'Leave blank to keep unchanged' : 'Enter secure password'}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 pr-10 text-chocolate-950 focus:border-caramel-500 focus:bg-white focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">Role Position *</label>
            <select
              value={role}
              onChange={e => setRole(e.target.value as any)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-chocolate-950 focus:border-caramel-500 focus:bg-white focus:outline-none transition-colors"
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
            <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">Account Status</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value as any)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-chocolate-950 focus:border-caramel-500 focus:bg-white focus:outline-none transition-colors"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+91 98421 88390"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-chocolate-950 focus:border-caramel-500 focus:bg-white focus:outline-none font-mono transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-stone-200 bg-stone-50/80 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-sm transition-colors"
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
      <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-teal-800 text-white">
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
        <button type="button" onClick={onClose} className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 space-y-5 text-xs max-h-[75vh] overflow-y-auto">
        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">Role Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-chocolate-950 focus:border-caramel-500 focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">Role Description</label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-chocolate-950 focus:border-caramel-500 focus:bg-white focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Permission Matrix Card */}
        <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-sm">
          <div className="p-3 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-chocolate-950">
              <Lock className="w-4 h-4 text-teal-600" />
              <span>Permission Matrix (8 Modules × 6 Capabilities)</span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <button
                type="button"
                onClick={() => toggleAll(true)}
                className="text-teal-700 hover:text-teal-900 font-semibold"
              >
                Select All
              </button>
              <span className="text-stone-300">|</span>
              <button
                type="button"
                onClick={() => toggleAll(false)}
                className="text-stone-500 hover:text-stone-800 font-semibold"
              >
                Deselect All
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 text-[10px] text-stone-500 uppercase tracking-wider bg-stone-100/60">
                  <th className="py-2.5 px-4 font-bold text-stone-800">MODULE</th>
                  <th className="py-2.5 px-3 text-center">LIST</th>
                  <th className="py-2.5 px-3 text-center">VIEW</th>
                  <th className="py-2.5 px-3 text-center">CREATE</th>
                  <th className="py-2.5 px-3 text-center">EDIT</th>
                  <th className="py-2.5 px-3 text-center">DELETE</th>
                  <th className="py-2.5 px-3 text-center">EXPORT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {modules.map(m => (
                  <tr key={m.key} className="hover:bg-stone-50 transition-colors">
                    <td className="py-2.5 px-4 font-bold text-stone-900 font-mono text-[11px]">
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
                            className="rounded border-stone-300 text-teal-600 focus:ring-teal-500 cursor-pointer"
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

      <div className="p-4 border-t border-stone-200 bg-stone-50/80 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold shadow-sm transition-colors"
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
      <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-caramel-50 text-caramel-600 border border-caramel-200">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-chocolate-950">Print Handcrafted Gift Card</h3>
            <p className="text-xs text-stone-500">Parchment greeting card for order #{order.id}</p>
          </div>
        </div>
        <button type="button" onClick={onClose} className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 flex justify-center bg-stone-100/70 border-y border-stone-200">
        {/* Luxury Gold Border Card Preview */}
        <div className="w-full max-w-md bg-[#FFFDF9] text-[#2C1810] p-8 rounded-2xl border-4 border-[#C68037]/60 shadow-xl relative">
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

      <div className="p-4 border-t border-stone-200 bg-stone-50/80 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition-colors"
        >
          Close
        </button>
        <button
          type="button"
          onClick={handlePrint}
          className="px-5 py-2 rounded-xl bg-caramel-500 hover:bg-caramel-600 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-colors"
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
      <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50/80">
        <h3 className="font-serif font-bold text-lg text-chocolate-950">User Profile & Access Level</h3>
        <button type="button" onClick={onClose} className="p-1.5 rounded-lg text-stone-400 hover:text-stone-800 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 space-y-4 text-xs">
        <div className="flex items-center gap-4 bg-stone-50 p-4 rounded-2xl border border-stone-200">
          <div 
            className="w-14 h-14 rounded-2xl font-serif font-bold text-lg flex items-center justify-center shrink-0 shadow-sm"
            style={{ backgroundColor: user.avatarBg || '#E0F2FE', color: user.avatarColor || '#0369A1' }}
          >
            {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h4 className="font-bold text-base text-chocolate-950">{user.name}</h4>
            <div className="text-stone-500 text-xs">{user.email}</div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-caramel-50 text-caramel-700 border border-caramel-200">
                {user.role}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                user.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-stone-200 text-stone-600'
              }`}>
                {user.status}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
            <span className="text-[10px] font-bold text-stone-500 uppercase block">Phone Contact</span>
            <span className="font-mono text-chocolate-950 font-semibold">{user.phone || 'Not provided'}</span>
          </div>
          <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
            <span className="text-[10px] font-bold text-stone-500 uppercase block">Member Since</span>
            <span className="font-mono text-chocolate-950 font-semibold">{user.joined}</span>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-stone-200 bg-stone-50/80 flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition-colors"
        >
          Close Profile
        </button>
      </div>
    </div>
  );
};
