import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface TrackingPageProps {
  orderId: number | null;
}

interface YMapsAPI {
  ready: (callback: () => void) => void;
  Map: new (element: HTMLElement | null, options: unknown) => YMapsMap;
  Placemark: new (coords: number[], properties: unknown, options: unknown) => YMapsPlacemark;
}

interface YMapsMap {
  geoObjects: {
    add: (placemark: YMapsPlacemark) => void;
  };
  setCenter: (coords: number[], zoom: number, options?: unknown) => void;
}

interface YMapsPlacemark {
  geometry: {
    setCoordinates: (coords: number[]) => void;
  };
}

declare global {
  interface Window {
    ymaps: YMapsAPI;
  }
}

const TrackingPage = ({ orderId }: TrackingPageProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [workerPosition, setWorkerPosition] = useState({ lat: 55.751244, lng: 37.618423 });
  const [estimatedTime, setEstimatedTime] = useState(45);
  const [mapInstance, setMapInstance] = useState<YMapsMap | null>(null);
  const [workerPlacemark, setWorkerPlacemark] = useState<YMapsPlacemark | null>(null);

  useEffect(() => {
    if (!orderId || !mapRef.current) return;

    const initialLat = workerPosition.lat;
    const initialLng = workerPosition.lng;

    const initMap = () => {
      if (!window.ymaps) {
        setTimeout(initMap, 100);
        return;
      }

      window.ymaps.ready(() => {
        const map = new window.ymaps.Map(mapRef.current, {
          center: [initialLat, initialLng],
          zoom: 14,
          controls: ['zoomControl'],
        });

        const placemark = new window.ymaps.Placemark(
          [initialLat, initialLng],
          {
            hintContent: 'Специалист',
            balloonContent: 'Иван Смирнов',
          },
          {
            preset: 'islands#blueCircleDotIcon',
            iconColor: '#4a9eff',
          }
        );

        map.geoObjects.add(placemark);
        setMapInstance(map);
        setWorkerPlacemark(placemark);
      });
    };

    initMap();
  }, [orderId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWorkerPosition((prev) => {
        const newPos = {
          lat: prev.lat + (Math.random() - 0.5) * 0.001,
          lng: prev.lng + (Math.random() - 0.5) * 0.001,
        };

        if (workerPlacemark) {
          workerPlacemark.geometry.setCoordinates([newPos.lat, newPos.lng]);
        }

        if (mapInstance) {
          mapInstance.setCenter([newPos.lat, newPos.lng], 14, {
            duration: 300,
          });
        }

        return newPos;
      });
      setEstimatedTime((prev) => Math.max(0, prev - 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [workerPlacemark, mapInstance]);

  if (!orderId) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🗺️</div>
        <h2 className="text-xl font-semibold mb-2">Нет активных заказов</h2>
        <p className="text-muted-foreground">Создайте заказ, чтобы отследить специалиста</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto h-screen flex flex-col">
      <div className="relative flex-1">
        <div ref={mapRef} className="w-full h-full" />

        <div className="absolute top-4 left-4 right-4 z-10">
          <div className="bg-card rounded-2xl p-3 shadow-lg flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <Icon name="Navigation" size={20} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Специалист в пути</p>
              <p className="font-semibold">Прибудет через ~{estimatedTime} мин</p>
            </div>
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card p-6 rounded-t-3xl shadow-2xl">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="bg-primary/20 text-primary text-xl">ИС</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-bold text-lg">Иван Смирнов</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Star" size={14} className="fill-yellow-400 text-yellow-400" />
              <span>4.9 (127 отзывов)</span>
            </div>
          </div>
          <button className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
            <Icon name="Phone" size={20} className="text-primary" />
          </button>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="Package" size={16} />
            </div>
            <div>
              <p className="text-sm font-semibold">Сборка мебели</p>
              <p className="text-xs text-muted-foreground">2 часа · 1000 ₽</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="MapPin" size={16} />
            </div>
            <div>
              <p className="text-sm font-semibold">Адрес</p>
              <p className="text-xs text-muted-foreground">ул. Пушкина, д. 10, кв. 5</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="Clock" size={16} />
            </div>
            <div>
              <p className="text-sm font-semibold">Время заказа</p>
              <p className="text-xs text-muted-foreground">Сегодня, 14:30</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 h-12">
            <Icon name="MessageSquare" size={18} className="mr-2" />
            Написать
          </Button>
          <Button variant="destructive" className="flex-1 h-12">
            <Icon name="XCircle" size={18} className="mr-2" />
            Отменить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;