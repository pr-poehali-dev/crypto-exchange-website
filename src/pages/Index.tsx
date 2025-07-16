import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [fromCurrency, setFromCurrency] = useState('BTC');
  const [toCurrency, setToCurrency] = useState('USDT');
  const [amount, setAmount] = useState('');
  const [exchangeRate, setExchangeRate] = useState(68500);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Симуляция обновления курса
      setExchangeRate(prev => prev + (Math.random() - 0.5) * 100);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const cryptoCurrencies = [
    { code: 'BTC', name: 'Bitcoin', rate: 68500, change: '+2.5%' },
    { code: 'ETH', name: 'Ethereum', rate: 3800, change: '+1.2%' },
    { code: 'USDT', name: 'Tether', rate: 1, change: '0.0%' },
    { code: 'BNB', name: 'Binance Coin', rate: 580, change: '+3.1%' },
    { code: 'XRP', name: 'Ripple', rate: 0.65, change: '+0.8%' },
    { code: 'ADA', name: 'Cardano', rate: 1.25, change: '+1.5%' },
  ];

  const recentExchanges = [
    { user: 'Alex***', from: 'BTC', to: 'USDT', amount: '0.5', time: '2 мин назад' },
    { user: 'Maria***', from: 'ETH', to: 'BTC', amount: '2.1', time: '5 мин назад' },
    { user: 'John***', from: 'USDT', to: 'BNB', amount: '1500', time: '8 мин назад' },
    { user: 'Anna***', from: 'BTC', to: 'USDT', amount: '0.8', time: '12 мин назад' },
  ];

  const testimonials = [
    {
      name: 'Алексей К.',
      rating: 5,
      text: 'Отличный курс! Обменял 2 BTC на USDT с выгодой 15%. Быстро и безопасно.',
      date: 'Сегодня, 14:30',
      verified: true
    },
    {
      name: 'Мария П.',
      rating: 5,
      text: 'Пользуюсь уже месяц. Реферальная программа просто супер! Заработал 500$ на рефералах.',
      date: 'Вчера, 18:45',
      verified: true
    },
    {
      name: 'Дмитрий С.',
      rating: 5,
      text: 'Обменял 15000 USDT с гарантированной выгодой 19%. Рекомендую всем!',
      date: 'Сегодня, 11:22',
      verified: true
    }
  ];

  const calculateOutput = () => {
    if (!amount || isNaN(parseFloat(amount))) return '0.00';
    const rate = fromCurrency === 'BTC' ? exchangeRate * 1.15 : exchangeRate;
    return (parseFloat(amount) * rate).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/img/f03b2d5c-b144-47fb-8dee-85d65f57a3a0.jpg" 
                alt="CryptoExchange" 
                className="h-10 w-10 rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold text-white">CryptoExchange</h1>
                <p className="text-sm text-gray-400">Выгодный обмен криптовалют</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-900/30 text-green-400">
                <Icon name="Zap" size={14} className="mr-1" />
                Онлайн
              </Badge>
              <Button variant="outline" className="border-orange-500 text-orange-400 hover:bg-orange-500/10">
                Поддержка 24/7
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: 'url(/img/9faa5fcf-2336-4906-990b-d10940daa243.jpg)' }}
        />
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-4">
              Обменивайте криптовалюты
              <span className="text-orange-400"> с выгодой +15%</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              P2P обменник с лучшими курсами. Минимальная сумма от 10 USDT. 
              Гарантированная безопасность и мгновенные переводы.
            </p>
          </div>

          {/* Exchange Form */}
          <Card className="max-w-2xl mx-auto bg-gray-800/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Icon name="ArrowLeftRight" size={24} className="mr-2 text-orange-400" />
                Обменник криптовалют
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Отдаете</label>
                  <div className="flex space-x-2">
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    <Select value={fromCurrency} onValueChange={setFromCurrency}>
                      <SelectTrigger className="w-32 bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {cryptoCurrencies.map(crypto => (
                          <SelectItem key={crypto.code} value={crypto.code}>
                            {crypto.code}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Получаете</label>
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      value={calculateOutput()}
                      readOnly
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    <Select value={toCurrency} onValueChange={setToCurrency}>
                      <SelectTrigger className="w-32 bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {cryptoCurrencies.map(crypto => (
                          <SelectItem key={crypto.code} value={crypto.code}>
                            {crypto.code}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700/30 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Курс обмена:</span>
                  <span className="text-orange-400 font-bold">
                    1 {fromCurrency} = {exchangeRate.toFixed(2)} {toCurrency}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Ваша выгода:</span>
                  <span className="text-green-400 font-bold">+15%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Комиссия:</span>
                  <span className="text-green-400 font-bold">0%</span>
                </div>
              </div>

              <Button 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 text-lg"
                disabled={!amount || parseFloat(amount) < 10}
              >
                <Icon name="Zap" size={20} className="mr-2" />
                Обменять сейчас
              </Button>

              <p className="text-sm text-gray-400 text-center">
                Минимальная сумма обмена: 10 USDT
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Live Rates */}
      <section className="py-16 px-4 bg-gray-800/30">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Курсы криптовалют в режиме реального времени
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {cryptoCurrencies.map(crypto => (
              <Card key={crypto.code} className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-400 mb-1">
                    {crypto.code}
                  </div>
                  <div className="text-white font-semibold mb-1">
                    ${crypto.rate.toLocaleString()}
                  </div>
                  <Badge 
                    variant={crypto.change.startsWith('+') ? 'default' : 'destructive'}
                    className={crypto.change.startsWith('+') ? 'bg-green-900/30 text-green-400' : ''}
                  >
                    {crypto.change}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Exchanges */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Последние обмены
          </h3>
          <div className="max-w-4xl mx-auto">
            {recentExchanges.map((exchange, index) => (
              <div key={index} className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-gray-700">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} className="text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">{exchange.user}</div>
                      <div className="text-gray-400 text-sm">
                        {exchange.amount} {exchange.from} → {exchange.to}
                      </div>
                    </div>
                  </div>
                  <div className="text-gray-400 text-sm">{exchange.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-gray-800/30">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Отзывы клиентов
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                      <Icon name="User" size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold">{testimonial.name}</div>
                      <div className="flex items-center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
                        ))}
                        {testimonial.verified && (
                          <Icon name="BadgeCheck" size={16} className="text-green-400 ml-2" />
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">{testimonial.text}</p>
                  <div className="text-sm text-gray-400">{testimonial.date}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Referral Program */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-8">
            Реферальная программа
          </h3>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-orange-400">
                <CardContent className="p-6 text-center">
                  <Icon name="Users" size={48} className="text-orange-400 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2">Приводите друзей</h4>
                  <p className="text-gray-300">Поделитесь своей реферальной ссылкой</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-400">
                <CardContent className="p-6 text-center">
                  <Icon name="Percent" size={48} className="text-green-400 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2">Получайте 25%</h4>
                  <p className="text-gray-300">С каждого обмена вашего реферала</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-400">
                <CardContent className="p-6 text-center">
                  <Icon name="TrendingUp" size={48} className="text-purple-400 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2">Без лимитов</h4>
                  <p className="text-gray-300">Неограниченный доход от рефералов</p>
                </CardContent>
              </Card>
            </div>
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-8 text-lg">
              <Icon name="Link" size={20} className="mr-2" />
              Получить реферальную ссылку
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-bold mb-4">CryptoExchange</h4>
              <p className="text-gray-400">Надежный P2P обменник криптовалют с выгодными курсами</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Услуги</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Обмен криптовалют</li>
                <li>P2P торги</li>
                <li>Реферальная программа</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Чат 24/7</li>
                <li>Telegram</li>
                <li>Email</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Безопасность</h4>
              <ul className="space-y-2 text-gray-400">
                <li>SSL защита</li>
                <li>Холодное хранение</li>
                <li>2FA аутентификация</li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-gray-700" />
          <div className="text-center text-gray-400">
            <p>&copy; 2024 CryptoExchange. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;