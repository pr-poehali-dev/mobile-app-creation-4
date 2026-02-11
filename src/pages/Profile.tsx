import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

const ProfilePage = () => {
  return (
    <div className="max-w-lg mx-auto px-4 py-6 animate-fade-in">
      <header className="mb-8 flex items-center gap-4">
        <Avatar className="w-20 h-20">
          <AvatarFallback className="text-2xl bg-primary/20 text-primary">АП</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">Алексей Петров</h1>
          <p className="text-muted-foreground">+7 (999) 123-45-67</p>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="bg-card rounded-xl p-4 text-center">
          <Icon name="Briefcase" size={24} className="mx-auto mb-2 text-primary" />
          <p className="text-2xl font-bold">12</p>
          <p className="text-xs text-muted-foreground">Заказов</p>
        </div>
        <div className="bg-card rounded-xl p-4 text-center">
          <Icon name="Clock" size={24} className="mx-auto mb-2 text-primary" />
          <p className="text-2xl font-bold">48</p>
          <p className="text-xs text-muted-foreground">Часов</p>
        </div>
        <div className="bg-card rounded-xl p-4 text-center">
          <Icon name="Wallet" size={24} className="mx-auto mb-2 text-primary" />
          <p className="text-2xl font-bold">24k</p>
          <p className="text-xs text-muted-foreground">Потрачено</p>
        </div>
      </div>

      <div className="space-y-3 mb-8">
        <Button variant="outline" className="w-full justify-start h-14">
          <Icon name="MapPin" size={20} className="mr-3 text-primary" />
          <span>Мои адреса</span>
        </Button>
        <Button variant="outline" className="w-full justify-start h-14">
          <Icon name="CreditCard" size={20} className="mr-3 text-primary" />
          <span>Способы оплаты</span>
        </Button>
        <Button variant="outline" className="w-full justify-start h-14">
          <Icon name="Bell" size={20} className="mr-3 text-primary" />
          <span>Уведомления</span>
        </Button>
        <Button variant="outline" className="w-full justify-start h-14">
          <Icon name="MessageSquare" size={20} className="mr-3 text-primary" />
          <span>Поддержка</span>
        </Button>
        <Button variant="outline" className="w-full justify-start h-14">
          <Icon name="Settings" size={20} className="mr-3 text-primary" />
          <span>Настройки</span>
        </Button>
      </div>

      <Button variant="outline" className="w-full h-12 text-destructive border-destructive/30 hover:bg-destructive/10">
        <Icon name="LogOut" size={20} className="mr-2" />
        Выйти
      </Button>

      <div className="mt-8 text-center text-xs text-muted-foreground">
        <p>Версия 1.0.0</p>
        <p className="mt-1">© 2026 Разнорабочий</p>
      </div>
    </div>
  );
};

export default ProfilePage;
