import Icon from '@/components/ui/icon';

type Screen = 'home' | 'product' | 'cart' | 'profile' | 'auth';

interface NavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const Navigation = ({ currentScreen, onNavigate }: NavigationProps) => {
  const navItems = [
    { id: 'home' as Screen, icon: 'Home', label: 'Главная' },
    { id: 'cart' as Screen, icon: 'ShoppingCart', label: 'Корзина' },
    { id: 'profile' as Screen, icon: 'User', label: 'Профиль' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 safe-area-bottom">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center gap-1 px-4 py-2 transition-all ${
              currentScreen === item.id
                ? 'text-primary scale-110'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={item.icon} size={24} />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
