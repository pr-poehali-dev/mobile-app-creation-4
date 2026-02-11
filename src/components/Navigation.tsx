import Icon from '@/components/ui/icon';

type Screen = 'home' | 'tracking' | 'orders' | 'profile';

interface NavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const Navigation = ({ currentScreen, onNavigate }: NavigationProps) => {
  const navItems = [
    { id: 'home' as Screen, icon: 'Plus', label: 'Заказать' },
    { id: 'tracking' as Screen, icon: 'MapPin', label: 'Карта' },
    { id: 'orders' as Screen, icon: 'ClipboardList', label: 'Заказы' },
    { id: 'profile' as Screen, icon: 'User', label: 'Профиль' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors ${
              currentScreen === item.id
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={item.icon} size={22} />
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
