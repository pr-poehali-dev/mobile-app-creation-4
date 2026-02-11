import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: 'Беспроводные наушники', price: 4990, image: '🎧', quantity: 1 },
    { id: 2, name: 'Смарт-часы Pro', price: 12990, image: '⌚', quantity: 1 },
  ]);

  const [promoCode, setPromoCode] = useState('');

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 300;
  const total = subtotal + shipping;

  return (
    <div className="max-w-lg mx-auto px-4 py-6 animate-fade-in">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Корзина</h1>
        <p className="text-muted-foreground">{cartItems.length} товаров</p>
      </header>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-semibold mb-2">Корзина пуста</h2>
          <p className="text-muted-foreground">Добавьте товары из каталога</p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-card rounded-2xl p-4 flex gap-4 shadow-sm animate-scale-in"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center text-4xl flex-shrink-0">
                  {item.image}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{item.name}</h3>
                  <p className="text-lg font-bold text-primary">{item.price} ₽</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1 hover:bg-destructive/10 rounded transition-colors"
                  >
                    <Icon name="Trash2" size={18} className="text-destructive" />
                  </button>
                  <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-7 h-7 flex items-center justify-center hover:bg-background rounded transition-colors"
                    >
                      <Icon name="Minus" size={14} />
                    </button>
                    <span className="w-6 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-7 h-7 flex items-center justify-center hover:bg-background rounded transition-colors"
                    >
                      <Icon name="Plus" size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-card rounded-2xl p-4 mb-6">
            <h3 className="font-semibold mb-3">Промокод</h3>
            <div className="flex gap-2">
              <Input
                placeholder="Введите промокод"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline">Применить</Button>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-4 mb-24">
            <div className="space-y-3">
              <div className="flex justify-between text-muted-foreground">
                <span>Товары</span>
                <span>{subtotal} ₽</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Доставка</span>
                <span>{shipping} ₽</span>
              </div>
              <Separator />
              <div className="flex justify-between text-xl font-bold">
                <span>Итого</span>
                <span className="text-primary">{total} ₽</span>
              </div>
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t safe-area-bottom">
            <div className="max-w-lg mx-auto">
              <Button size="lg" className="w-full h-14 text-lg font-semibold shadow-lg shadow-primary/30">
                Оформить заказ
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
