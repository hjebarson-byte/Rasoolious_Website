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
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300">Super Admin</span>;
      case 'Admin':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-caramel-500/20 text-caramel-300">Admin</span>;
      case 'Kitchen Staff':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300">Kitchen Staff</span>;
      case 'User':
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-300">User</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-cream-50">
            User Management
          </h1>
          <p className="text-xs sm:text-sm text-chocolate-300 mt-1">
            Manage portal access, roles, kitchen permissions, and customer account records.
          </p>
        </div>

        <button
          onClick={() => openModal('addUser')}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition-colors shadow-sm self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New User</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-chocolate-950 border border-chocolate-850 rounded-3xl p-4 sm:p-5 shadow-sm space-y-4">
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
                      ? 'bg-gradient-to-r from-teal-600 to-teal-500 text-white font-bold shadow-sm'
                      : 'bg-chocolate-900 hover:bg-chocolate-850 text-chocolate-300 hover:text-cream-100'
                  }`}
                >
                  <span>{r}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-black/20 text-white font-bold' : 'bg-chocolate-800 text-chocolate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-chocolate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={userSearch}
              onChange={e => setUserSearch(e.target.value)}
              placeholder="Search name, email, phone..."
              className="w-full bg-chocolate-900 border border-chocolate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-cream-50 focus:border-caramel-400 focus:outline-none"
            />
          </div>

        </div>
      </div>

      {/* Users Table */}
      <div className="bg-chocolate-950 border border-chocolate-850 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-chocolate-850 text-[10px] text-chocolate-400 uppercase tracking-wider bg-chocolate-900/40">
                <th className="py-3.5 px-4 font-bold text-cream-200">USER / PROFILE</th>
                <th className="py-3.5 px-4 font-bold text-cream-200">CONTACT DETAILS</th>
                <th className="py-3.5 px-4 font-bold text-cream-200">ROLE POSITION</th>
                <th className="py-3.5 px-4 font-bold text-cream-200">ACCOUNT STATUS</th>
                <th className="py-3.5 px-4 font-bold text-cream-200">DATE JOINED</th>
                <th className="py-3.5 px-4 font-bold text-cream-200 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-chocolate-850/60">
              {filteredUsers.map(user => {
                const initials = user.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase();

                return (
                  <tr key={user.id} className="hover:bg-chocolate-900/50 transition-colors">
                    {/* User Identity */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-xl font-bold flex items-center justify-center font-serif text-xs shrink-0"
                          style={{
                            backgroundColor: user.avatarBg || '#E0F2FE',
                            color: user.avatarColor || '#0369A1'
                          }}
                        >
                          {initials}
                        </div>
                        <div>
                          <div className="font-semibold text-cream-100 text-xs">{user.name}</div>
                          <div className="text-[11px] text-chocolate-400 font-mono">{user.id}</div>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="py-3.5 px-4">
                      <div className="text-cream-200 font-medium flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-chocolate-400 shrink-0" />
                        <span>{user.email}</span>
                      </div>
                      <div className="text-[11px] text-chocolate-400 font-mono mt-0.5 flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-chocolate-500 shrink-0" />
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
                            ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                            : 'bg-chocolate-800 text-chocolate-400 hover:bg-chocolate-700'
                        }`}
                        title="Click to toggle status"
                      >
                        {user.status}
                      </button>
                    </td>

                    {/* Joined Date */}
                    <td className="py-3.5 px-4 font-mono text-chocolate-300">
                      {user.joined}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openModal('viewUser', user)}
                          className="p-1.5 rounded-lg bg-chocolate-900 hover:bg-chocolate-800 text-cream-300 transition-colors"
                          title="View Profile"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => openModal('editUser', user)}
                          className="p-1.5 rounded-lg bg-chocolate-900 hover:bg-chocolate-800 text-caramel-300 transition-colors"
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
                            className="p-1.5 rounded-lg bg-chocolate-900 hover:bg-chocolate-800 text-terracotta-400 transition-colors"
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
