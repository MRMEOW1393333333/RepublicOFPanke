import React, { useState, useEffect } from 'react';
import { TweetItem, FanSpeed } from '../types/panke';
import { audioSynth } from '../utils/audioSynth';
import { RepublicLogo } from './RepublicLogo';
import { ViewersChart } from './ViewersChart';
import {
  Radio,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  Tv,
  Share2,
  ExternalLink,
  Flame,
  Wind,
  CheckCircle2,
  Camera,
  Activity,
  Layers,
} from 'lucide-react';

interface PankeInternationalProps {
  tweets: TweetItem[];
  selectedTweetId?: string;
  fanSpeed: FanSpeed;
  onSelectTweet?: (id: string) => void;
}

export const PankeInternational: React.FC<PankeInternationalProps> = ({
  tweets,
  selectedTweetId,
  fanSpeed,
  onSelectTweet,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayingAuto, setIsPlayingAuto] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [liveViewers, setLiveViewers] = useState(258420);
  const [reactions, setReactions] = useState<{ id: number; emoji: string; x: number }[]>([]);
  const [copiedLink, setCopiedLink] = useState(false);
  const [cameraMode, setCameraMode] = useState<'main' | 'map' | 'text'>('main');

  // Iranian City Wind & Temp Data (Capital: Panke Abad)
  const cityWeather = [
    { city: 'پنکه آباد (پایتخت)', temp: '۲۱°', status: 'نسیم بهشتی به وقت پایتخت' },
    { city: 'اهواز', temp: '۴۱°', status: 'آماده‌باش دور ۳ توربو' },
    { city: 'اصفهان', temp: '۲۶°', status: 'گردش ۱۸۰ درجه پایدار' },
    { city: 'مشهد', temp: '۲۰°', status: 'دور ۱ ملایم' },
    { city: 'شیراز', temp: '۲۷°', status: 'وزش بهاری مطلوب' },
    { city: 'رشت', temp: '۱۹°', status: 'رطوبت خنک بهشتی' },
  ];

  // Time in Tehran / Republic of Panke
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('fa-IR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update index if selectedTweetId is passed
  useEffect(() => {
    if (selectedTweetId) {
      const idx = tweets.findIndex((t) => t.id === selectedTweetId);
      if (idx !== -1) {
        setCurrentIndex(idx);
      }
    }
  }, [selectedTweetId, tweets]);

  // Auto-cycle through breaking news tweets
  useEffect(() => {
    if (!isPlayingAuto || tweets.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % tweets.length;
        if (!isMuted) {
          audioSynth.playBreakingNewsChime();
        }
        return next;
      });
    }, 9000);
    return () => clearInterval(timer);
  }, [isPlayingAuto, tweets.length, isMuted]);

  // Real viewers breakdown: X (Twitter) platform viewers vs Direct site viewers
  const [xViewers, setXViewers] = useState(42310);
  const [siteViewers, setSiteViewers] = useState(18480);
  const totalViewers = xViewers + siteViewers;

  // Fluctuating viewers realistically
  useEffect(() => {
    const interval = setInterval(() => {
      setXViewers((prev) => Math.max(10000, prev + Math.floor(Math.random() * 21) - 10));
      setSiteViewers((prev) => Math.max(5000, prev + Math.floor(Math.random() * 11) - 5));
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const currentTweet = tweets[currentIndex] || tweets[0];

  const handleNext = () => {
    if (tweets.length === 0) return;
    const next = (currentIndex + 1) % tweets.length;
    setCurrentIndex(next);
    if (!isMuted) audioSynth.playBreakingNewsChime();
    if (onSelectTweet) onSelectTweet(tweets[next].id);
  };

  const handlePrev = () => {
    if (tweets.length === 0) return;
    const prev = (currentIndex - 1 + tweets.length) % tweets.length;
    setCurrentIndex(prev);
    if (!isMuted) audioSynth.playBreakingNewsChime();
    if (onSelectTweet) onSelectTweet(tweets[prev].id);
  };

  // Persian text-to-speech
  const speakCurrentNews = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if (!currentTweet) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(
      `خبر فوری از پنکه اینترنشنال. بیانیه رسمی صفحه ایکس جمهوری پنکه: ${currentTweet.text}`
    );
    utterance.lang = 'fa-IR';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Add floating reaction
  const addReaction = (emoji: string) => {
    const id = Date.now() + Math.random();
    const x = Math.floor(Math.random() * 60) + 20;
    setReactions((prev) => [...prev, { id, emoji, x }]);
    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== id));
    }, 2000);
  };

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(
        currentTweet?.sourceUrl || 'https://x.com/RepublicofPanke'
      );
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Studio Screen Player */}
      <div className="w-full bg-stone-950 border-2 border-stone-800 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl">
      {/* Studio Control Header Bar */}
      <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 px-5 py-3 border-b border-stone-800 flex flex-wrap items-center justify-between gap-4">
        {/* Channel Branding Lockup */}
        <div className="flex items-center gap-3.5">
          <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-lalezar tracking-wide shadow-lg shadow-red-600/30">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
            <span className="w-2.5 h-2.5 rounded-full bg-white -mr-3.5" />
            <span className="text-sm">پخش زنده استودیو HD</span>
          </div>

          <div className="flex items-center gap-2">
            <h3 className="font-lalezar text-lg sm:text-xl text-stone-100 flex items-center gap-2">
              <span className="text-amber-400">شبکه خبری</span>
              <span>پنکه اینترنشنال</span>
            </h3>
            <span className="text-stone-500 hidden lg:inline">|</span>
            <span className="text-xs text-stone-400 hidden lg:inline">
              پوشش اختصاصی بیانیه‌ها و توئیت‌های @RepublicofPanke
            </span>
          </div>
        </div>

        {/* Camera Selector and Real-time Clock */}
        <div className="flex items-center gap-3">
          {/* Camera switcher */}
          <div className="hidden sm:flex items-center gap-1 p-1 bg-stone-900 rounded-xl border border-stone-800 text-xs">
            <button
              onClick={() => setCameraMode('main')}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 font-semibold ${
                cameraMode === 'main'
                  ? 'bg-amber-500 text-stone-950 font-lalezar text-xs shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Camera className="w-3 h-3" />
              <span>دوربین ۱</span>
            </button>
            <button
              onClick={() => setCameraMode('map')}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 font-semibold ${
                cameraMode === 'map'
                  ? 'bg-amber-500 text-stone-950 font-lalezar text-xs shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Activity className="w-3 h-3" />
              <span>نقشه وزش</span>
            </button>
            <button
              onClick={() => setCameraMode('text')}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 font-semibold ${
                cameraMode === 'text'
                  ? 'bg-amber-500 text-stone-950 font-lalezar text-xs shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>نمای بیانیه</span>
            </button>
          </div>

          {/* Viewers & Clock */}
          {/* Realistic Viewers Breakdown (X vs Web Portal) & Clock */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            {/* Viewers from X (Twitter) */}
            <div className="flex items-center gap-1.5 text-stone-200 bg-black/60 px-2.5 py-1 rounded-lg border border-sky-500/30">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-sky-300 font-bold">𝕏 {xViewers.toLocaleString('fa-IR')}</span>
              <span className="text-stone-400 text-[10px] font-sans">توییتر</span>
            </div>

            {/* Viewers from Republic of Panke site */}
            <div className="flex items-center gap-1.5 text-stone-200 bg-black/60 px-2.5 py-1 rounded-lg border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-300 font-bold">{siteViewers.toLocaleString('fa-IR')}</span>
              <span className="text-stone-400 text-[10px] font-sans">پرتال وب</span>
            </div>

            {/* Total Viewers */}
            <div className="hidden md:flex items-center gap-1 text-amber-300 bg-stone-900 px-2.5 py-1 rounded-lg border border-amber-500/30">
              <span className="text-[10px] text-stone-400 font-sans">مجموع:</span>
              <span className="font-bold">{totalViewers.toLocaleString('fa-IR')}</span>
            </div>

            <div className="text-amber-400 bg-stone-900 px-2.5 py-1 rounded-lg border border-stone-800 font-bold">
              {currentTime}
            </div>
          </div>
        </div>
      </div>

      {/* Main Broadcast Screen (16:9 cinematic TV view) */}
      <div className="relative aspect-video max-h-[620px] w-full bg-gradient-to-b from-[#0a0c10] via-[#050608] to-[#0a0c10] overflow-hidden flex flex-col justify-between">
        {/* Studio LED Wall Pattern & TV Scanline Filter */}
        <div className="absolute inset-0 studio-led-wall opacity-35 pointer-events-none" />
        <div className="absolute inset-0 tv-scanlines pointer-events-none opacity-40 z-20" />

        {/* Studio Lighting Radial Beams */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Floating Live Reactions Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
          {reactions.map((r) => (
            <div
              key={r.id}
              style={{ left: `${r.x}%` }}
              className="absolute bottom-28 text-3xl animate-bounce transition-all duration-1000 transform -translate-y-28 opacity-90 drop-shadow-xl"
            >
              {r.emoji}
            </div>
          ))}
        </div>

        {/* Top Overlay: TV Bugs and Watermark */}
        <div className="relative z-20 p-4 sm:p-6 flex items-start justify-between">
          {/* Top-Right: PANKE INTERNATIONAL Official Bug */}
          <div className="flex items-center gap-3 bg-stone-950/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-amber-500/40 shadow-xl shadow-amber-500/10">
            <RepublicLogo size="sm" spinSpeed={fanSpeed} />
            <div className="flex flex-col text-right">
              <span className="font-lalezar text-white text-base sm:text-lg leading-tight tracking-wide drop-shadow">
                PANKE INTERNATIONAL
              </span>
              <span className="text-[10px] text-amber-400 font-mono font-bold tracking-wider">
                پخش ماهواره‌ای و اینترنتی ۲۴/۷
              </span>
            </div>
          </div>

          {/* Top-Left: Audio Equalizer & Verification Link */}
          <div className="flex items-center gap-2.5">
            {/* Equalizer Visualizer */}
            <div className="hidden sm:flex items-center gap-1 bg-stone-950/80 backdrop-blur-md px-3 py-2 rounded-xl border border-stone-800">
              <span className="text-[10px] text-stone-400 font-mono ml-2">صدا:</span>
              {[12, 24, 18, 30, 16, 22, 28, 14].map((h, i) => (
                <div
                  key={i}
                  style={{
                    height: isSpeaking ? `${h}px` : '6px',
                    transition: 'height 0.15s ease',
                  }}
                  className={`w-1 rounded-full ${
                    isSpeaking ? 'bg-amber-400 animate-pulse' : 'bg-stone-700'
                  }`}
                />
              ))}
            </div>

            <a
              href="https://x.com/RepublicofPanke"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-stone-950/85 hover:bg-black backdrop-blur-md px-3 py-2 rounded-xl border border-stone-750 text-white text-xs font-medium flex items-center gap-1.5 transition-all group shadow-lg"
            >
              <span className="text-sky-400 font-bold font-mono">𝕏 @RepublicofPanke</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-400" />
            </a>
          </div>
        </div>

        {/* Center Screen: Camera Mode Viewport with News Image */}
        <div className="relative z-20 px-4 sm:px-10 py-3 flex flex-col items-center justify-center text-center my-auto">
          {cameraMode === 'main' && (
            <div className="space-y-3 max-w-xl mx-auto flex flex-col items-center">
              {/* Broadcast News Image Package */}
              {currentTweet?.imageUrl ? (
                <div className="relative w-full max-w-md aspect-video rounded-2xl overflow-hidden border-2 border-amber-500/60 shadow-2xl group bg-stone-950">
                  <img
                    src={currentTweet.imageUrl}
                    alt={currentTweet.text}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  
                  {/* Photo lower strap tag */}
                  <div className="absolute bottom-2 right-3 left-3 flex items-center justify-between text-xs">
                    <span className="font-lalezar text-amber-300 drop-shadow text-xs sm:text-sm">
                      تصویر اختصاصی خبر: {currentTweet.category}
                    </span>
                    <span className="font-mono text-[10px] text-stone-300 bg-red-600/90 text-white px-2 py-0.5 rounded shadow">
                      LIVE FEED
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-stone-900 to-stone-950 border-2 border-amber-500/80 p-2 flex items-center justify-center shadow-2xl shadow-amber-500/20">
                    <RepublicLogo size="lg" spinSpeed={fanSpeed} />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-red-600 text-white font-lalezar text-xs px-2.5 py-0.5 rounded-md shadow-lg border border-red-400">
                    در حال پخش
                  </div>
                </div>
              )}

              {/* Title Decker */}
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white font-lalezar text-xs sm:text-sm px-4 py-0.5 rounded-lg shadow-lg animate-pulse">
                  <Flame className="w-3.5 h-3.5 text-amber-300" />
                  <span>اتاق خبر فوری و بیانیه‌های رسمی کشور</span>
                </div>
              </div>
            </div>
          )}

          {cameraMode === 'map' && (
            <div className="w-full max-w-xl bg-stone-950/80 border border-stone-800 rounded-2xl p-5 backdrop-blur-md text-right space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                <h4 className="font-lalezar text-base text-amber-400 flex items-center gap-2">
                  <Wind className="w-4 h-4" />
                  <span>سامانه پایش وزش باد در استان‌های کشور</span>
                </h4>
                <span className="text-[11px] font-mono text-emerald-400">شبکه پایدار</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {cityWeather.map((c) => (
                  <div key={c.city} className="bg-stone-900/90 p-2.5 rounded-xl border border-stone-850">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-stone-200">{c.city}</span>
                      <span className="font-lalezar text-amber-400 text-sm">{c.temp}</span>
                    </div>
                    <span className="text-[10px] text-stone-400 block mt-1">{c.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {cameraMode === 'text' && (
            <div className="w-full max-w-2xl bg-stone-950/90 border-2 border-amber-500/40 rounded-2xl p-6 text-right space-y-3 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-stone-850">
                <span className="font-lalezar text-amber-400 text-sm">متن کامل بیانیه رسمی</span>
                <span className="font-mono text-stone-400">{currentTweet?.createdAt}</span>
              </div>
              <p className="font-lalezar text-lg sm:text-xl text-stone-100 leading-relaxed">
                «{currentTweet?.text}»
              </p>
              <div className="flex items-center justify-between pt-2 text-xs text-stone-500">
                <span>دسته‌بندی: {currentTweet?.category}</span>
                <span className="font-mono text-amber-400">{currentTweet?.tag}</span>
              </div>
            </div>
          )}
        </div>

        {/* Lower Third: 24/7 Professional TV News Strap (زیرنویس دوطبقه تلویزیونی حرفه‌ای) */}
        <div className="relative z-20 w-full mt-auto">
          {/* Upper Deck: Category, Source & Timestamp */}
          <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border-t-2 border-amber-500 px-5 sm:px-8 py-2 flex items-center justify-between text-xs shadow-md">
            <div className="flex items-center gap-3">
              <span className="bg-amber-500 text-stone-950 font-lalezar text-xs sm:text-sm px-2.5 py-0.5 rounded-md uppercase">
                {currentTweet?.category || 'خبر فوری'}
              </span>
              <span className="font-lalezar text-stone-200 text-sm sm:text-base">
                حساب رسمی ایکس @RepublicofPanke
              </span>
              <span className="text-stone-400 text-xs hidden sm:inline">
                ({currentTweet?.createdAt})
              </span>
            </div>

            <div className="flex items-center gap-3 text-stone-300 text-xs font-mono">
              <span className="bg-stone-900 px-2.5 py-0.5 rounded border border-stone-800">
                خبر {currentIndex + 1} از {tweets.length}
              </span>
            </div>
          </div>

          {/* Lower Deck: Crimson Red "خبر فوری" Box + Headline Prose */}
          <div className="flex items-stretch bg-black/95 min-h-[72px] sm:min-h-[82px] border-b-2 border-red-600 shadow-2xl">
            {/* Red BREAKING Block with Shiny Glint */}
            <div className="bg-gradient-to-b from-red-600 via-red-700 to-red-800 text-white px-4 sm:px-8 flex flex-col items-center justify-center shrink-0 border-r-2 border-red-500 shadow-inner">
              <span className="font-lalezar text-base sm:text-2xl leading-none tracking-wide text-white drop-shadow">
                خبر فوری
              </span>
              <span className="text-[10px] sm:text-[11px] opacity-90 font-mono font-bold tracking-widest mt-1">
                BREAKING
              </span>
            </div>

            {/* Headline Body Deck */}
            <div className="flex-1 px-4 sm:px-8 py-3 flex items-center overflow-hidden">
              <p className="font-lalezar text-sm sm:text-xl text-white leading-snug line-clamp-2 text-right w-full drop-shadow">
                {currentTweet?.text}
              </p>
            </div>
          </div>

          {/* Continuous Running Bottom Ticker */}
          <div className="bg-red-800 text-white py-1 px-4 flex items-center overflow-hidden font-medium border-t border-red-500/40">
            <div className="bg-stone-950 text-amber-300 font-lalezar text-xs px-2.5 py-0.5 rounded-md shrink-0 ml-3 shadow">
              آخرین سرخط‌ها
            </div>
            <div className="overflow-hidden whitespace-nowrap w-full">
              <div className="animate-ticker inline-block space-x-8 space-x-reverse text-xs sm:text-sm font-lalezar">
                {tweets.map((t) => (
                  <span key={t.id} className="inline-flex items-center gap-2">
                    <span className="text-amber-300">✦</span>
                    <span>{t.text}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Broadcast Studio Interactivity Bar */}
      <div className="bg-stone-950 px-5 py-4 border-t border-stone-850 flex flex-wrap items-center justify-between gap-4">
        {/* Playback & Audio Controls */}
        <div className="flex items-center gap-2">
          {/* Previous / Next buttons */}
          <button
            onClick={handlePrev}
            aria-label="خبر قبلی"
            className="p-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-white border border-stone-800 transition-colors shadow-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsPlayingAuto(!isPlayingAuto)}
            className={`px-3.5 py-2 rounded-xl text-xs font-lalezar flex items-center gap-2 transition-all border shadow-sm ${
              isPlayingAuto
                ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold'
                : 'bg-stone-900 text-stone-300 border-stone-800 hover:bg-stone-800'
            }`}
          >
            {isPlayingAuto ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>توقف چرخش اخبار</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>پخش خودکار اخبار</span>
              </>
            )}
          </button>

          <button
            onClick={handleNext}
            aria-label="خبر بعدی"
            className="p-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-white border border-stone-800 transition-colors shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Sound Stinger Toggle */}
          <button
            onClick={() => {
              setIsMuted(!isMuted);
              if (isMuted) audioSynth.playBreakingNewsChime();
            }}
            title={isMuted ? 'فعال‌سازی آژیر خبر فوری' : 'قطع صدای خبر فوری'}
            className="p-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-stone-500" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Persian Voice Read-Aloud (TTS) */}
          <button
            onClick={speakCurrentNews}
            className={`px-3.5 py-2 rounded-xl text-xs font-lalezar flex items-center gap-2 transition-all border ${
              isSpeaking
                ? 'bg-red-600 text-white border-red-500 animate-pulse shadow-lg shadow-red-600/30'
                : 'bg-stone-900 text-stone-200 border-stone-800 hover:bg-stone-800'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-amber-400" />
            <span>{isSpeaking ? 'در حال خواندن خبر...' : 'گوینده صوتی اخبار'}</span>
          </button>
        </div>

        {/* Live Audience Reactions (Emitting to screen) */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-lalezar text-stone-400 ml-1 hidden sm:inline">
            ارسال واکنش استودیویی:
          </span>
          <button
            onClick={() => addReaction('🌀')}
            className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded-xl text-base transition-transform active:scale-90"
            title="دور تند پنکه"
          >
            🌀
          </button>
          <button
            onClick={() => addReaction('💨')}
            className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded-xl text-base transition-transform active:scale-90"
            title="وزش نسیم"
          >
            💨
          </button>
          <button
            onClick={() => addReaction('❄️')}
            className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded-xl text-base transition-transform active:scale-90"
            title="خنکی مطلق"
          >
            ❄️
          </button>
          <button
            onClick={() => addReaction('🫡')}
            className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded-xl text-base transition-transform active:scale-90"
            title="احترام به پره‌ها"
          >
            🫡
          </button>
          <button
            onClick={handleCopyLink}
            className="mr-2 p-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white transition-colors"
            title="کپی لینک توئیت"
          >
            {copiedLink ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>

    {/* Interactive Recharts Dynamic Audience Graph */}
    <ViewersChart
      currentXViewers={xViewers}
      currentSiteViewers={siteViewers}
      fanSpeed={fanSpeed}
    />
  </div>
  );
};
