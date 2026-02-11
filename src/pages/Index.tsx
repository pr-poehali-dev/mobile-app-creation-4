import { useState } from 'react';
import HomePage from '@/pages/Home';
import TrackingPage from '@/pages/Tracking';
import OrdersPage from '@/pages/Orders';
import ProfilePage from '@/pages/Profile';
import Navigation from '@/components/Navigation';

type Screen = 'home' | 'tracking' | 'orders' | 'profile';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [activeOrderId, setActiveOrderId] = useState<number | null>(null);

  const handleOrderCreated = (orderId: number) => {
    setActiveOrderId(orderId);
    setCurrentScreen('tracking');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomePage onOrderCreated={handleOrderCreated} />;
      case 'tracking':
        return <TrackingPage orderId={activeOrderId} />;
      case 'orders':
        return <OrdersPage onOrderClick={(id) => { setActiveOrderId(id); setCurrentScreen('tracking'); }} />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage onOrderCreated={handleOrderCreated} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="pb-20">
        {renderScreen()}
      </main>
      <Navigation currentScreen={currentScreen} onNavigate={setCurrentScreen} />
    </div>
  );
};

export default Index;
