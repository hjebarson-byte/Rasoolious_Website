import React from 'react';
import { AdminProvider } from './context/AdminContext';
import { AdminLayout } from './components/AdminLayout';

export const AdminApp: React.FC = () => {
  return (
    <AdminProvider>
      <AdminLayout />
    </AdminProvider>
  );
};

export default AdminApp;
