import React, { useState, useEffect } from 'react';
import {
  CityWeatherData,
  fetchAllCitiesWeather,
  fetchRealCityWeather,
  CITIES_CONFIG,
} from '../services/weatherService';
import {
  Sun,
  Cloud,
  CloudRain,
  Wind,
  Droplets,
  Gauge,
  RefreshCw,
  MapPin,
  ExternalLink,
  Flame,
  Sparkles,
} from 'lucide-react';

interface GoogleWeatherWidgetProps {
  onSelectFanSpeed?: (speed: 1 | 2 | 3) => void;
}

export const GoogleWeatherWidget: React.FC<GoogleWeatherWidgetProps> = ({
  onSelectFanSpeed,
}) => {
  const [citiesData, setCitiesData] = useState<CityWeatherData[]>([]);
  const [selectedCityIndex, setSelectedCityIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const loadWeather = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAllCitiesWeather();
      setCitiesData(data);
      const nowStr = new Date().toLocaleTimeString('fa-IR', {
        hour: '2-digit',
        minute: '2-digit',
      });
      setLastUpdated(`امروز ساعت ${nowStr}`);
    } catch (e) {
      console.error('Weather load failed:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWeather();
    // Auto-refresh every 2 minutes
    const interval = setInterval(loadWeather, 120000);
    return () => clearInterval(interval);
  }, []);

  const activeCity = citiesData[selectedCityIndex] || citiesData[0];

  const renderWeatherIcon = (type?: CityWeatherData['iconType']) => {
    switch (type) {
      case 'sunny':
        return <Sun className="w-10 h-10 text-amber-400 animate-spin-slow drop-shadow" />;
      case 'partly_cloudy':
        return (
          <div className="relative">
            <Sun className="w-8 h-8 text-amber-400" />
            <Cloud className="w-6 h-6 text-stone-300 absolute -bottom-1 -left-1" />
          </div>
        );
      case 'cloudy':
        return <Cloud className="w-10 h-10 text-stone-300" />;
      case 'rainy':
        return <CloudRain className="w-10 h-10 text-sky-400 animate-bounce" />;
      case 'windy':
      default:
        return <Wind className="w-10 h-10 text-cyan-400" />;
    }
  };

  return (
    <div className="w-full bg-stone-950 border-2 border-stone-800 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-md space-y-6">
      {/* Widget Header with Google Weather Lockup */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-850">
        <div className="flex items-center gap-3.5">
          {/* Google 4-color G badge */}
          <div className="w-10 h-10 rounded-2xl bg-stone-900 border border-stone-750 flex items-center justify-center p-2 shadow-inner">
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.27 21.41 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.27 2.59 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-lalezar text-lg sm:text-xl text-stone-100 flex items-center gap-2">
                <span>Google Weather</span>
                <span className="text-stone-500">|</span>
                <span className="text-amber-400">هواشناسی زنده و سازمان نسیم</span>
              </h3>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono">
                LIVE API
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              داده‌های دقیق دمایی و جریان باد به وقت پایتخت (پنکه آباد) · بروزرسانی: {lastUpdated || 'هم‌اکنون'}
            </p>
          </div>
        </div>

        {/* Refresh Button */}
        <button
          onClick={loadWeather}
          disabled={isLoading}
          className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-850 text-stone-300 hover:text-white border border-stone-800 rounded-xl font-lalezar text-xs flex items-center gap-2 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-amber-400' : ''}`} />
          <span>بروزرسانی داده‌ها</span>
        </button>
      </div>

      {/* City Tabs Selector (With Panke Abad Capital Badge) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {citiesData.map((c, idx) => {
          const isSelected = idx === selectedCityIndex;
          return (
            <button
              key={c.city}
              onClick={() => setSelectedCityIndex(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-lalezar whitespace-nowrap transition-all border flex items-center gap-2 ${
                isSelected
                  ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md shadow-amber-500/20 font-bold'
                  : 'bg-stone-900 text-stone-300 border-stone-800 hover:text-white hover:border-stone-700'
              }`}
            >
              {c.isCapital && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-sans font-black ${
                  isSelected ? 'bg-stone-950 text-amber-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  پایتخت
                </span>
              )}
              <span>{c.city}</span>
              <span className="font-mono text-xs">{c.temp}°</span>
            </button>
          );
        })}
      </div>

      {/* Main Selected City Weather Presentation Card */}
      {activeCity && (
        <div className="bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 border-2 border-stone-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left/Main Column: Big Temp, Condition, Capital Tag */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 text-stone-400 text-xs font-lalezar">
                <MapPin className="w-4 h-4 text-red-500" />
                <span className="text-stone-200 text-base">{activeCity.city}</span>
                {activeCity.isCapital && (
                  <span className="bg-amber-500 text-stone-950 text-[11px] font-bold px-2 py-0.5 rounded-md">
                    پایتخت رسمی جمهوری پنکه
                  </span>
                )}
              </div>

              {/* Big Temperature Display */}
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-stone-900 border border-stone-750 flex items-center justify-center p-2 shadow-inner">
                  {renderWeatherIcon(activeCity.iconType)}
                </div>

                <div>
                  <div className="font-lalezar text-4xl sm:text-5xl text-stone-100 flex items-baseline gap-1">
                    <span>{activeCity.temp}°</span>
                    <span className="text-xl sm:text-2xl text-amber-400">C</span>
                  </div>
                  <div className="font-lalezar text-sm text-stone-300 mt-1">
                    {activeCity.conditionText} · دمای حسی: {activeCity.feelsLike}°C
                  </div>
                </div>
              </div>

              {/* Official Fan Recommendation Decree */}
              <div className="bg-stone-950/80 border border-amber-500/40 rounded-2xl p-3.5 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-lalezar text-xs text-amber-400 block">
                    دستورالعمل اقلیمی جمهوری پنکه برای {activeCity.city}:
                  </span>
                  <p className="font-lalezar text-sm text-stone-100 mt-0.5 leading-snug">
                    {activeCity.pankeRecommendation}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Weather Metrics Grid */}
            <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 space-y-1 text-right">
                <div className="flex items-center gap-1.5 text-stone-400 text-xs font-lalezar">
                  <Wind className="w-3.5 h-3.5 text-cyan-400" />
                  <span>سرعت وزش باد</span>
                </div>
                <div className="font-lalezar text-xl text-stone-100">
                  {activeCity.windSpeed} <span className="text-xs text-stone-400 font-sans">km/h</span>
                </div>
                <span className="text-[10px] text-emerald-400 block font-mono">جریان باد ملایم</span>
              </div>

              <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 space-y-1 text-right">
                <div className="flex items-center gap-1.5 text-stone-400 text-xs font-lalezar">
                  <Droplets className="w-3.5 h-3.5 text-sky-400" />
                  <span>رطوبت نسبی</span>
                </div>
                <div className="font-lalezar text-xl text-stone-100">
                  {activeCity.humidity} <span className="text-xs text-stone-400 font-sans">٪</span>
                </div>
                <span className="text-[10px] text-stone-400 block font-mono">شاخص تعریق پایین</span>
              </div>

              <div className="bg-stone-900/90 border border-amber-500/30 rounded-2xl p-4 space-y-1 text-right col-span-2 sm:col-span-1">
                <div className="flex items-center gap-1.5 text-stone-400 text-xs font-lalezar">
                  <Gauge className="w-3.5 h-3.5 text-amber-400" />
                  <span>دور پیشنهادی</span>
                </div>
                <div className="font-lalezar text-xl text-amber-400">
                  دور {activeCity.fanSpeedRequired}
                </div>
                {onSelectFanSpeed && (
                  <button
                    onClick={() => onSelectFanSpeed(activeCity.fanSpeedRequired)}
                    className="text-[10px] text-amber-300 hover:underline block font-lalezar"
                  >
                    اعمال روی سایت ↗
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
