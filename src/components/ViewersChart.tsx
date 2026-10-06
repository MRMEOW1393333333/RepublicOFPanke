import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { Activity, Radio, TrendingUp, Users, Eye } from 'lucide-react';

interface DataPoint {
  time: string;
  xUsers: number;
  siteUsers: number;
  totalUsers: number;
}

interface ViewersChartProps {
  currentXViewers: number;
  currentSiteViewers: number;
  fanSpeed?: number;
}

export const ViewersChart: React.FC<ViewersChartProps> = ({
  currentXViewers,
  currentSiteViewers,
  fanSpeed = 2,
}) => {
  const [chartType, setChartType] = useState<'area' | 'line'>('area');
  const [data, setData] = useState<DataPoint[]>([]);

  // Generate initial 12 historical time points
  useEffect(() => {
    const initialPoints: DataPoint[] = [];
    const now = new Date();

    for (let i = 11; i >= 0; i--) {
      const pointTime = new Date(now.getTime() - i * 20000);
      const timeStr = pointTime.toLocaleTimeString('fa-IR', {
        minute: '2-digit',
        second: '2-digit',
      });

      // Subtle oscillating sine wave modulation based on index
      const wave = Math.sin(i * 0.7) * 450;
      const xVal = Math.round(currentXViewers - 800 + i * 70 + wave + (Math.random() * 80 - 40));
      const siteVal = Math.round(currentSiteViewers - 350 + i * 30 + wave * 0.4 + (Math.random() * 40 - 20));

      initialPoints.push({
        time: timeStr,
        xUsers: Math.max(1000, xVal),
        siteUsers: Math.max(500, siteVal),
        totalUsers: Math.max(1500, xVal + siteVal),
      });
    }

    setData(initialPoints);
  }, []);

  // Real-time dynamic updates every 3 seconds with oscillating effect
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('fa-IR', {
        minute: '2-digit',
        second: '2-digit',
      });

      // Oscillating pulse amplified by fan speed
      const oscillationBonus = (fanSpeed + 1) * (Math.sin(Date.now() / 2500) * 120);
      const randomNoiseX = Math.floor(Math.random() * 41) - 20;
      const randomNoiseSite = Math.floor(Math.random() * 21) - 10;

      const newX = Math.round(currentXViewers + oscillationBonus + randomNoiseX);
      const newSite = Math.round(currentSiteViewers + oscillationBonus * 0.45 + randomNoiseSite);
      const newTotal = newX + newSite;

      setData((prev) => {
        const next = [...prev.slice(1), {
          time: timeStr,
          xUsers: newX,
          siteUsers: newSite,
          totalUsers: newTotal,
        }];
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentXViewers, currentSiteViewers, fanSpeed]);

  // Compute peak and current
  const latest = data[data.length - 1] || { xUsers: currentXViewers, siteUsers: currentSiteViewers, totalUsers: currentXViewers + currentSiteViewers };
  const peakTotal = data.reduce((max, d) => Math.max(max, d.totalUsers), latest.totalUsers);

  // Custom Persian Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-stone-950/95 border-2 border-amber-500/50 rounded-2xl p-3.5 shadow-2xl backdrop-blur-md text-right font-lalezar space-y-1.5 min-w-[210px]">
          <div className="flex items-center justify-between text-xs text-stone-400 pb-1.5 border-b border-stone-800">
            <span>زمان ثبت نوسان:</span>
            <span className="font-mono text-amber-300 text-xs">{label}</span>
          </div>

          <div className="flex items-center justify-between text-sm text-sky-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-sm shadow-sky-400" />
              <span>کاربران شبکه 𝕏:</span>
            </span>
            <span className="font-mono font-bold">
              {payload.find((p: any) => p.dataKey === 'xUsers')?.value?.toLocaleString('fa-IR') || '۰'}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm text-emerald-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
              <span>پرتال جمهوری پنکه:</span>
            </span>
            <span className="font-mono font-bold">
              {payload.find((p: any) => p.dataKey === 'siteUsers')?.value?.toLocaleString('fa-IR') || '۰'}
            </span>
          </div>

          <div className="flex items-center justify-between text-base text-amber-400 pt-1 border-t border-stone-850">
            <span>مجموع تماشاگران:</span>
            <span className="font-mono font-black text-amber-300">
              {payload.find((p: any) => p.dataKey === 'totalUsers')?.value?.toLocaleString('fa-IR') || '۰'}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-stone-950/95 border-2 border-stone-800 rounded-3xl p-5 sm:p-6 shadow-2xl backdrop-blur-xl space-y-5">
      {/* Chart Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-850">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Activity className="w-4 h-4 animate-pulse" />
            </div>
            <h3 className="font-lalezar text-lg sm:text-xl text-stone-100 flex items-center gap-2">
              <span>نمودار تعاملی و نوسانی بینندگان لحظه‌ای</span>
              <span className="text-amber-400 text-xs font-mono bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                LIVE RECHARTS
              </span>
            </h3>
          </div>
          <p className="text-xs text-stone-400 font-medium">
            پایش دینامیک تلفیقی تماشاگران شبکه 𝕏 و پرتال ملی همراه با الگوریتم نوسان باد
          </p>
        </div>

        {/* Chart View Switchers and Live Badge */}
        <div className="flex items-center gap-3 self-stretch sm:self-auto justify-between sm:justify-end">
          <div className="flex items-center gap-1.5 bg-red-600/15 border border-red-500/30 px-2.5 py-1 rounded-xl text-xs font-lalezar text-red-400">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>نوسان زنده ۳s</span>
          </div>

          <div className="flex items-center gap-1 p-1 bg-stone-900 rounded-xl border border-stone-800 text-xs font-lalezar">
            <button
              onClick={() => setChartType('area')}
              className={`px-3 py-1 rounded-lg transition-all ${
                chartType === 'area'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              نمودار سایه‌ای
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1 rounded-lg transition-all ${
                chartType === 'line'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              نمودار خطی
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="bg-stone-900/80 border border-sky-500/30 rounded-2xl p-3.5 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[11px] font-lalezar text-stone-400">تماشاگران از شبکه 𝕏</span>
            <div className="font-lalezar text-xl text-sky-400">
              {latest.xUsers.toLocaleString('fa-IR')} <span className="text-xs text-stone-400">نفر</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 font-mono font-bold text-sm">
            𝕏
          </div>
        </div>

        <div className="bg-stone-900/80 border border-emerald-500/30 rounded-2xl p-3.5 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[11px] font-lalezar text-stone-400">تماشاگران پرتال رسمی</span>
            <div className="font-lalezar text-xl text-emerald-400">
              {latest.siteUsers.toLocaleString('fa-IR')} <span className="text-xs text-stone-400">نفر</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Eye className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-stone-900/80 border border-amber-500/40 rounded-2xl p-3.5 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[11px] font-lalezar text-stone-400">اوج نوسان همزمان (Peak)</span>
            <div className="font-lalezar text-xl text-amber-400">
              {peakTotal.toLocaleString('fa-IR')} <span className="text-xs text-stone-400">نفر</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Main Interactive Recharts Viewport */}
      <div className="w-full h-72 sm:h-80 pt-2 pb-1 relative">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                {/* Total Area Gradient */}
                <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                </linearGradient>
                {/* X Users Gradient */}
                <linearGradient id="xGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
                </linearGradient>
                {/* Site Users Gradient */}
                <linearGradient id="siteGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34d399" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#34d399" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              
              <XAxis
                dataKey="time"
                stroke="#71717a"
                tick={{ fill: '#a1a1aa', fontSize: 11, fontFamily: 'Vazirmatn' }}
                tickLine={false}
              />
              
              <YAxis
                stroke="#71717a"
                tick={{ fill: '#a1a1aa', fontSize: 11, fontFamily: 'Vazirmatn' }}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                domain={['auto', 'auto']}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip content={<CustomTooltip />} />

              <Area
                type="monotone"
                dataKey="totalUsers"
                name="مجموع بینندگان"
                stroke="#f59e0b"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#totalGrad)"
                isAnimationActive={true}
                animationDuration={600}
              />
              <Area
                type="monotone"
                dataKey="xUsers"
                name="کاربران شبکه 𝕏"
                stroke="#38bdf8"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#xGrad)"
                isAnimationActive={true}
                animationDuration={600}
              />
              <Area
                type="monotone"
                dataKey="siteUsers"
                name="پرتال وب"
                stroke="#34d399"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#siteGrad)"
                isAnimationActive={true}
                animationDuration={600}
              />
            </AreaChart>
          ) : (
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis
                dataKey="time"
                stroke="#71717a"
                tick={{ fill: '#a1a1aa', fontSize: 11, fontFamily: 'Vazirmatn' }}
                tickLine={false}
              />
              <YAxis
                stroke="#71717a"
                tick={{ fill: '#a1a1aa', fontSize: 11, fontFamily: 'Vazirmatn' }}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                domain={['auto', 'auto']}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />

              <Line
                type="monotone"
                dataKey="totalUsers"
                name="مجموع کل"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={{ r: 3, fill: '#f59e0b' }}
                activeDot={{ r: 6, fill: '#fbbf24' }}
                isAnimationActive={true}
              />
              <Line
                type="monotone"
                dataKey="xUsers"
                name="شبکه 𝕏"
                stroke="#38bdf8"
                strokeWidth={2}
                dot={{ r: 2.5, fill: '#38bdf8' }}
                activeDot={{ r: 5, fill: '#7dd3fc' }}
                isAnimationActive={true}
              />
              <Line
                type="monotone"
                dataKey="siteUsers"
                name="پرتال وب"
                stroke="#34d399"
                strokeWidth={2}
                dot={{ r: 2.5, fill: '#34d399' }}
                activeDot={{ r: 5, fill: '#6ee7b7' }}
                isAnimationActive={true}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Footer Legend Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-stone-850 text-xs font-lalezar">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="w-3 h-1.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500" />
            <span className="text-amber-400">مجموع کل بینندگان</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-1.5 rounded-full bg-sky-400 shadow-sm shadow-sky-400" />
            <span className="text-sky-300">تماشاگران پلتفرم 𝕏</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
            <span className="text-emerald-300">بازدیدکنندگان پرتال پنکه</span>
          </div>
        </div>

        <span className="text-[11px] text-stone-500 font-mono">
          سینک خودکار با فرکانس دور {fanSpeed === 0 ? 'خاموش' : `موتور ${fanSpeed}`}
        </span>
      </div>
    </div>
  );
};
