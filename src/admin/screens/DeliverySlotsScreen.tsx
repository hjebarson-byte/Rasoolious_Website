import React from 'react';
import { 
  Clock, 
  MapPin, 
  Plus, 
  Search, 
  Sliders, 
  ShieldCheck 
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export const DeliverySlotsScreen: React.FC = () => {
  const { 
    deliverySlots, 
    deliveryZones, 
    zoneSearch, 
    setZoneSearch, 
    openModal, 
    toggleZoneStatus, 
    store 
  } = useAdmin();

  const filteredZones = deliveryZones.filter(z => {
    if (!zoneSearch.trim()) return true;
    const q = zoneSearch.toLowerCase();
    return z.pincode.includes(q) || z.locality.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      
      {/* Screen Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-cream-50">
            Delivery & Slot Management
          </h1>
          <p className="text-xs sm:text-sm text-chocolate-300 mt-1">
            Control delivery capacity, courier logistics, and serviceable pincodes across Kanniyakumari District.
          </p>
        </div>

        <button
          onClick={() => openModal('addZone')}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-caramel-500 hover:bg-caramel-400 text-chocolate-950 font-bold text-xs transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Delivery Zone</span>
        </button>
      </div>

      {/* Part 1: Delivery Slot Capacities */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-caramel-400">
          Today's Baking & Dispatch Slots
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {deliverySlots.map(slot => {
            const pct = Math.min(100, Math.round((slot.booked / slot.capacity) * 100));
            const isFull = slot.booked >= slot.capacity;

            return (
              <div
                key={slot.id}
                className="bg-chocolate-950 border border-chocolate-850 rounded-3xl p-5 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-chocolate-900 text-caramel-400">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-cream-50">{slot.name}</h3>
                        <span className="text-xs text-caramel-400 font-mono font-semibold">{slot.timeWindow}</span>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      !slot.active
                        ? 'bg-chocolate-800 text-chocolate-400'
                        : isFull
                        ? 'bg-terracotta-500/20 text-terracotta-300'
                        : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {!slot.active ? 'INACTIVE' : isFull ? 'CAPACITY FULL' : 'ACTIVE'}
                    </span>
                  </div>

                  <p className="text-xs text-chocolate-400 leading-relaxed">
                    {slot.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="bg-chocolate-900/60 p-3 rounded-2xl border border-chocolate-850 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-chocolate-400">Bookings for Today:</span>
                      <span className="font-mono font-bold text-cream-100">
                        {slot.booked} / {slot.capacity} orders
                      </span>
                    </div>
                    <div className="w-full bg-chocolate-950 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isFull ? 'bg-terracotta-500' : 'bg-caramel-500'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-chocolate-850 flex items-center justify-between">
                  <span className="text-[11px] text-chocolate-400">
                    {isFull ? 'Customer redirected to next slot' : `${slot.capacity - slot.booked} slots remaining`}
                  </span>
                  <button
                    onClick={() => openModal('editSlot', slot)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-chocolate-900 hover:bg-chocolate-800 text-caramel-300 font-semibold text-xs border border-chocolate-800 transition-colors"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Edit Capacity</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Part 2: Serviceable Delivery Zones Table */}
      <div className="bg-chocolate-950 border border-chocolate-850 rounded-3xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif font-bold text-base text-cream-50">
              Serviceable Delivery Zones (Kanniyakumari District)
            </h2>
            <p className="text-xs text-chocolate-400">
              Active pincodes eligible for direct bakery courier dispatches and tier fees.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-chocolate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={zoneSearch}
              onChange={e => setZoneSearch(e.target.value)}
              placeholder="Search pincode or town..."
              className="w-full bg-chocolate-900 border border-chocolate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-cream-50 focus:border-caramel-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-chocolate-850 text-[10px] text-chocolate-400 uppercase tracking-wider bg-chocolate-900/40">
                <th className="py-3 px-4 font-bold text-cream-200">PINCODE</th>
                <th className="py-3 px-4 font-bold text-cream-200">LOCALITY / DISTRICT ZONE</th>
                <th className="py-3 px-4 font-bold text-cream-200">STANDARD FEE</th>
                <th className="py-3 px-4 font-bold text-cream-200">EXPRESS FEE</th>
                <th className="py-3 px-4 font-bold text-cream-200">EST. TRANSIT</th>
                <th className="py-3 px-4 font-bold text-cream-200">STATUS</th>
                <th className="py-3 px-4 font-bold text-cream-200 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-chocolate-850/60">
              {filteredZones.map(zone => (
                <tr key={zone.id} className="hover:bg-chocolate-900/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-caramel-300">
                    {zone.pincode}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-cream-100 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-caramel-500 shrink-0" />
                      <span>{zone.locality}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono font-medium text-cream-200">
                    ₹{zone.standardFee}
                  </td>
                  <td className="py-3 px-4 font-mono font-medium text-cream-200">
                    ₹{zone.expressFee}
                  </td>
                  <td className="py-3 px-4 text-chocolate-300">
                    {zone.deliveryTime}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      zone.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-chocolate-800 text-chocolate-400'
                    }`}>
                      {zone.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => toggleZoneStatus(zone.id)}
                      className="text-xs text-caramel-400 hover:text-caramel-300 font-semibold underline"
                    >
                      {zone.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Part 3: Regulatory & Store Policy Details */}
      <div className="bg-chocolate-950 border border-chocolate-850 rounded-3xl p-5 shadow-sm">
        <h3 className="font-serif font-bold text-sm text-cream-50 mb-3 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-caramel-400" />
          <span>Bakery Dispatch Policy & Compliance</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-chocolate-300">
          <div className="bg-chocolate-900/50 p-3 rounded-2xl border border-chocolate-850">
            <span className="text-[10px] text-chocolate-400 font-bold uppercase block">Free Delivery Threshold</span>
            <span className="font-mono text-cream-100 font-bold text-sm">₹{store.freeDeliveryThreshold}</span>
            <p className="text-[11px] text-chocolate-400 mt-0.5">Orders above this qualify for free courier.</p>
          </div>
          <div className="bg-chocolate-900/50 p-3 rounded-2xl border border-chocolate-850">
            <span className="text-[10px] text-chocolate-400 font-bold uppercase block">FSSAI Central License</span>
            <span className="font-mono text-cream-100 font-bold text-sm">{store.fssaiLicense}</span>
            <p className="text-[11px] text-chocolate-400 mt-0.5">Food Safety Standards Authority of India</p>
          </div>
          <div className="bg-chocolate-900/50 p-3 rounded-2xl border border-chocolate-850">
            <span className="text-[10px] text-chocolate-400 font-bold uppercase block">Tamil Nadu GSTIN</span>
            <span className="font-mono text-cream-100 font-bold text-sm">{store.gstin}</span>
            <p className="text-[11px] text-chocolate-400 mt-0.5">Commercial Bakery Tax ID</p>
          </div>
        </div>
      </div>

    </div>
  );
};
