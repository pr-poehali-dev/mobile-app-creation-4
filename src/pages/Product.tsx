import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface ProductPageProps {
  productId: number;
  onBack: () => void;
}

interface ProductData {
  name: string;
  price: number;
  image: string;
  category: string;
  badge: string | null;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
}

const productsData: Record<number, ProductData> = {
  1: {
    name: 'Беспроводные наушники',
    price: 4990,
    image: '🎧',
    category: 'Аудио',
    badge: 'Хит',
    rating: 4.8,
    reviews: 247,
    description: 'Премиальные беспроводные наушники с активным шумоподавлением и временем работы до 30 часов.',
    features: ['Bluetooth 5.3', 'Активное шумоподавление', 'Быстрая зарядка', 'Водозащита IPX4'],
  },
  2: {
    name: 'Смарт-часы Pro',
    price: 12990,
    image: '⌚',
    category: 'Гаджеты',
    badge: 'Новинка',
    rating: 4.9,
    reviews: 189,
    description: 'Умные часы с AMOLED-дисплеем, мониторингом здоровья и автономностью до 7 дней.',
    features: ['AMOLED экран', 'GPS', 'Мониторинг сна', '100+ спортивных режимов'],
  },
};

const ProductPage = ({ productId, onBack }: ProductPageProps) => {
  const product = productsData[productId] || productsData[1];

  return (
    <div className="max-w-lg mx-auto animate-fade-in">
      <header className="sticky top-0 bg-background/80 backdrop-blur-lg z-10 px-4 py-4 flex items-center gap-4 border-b">
        <button onClick={onBack} className="p-2 hover:bg-muted rounded-full transition-colors">
          <Icon name="ChevronLeft" size={24} />
        </button>
        <h1 className="text-lg font-semibold flex-1">Детали товара</h1>
        <button className="p-2 hover:bg-muted rounded-full transition-colors">
          <Icon name="Heart" size={24} />
        </button>
      </header>

      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 aspect-square flex items-center justify-center text-9xl relative">
        {product.image}
        {product.badge && (
          <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
            {product.badge}
          </Badge>
        )}
      </div>

      <div className="p-6">
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
          <h2 className="text-2xl font-bold mb-3">{product.name}</h2>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              <Icon name="Star" size={18} className="fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{product.rating}</span>
            </div>
            <span className="text-muted-foreground">({product.reviews} отзывов)</span>
          </div>

          <p className="text-3xl font-bold text-primary mb-6">{product.price} ₽</p>
        </div>

        <Separator className="my-6" />

        <div className="mb-6">
          <h3 className="font-semibold mb-3">Описание</h3>
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-3">Характеристики</h3>
          <div className="space-y-2">
            {product.features.map((feature: string, index: number) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <Icon name="Check" size={16} className="text-primary" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t safe-area-bottom">
          <div className="max-w-lg mx-auto flex gap-3">
            <Button size="lg" className="flex-1 h-14 text-lg font-semibold shadow-lg shadow-primary/30">
              <Icon name="ShoppingCart" size={20} className="mr-2" />
              В корзину
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-6">
              <Icon name="Heart" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;