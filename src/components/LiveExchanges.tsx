import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { format, formatDistanceToNow } from 'date-fns';
import { enUS, ru, es, fr, de, it, pt, zhCN, ja, ko, ar, hi, tr } from 'date-fns/locale';
import { v4 as uuidv4 } from 'uuid';

interface Exchange {
  id: string;
  user: string;
  fromCurrency: string;
  toCurrency: string;
  amount: string;
  timestamp: Date;
  profit: string;
}

const LiveExchanges: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [exchanges, setExchanges] = useState<Exchange[]>([]);

  const locales = {
    en: enUS,
    ru: ru,
    es: es,
    fr: fr,
    de: de,
    it: it,
    pt: pt,
    zh: zhCN,
    ja: ja,
    ko: ko,
    ar: ar,
    hi: hi,
    tr: tr,
  };

  const currencies = ['BTC', 'ETH', 'USDT', 'BNB', 'XRP', 'ADA', 'SOL', 'DOGE', 'MATIC', 'AVAX'];
  const firstNames = [
    'Alex', 'Maria', 'John', 'Anna', 'David', 'Sarah', 'Michael', 'Emma', 'James', 'Lisa',
    'Robert', 'Jessica', 'William', 'Ashley', 'Daniel', 'Amanda', 'Matthew', 'Melissa',
    'Christopher', 'Deborah', 'Anthony', 'Dorothy', 'Mark', 'Lisa', 'Donald', 'Nancy',
    'Steven', 'Karen', 'Paul', 'Betty', 'Andrew', 'Helen', 'Joshua', 'Sandra', 'Kenneth',
    'Donna', 'Kevin', 'Carol', 'Brian', 'Ruth', 'George', 'Sharon', 'Timothy', 'Michelle',
    'Ronald', 'Laura', 'Jason', 'Sarah', 'Edward', 'Kimberly', 'Jeffrey', 'Deborah',
    'Ryan', 'Dorothy', 'Jacob', 'Lisa', 'Gary', 'Nancy', 'Nicholas', 'Karen', 'Eric',
    'Betty', 'Jonathan', 'Helen', 'Stephen', 'Sandra', 'Larry', 'Donna', 'Justin',
    'Carol', 'Scott', 'Ruth', 'Brandon', 'Sharon', 'Benjamin', 'Michelle', 'Samuel',
    'Laura', 'Frank', 'Sarah', 'Raymond', 'Kimberly', 'Alexander', 'Deborah', 'Patrick',
    'Dorothy', 'Jack', 'Lisa', 'Dennis', 'Nancy', 'Jerry', 'Karen', 'Tyler', 'Betty',
    'Aaron', 'Helen', 'Henry', 'Sandra', 'Jose', 'Donna', 'Douglas', 'Carol', 'Nathan',
    'Ruth', 'Peter', 'Sharon', 'Zachary', 'Michelle', 'Kyle', 'Laura', 'Walter', 'Sarah'
  ];

  const generateRandomExchange = (): Exchange => {
    const fromCurrency = currencies[Math.floor(Math.random() * currencies.length)];
    let toCurrency = currencies[Math.floor(Math.random() * currencies.length)];
    
    // Ensure different currencies
    while (toCurrency === fromCurrency) {
      toCurrency = currencies[Math.floor(Math.random() * currencies.length)];
    }

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const user = `${firstName}***`;
    
    // Generate realistic amounts
    const amounts = {
      BTC: (Math.random() * 5 + 0.1).toFixed(3),
      ETH: (Math.random() * 20 + 1).toFixed(2),
      USDT: (Math.random() * 50000 + 100).toFixed(0),
      BNB: (Math.random() * 100 + 5).toFixed(1),
      XRP: (Math.random() * 10000 + 100).toFixed(0),
      ADA: (Math.random() * 5000 + 100).toFixed(0),
      SOL: (Math.random() * 500 + 10).toFixed(1),
      DOGE: (Math.random() * 100000 + 1000).toFixed(0),
      MATIC: (Math.random() * 10000 + 100).toFixed(0),
      AVAX: (Math.random() * 1000 + 50).toFixed(1),
    };

    const amount = amounts[fromCurrency as keyof typeof amounts] || '100';
    const profit = parseFloat(amount) >= 10000 ? '+19%' : '+15%';

    // Generate timestamp between now and 4 hours ago
    const now = new Date();
    const fourHoursAgo = new Date(now.getTime() - 4 * 60 * 60 * 1000);
    const timestamp = new Date(fourHoursAgo.getTime() + Math.random() * (now.getTime() - fourHoursAgo.getTime()));

    return {
      id: uuidv4(),
      user,
      fromCurrency,
      toCurrency,
      amount,
      timestamp,
      profit
    };
  };

  useEffect(() => {
    // Generate initial exchanges
    const initialExchanges = Array.from({ length: 8 }, generateRandomExchange);
    setExchanges(initialExchanges.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));

    // Add new exchange every 8-15 seconds
    const interval = setInterval(() => {
      setExchanges(prev => {
        const newExchange = generateRandomExchange();
        const updated = [newExchange, ...prev.slice(0, 19)]; // Keep only last 20 exchanges
        return updated.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      });
    }, Math.random() * 7000 + 8000); // 8-15 seconds

    return () => clearInterval(interval);
  }, []);

  const formatTime = (timestamp: Date) => {
    const currentLocale = locales[i18n.language as keyof typeof locales] || enUS;
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${t('recentExchanges.minutesAgo')}`;
    } else {
      const diffInHours = Math.floor(diffInMinutes / 60);
      return `${diffInHours} ${t('recentExchanges.hoursAgo')}`;
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h3 className="text-3xl font-bold text-white text-center mb-12 flex items-center justify-center">
          <Icon name="Activity" size={32} className="mr-3 text-purple-400" />
          {t('recentExchanges.title')}
          <Badge className="ml-3 bg-green-900/30 text-green-400 animate-pulse">
            <Icon name="Circle" size={8} className="mr-1 fill-current" />
            {t('rates.online')}
          </Badge>
        </h3>
        
        <div className="max-w-4xl mx-auto space-y-3">
          {exchanges.map((exchange) => (
            <Card 
              key={exchange.id}
              className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 animate-fadeIn"
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Icon name="User" size={20} className="text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
                    </div>
                    <div>
                      <div className="text-white font-semibold flex items-center">
                        {exchange.user}
                        <Badge className="ml-2 bg-purple-900/30 text-purple-400 text-xs">
                          {exchange.profit}
                        </Badge>
                      </div>
                      <div className="text-gray-400 text-sm flex items-center">
                        <span className="font-mono">
                          {exchange.amount} {exchange.fromCurrency}
                        </span>
                        <Icon name="ArrowRight" size={14} className="mx-2 text-purple-400" />
                        <span className="font-mono">
                          {exchange.toCurrency}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-400 text-sm">
                      {formatTime(exchange.timestamp)}
                    </div>
                    <div className="flex items-center mt-1">
                      <Icon name="CheckCircle" size={16} className="text-green-400 mr-1" />
                      <span className="text-green-400 text-xs font-medium">
                        Completed
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            🔄 {t('recentExchanges.title')} • High frequency trading • No delays
          </p>
        </div>
      </div>
    </section>
  );
};

export default LiveExchanges;