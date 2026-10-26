import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Check, 
  Sliders 
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import type { PermissionModule } from '../types/adminTypes';

export const RolesScreen: React.FC = () => {
  const { roles, users, openModal } = useAdmin();

  const modulesList: { key: PermissionModule; label: string }[] = [
    { key: 'user', label: 'User Management' },
    { key: 'role', label: 'Role Permissions' },
    { key: 'order', label: 'Orders & Dispatches' },
    { key: 'payment', label: 'Financial Payments' },
    { key: 'product', label: 'Artisan Menu / Products' },
    { key: 'category', label: 'Categories' },
    { key: 'delivery', label: 'Delivery Zones & Fees' },
    { key: 'analytics', label: 'Analytics & Revenue' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="font-serif font-bold text-2xl sm:text-3xl text-chocolate-950">
          Role & Access Governance
        </h1>
        <p className="text-xs sm:text-sm text-chocolate-600 mt-1">
          Manage system roles and fine-tune granular permission matrix capabilities across all 8 modules.
        </p>
      </div>

      {/* Role Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map(role => {
          const userCount = users.filter(u => u.role === role.name).length;

          // Count active permissions
          const totalPerms = Object.values(role.permissions).reduce((acc, mod) => {
            return acc + Object.values(mod).filter(Boolean).length;
          }, 0);

          return (
            <div
              key={role.id}
              className="bg-white border border-stone-200/90 rounded-3xl p-5 shadow-xs space-y-4 flex flex-col justify-between hover:border-caramel-300 hover:shadow-sm transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-2xl bg-caramel-50 text-caramel-700 border border-caramel-200">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-base text-chocolate-950">{role.name}</h3>
                      <div className="flex items-center gap-2 text-[10px] text-stone-500 mt-0.5">
                        <span>Created: {role.created}</span>
                        <span>•</span>
                        <span className="font-mono">{role.id}</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700">
                    {userCount} members
                  </span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {role.description}
                </p>

                {/* Module Access Badges */}
                <div className="pt-2 border-t border-stone-100">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block mb-2">
                    Enabled Module Scope ({totalPerms}/48 capabilities)
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {modulesList.map(m => {
                      const hasAny = Object.values(role.permissions[m.key] || {}).some(Boolean);
                      return (
                        <span
                          key={m.key}
                          className={`text-[10px] font-medium px-2 py-0.5 rounded-lg flex items-center gap-1 ${
                            hasAny
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold'
                              : 'bg-stone-50 text-stone-400 line-through'
                          }`}
                        >
                          {hasAny && <Check className="w-2.5 h-2.5 text-emerald-600" />}
                          <span>{m.label.split(' ')[0]}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-500 font-medium">
                  {role.isSystem ? 'System Guarded Role' : 'Custom Configured'}
                </span>

                <button
                  onClick={() => openModal('editRole', role)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-caramel-500 hover:bg-caramel-600 text-white font-bold text-xs transition-colors shadow-xs"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Configure Permission Matrix</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Global Permission Matrix Summary Table */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-caramel-700" />
            <h3 className="font-serif font-bold text-base text-chocolate-950">
              Cross-Role Permissions Overview Matrix
            </h3>
          </div>
          <span className="text-xs text-stone-500 font-medium">Quick capability view</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-100 text-[10px] text-stone-400 uppercase tracking-wider bg-stone-50/70">
                <th className="py-2.5 px-4 font-bold text-chocolate-900">MODULE</th>
                <th className="py-2.5 px-4 font-bold text-emerald-700 text-center">SUPER ADMIN</th>
                <th className="py-2.5 px-4 font-bold text-caramel-700 text-center">ADMIN</th>
                <th className="py-2.5 px-4 font-bold text-amber-700 text-center">KITCHEN STAFF</th>
                <th className="py-2.5 px-4 font-bold text-sky-700 text-center">USER</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {modulesList.map(m => (
                <tr key={m.key} className="hover:bg-stone-50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-chocolate-950">
                    {m.label}
                  </td>
                  {roles.map(r => {
                    const permObj = r.permissions[m.key] || { list: false, edit: false };
                    const hasWrite = permObj.create || permObj.edit;
                    const hasRead = permObj.list || permObj.view;

                    return (
                      <td key={r.id} className="py-3 px-4 text-center">
                        {hasWrite ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                            Full Control
                          </span>
                        ) : hasRead ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                            Read Only
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-500">
                            Restricted
                          </span>
                        )}
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
  );
};
