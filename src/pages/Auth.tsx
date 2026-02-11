import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface AuthPageProps {
  onSuccess: () => void;
  onClose: () => void;
}

const AuthPage = ({ onSuccess, onClose }: AuthPageProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [showResetSuccess, setShowResetSuccess] = useState(false);

  const handleLogin = () => {
    onSuccess();
  };

  const handleRegister = () => {
    onSuccess();
  };

  const handlePasswordReset = () => {
    setShowResetSuccess(true);
    setTimeout(() => {
      setShowResetSuccess(false);
      setResetEmail('');
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 animate-fade-in">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
          <div className="p-6 bg-gradient-to-r from-primary to-secondary">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-white">ShopApp</h1>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <Icon name="X" size={20} className="text-white" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Вход</TabsTrigger>
                <TabsTrigger value="register">Регистрация</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="example@mail.ru"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Пароль</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12"
                  />
                </div>
                <Button
                  variant="link"
                  className="px-0 text-primary"
                  onClick={() => {
                    const resetTab = document.querySelector('[value="reset"]') as HTMLElement;
                    resetTab?.click();
                  }}
                >
                  Забыли пароль?
                </Button>
                <Button onClick={handleLogin} className="w-full h-12 text-base font-semibold">
                  Войти
                </Button>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">или</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-12">
                    <Icon name="Mail" size={20} className="mr-2" />
                    Google
                  </Button>
                  <Button variant="outline" className="h-12">
                    <Icon name="Github" size={20} className="mr-2" />
                    GitHub
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="register" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Имя</Label>
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="Алексей"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="example@mail.ru"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Пароль</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12"
                  />
                </div>
                <Button onClick={handleRegister} className="w-full h-12 text-base font-semibold">
                  Зарегистрироваться
                </Button>
              </TabsContent>

              <TabsContent value="reset" className="space-y-4 hidden">
                {showResetSuccess ? (
                  <div className="text-center py-8 space-y-3">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Icon name="Check" size={32} className="text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold">Письмо отправлено!</h3>
                    <p className="text-sm text-muted-foreground">
                      Проверьте вашу почту для восстановления пароля
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold mb-2">Восстановление пароля</h3>
                      <p className="text-sm text-muted-foreground">
                        Введите email для получения инструкций
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reset-email">Email</Label>
                      <Input
                        id="reset-email"
                        type="email"
                        placeholder="example@mail.ru"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className="h-12"
                      />
                    </div>
                    <Button
                      onClick={handlePasswordReset}
                      className="w-full h-12 text-base font-semibold"
                    >
                      Отправить
                    </Button>
                  </>
                )}
              </TabsContent>
            </Tabs>

            <TabsList className="hidden">
              <TabsTrigger value="reset">Восстановление</TabsTrigger>
            </TabsList>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
