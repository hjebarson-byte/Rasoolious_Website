import React from 'react';
import { 
  UserPlus, 
  Search, 
  Edit2, 
  Trash2, 
  Eye, 
  Phone, 
  Mail 
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export const UsersScreen: React.FC = () => {
  const { 
    users, 
    userSearch, 
    setUserSearch, 
    userRoleFilter, 
    setUserRoleFilter, 
    openModal, 
    toggleUserStatus, 
    deleteUser 
  } = useAdmin();

  const roleFilters = ['All', 'Super Admin', 'Admin', 'Kitchen Staff', 'User'];

  const filteredUsers = users.filter(u => {
    if (userRoleFilter !== 'All' && u.role !== userRoleFilter) {
      return false;
    }
    if (userSearch.trim()) {
      const q = userSearch.toLowerCase();
      return (
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.phone.includes(q)
      );
    }
    return true;
  });

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Super Admin':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">Super Admin</span>;
      case 'Admin':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-caramel-100 text-caramel-800 border border-caramel-200">Admin</span>;
      case 'Kitchen Staff':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">Kitchen Staff</span>;
      case 'User':
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-200">User</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-chocolate-950">
            User Management
          </h1>
          <p className="text-xs sm:text-sm text-chocolate-600 mt-1">
            Manage portal access, roles, kitchen permissions, and customer account records.
          </p>
        </div>

        <button
          onClick={() => openModal('addUser')}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-caramel-500 hover:bg-caramel-600 text-white font-bold text-xs transition-colors shadow-sm self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New User</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Role Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {roleFilters.map(r => {
              const count = r === 'All' 
                ? users.length 
                : users.filter(u => u.role === r).length;
              const isActive = userRoleFilter === r;

              return (
                <button
                  key={r}
                  onClick={() => setUserRoleFilter(r)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-caramel-500 text-white font-bold shadow-sm'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200/70'
                  }`}
                >
                  <span>{r}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={userSearch}
              onChange={e => setUserSearch(e.target.value)}
              placeholder="Search name, email, phone..."
              className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3.5 py-2 text-xs text-chocolate-900 placeholder:text-stone-400 focus:bg-white focus:border-caramel-500 focus:outline-none"
            />
          </div>

        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-stone-200/90 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-100 text-[10px] text-stone-400 uppercase tracking-wider bg-stone-50/70">
                <th className="py-3.5 px-4 font-bold text-chocolate-900">USER / PROFILE</th>
                <th className="py-3.5 px-4 font-bold text-chocolate-900">CONTACT DETAILS</th>
                <th className="py-3.5 px-4 font-bold text-chocolate-900">ROLE POSITION</th>
                <th className="py-3.5 px-4 font-bold text-chocolate-900">ACCOUNT STATUS</th>
                <th className="py-3.5 px-4 font-bold text-chocolate-900">DATE JOINED</th>
                <th className="py-3.5 px-4 font-bold text-chocolate-900 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredUsers.map(user => {
                const initials = user.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase();

                return (
                  <tr key={user.id} className="hover:bg-stone-50 transition-colors">
                    {/* User Identity */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-xl font-bold flex items-center justify-center font-serif text-xs shrink-0 shadow-2xs"
                          style={{
                            backgroundColor: user.avatarBg || '#E0F2FE',
                            color: user.avatarColor || '#0369A1'
                          }}
                        >
                          {initials}
                        </div>
                        <div>
                          <div className="font-semibold text-chocolate-950 text-xs">{user.name}</div>
                          <div className="text-[11px] text-stone-500 font-mono">{user.id}</div>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="py-3.5 px-4">
                      <div className="text-chocolate-800 font-medium flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-stone-400 shrink-0" />
                        <span>{user.email}</span>
                      </div>
                      <div className="text-[11px] text-stone-500 font-mono mt-0.5 flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-stone-400 shrink-0" />
                        <span>{user.phone || '—'}</span>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="py-3.5 px-4">
                      {getRoleBadge(user.role)}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full transition-colors ${
                          user.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-200'
                            : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
                        }`}
                        title="Click to toggle status"
                      >
                        {user.status}
                      </button>
                    </td>

                    {/* Joined Date */}
                    <td className="py-3.5 px-4 font-mono text-stone-600">
                      {user.joined}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openModal('viewUser', user)}
                          className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                          title="View Profile"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => openModal('editUser', user)}
                          className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                          title="Edit User"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        {user.role !== 'Super Admin' && (
                          <button
                            onClick={() => {
                              if (confirm(`Remove user ${user.name}?`)) {
                                deleteUser(user.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors border border-rose-200"
                            title="Delete User"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
