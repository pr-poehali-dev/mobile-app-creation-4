import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface HomePageProps {
  onOrderCreated: (orderId: number) => void;
}

const services = [
  { id: 1, name: 'Сборка мебели', icon: '🛠️', time: '2-4 часа' },
  { id: 2, name: 'Мелкий ремонт', icon: '🔧', time: '1-3 часа' },
  { id: 3, name: 'Электрика', icon: '💡', time: '1-2 часа' },
  { id: 4, name: 'Сантехника', icon: '🚰', time: '2-3 часа' },
  { id: 5, name: 'Переезд', icon: '📦', time: '3-6 часов' },
  { id: 6, name: 'Уборка', icon: '🧹', time: '2-4 часа' },
];

const HomePage = ({ onOrderCreated }: HomePageProps) => {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState('2');

  const handleOrder = () => {
    if (!selectedService || !address) return;
    const orderId = Date.now();
    onOrderCreated(orderId);
  };

  const totalCost = parseInt(hours) * 500;

  return (
    <div className="max-w-lg mx-auto px-4 py-6 animate-fade-in">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Разнорабочий</h1>
        <p className="text-muted-foreground">Быстрый вызов специалиста — 500 ₽/час</p>
      </header>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Выберите услугу</h2>
        <div className="grid grid-cols-2 gap-3">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => setSelectedService(service.id)}
              className={`bg-card rounded-xl p-4 text-left transition-all hover:scale-105 ${
                selectedService === service.id
                  ? 'ring-2 ring-primary shadow-lg shadow-primary/20'
                  : 'hover:bg-secondary/50'
              }`}
            >
              <div className="text-4xl mb-2">{service.icon}</div>
              <h3 className="font-semibold text-sm mb-1">{service.name}</h3>
              <p className="text-xs text-muted-foreground">{service.time}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <Label htmlFor="address" className="text-sm mb-2 block">
            Адрес
          </Label>
          <div className="relative">
            <Icon name="MapPin" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="address"
              placeholder="Куда приехать специалисту?"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="pl-10 h-12 bg-secondary/50 border-secondary"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="hours" className="text-sm mb-2 block">
            Количество часов
          </Label>
          <Input
            id="hours"
            type="number"
            min="1"
            max="12"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="h-12 bg-secondary/50 border-secondary"
          />
        </div>

        <div>
          <Label htmlFor="description" className="text-sm mb-2 block">
            Описание работы (опционально)
          </Label>
          <Textarea
            id="description"
            placeholder="Опишите, что нужно сделать..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-24 bg-secondary/50 border-secondary resize-none"
          />
        </div>
      </div>

      <div className="bg-card rounded-2xl p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-muted-foreground">Стоимость часа</span>
          <span className="font-semibold">500 ₽</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-muted-foreground">Часов</span>
          <span className="font-semibold">{hours}</span>
        </div>
        <div className="h-px bg-border my-3" />
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">Итого</span>
          <span className="text-2xl font-bold text-primary">{totalCost} ₽</span>
        </div>
      </div>

      <Button
        onClick={handleOrder}
        disabled={!selectedService || !address}
        className="w-full h-14 text-lg font-semibold shadow-lg shadow-primary/30"
        size="lg"
      >
        <Icon name="Zap" size={20} className="mr-2" />
        Заказать сейчас
      </Button>

      <div className="mt-6 flex items-center gap-2 justify-center text-sm text-muted-foreground">
        <Icon name="Clock" size={16} />
        <span>Специалист приедет в течение 30-60 минут</span>
      </div>
    </div>
  );
};

export default HomePage;
