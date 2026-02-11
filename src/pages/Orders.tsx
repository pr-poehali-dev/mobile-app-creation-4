import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface OrdersPageProps {
  onOrderClick: (orderId: number) => void;
}

interface Order {
  id: number;
  service: string;
  worker: string;
  date: string;
  time: string;
  cost: number;
  status: 'active' | 'completed' | 'cancelled';
  icon: string;
}

const orders: Order[] = [
  {
    id: 1,
    service: 'Сборка мебели',
    worker: 'Иван Смирнов',
    date: '11 фев',
    time: '14:30',
    cost: 1000,
    status: 'active',
    icon: '🛠️',
  },
  {
    id: 2,
    service: 'Электрика',
    worker: 'Петр Васильев',
    date: '9 фев',
    time: '10:00',
    cost: 750,
    status: 'completed',
    icon: '💡',
  },
  {
    id: 3,
    service: 'Сантехника',
    worker: 'Алексей Козлов',
    date: '5 фев',
    time: '16:00',
    cost: 1500,
    status: 'completed',
    icon: '🚰',
  },
  {
    id: 4,
    service: 'Переезд',
    worker: 'Дмитрий Орлов',
    date: '1 фев',
    time: '09:00',
    cost: 3000,
    status: 'completed',
    icon: '📦',
  },
];

const OrdersPage = ({ onOrderClick }: OrdersPageProps) => {
  const activeOrders = orders.filter((o) => o.status === 'active');
  const completedOrders = orders.filter((o) => o.status === 'completed');

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <Icon name="Circle" size={8} className="mr-1 fill-green-400" />
            Активен
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="outline" className="text-muted-foreground">
            <Icon name="Check" size={12} className="mr-1" />
            Завершен
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge variant="outline" className="text-destructive border-destructive/30">
            <Icon name="X" size={12} className="mr-1" />
            Отменен
          </Badge>
        );
    }
  };

  const renderOrder = (order: Order) => (
    <div
      key={order.id}
      onClick={() => order.status === 'active' && onOrderClick(order.id)}
      className={`bg-card rounded-2xl p-4 ${
        order.status === 'active' ? 'cursor-pointer hover:bg-secondary/50 transition-colors' : ''
      }`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="text-4xl">{order.icon}</div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-semibold">{order.service}</h3>
            {getStatusBadge(order.status)}
          </div>
          <p className="text-sm text-muted-foreground mb-1">{order.worker}</p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Icon name="Calendar" size={12} />
              {order.date}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="Clock" size={12} />
              {order.time}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className="text-xl font-bold text-primary">{order.cost} ₽</span>
        {order.status === 'active' && (
          <span className="text-sm text-primary flex items-center gap-1">
            Смотреть на карте
            <Icon name="ChevronRight" size={16} />
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto px-4 py-6 animate-fade-in">
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Мои заказы</h1>
        <p className="text-muted-foreground">История и активные заказы</p>
      </header>

      {activeOrders.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            Активные заказы
            <Badge className="bg-primary/20 text-primary border-primary/30">
              {activeOrders.length}
            </Badge>
          </h2>
          <div className="space-y-3">{activeOrders.map(renderOrder)}</div>
        </div>
      )}

      {completedOrders.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3">История</h2>
          <div className="space-y-3">{completedOrders.map(renderOrder)}</div>
        </div>
      )}

      {orders.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-xl font-semibold mb-2">Нет заказов</h2>
          <p className="text-muted-foreground">Создайте первый заказ на главной странице</p>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
