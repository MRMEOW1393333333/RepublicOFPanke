import React, { useState } from 'react';
import { FanSpeed, CitizenCard } from '../types/panke';
import { RepublicLogo } from './RepublicLogo';
import { RepublicFlag } from './RepublicFlag';
import { audioSynth } from '../utils/audioSynth';
import { GoogleWeatherWidget } from './GoogleWeatherWidget';
import {
  Wind,
  Award,
  Zap,
  Mic,
  Volume2,
  FileText,
  UserCheck,
  Gauge,
  RotateCw,
  QrCode,
  Printer,
  Sparkles,
  CloudSun,
} from 'lucide-react';

interface OfficialPortalProps {
  fanSpeed: FanSpeed;
  onChangeSpeed: (speed: FanSpeed) => void;
  isOscillating: boolean;
  onToggleOscillate: () => void;
}

export const OfficialPortal: React.FC<OfficialPortalProps> = ({
  fanSpeed,
  onChangeSpeed,
  isOscillating,
  onToggleOscillate,
}) => {
  const [activeTab, setActiveTab] = useState<'constitution' | 'citizenship' | 'weather' | 'soundlab' | 'stats'>('constitution');

  // Citizenship ID State (Capital: Panke Abad)
  const [citizenForm, setCitizenForm] = useState({
    name: 'کوروش پنکه‌پرور',
    fatherFan: 'پارس خزر مدل ۴۰۱۰ رومیزی',
    speed: 'دور ۳ (توربو)' as CitizenCard['speedChoice'],
    city: 'پنکه آباد (پایتخت رسمی)',
  });
  const [issuedCard, setIssuedCard] = useState<CitizenCard | null>({
    nationalCode: 'PK-4010-9821-77',
    fullName: 'کوروش پنکه‌پرور',
    fanModel: 'پارس خزر مدل ۴۰۱۰ رومیزی',
    speedChoice: 'دور ۳ (توربو)',
    hometown: 'پنکه آباد - میدان وزش مرکزی',
    issueDate: '۱۴۰۳/۰۴/۱۵',
  });
  const [isVoiceTesting, setIsVoiceTesting] = useState(false);

  const handleIssueCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!citizenForm.name.trim()) return;

    const randomCode = `PK-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(10 + Math.random() * 89)}`;
    const newCard: CitizenCard = {
      nationalCode: randomCode,
      fullName: citizenForm.name,
      fanModel: citizenForm.fatherFan || 'پارس خزر اصیل',
      speedChoice: citizenForm.speed,
      hometown: citizenForm.city || 'پایتخت وزش',
      issueDate: new Date().toLocaleDateString('fa-IR'),
    };
    setIssuedCard(newCard);
    audioSynth.playBreakingNewsChime();
  };

  const triggerVoiceTest = () => {
    setIsVoiceTesting(true);
    audioSynth.playFanVoiceSimulation(3.5);
    setTimeout(() => {
      setIsVoiceTesting(false);
    }, 3500);
  };

  const handlePrintCard = () => {
    window.print();
  };

  const constitutionArticles = [
    {
      num: 'اصل یکم',
      title: 'حاکمیت مطلق وزش نسیم',
      text: 'جمهوری پنکه کشوری است مبتنی بر خنکی، چرخش متناوب و برابری تمامی دورهای موتور در توزیع عادلانه باد میان شهروندان در گرمای تابستان.',
    },
    {
      num: 'اصل دوم',
      title: 'حق مسلم صدای «آآآآآآآآآ»',
      text: 'کلیه شهروندان و کودکان حق دارند بدون هیچ‌گونه ممانعتی در فاصله ۱۰ سانتی‌متری پره‌های در حال چرخش قرار گرفته و با دهان باز صدای لرزان تولید نمایند.',
    },
    {
      num: 'اصل سوم',
      title: 'مبارزه با اشرافیت برودتی کولر گازی',
      text: 'کولر گازی به علت بلعیدن برق شهری، انحصاری کردن خنکی و ایجاد قبض‌های نجومی، مظهر اسراف بوده و پنکه نماد قناعت، پایداری و دوستی است.',
    },
    {
      num: 'اصل چهارم',
      title: 'حفظ ایمنی پره‌ها و توری محافظ',
      text: 'هرگونه وارد آوردن اشیای خارجی نظیر مداد، چوب‌کبریت و انگشت به داخل شبکه توری محافظ پنکه مصداق اخلال در امنیت وزش کشور است.',
    },
    {
      num: 'اصل پنجم',
      title: 'قانون نوسان ۱۸۰ درجه',
      text: 'پنکه‌های قرار گرفته در جمع‌های بیش از دو نفر موظفند کلید ضامن پشت موتور را فشرده و به طور مساوی و مستمر نوسان چپ و راست را اجرا نمایند.',
    },
    {
      num: 'اصل ششم',
      title: 'تعصب بر پره پارس خزر و برندهای ملی',
      text: 'پنکه‌هایی که بیش از ۲۰ سال در خانه‌های ایرانی بدون آخ گفتن چرخیده‌اند از مفاخر ملی جمهوری پنکه محسوب شده و مستحق دریافت مدال زرین خنکی می‌باشند.',
    },
  ];

  return (
    <div className="w-full space-y-8">
      {/* State Emblem & Hero Marquee */}
      <div className="bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 border-2 border-amber-500/30 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl">
        {/* Subtle Iranian tricolor top accent */}
        <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-emerald-600 via-white to-red-600 opacity-80" />

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          {/* Official Flag Showcase */}
          <div className="w-full max-w-sm shrink-0">
            <div className="relative group">
              <RepublicFlag
                className="w-full aspect-[3/2] shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
                spinSpeed={fanSpeed}
              />
              <div className="mt-3 flex items-center justify-between">
                <span className="font-lalezar text-stone-200 text-sm">پرچم رسمی کشور جمهوری پنکه</span>
                <span className="font-lalezar text-amber-400 text-xs">نشان سه پره زرین</span>
              </div>
            </div>
          </div>

          {/* National Tactile Wind Control Console */}
          <div className="flex-1 w-full space-y-5">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-lalezar rounded-xl">
                <Gauge className="w-3.5 h-3.5" />
                <span>میز فرمان و کنسول ملی دور موتور</span>
              </div>
              <h1 className="font-lalezar text-2xl sm:text-4xl text-stone-100 leading-tight">
                پرتال ملی حکومت جمهوری پنکه
              </h1>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-2xl">
                مرکز اسناد، فرامین کشوری و کنترل یکپارچه نسیم ملی. با فشردن کلیدهای مکانیکی زیر، سرعت چرخش پره‌ها در سراسر پرچم‌ها، نشان‌ها و استودیوی پنکه اینترنشنال تغییر می‌کند.
              </p>
            </div>

            {/* Vintage Tactile Mechanical Push Buttons (مثل پنکه پارس خزر کلاسیک) */}
            <div className="bg-gradient-to-b from-stone-900 to-stone-950 border-2 border-stone-800 p-5 rounded-2xl space-y-4 shadow-xl">
              <div className="flex items-center justify-between text-xs font-lalezar text-stone-300">
                <span className="flex items-center gap-2 text-sm">
                  <Wind className="w-4 h-4 text-amber-400" />
                  <span>کلیدهای مکانیکی دور موتور (پارس خزر استایل):</span>
                </span>
                <span className="text-amber-400 text-sm font-lalezar">
                  {fanSpeed === 0
                    ? 'وضعیت: موتور خاموش'
                    : fanSpeed === 1
                    ? 'وضعیت: دور ۱ (نسیم ملایم)'
                    : fanSpeed === 2
                    ? 'وضعیت: دور ۲ (وزش مطبوع)'
                    : 'وضعیت: دور ۳ (توربو طوفانی)'}
                </span>
              </div>

              {/* Physical Push Buttons Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { speed: 0 as FanSpeed, label: '۰. خاموش', desc: 'توقف پره‌ها', color: 'bg-stone-800' },
                  { speed: 1 as FanSpeed, label: '۱. دور نسیم', desc: 'آرام و بی‌صدا', color: 'bg-emerald-600' },
                  { speed: 2 as FanSpeed, label: '۲. دور متعادل', desc: 'خنکی پیوسته', color: 'bg-sky-600' },
                  { speed: 3 as FanSpeed, label: '۳. دور توربو', desc: 'طوفان تابستانی', color: 'bg-red-600' },
                ].map((item) => {
                  const isActive = fanSpeed === item.speed;
                  return (
                    <button
                      key={item.speed}
                      onClick={() => {
                        onChangeSpeed(item.speed);
                        audioSynth.setFanHum(item.speed);
                      }}
                      className={`relative p-3 rounded-2xl text-right transition-all border-2 shadow-lg ${
                        isActive
                          ? 'bg-gradient-to-b from-amber-400 to-amber-500 text-stone-950 border-amber-300 translate-y-1 shadow-inner shadow-amber-900/40'
                          : 'bg-stone-900 text-stone-300 border-stone-800 hover:border-stone-700 hover:bg-stone-850 active:translate-y-1'
                      }`}
                    >
                      {/* LED Indicator Lamp */}
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-lalezar text-sm sm:text-base leading-none">
                          {item.label}
                        </span>
                        <span
                          className={`w-2.5 h-2.5 rounded-full border border-black/40 ${
                            isActive ? 'bg-emerald-400 shadow-md shadow-emerald-400' : 'bg-stone-700'
                          }`}
                        />
                      </div>
                      <div
                        className={`text-[11px] font-medium ${
                          isActive ? 'text-stone-950 font-bold' : 'text-stone-400'
                        }`}
                      >
                        {item.desc}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Oscillation Toggle & Audio Hum Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-800">
                <button
                  onClick={onToggleOscillate}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-lalezar flex items-center gap-2 transition-all border ${
                    isOscillating
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-md'
                      : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200'
                  }`}
                >
                  <RotateCw className={`w-4 h-4 ${isOscillating ? 'animate-spin' : ''}`} />
                  <span>گردش خودکار ۱۸۰ درجه: {isOscillating ? 'روشن (در حال چرخش)' : 'ثابت'}</span>
                </button>

                <div className="flex items-center gap-2 text-xs text-stone-400 font-mono">
                  <span>فرکانس موتور: {fanSpeed * 480} RPM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs with Lalezar font */}
      <div className="flex items-center gap-2 border-b-2 border-stone-800 pb-3 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('constitution')}
          className={`px-4 py-2 text-xs sm:text-sm font-lalezar rounded-xl transition-all flex items-center gap-2 border ${
            activeTab === 'constitution'
              ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md'
              : 'bg-stone-900/60 text-stone-400 border-stone-800 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>اصول قانون اساسی پنکه</span>
        </button>

        <button
          onClick={() => setActiveTab('citizenship')}
          className={`px-4 py-2 text-xs sm:text-sm font-lalezar rounded-xl transition-all flex items-center gap-2 border ${
            activeTab === 'citizenship'
              ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md'
              : 'bg-stone-900/60 text-stone-400 border-stone-800 hover:text-white'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>صدور شناسنامه ملی شهروندی</span>
        </button>

        <button
          onClick={() => setActiveTab('weather')}
          className={`px-4 py-2 text-xs sm:text-sm font-lalezar rounded-xl transition-all flex items-center gap-2 border ${
            activeTab === 'weather'
              ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md'
              : 'bg-stone-900/60 text-stone-400 border-stone-800 hover:text-white'
          }`}
        >
          <CloudSun className="w-4 h-4 text-amber-400" />
          <span>هواشناسی زنده Google Weather</span>
        </button>

        <button
          onClick={() => setActiveTab('soundlab')}
          className={`px-4 py-2 text-xs sm:text-sm font-lalezar rounded-xl transition-all flex items-center gap-2 border ${
            activeTab === 'soundlab'
              ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md'
              : 'bg-stone-900/60 text-stone-400 border-stone-800 hover:text-white'
          }`}
        >
          <Mic className="w-4 h-4" />
          <span>تست نوستالژیک صدای «آآآآ»</span>
        </button>

        <button
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2 text-xs sm:text-sm font-lalezar rounded-xl transition-all flex items-center gap-2 border ${
            activeTab === 'stats'
              ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md'
              : 'bg-stone-900/60 text-stone-400 border-stone-800 hover:text-white'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>بانک مرکزی و توانیر نسیم</span>
        </button>
      </div>

      {/* Tab 1: Constitution */}
      {activeTab === 'constitution' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {constitutionArticles.map((art, idx) => (
            <div
              key={art.num}
              className="bg-stone-900/70 border-2 border-stone-800 p-6 rounded-3xl hover:border-amber-500/40 transition-all space-y-3 backdrop-blur-md shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="font-lalezar text-amber-400 text-xs bg-amber-500/10 px-2.5 py-0.5 rounded-lg border border-amber-500/20">
                  {art.num}
                </span>
                <span className="text-[11px] text-stone-500 font-mono">ماده {idx + 1}</span>
              </div>
              <h3 className="font-lalezar text-lg sm:text-xl text-stone-100">{art.title}</h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed text-right font-medium">
                {art.text}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Citizenship Smart Card Generator */}
      {activeTab === 'citizenship' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-5 bg-stone-900/80 border-2 border-stone-800 p-6 rounded-3xl space-y-4 shadow-xl">
            <div>
              <h3 className="font-lalezar text-xl text-stone-100">
                درخواست صدور کارت هوشمند ملی پنکه
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                اطلاعات خود را وارد نمایید تا کارت شناسایی تابعیتی با مهر شورای عالی وزش برای شما صادر گردد.
              </p>
            </div>

            <form onSubmit={handleIssueCard} className="space-y-4">
              <div>
                <label className="block font-lalezar text-xs text-stone-300 mb-1">
                  نام و نام خانوادگی شهروند:
                </label>
                <input
                  type="text"
                  required
                  value={citizenForm.name}
                  onChange={(e) => setCitizenForm({ ...citizenForm, name: e.target.value })}
                  placeholder="مثال: سهراب خنک‌دوست"
                  className="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-xl px-3.5 py-2 font-lalezar text-sm text-stone-100 outline-none"
                />
              </div>

              <div>
                <label className="block font-lalezar text-xs text-stone-300 mb-1">
                  مدل پنکه پدری (اصالت و نژاد دستگاه):
                </label>
                <input
                  type="text"
                  value={citizenForm.fatherFan}
                  onChange={(e) =>
                    setCitizenForm({ ...citizenForm, fatherFan: e.target.value })
                  }
                  placeholder="مثال: پارس خزر ۴۰۱۰، سانی، توشیبا"
                  className="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-xl px-3.5 py-2 font-lalezar text-sm text-stone-100 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-lalezar text-xs text-stone-300 mb-1">
                    دور مورد علاقه:
                  </label>
                  <select
                    value={citizenForm.speed}
                    onChange={(e) =>
                      setCitizenForm({
                        ...citizenForm,
                        speed: e.target.value as CitizenCard['speedChoice'],
                      })
                    }
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-2.5 py-2 font-lalezar text-xs text-stone-100 outline-none"
                  >
                    <option value="دور ۱ (نسیم)">دور ۱ (نسیم ملایم)</option>
                    <option value="دور ۲ (متعادل)">دور ۲ (متعادل)</option>
                    <option value="دور ۳ (توربو)">دور ۳ (توربو طوفانی)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-lalezar text-xs text-stone-300 mb-1">
                    محل سکونت:
                  </label>
                  <input
                    type="text"
                    value={citizenForm.city}
                    onChange={(e) =>
                      setCitizenForm({ ...citizenForm, city: e.target.value })
                    }
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 font-lalezar text-xs text-stone-100 outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-lalezar text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4" />
                <span>صدور رسمی شناسنامه تابعیتی</span>
              </button>
            </form>
          </div>

          {/* Rendered National Smart Card */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {issuedCard ? (
              <div className="w-full max-w-lg space-y-4">
                {/* 3D Smart Card Mockup */}
                <div className="w-full bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 border-2 border-amber-500/60 rounded-3xl p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
                  {/* Iranian tricolor top bar */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-600 via-white to-red-600" />
                  
                  {/* Subtle watermark background */}
                  <div className="absolute -right-10 -bottom-10 w-48 h-48 opacity-5 pointer-events-none">
                    <RepublicLogo size="2xl" spinSpeed={0} />
                  </div>

                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                    <div className="flex items-center gap-3.5">
                      <RepublicLogo size="sm" spinSpeed={fanSpeed} />
                      <div className="flex flex-col text-right">
                        <span className="font-lalezar text-lg sm:text-xl text-stone-100 leading-none">
                          جمهوری پنکه
                        </span>
                        <span className="text-[10px] text-amber-400 font-mono tracking-widest mt-1">
                          NATIONAL SMART IDENTITY CARD
                        </span>
                      </div>
                    </div>

                    {/* Golden Microchip Graphic */}
                    <div className="w-11 h-8 rounded-md bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 p-0.5 shadow-md flex items-center justify-center border border-amber-200">
                      <div className="w-full h-full border border-amber-700/60 rounded-sm flex items-center justify-center">
                        <div className="w-3 h-4 border-t border-b border-amber-900/60" />
                      </div>
                    </div>
                  </div>

                  {/* Card Content Grid */}
                  <div className="py-5 grid grid-cols-3 gap-5 items-center">
                    {/* Photo/Avatar Box */}
                    <div className="col-span-1 flex flex-col items-center">
                      <div className="w-24 h-32 bg-stone-950 border-2 border-amber-500/40 rounded-2xl p-2 flex flex-col items-center justify-center relative shadow-inner">
                        <RepublicLogo size="md" spinSpeed={fanSpeed} />
                        <span className="font-lalezar text-xs text-stone-400 mt-2">شهروند دائم</span>
                        <div className="absolute bottom-1 right-1 bg-amber-500 text-stone-950 text-[8px] font-black px-1 rounded-sm">
                          مهر پره
                        </div>
                      </div>
                    </div>

                    {/* Personal details with Lalezar font */}
                    <div className="col-span-2 space-y-2.5 text-right">
                      <div>
                        <span className="text-[10px] text-stone-500 block">نام و نام خانوادگی:</span>
                        <span className="font-lalezar text-lg sm:text-xl text-stone-100">
                          {issuedCard.fullName}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] text-stone-500 block">مدل دستگاه پدری:</span>
                        <span className="font-lalezar text-sm text-amber-400">
                          {issuedCard.fanModel}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-[10px] text-stone-500 block">دور ثبت‌شده:</span>
                          <span className="font-lalezar text-xs text-stone-300">
                            {issuedCard.speedChoice}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-stone-500 block">محل صدور:</span>
                          <span className="font-lalezar text-xs text-stone-300">
                            {issuedCard.hometown}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Barcode & National Code */}
                  <div className="pt-3.5 border-t border-stone-800 flex items-center justify-between text-xs font-mono">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-stone-500 font-sans">شماره ملی هوشمند:</span>
                      <span className="text-amber-400 font-bold text-sm tracking-wider">
                        {issuedCard.nationalCode}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <QrCode className="w-7 h-7 text-stone-300" />
                    </div>
                  </div>
                </div>

                {/* Print button */}
                <div className="flex justify-center">
                  <button
                    onClick={handlePrintCard}
                    className="px-5 py-2 bg-stone-900 hover:bg-stone-850 text-stone-200 border border-stone-700 font-lalezar text-xs rounded-xl flex items-center gap-2 transition-colors shadow-md"
                  >
                    <Printer className="w-4 h-4 text-amber-400" />
                    <span>چاپ و ذخیره شناسنامه</span>
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* Tab: Google Weather Live Station */}
      {activeTab === 'weather' && (
        <GoogleWeatherWidget onSelectFanSpeed={(s) => onChangeSpeed(s)} />
      )}

      {/* Tab: Fan Voice Laboratory */}
      {activeTab === 'soundlab' && (
        <div className="bg-stone-900/80 border-2 border-stone-800 p-10 rounded-3xl text-center space-y-6 max-w-2xl mx-auto shadow-2xl backdrop-blur-md">
          <div className="w-24 h-24 mx-auto rounded-full bg-amber-500/10 border-2 border-amber-500/40 flex items-center justify-center shadow-lg shadow-amber-500/10">
            <Mic className="w-10 h-10 text-amber-400" />
          </div>

          <div className="space-y-2">
            <h3 className="font-lalezar text-2xl sm:text-3xl text-stone-100">
              شبیه‌ساز نوستالژیک حرف زدن جلوی پره پنکه
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-medium">
              آزمون ملی سنجش ارتعاش صوت: کلید زیر را فشار دهید تا صدای خاطره‌انگیز «آآآآآآآآآآ» با اثر پره‌های پنکه (Tremolo Modulation) برای شما به صورت زنده شبیه‌سازی شود!
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={triggerVoiceTest}
              disabled={isVoiceTesting}
              className={`px-8 py-4 rounded-2xl font-lalezar text-lg sm:text-xl shadow-2xl transition-all flex items-center gap-3 mx-auto ${
                isVoiceTesting
                  ? 'bg-red-600 text-white animate-pulse shadow-red-600/40'
                  : 'bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 active:scale-95 shadow-amber-500/30'
              }`}
            >
              <Volume2 className="w-6 h-6" />
              <span>{isVoiceTesting ? 'در حال لرزاندن صدا... آآآآآآ' : 'پخش صدای «آآآآآآآآ» جلوی پنکه'}</span>
            </button>
          </div>

          <p className="text-[11px] text-stone-500 font-mono">
            * پردازش و ایجاد امواج صوتی با سنتز زنده Web Audio API مرورگر
          </p>
        </div>
      )}

      {/* Tab 4: Economic & Energy Stats */}
      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-stone-900/80 border-2 border-stone-800 p-6 rounded-3xl space-y-2.5 shadow-xl">
            <span className="font-lalezar text-sm text-stone-400">نرخ برابری هر RPM به وات‌ساعت:</span>
            <div className="font-lalezar text-3xl text-amber-400">
              ۲,۴۵۰ <span className="text-xs font-sans text-stone-400">وات/دور</span>
            </div>
            <div className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
              <span>▲ +۴.۲٪ رشد در پی گرمای اخیر</span>
            </div>
          </div>

          <div className="bg-stone-900/80 border-2 border-stone-800 p-6 rounded-3xl space-y-2.5 shadow-xl">
            <span className="font-lalezar text-sm text-stone-400">میانگین مصرف برق هر پنکه:</span>
            <div className="font-lalezar text-3xl text-stone-100">
              ۵۵ <span className="text-xs font-sans text-stone-400">وات (۹۲٪ صرفه‌جویی)</span>
            </div>
            <div className="text-xs text-sky-400 flex items-center gap-1 font-semibold">
              <span>در مقایسه با ۲۴۰۰ وات کولر گازی</span>
            </div>
          </div>

          <div className="bg-stone-900/80 border-2 border-stone-800 p-6 rounded-3xl space-y-2.5 shadow-xl">
            <span className="font-lalezar text-sm text-stone-400">شاخص خشنودی شهروندی از نسیم:</span>
            <div className="font-lalezar text-3xl text-emerald-400">
              ۹۹.۸٪ <span className="text-xs font-sans text-stone-400">مطلوب</span>
            </div>
            <div className="text-xs text-stone-400 flex items-center gap-1 font-semibold">
              <span>گزارش رسمی سازمان هواشناسی و نسیم</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
