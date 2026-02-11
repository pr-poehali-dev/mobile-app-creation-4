import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Order {
  id: number;
  date: string;
  status: string;
  total: number;
  items: number;
}

const orders: Order[] = [
  { id: 1234, date: '10 фев 2026', status: 'Доставлен', total: 17980, items: 2 },
  { id: 1233, date: '5 фев 2026', status: 'В пути', total: 4990, items: 1 },
  { id: 1232, date: '28 янв 2026', status: 'Доставлен', total: 8980, items: 3 },
];

const ProfilePage = () => {
  return (
    <div className="max-w-lg mx-auto px-4 py-6 animate-fade-in">
      <header className="mb-6 flex items-center gap-4">
        <Avatar className="w-20 h-20">
          <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-secondary text-white">
            АП
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">Алексей Петров</h1>
          <p className="text-muted-foreground">alex.petrov@mail.ru</p>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-card rounded-2xl p-4 text-center">
          <Icon name="Package" size={24} className="mx-auto mb-2 text-primary" />
          <p className="text-2xl font-bold">{orders.length}</p>
          <p className="text-xs text-muted-foreground">Заказов</p>
        </div>
        <div className="bg-card rounded-2xl p-4 text-center">
          <Icon name="Heart" size={24} className="mx-auto mb-2 text-secondary" />
          <p className="text-2xl font-bold">12</p>
          <p className="text-xs text-muted-foreground">Избранное</p>
        </div>
        <div className="bg-card rounded-2xl p-4 text-center">
          <Icon name="Star" size={24} className="mx-auto mb-2 text-accent" />
          <p className="text-2xl font-bold">450</p>
          <p className="text-xs text-muted-foreground">Бонусы</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">История заказов</h2>
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-card rounded-2xl p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-semibold">Заказ #{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    order.status === 'Доставлен'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">{order.items} товара</p>
                <p className="font-bold text-primary">{order.total} ₽</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <Button variant="outline" className="w-full justify-start h-14" size="lg">
          <Icon name="MapPin" size={20} className="mr-3" />
          Адреса доставки
        </Button>
        <Button variant="outline" className="w-full justify-start h-14" size="lg">
          <Icon name="CreditCard" size={20} className="mr-3" />
          Способы оплаты
        </Button>
        <Button variant="outline" className="w-full justify-start h-14" size="lg">
          <Icon name="Bell" size={20} className="mr-3" />
          Уведомления
        </Button>
        <Button variant="outline" className="w-full justify-start h-14" size="lg">
          <Icon name="Settings" size={20} className="mr-3" />
          Настройки
        </Button>
      </div>

      <Button variant="destructive" className="w-full h-12" size="lg">
        <Icon name="LogOut" size={20} className="mr-2" />
        Выйти
      </Button>
    </div>
  );
};

export default ProfilePage;
