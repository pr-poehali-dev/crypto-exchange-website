import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { getCryptoPrices, calculateProfitableRate, sendToAdminWallet, CryptoPrice } from '@/services/cryptoAPI';
import { toast } from 'react-hot-toast';

interface ExchangeFormData {
  fromCurrency: string;
  toCurrency: string;
  amount: string;
  walletAddress: string;
}

const ExchangeForm: React.FC = () => {
  const { t } = useTranslation();
  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrice[]>([]);
  const [loading, setLoading] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(0);
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ExchangeFormData>({
    defaultValues: {
      fromCurrency: 'BTC',
      toCurrency: 'USDT',
      amount: '',
      walletAddress: ''
    }
  });

  const watchedValues = watch();

  useEffect(() => {
    const fetchPrices = async () => {
      const prices = await getCryptoPrices();
      setCryptoPrices(prices);
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 10000); // Update every 10 seconds
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (cryptoPrices.length > 0 && watchedValues.fromCurrency && watchedValues.toCurrency) {
      const fromPrice = cryptoPrices.find(p => p.symbol === watchedValues.fromCurrency)?.price || 0;
      const toPrice = cryptoPrices.find(p => p.symbol === watchedValues.toCurrency)?.price || 1;
      const marketRate = fromPrice / toPrice;
      const amount = parseFloat(watchedValues.amount) || 0;
      const profitableRate = calculateProfitableRate(watchedValues.fromCurrency, watchedValues.toCurrency, marketRate, amount);
      setExchangeRate(profitableRate);
    }
  }, [cryptoPrices, watchedValues.fromCurrency, watchedValues.toCurrency, watchedValues.amount]);

  const onSubmit = async (data: ExchangeFormData) => {
    setLoading(true);
    
    try {
      const amount = parseFloat(data.amount);
      
      if (amount < 10) {
        toast.error(t('exchangeForm.minAmount'));
        setLoading(false);
        return;
      }

      const profit = amount >= 10000 ? 0.19 : 0.15;
      
      const exchangeData = {
        from: data.fromCurrency,
        to: data.toCurrency,
        amount,
        rate: exchangeRate,
        profit,
        adminWallet: data.walletAddress
      };

      const success = await sendToAdminWallet(exchangeData);
      
      if (success) {
        toast.success(t('notifications.exchangeSuccess'));
        toast.success(t('notifications.adminNotified'));
        
        // Reset form
        setValue('amount', '');
        setValue('walletAddress', '');
      } else {
        toast.error(t('notifications.exchangeError'));
      }
    } catch (error) {
      toast.error(t('notifications.exchangeError'));
    } finally {
      setLoading(false);
    }
  };

  const calculateOutput = () => {
    const amount = parseFloat(watchedValues.amount) || 0;
    return (amount * exchangeRate).toFixed(6);
  };

  const getProfit = () => {
    const amount = parseFloat(watchedValues.amount) || 0;
    return amount >= 10000 ? '+19%' : '+15%';
  };

  return (
    <Card className="max-w-2xl mx-auto bg-gray-800/50 border-gray-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Icon name="ArrowLeftRight" size={24} className="mr-2 text-purple-400" />
          {t('exchangeForm.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">{t('exchangeForm.youSend')}</label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="0.00"
                  step="0.000001"
                  {...register('amount', { 
                    required: t('exchangeForm.minAmount'),
                    min: { value: 10, message: t('exchangeForm.minAmount') }
                  })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
                <Select value={watchedValues.fromCurrency} onValueChange={(value) => setValue('fromCurrency', value)}>
                  <SelectTrigger className="w-32 bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cryptoPrices.map(crypto => (
                      <SelectItem key={crypto.symbol} value={crypto.symbol}>
                        {crypto.symbol}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {errors.amount && <p className="text-red-400 text-sm">{errors.amount.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">{t('exchangeForm.youGet')}</label>
              <div className="flex space-x-2">
                <Input
                  type="text"
                  value={calculateOutput()}
                  readOnly
                  className="bg-gray-700 border-gray-600 text-white"
                />
                <Select value={watchedValues.toCurrency} onValueChange={(value) => setValue('toCurrency', value)}>
                  <SelectTrigger className="w-32 bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cryptoPrices.map(crypto => (
                      <SelectItem key={crypto.symbol} value={crypto.symbol}>
                        {crypto.symbol}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">{t('exchangeForm.walletAddress')}</label>
            <Input
              type="text"
              placeholder="Enter your wallet address"
              {...register('walletAddress', { required: 'Wallet address is required' })}
              className="bg-gray-700 border-gray-600 text-white"
            />
            {errors.walletAddress && <p className="text-red-400 text-sm">{errors.walletAddress.message}</p>}
          </div>

          <div className="bg-gray-700/30 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300">{t('exchangeForm.exchangeRate')}:</span>
              <span className="text-purple-400 font-bold">
                1 {watchedValues.fromCurrency} = {exchangeRate.toFixed(6)} {watchedValues.toCurrency}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300">{t('exchangeForm.yourProfit')}:</span>
              <Badge className="bg-green-900/30 text-green-400">
                {getProfit()}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">{t('exchangeForm.commission')}:</span>
              <span className="text-green-400 font-bold">0%</span>
            </div>
          </div>

          {parseFloat(watchedValues.amount) >= 10000 && (
            <div className="bg-gradient-to-r from-gold/20 to-purple-500/20 rounded-lg p-4 border border-gold/30">
              <div className="flex items-center space-x-2">
                <Icon name="Star" size={20} className="text-gold" />
                <span className="text-gold font-bold">{t('specialOffer.title')}</span>
              </div>
              <p className="text-gray-300 text-sm mt-1">{t('specialOffer.profit19')}</p>
            </div>
          )}

          <Button 
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-3 text-lg"
            disabled={loading || !watchedValues.amount || parseFloat(watchedValues.amount) < 10}
          >
            {loading ? (
              <>
                <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Icon name="Zap" size={20} className="mr-2" />
                {t('exchangeForm.sendToAdmin')}
              </>
            )}
          </Button>

          <p className="text-sm text-gray-400 text-center">
            {t('exchangeForm.minAmount')}
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExchangeForm;