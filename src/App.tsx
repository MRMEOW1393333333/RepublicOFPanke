/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TweetItem, FanSpeed } from './types/panke';
import {
  getSavedTweets,
  getLastSyncTime,
  simulateSyncWithAccount,
  addCustomTweet,
} from './services/tweetService';
import { RepublicLogo } from './components/RepublicLogo';
import { PankeInternational } from './components/PankeInternational';
import { TwitterFeedSection } from './components/TwitterFeedSection';
import { OfficialPortal } from './components/OfficialPortal';
import { audioSynth } from './utils/audioSynth';
import {
  Tv,
  MessageSquare,
  Landmark,
  UserCheck,
  RefreshCw,
  ExternalLink,
  Flame,
  Wind,
  Volume2,
  VolumeX,
  CloudSun,
} from 'lucide-react';

export default function App() {
  const [tweets, setTweets] = useState<TweetItem[]>([]);
  const [lastSyncTime, setLastSyncTime] = useState<string>('هم‌اکنون');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<'tv' | 'feed' | 'portal' | 'id'>('tv');
  const [selectedTweetForTV, setSelectedTweetForTV] = useState<string | undefined>(undefined);
  const [fanSpeed, setFanSpeed] = useState<FanSpeed>(2);
  const [isOscillating, setIsOscillating] = useState<boolean>(true);
  const [isGlobalMuted, setIsGlobalMuted] = useState<boolean>(true);

  // Initialize tweets and sync time
  useEffect(() => {
    const loaded = getSavedTweets();
    setTweets(loaded);
    setLastSyncTime(getLastSyncTime());
  }, []);

  // Sync with @RepublicofPanke account
  const handleSync = async () => {
    setIsSyncing(true);
    try {
      const result = await simulateSyncWithAccount(tweets);
      setTweets(result.newTweets);
      setLastSyncTime(getLastSyncTime());
      if (result.addedCount > 0 && !isGlobalMuted) {
        audioSynth.playBreakingNewsChime();
      }
    } catch (e) {
      console.error('Sync failed:', e);
    } finally {
      setIsSyncing(false);
    }
  };

  // Add custom tweet/dispatch
  const handleAddTweet = (
    text: string,
    category: TweetItem['category'],
    isBreaking: boolean
  ) => {
    const updated = addCustomTweet(text, category, isBreaking, tweets);
    setTweets(updated);
    if (!isGlobalMuted) {
      audioSynth.playBreakingNewsChime();
    }
  };

  // Send a specific tweet from feed to TV broadcast
  const handleSendToTV = (tweetId: string) => {
    setSelectedTweetForTV(tweetId);
    setActiveSection('tv');
    if (!isGlobalMuted) {
      audioSynth.playBreakingNewsChime();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Change Fan Speed
  const handleSpeedChange = (speed: FanSpeed) => {
    setFanSpeed(speed);
    if (!isGlobalMuted) {
      audioSynth.setFanHum(speed);
    }
  };

  const toggleSound = () => {
    const nextMuted = !isGlobalMuted;
    setIsGlobalMuted(nextMuted);
    if (!nextMuted) {
      audioSynth.setFanHum(fanSpeed);
      audioSynth.playBreakingNewsChime();
    } else {
      audioSynth.setFanHum(0);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090c] text-stone-100 flex flex-col relative overflow-x-hidden selection:bg-amber-500 selection:text-stone-950 font-sans">
      {/* Background Animated Wind Breeze Lines according to Fan Speed */}
      {fanSpeed > 0 && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
          {[15, 30, 48, 65, 82].map((topPercent, i) => (
            <div
              key={i}
              style={{
                top: `${topPercent}%`,
                animationDuration: fanSpeed === 1 ? '4.5s' : fanSpeed === 2 ? '2.5s' : '1.2s',
                animationDelay: `${i * 0.7}s`,
                width: `${180 + i * 40}px`,
              }}
              className="breeze-line"
            />
          ))}
        </div>
      )}

      {/* Top Urgent Ticker Strip (نوار خبر فوری سراسری) */}
      <div className="bg-red-700 text-white text-xs py-1.5 px-4 flex items-center justify-between border-b border-red-800 z-50 shadow-md">
        <div className="flex items-center gap-3 overflow-hidden flex-1">
          <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-0.5 rounded-md text-xs font-lalezar shrink-0">
            <Flame className="w-4 h-4 text-amber-300 animate-bounce" />
            <span>خبر فوری پنکه</span>
          </div>
          <div className="overflow-hidden whitespace-nowrap">
            <span className="animate-ticker inline-block space-x-6 space-x-reverse text-xs sm:text-sm font-lalezar">
              {tweets.slice(0, 6).map((t) => (
                <span key={t.id} className="inline-flex items-center gap-2">
                  <span className="text-amber-300">★</span>
                  <span>{t.text}</span>
                </span>
              ))}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 mr-4 text-xs font-lalezar text-white/90">
          <a
            href="https://x.com/RepublicofPanke"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex items-center gap-1 text-amber-200"
          >
            <span>@RepublicofPanke</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Top Bar (Follows Top Bar Contract: 3 Zones with Lalezar font) */}
      <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b-2 border-stone-850 px-4 sm:px-8 py-3.5 transition-all shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Zone 1: Brand Title with Lalezar */}
          <div className="flex items-center gap-3">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                setActiveSection('tv');
              }}
              className="flex items-center gap-3 group"
            >
              <RepublicLogo size="md" spinSpeed={fanSpeed} />
              <div className="flex flex-col text-right">
                <span className="font-lalezar text-xl sm:text-2xl text-stone-100 tracking-wide leading-none group-hover:text-amber-400 transition-colors">
                  جمهوری پنکه
                </span>
                <span className="text-[10px] text-amber-400/90 font-mono tracking-widest uppercase mt-0.5">
                  REPUBLIC OF PANKE
                </span>
              </div>
            </a>
          </div>

          {/* Zone 2: Navigation Links with Lalezar */}
          <nav className="hidden md:flex items-center gap-6 font-lalezar text-sm text-stone-300">
            <button
              onClick={() => setActiveSection('tv')}
              className={`transition-colors flex items-center gap-1.5 py-1 ${
                activeSection === 'tv'
                  ? 'text-amber-400 border-b-2 border-amber-400 font-bold'
                  : 'hover:text-white'
              }`}
            >
              <Tv className="w-4 h-4 text-red-500" />
              <span>پنکه اینترنشنال</span>
            </button>

            <button
              onClick={() => setActiveSection('feed')}
              className={`transition-colors flex items-center gap-1.5 py-1 ${
                activeSection === 'feed'
                  ? 'text-amber-400 border-b-2 border-amber-400 font-bold'
                  : 'hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-sky-400" />
              <span>بیانیه‌ها و توئیت‌ها</span>
            </button>

            <button
              onClick={() => setActiveSection('portal')}
              className={`transition-colors flex items-center gap-1.5 py-1 ${
                activeSection === 'portal'
                  ? 'text-amber-400 border-b-2 border-amber-400 font-bold'
                  : 'hover:text-white'
              }`}
            >
              <Landmark className="w-4 h-4 text-emerald-400" />
              <span>قوانین و اسناد کشوری</span>
            </button>

            <button
              onClick={() => {
                setActiveSection('portal');
              }}
              className="transition-colors flex items-center gap-1.5 py-1 hover:text-white"
            >
              <UserCheck className="w-4 h-4 text-amber-400" />
              <span>شناسنامه شهروندی</span>
            </button>

            <button
              onClick={() => {
                setActiveSection('portal');
              }}
              className="transition-colors flex items-center gap-1.5 py-1 hover:text-white text-cyan-300"
            >
              <CloudSun className="w-4 h-4 text-cyan-400" />
              <span>هواشناسی گوگل (پنکه آباد)</span>
            </button>
          </nav>

          {/* Zone 3: Primary Actions with Lalezar */}
          <div className="flex items-center gap-3">
            {/* Audio Hum Toggle */}
            <button
              onClick={toggleSound}
              title={isGlobalMuted ? 'فعال‌سازی صدای موتور و اخبار' : 'قطع صدای فراگیر'}
              className="p-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-amber-400 border border-stone-800 transition-colors shadow-sm"
            >
              {isGlobalMuted ? <VolumeX className="w-4 h-4 text-stone-500" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
            </button>

            {/* Sync Button */}
            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-lalezar text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 whitespace-nowrap active:scale-95 disabled:opacity-50"
              title="همگام‌سازی فوری آخرین اخبار صفحه X"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">بروزرسانی</span>
              <span>@RepublicofPanke</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar with Lalezar font */}
        <div className="flex md:hidden items-center justify-around gap-1 pt-2.5 mt-2 border-t border-stone-850 text-xs font-lalezar">
          <button
            onClick={() => setActiveSection('tv')}
            className={`py-1.5 px-3 rounded-xl flex items-center gap-1.5 ${
              activeSection === 'tv' ? 'bg-red-600 text-white shadow-md' : 'text-stone-400'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span>اینترنشنال</span>
          </button>
          <button
            onClick={() => setActiveSection('feed')}
            className={`py-1.5 px-3 rounded-xl flex items-center gap-1.5 ${
              activeSection === 'feed' ? 'bg-amber-500 text-stone-950 shadow-md' : 'text-stone-400'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>توئیت‌ها</span>
          </button>
          <button
            onClick={() => setActiveSection('portal')}
            className={`py-1.5 px-3 rounded-xl flex items-center gap-1.5 ${
              activeSection === 'portal' ? 'bg-emerald-600 text-white shadow-md' : 'text-stone-400'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>پرتال دولت</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-12 relative z-10">
        {/* Section 1: Panke International Broadcast (پنکه اینترنشنال) */}
        {activeSection === 'tv' && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-lalezar text-2xl sm:text-3xl text-stone-100 flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-full bg-red-600 animate-pulse shadow-md shadow-red-600" />
                  <span>شبکه بین‌المللی پنکه اینترنشنال (Panke International)</span>
                </h2>
                <p className="text-xs sm:text-sm text-stone-400 mt-1 font-medium">
                  پوشش زنده و ۲۴ ساعته بیانیه‌ها، اخبار فوری و اطلاعیه‌های رسمی صادر شده از حساب ایکس @RepublicofPanke
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveSection('feed')}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-850 text-stone-200 hover:text-white border border-stone-800 rounded-xl font-lalezar text-xs sm:text-sm flex items-center gap-2 transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 text-sky-400" />
                  <span>مشاهده کل فید بیانیه‌ها</span>
                </button>
              </div>
            </div>

            {/* TV Screen Viewport */}
            <PankeInternational
              tweets={tweets}
              selectedTweetId={selectedTweetForTV}
              fanSpeed={fanSpeed}
              onSelectTweet={(id) => setSelectedTweetForTV(id)}
            />

            {/* Quick-Access Tweet Ticker Deck underneath TV */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs text-stone-400">
                <span className="font-lalezar text-sm text-stone-300">
                  انتخاب خبر برای پخش فوری در کادر بالای تصویر:
                </span>
                <span className="font-mono">{tweets.length} بیانیه معتبر</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {tweets.slice(0, 6).map((tweet) => (
                  <button
                    key={tweet.id}
                    onClick={() => handleSendToTV(tweet.id)}
                    className="p-4 rounded-2xl bg-stone-900/70 hover:bg-stone-900 border-2 border-stone-800 hover:border-amber-500/50 text-right transition-all group flex flex-col justify-between space-y-2.5 shadow-md active:scale-98"
                  >
                    <div className="flex items-center justify-between text-xs text-stone-500 w-full">
                      <span className="font-lalezar text-amber-400">{tweet.category}</span>
                      <span className="font-mono text-[11px]">{tweet.createdAt}</span>
                    </div>
                    <p className="font-lalezar text-sm text-stone-200 line-clamp-2 leading-relaxed group-hover:text-white">
                      {tweet.text}
                    </p>
                    <div className="font-lalezar text-xs text-red-400 flex items-center gap-1.5 pt-1">
                      <Tv className="w-3.5 h-3.5" />
                      <span>پخش فوری در کادر خبر استودیو</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Section 2: Complete Tweets & Dispatches Feed */}
        {activeSection === 'feed' && (
          <section className="space-y-4">
            <TwitterFeedSection
              tweets={tweets}
              lastSyncTime={lastSyncTime}
              isSyncing={isSyncing}
              onSync={handleSync}
              onSendToTV={handleSendToTV}
              onAddTweet={handleAddTweet}
            />
          </section>
        )}

        {/* Section 3: Official State Portal, Constitution & ID Generator */}
        {activeSection === 'portal' && (
          <section className="space-y-6">
            <OfficialPortal
              fanSpeed={fanSpeed}
              onChangeSpeed={handleSpeedChange}
              isOscillating={isOscillating}
              onToggleOscillate={() => setIsOscillating(!isOscillating)}
            />
          </section>
        )}
      </main>

      {/* Footer with Lalezar font */}
      <footer className="mt-auto border-t-2 border-stone-850 bg-stone-950 py-10 px-4 sm:px-8 text-xs text-stone-400 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
          <div className="flex items-center gap-4">
            <RepublicLogo size="md" spinSpeed={fanSpeed} />
            <div className="flex flex-col text-right">
              <span className="font-lalezar text-lg text-stone-100">
                پرتال رسمی و خبرگزاری جمهوری پنکه
              </span>
              <span className="text-xs text-stone-500 font-mono mt-0.5">
                متصل به حساب رسمی https://x.com/RepublicofPanke · نسخه سراسری ۱۴۰۳
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 font-lalezar text-sm text-stone-400">
            <a
              href="https://x.com/RepublicofPanke"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <span>صفحه توییتر / ایکس</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => setActiveSection('tv')}
              className="hover:text-amber-400 transition-colors"
            >
              پخش پنکه اینترنشنال
            </button>
            <button
              onClick={() => setActiveSection('portal')}
              className="hover:text-amber-400 transition-colors"
            >
              قانون اساسی
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
