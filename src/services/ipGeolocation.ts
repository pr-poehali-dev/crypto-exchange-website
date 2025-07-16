export const detectLanguageByIP = async (): Promise<string> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    const countryToLanguage: { [key: string]: string } = {
      'RU': 'ru',
      'BY': 'ru',
      'KZ': 'ru',
      'KG': 'ru',
      'UZ': 'ru',
      'TJ': 'ru',
      'UA': 'uk',
      'US': 'en',
      'GB': 'en',
      'CA': 'en',
      'AU': 'en',
      'NZ': 'en',
      'IE': 'en',
      'ES': 'es',
      'MX': 'es',
      'AR': 'es',
      'CO': 'es',
      'VE': 'es',
      'PE': 'es',
      'CL': 'es',
      'EC': 'es',
      'GT': 'es',
      'CU': 'es',
      'BO': 'es',
      'DO': 'es',
      'HN': 'es',
      'PY': 'es',
      'SV': 'es',
      'NI': 'es',
      'CR': 'es',
      'PA': 'es',
      'UY': 'es',
      'GQ': 'es',
      'FR': 'fr',
      'BE': 'fr',
      'CH': 'fr',
      'LU': 'fr',
      'MC': 'fr',
      'CD': 'fr',
      'CM': 'fr',
      'CI': 'fr',
      'MA': 'fr',
      'SN': 'fr',
      'ML': 'fr',
      'BF': 'fr',
      'NE': 'fr',
      'TD': 'fr',
      'MG': 'fr',
      'DE': 'de',
      'AT': 'de',
      'CH': 'de',
      'LI': 'de',
      'IT': 'it',
      'SM': 'it',
      'VA': 'it',
      'PT': 'pt',
      'BR': 'pt',
      'AO': 'pt',
      'MZ': 'pt',
      'GW': 'pt',
      'CV': 'pt',
      'ST': 'pt',
      'TL': 'pt',
      'CN': 'zh',
      'TW': 'zh',
      'HK': 'zh',
      'MO': 'zh',
      'SG': 'zh',
      'JP': 'ja',
      'KR': 'ko',
      'SA': 'ar',
      'AE': 'ar',
      'EG': 'ar',
      'MA': 'ar',
      'DZ': 'ar',
      'TN': 'ar',
      'LY': 'ar',
      'SD': 'ar',
      'SY': 'ar',
      'LB': 'ar',
      'JO': 'ar',
      'IQ': 'ar',
      'KW': 'ar',
      'QA': 'ar',
      'BH': 'ar',
      'OM': 'ar',
      'YE': 'ar',
      'IN': 'hi',
      'NP': 'hi',
      'TR': 'tr',
      'PL': 'pl',
      'NL': 'nl',
    };
    
    const detectedLanguage = countryToLanguage[data.country_code] || 'en';
    
    // Сохраняем в localStorage для будущих посещений
    localStorage.setItem('detectedLanguage', detectedLanguage);
    
    return detectedLanguage;
  } catch (error) {
    console.error('Error detecting language by IP:', error);
    return 'en'; // Fallback to English
  }
};

export const getStoredLanguage = (): string | null => {
  return localStorage.getItem('detectedLanguage');
};