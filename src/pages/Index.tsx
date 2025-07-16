import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import LanguageSelector from '@/components/LanguageSelector';
import ExchangeForm from '@/components/ExchangeForm';
import LiveExchanges from '@/components/LiveExchanges';
import { getCryptoPrices, CryptoPrice } from '@/services/cryptoAPI';
import { format } from 'date-fns';

const Index = () => {
  const { t } = useTranslation();
  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrice[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchPrices = async () => {
      const prices = await getCryptoPrices();
      setCryptoPrices(prices);
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: 'Alex K.',
      rating: 5,
      text: 'Excellent rate! Exchanged 2 BTC to USDT with 15% profit. Fast and secure.',
      date: t('testimonials.today') + ', 14:30',
      verified: true
    },
    {
      name: 'Maria P.',
      rating: 5,
      text: 'Using for a month now. Referral program is amazing! Earned $500 from referrals.',
      date: t('testimonials.yesterday') + ', 18:45',
      verified: true
    },
    {
      name: 'John S.',
      rating: 5,
      text: 'Exchanged 15000 USDT with guaranteed 19% profit. Highly recommend!',
      date: t('testimonials.today') + ', 11:22',
      verified: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/img/c53935cb-33ec-4c91-86de-de1d0ef36c53.jpg" 
                alt="CryptoExchange Pro" 
                className="h-12 w-12 rounded-full border-2 border-purple-400"
              />
              <div>
                <h1 className="text-2xl font-bold text-white">{t('title')}</h1>
                <p className="text-sm text-gray-400">{t('subtitle')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-900/30 text-green-400">
                <Icon name="Zap" size={14} className="mr-1" />
                {t('rates.online')}
              </Badge>
              <div className="text-sm text-gray-400 hidden sm:block">
                {format(currentTime, 'HH:mm:ss')}
              </div>
              <LanguageSelector />
              <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
                <Icon name="MessageCircle" size={16} className="mr-2" />
                24/7 Support
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: 'url(/img/8c9dac1c-aac5-415d-ac85-fd6032646436.jpg)' }}
        />
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-4">
              {t('hero.title')}
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {t('hero.description')}
            </p>
          </div>

          <ExchangeForm />
        </div>
      </section>

      {/* Live Rates */}
      <section className="py-16 px-4 bg-gray-800/30">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-white text-center mb-12 flex items-center justify-center">
            <Icon name="TrendingUp" size={32} className="mr-3 text-purple-400" />
            {t('rates.title')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {cryptoPrices.map(crypto => (
              <Card key={crypto.symbol} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-1">
                    {crypto.symbol}
                  </div>
                  <div className="text-white font-semibold mb-1">
                    ${crypto.price.toLocaleString()}
                  </div>
                  <Badge 
                    variant={crypto.change24h >= 0 ? 'default' : 'destructive'}
                    className={crypto.change24h >= 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}
                  >
                    {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Exchanges */}
      <LiveExchanges />

      {/* Special Offer */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-900/20 to-gold/20">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-purple-500/20 to-gold/20 rounded-2xl p-8 border border-purple-400/30">
              <Icon name="Star" size={48} className="text-gold mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white mb-4">
                {t('specialOffer.title')}
              </h3>
              <p className="text-xl text-gray-300 mb-2">
                {t('specialOffer.subtitle')}
              </p>
              <div className="text-4xl font-bold text-gold mb-4">
                {t('specialOffer.profit19')}
              </div>
              <Badge className="bg-gold/20 text-gold border-gold/30">
                {t('specialOffer.oncePerMonth')}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-gray-800/30">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-white text-center mb-12 flex items-center justify-center">
            <Icon name="MessageSquare" size={32} className="mr-3 text-purple-400" />
            {t('testimonials.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
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
          <h3 className="text-3xl font-bold text-white mb-8 flex items-center justify-center">
            <Icon name="Users" size={32} className="mr-3 text-purple-400" />
            {t('referralProgram.title')}
          </h3>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-400">
                <CardContent className="p-6 text-center">
                  <Icon name="UserPlus" size={48} className="text-purple-400 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2">{t('referralProgram.bringFriends')}</h4>
                  <p className="text-gray-300">Share your referral link</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-400">
                <CardContent className="p-6 text-center">
                  <Icon name="Percent" size={48} className="text-green-400 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2">{t('referralProgram.earn25')}</h4>
                  <p className="text-gray-300">From each referral exchange</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-gold/20 to-yellow-600/20 border-gold/50">
                <CardContent className="p-6 text-center">
                  <Icon name="Infinity" size={48} className="text-gold mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-white mb-2">{t('referralProgram.noLimits')}</h4>
                  <p className="text-gray-300">Unlimited referral income</p>
                </CardContent>
              </Card>
            </div>
            <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-3 px-8 text-lg">
              <Icon name="Link" size={20} className="mr-2" />
              {t('referralProgram.getReferralLink')}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img 
                  src="/img/c53935cb-33ec-4c91-86de-de1d0ef36c53.jpg" 
                  alt="CryptoExchange Pro" 
                  className="h-8 w-8 rounded-full"
                />
                <h4 className="text-white font-bold">{t('title')}</h4>
              </div>
              <p className="text-gray-400">Reliable P2P cryptocurrency exchange with profitable rates</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">{t('footer.services')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Cryptocurrency Exchange</li>
                <li>P2P Trading</li>
                <li>Referral Program</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">{t('footer.support')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>24/7 Live Chat</li>
                <li>Telegram Support</li>
                <li>Email Support</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">{t('footer.security')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>SSL Protection</li>
                <li>Cold Storage</li>
                <li>2FA Authentication</li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-gray-700" />
          <div className="text-center text-gray-400 flex items-center justify-center space-x-4">
            <p>&copy; 2024 CryptoExchange Pro. {t('footer.rights')}</p>
            <div className="flex space-x-2">
              <Icon name="Shield" size={16} className="text-green-400" />
              <span className="text-green-400 text-sm">Secure Platform</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;