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
      default:
        return <OverviewScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-surface text-espresso font-body flex selection:bg-caramel-200 selection:text-espresso">
      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Main Workspace Column */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Application Header */}
        <TopNav />

        {/* Primary Content Workspace */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-surface">
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
