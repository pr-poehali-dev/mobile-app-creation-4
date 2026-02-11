import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface HomePageProps {
  onProductClick: (id: number) => void;
}

const products = [
  { id: 1, name: 'Беспроводные наушники', price: 4990, image: '🎧', category: 'Аудио', badge: 'Хит' },
  { id: 2, name: 'Смарт-часы Pro', price: 12990, image: '⌚', category: 'Гаджеты', badge: 'Новинка' },
  { id: 3, name: 'Портативная колонка', price: 2490, image: '🔊', category: 'Аудио', badge: null },
  { id: 4, name: 'Фитнес-браслет', price: 3990, image: '💪', category: 'Спорт', badge: 'Скидка -20%' },
  { id: 5, name: 'Power Bank 20000mAh', price: 1990, image: '🔋', category: 'Аксессуары', badge: null },
  { id: 6, name: 'Bluetooth-клавиатура', price: 5490, image: '⌨️', category: 'Гаджеты', badge: null },
];

const categories = ['Все', 'Аудио', 'Гаджеты', 'Спорт', 'Аксессуары'];

const HomePage = ({ onProductClick }: HomePageProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-lg mx-auto px-4 py-6 animate-fade-in">
      <header className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            ShopApp
          </h1>
          <button className="p-2 hover:bg-muted rounded-full transition-colors">
            <Icon name="Bell" size={24} />
          </button>
        </div>
        
        <div className="relative">
          <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск товаров..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 bg-card"
          />
        </div>
      </header>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="whitespace-nowrap"
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filteredProducts.map((product, index) => (
          <div
            key={product.id}
            onClick={() => onProductClick(product.id)}
            className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {product.badge && (
              <Badge className="absolute top-2 right-2 z-10 bg-accent text-accent-foreground">
                {product.badge}
              </Badge>
            )}
            <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-6xl">
              {product.image}
            </div>
            <div className="p-3">
              <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
              <h3 className="font-semibold text-sm mb-2 line-clamp-2">{product.name}</h3>
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-primary">{product.price} ₽</p>
                <button className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-110 transition-transform">
                  <Icon name="Plus" size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-muted-foreground">Ничего не найдено</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
