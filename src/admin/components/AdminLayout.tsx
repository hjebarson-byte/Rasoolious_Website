import React from 'react';
import { TopNav } from './TopNav';
import { Sidebar } from './Sidebar';
import { OrderDrawer } from './OrderDrawer';
import { Modals } from './Modals';
import { ToastContainer } from './ToastContainer';
import { useAdmin } from '../context/AdminContext';
import { OverviewScreen } from '../screens/OverviewScreen';
import { KitchenOrdersScreen } from '../screens/KitchenOrdersScreen';
import { InventoryScreen } from '../screens/InventoryScreen';
import { DeliverySlotsScreen } from '../screens/DeliverySlotsScreen';
import { AnalyticsScreen } from '../screens/AnalyticsScreen';
import { UsersScreen } from '../screens/UsersScreen';
import { RolesScreen } from '../screens/RolesScreen';

export const AdminLayout: React.FC = () => {
  const { currentScreen } = useAdmin();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'overview':
        return <OverviewScreen />;
      case 'kitchen-orders':
        return <KitchenOrdersScreen />;
      case 'inventory':
        return <InventoryScreen />;
      case 'delivery-slots':
        return <DeliverySlotsScreen />;
      case 'analytics':
        return <AnalyticsScreen />;
      case 'users':
        return <UsersScreen />;
      case 'roles':
        return <RolesScreen />;
      default:
        return <OverviewScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-chocolate-950 text-cream-50 font-sans flex flex-col selection:bg-caramel-400 selection:text-chocolate-950">
      {/* Top Application Header */}
      <TopNav />

      {/* Body container: Sidebar + Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar />

        {/* Primary Content Workspace */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-chocolate-950 via-[#180C08] to-chocolate-950">
          <div className="max-w-7xl mx-auto">
            {renderScreen()}
          </div>
        </main>
      </div>

      {/* Slide-over order drawer */}
      <OrderDrawer />

      {/* Dialog Modals */}
      <Modals />

      {/* Floating dynamic toast stack */}
      <ToastContainer />
    </div>
  );
};
