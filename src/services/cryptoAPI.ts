import axios from 'axios';

export interface CryptoPrice {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
}

export interface ExchangeData {
  from: string;
  to: string;
  amount: number;
  rate: number;
  profit: number;
  adminWallet: string;
}

const CRYPTO_API_URL = 'https://api.coingecko.com/api/v3';

export const getCryptoPrices = async (): Promise<CryptoPrice[]> => {
  try {
    const response = await axios.get(`${CRYPTO_API_URL}/simple/price`, {
      params: {
        ids: 'bitcoin,ethereum,tether,binancecoin,ripple,cardano,solana,dogecoin,polygon,avalanche-2',
        vs_currencies: 'usd',
        include_24hr_change: 'true',
        include_24hr_vol: 'true'
      }
    });

    const data = response.data;
    
    return [
      {
        symbol: 'BTC',
        price: data.bitcoin?.usd || 0,
        change24h: data.bitcoin?.usd_24h_change || 0,
        volume24h: data.bitcoin?.usd_24h_vol || 0
      },
      {
        symbol: 'ETH',
        price: data.ethereum?.usd || 0,
        change24h: data.ethereum?.usd_24h_change || 0,
        volume24h: data.ethereum?.usd_24h_vol || 0
      },
      {
        symbol: 'USDT',
        price: data.tether?.usd || 1,
        change24h: data.tether?.usd_24h_change || 0,
        volume24h: data.tether?.usd_24h_vol || 0
      },
      {
        symbol: 'BNB',
        price: data.binancecoin?.usd || 0,
        change24h: data.binancecoin?.usd_24h_change || 0,
        volume24h: data.binancecoin?.usd_24h_vol || 0
      },
      {
        symbol: 'XRP',
        price: data.ripple?.usd || 0,
        change24h: data.ripple?.usd_24h_change || 0,
        volume24h: data.ripple?.usd_24h_vol || 0
      },
      {
        symbol: 'ADA',
        price: data.cardano?.usd || 0,
        change24h: data.cardano?.usd_24h_change || 0,
        volume24h: data.cardano?.usd_24h_vol || 0
      },
      {
        symbol: 'SOL',
        price: data.solana?.usd || 0,
        change24h: data.solana?.usd_24h_change || 0,
        volume24h: data.solana?.usd_24h_vol || 0
      },
      {
        symbol: 'DOGE',
        price: data.dogecoin?.usd || 0,
        change24h: data.dogecoin?.usd_24h_change || 0,
        volume24h: data.dogecoin?.usd_24h_vol || 0
      },
      {
        symbol: 'MATIC',
        price: data.polygon?.usd || 0,
        change24h: data.polygon?.usd_24h_change || 0,
        volume24h: data.polygon?.usd_24h_vol || 0
      },
      {
        symbol: 'AVAX',
        price: data['avalanche-2']?.usd || 0,
        change24h: data['avalanche-2']?.usd_24h_change || 0,
        volume24h: data['avalanche-2']?.usd_24h_vol || 0
      }
    ];
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    // Fallback prices
    return [
      { symbol: 'BTC', price: 68500, change24h: 2.5, volume24h: 12000000000 },
      { symbol: 'ETH', price: 3800, change24h: 1.2, volume24h: 8000000000 },
      { symbol: 'USDT', price: 1, change24h: 0.0, volume24h: 45000000000 },
      { symbol: 'BNB', price: 580, change24h: 3.1, volume24h: 1200000000 },
      { symbol: 'XRP', price: 0.65, change24h: 0.8, volume24h: 1800000000 },
      { symbol: 'ADA', price: 1.25, change24h: 1.5, volume24h: 800000000 },
      { symbol: 'SOL', price: 180, change24h: 4.2, volume24h: 2200000000 },
      { symbol: 'DOGE', price: 0.08, change24h: -1.2, volume24h: 600000000 },
      { symbol: 'MATIC', price: 0.85, change24h: 2.8, volume24h: 400000000 },
      { symbol: 'AVAX', price: 35, change24h: 1.9, volume24h: 300000000 }
    ];
  }
};

export const calculateProfitableRate = (fromSymbol: string, toSymbol: string, marketRate: number, amount: number): number => {
  const baseProfit = amount >= 10000 ? 0.19 : 0.15; // 19% for 10k+ USDT, 15% otherwise
  return marketRate * (1 + baseProfit);
};

export const sendToAdminWallet = async (exchangeData: ExchangeData): Promise<boolean> => {
  try {
    // Simulate sending to admin wallet
    const adminWallets = {
      BTC: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      ETH: '0x742d35Cc6634C0532925a3b8D404b404c4f69b6',
      USDT: 'TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE',
      BNB: 'bnb1grpf0955h0ykzq3ar5nmum7y6gdfl6lxfn46h2',
      XRP: 'rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH',
      ADA: 'DdzFFzCqrhsf2jrEP5BQqjYi8VZyktS9YkVj7s5MNANaRzC3uoNjdLGz8h1V3KGP7z3s7pQJ',
      SOL: '11111111111111111111111111111112',
      DOGE: 'DQYrNGCf65H7N3EqfcWHe7U3RZbfm9DWrA',
      MATIC: '0x0000000000000000000000000000000000001010',
      AVAX: 'avax1qxj7e9z5q6x8t3j6r8u9a4d6h8g5f4r2s1c9'
    };

    const adminWallet = adminWallets[exchangeData.from as keyof typeof adminWallets] || adminWallets.BTC;
    
    // Simulate API call to send notification to admin
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In real application, this would send actual notification
    console.log('Exchange notification sent to admin:', {
      from: exchangeData.from,
      to: exchangeData.to,
      amount: exchangeData.amount,
      rate: exchangeData.rate,
      profit: exchangeData.profit,
      adminWallet
    });
    
    return true;
  } catch (error) {
    console.error('Error sending to admin wallet:', error);
    return false;
  }
};