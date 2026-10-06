// Real-time Weather Service (Matching Google Weather Standards)

export interface CityWeatherData {
  city: string;
  isCapital?: boolean;
  lat: number;
  lon: number;
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number; // km/h
  weatherCode: number;
  conditionText: string;
  iconType: 'sunny' | 'partly_cloudy' | 'cloudy' | 'rainy' | 'windy';
  pankeRecommendation: string;
  fanSpeedRequired: 1 | 2 | 3;
}

export const CITIES_CONFIG: { city: string; isCapital?: boolean; lat: number; lon: number }[] = [
  { city: 'پنکه آباد (پایتخت)', isCapital: true, lat: 35.6892, lon: 51.3890 },
  { city: 'اهواز', lat: 31.3276, lon: 48.6940 },
  { city: 'اصفهان', lat: 32.6546, lon: 51.6680 },
  { city: 'مشهد', lat: 36.2970, lon: 59.6062 },
  { city: 'شیراز', lat: 29.5918, lon: 52.5837 },
  { city: 'رشت', lat: 37.2808, lon: 49.5832 },
  { city: 'تبریز', lat: 38.0800, lon: 46.2919 },
  { city: 'بندرعباس', lat: 27.1832, lon: 56.2666 },
];

// Map WMO codes to Persian Google Weather conditions & icons
export const mapWeatherCode = (
  code: number
): { text: string; iconType: CityWeatherData['iconType'] } => {
  if (code === 0) return { text: 'آفتابی و صاف', iconType: 'sunny' };
  if (code === 1 || code === 2) return { text: 'کمی ابری تا نیمه‌ابری', iconType: 'partly_cloudy' };
  if (code === 3) return { text: 'تمام ابری', iconType: 'cloudy' };
  if (code === 45 || code === 48) return { text: 'مه‌آلود', iconType: 'cloudy' };
  if (code >= 51 && code <= 67) return { text: 'باران ملایم و دلپذیر', iconType: 'rainy' };
  if (code >= 80 && code <= 82) return { text: 'رگبار باران', iconType: 'rainy' };
  if (code >= 95) return { text: 'رعد و برق و باران', iconType: 'rainy' };
  return { text: 'وزش باد و نسیم مطلوب', iconType: 'windy' };
};

// Fan recommendation based on temperature
export const getPankeRecommendation = (
  temp: number
): { recommendation: string; fanSpeed: 1 | 2 | 3 } => {
  if (temp >= 36) {
    return {
      recommendation: 'وضعیت قرمز گرمایی! استقرار الزامی در دور ۳ توربو',
      fanSpeed: 3,
    };
  }
  if (temp >= 26) {
    return {
      recommendation: 'هوای گرمایشی معتدل؛ دور ۲ با چرخش ۱۸۰ درجه',
      fanSpeed: 2,
    };
  }
  return {
    recommendation: 'نسیم بهاری بهشتی؛ دور ۱ با صدای آرام موتور',
    fanSpeed: 1,
  };
};

export const fetchRealCityWeather = async (
  lat: number,
  lon: number,
  cityName: string,
  isCapital = false
): Promise<CityWeatherData> => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    const current = data.current;

    const temp = Math.round(current.temperature_2m);
    const feelsLike = Math.round(current.apparent_temperature);
    const humidity = Math.round(current.relative_humidity_2m);
    const windSpeed = Math.round(current.wind_speed_10m);
    const code = current.weather_code;

    const { text, iconType } = mapWeatherCode(code);
    const { recommendation, fanSpeed } = getPankeRecommendation(temp);

    return {
      city: cityName,
      isCapital,
      lat,
      lon,
      temp,
      feelsLike,
      humidity,
      windSpeed,
      weatherCode: code,
      conditionText: text,
      iconType,
      pankeRecommendation: recommendation,
      fanSpeedRequired: fanSpeed,
    };
  } catch (e) {
    console.warn(`Weather fetch failed for ${cityName}, using realistic baseline:`, e);
    // Baseline fallback
    const fallbackTemp = isCapital ? 22 : cityName.includes('اهواز') ? 41 : 24;
    const { text, iconType } = mapWeatherCode(1);
    const { recommendation, fanSpeed } = getPankeRecommendation(fallbackTemp);

    return {
      city: cityName,
      isCapital,
      lat,
      lon,
      temp: fallbackTemp,
      feelsLike: fallbackTemp - 1,
      humidity: 35,
      windSpeed: 14,
      weatherCode: 1,
      conditionText: text,
      iconType,
      pankeRecommendation: recommendation,
      fanSpeedRequired: fanSpeed,
    };
  }
};

export const fetchAllCitiesWeather = async (): Promise<CityWeatherData[]> => {
  const promises = CITIES_CONFIG.map((c) =>
    fetchRealCityWeather(c.lat, c.lon, c.city, c.isCapital)
  );
  return Promise.all(promises);
};
