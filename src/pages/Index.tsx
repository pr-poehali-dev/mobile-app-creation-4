import { useState } from 'react';
import HomePage from '@/pages/Home';
import ProductPage from '@/pages/Product';
import CartPage from '@/pages/Cart';
import ProfilePage from '@/pages/Profile';
import AuthPage from '@/pages/Auth';
import Navigation from '@/components/Navigation';

type Screen = 'home' | 'product' | 'cart' | 'profile' | 'auth';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleProductClick = (id: number) => {
    setSelectedProductId(id);
    setCurrentScreen('product');
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setCurrentScreen('home');
  };

  const handleNavigate = (screen: Screen) => {
    if (screen === 'profile' && !isAuthenticated) {
      setCurrentScreen('auth');
    } else {
      setCurrentScreen(screen);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomePage onProductClick={handleProductClick} />;
      case 'product':
        return <ProductPage productId={selectedProductId!} onBack={() => setCurrentScreen('home')} />;
      case 'cart':
        return <CartPage />;
      case 'profile':
        return <ProfilePage />;
      case 'auth':
        return <AuthPage onSuccess={handleAuthSuccess} onClose={() => setCurrentScreen('home')} />;
      default:
        return <HomePage onProductClick={handleProductClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {currentScreen !== 'auth' && (
        <Navigation currentScreen={currentScreen} onNavigate={handleNavigate} />
      )}
      <main className="pb-20">
        {renderScreen()}
      </main>
    </div>
  );
};

export default Index;
