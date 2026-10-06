import React, { useState, useEffect } from 'react';
import { TweetItem } from '../types/panke';
import { RepublicLogo } from './RepublicLogo';
import {
  RefreshCw,
  Search,
  ExternalLink,
  Heart,
  Repeat2,
  MessageCircle,
  Pin,
  Flame,
  Radio,
  PlusCircle,
  Share2,
  CheckCircle2,
  Tv,
} from 'lucide-react';

interface TwitterFeedSectionProps {
  tweets: TweetItem[];
  lastSyncTime: string;
  isSyncing: boolean;
  onSync: () => void;
  onSendToTV: (tweetId: string) => void;
  onAddTweet: (text: string, category: TweetItem['category'], isBreaking: boolean) => void;
}

export const TwitterFeedSection: React.FC<TwitterFeedSectionProps> = ({
  tweets,
  lastSyncTime,
  isSyncing,
  onSync,
  onSendToTV,
  onAddTweet,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'native' | 'embed'>('native');
  const [likedTweetIds, setLikedTweetIds] = useState<Set<string>>(new Set());
  const [retweetedTweetIds, setRetweetedTweetIds] = useState<Set<string>>(new Set());
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [newTweetText, setNewTweetText] = useState('');
  const [newTweetCategory, setNewTweetCategory] = useState<TweetItem['category']>('سیاسی');
  const [isNewTweetBreaking, setIsNewTweetBreaking] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (activeTab === 'embed') {
      const win = window as unknown as { twttr?: { widgets: { load: () => void } } };
      if (win.twttr && win.twttr.widgets) {
        win.twttr.widgets.load();
      }
    }
  }, [activeTab]);

  const toggleLike = (id: string) => {
    setLikedTweetIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleRetweet = (id: string) => {
    setRetweetedTweetIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleCopy = (id: string, text: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleComposeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTweetText.trim()) return;
    onAddTweet(newTweetText.trim(), newTweetCategory, isNewTweetBreaking);
    setNewTweetText('');
    setShowComposeModal(false);
  };

  const filteredTweets = tweets.filter((t) => {
    const matchSearch =
      t.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (t.tag && t.tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchCategory = selectedCategory === 'all' || t.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const categories = [
    { id: 'all', label: 'همه بیانیه‌ها' },
    { id: 'سیاسی', label: 'سیاسی و حکومتی' },
    { id: 'هواشناسی و وزش', label: 'هواشناسی و نسیم' },
    { id: 'اقتصادی', label: 'اقتصاد و برق' },
    { id: 'اجتماعی', label: 'جامعه و فرهنگ' },
    { id: 'بین‌الملل', label: 'بین‌الملل و کولرها' },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Top Header & Sync Panel */}
      <div className="bg-stone-900/90 border-2 border-stone-800 rounded-3xl p-6 backdrop-blur-md shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 pb-5 border-b border-stone-800">
          <div className="flex items-center gap-4">
            <RepublicLogo size="md" spinSpeed={1} />
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="font-lalezar text-xl sm:text-2xl text-stone-100 tracking-wide">
                  اتاق خبر و بیانیه‌های رسمی @RepublicofPanke
                </h2>
                <span className="bg-sky-500/20 text-sky-400 border border-sky-500/40 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 font-mono">
                  ✓ رسمی
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-1">
                اتصال و همگام‌سازی لحظه‌ای با صفحه رسمی جمهوری پنکه در شبکه اجتماعی ایکس · آخرین دریافت: {lastSyncTime}
              </p>
            </div>
          </div>

          {/* Action buttons with Lalezar font */}
          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={onSync}
              disabled={isSyncing}
              className="flex-1 md:flex-initial px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-lalezar text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'در حال دریافت اطلاعات...' : 'بروزرسانی فوری اخبار'}</span>
            </button>

            <button
              onClick={() => setShowComposeModal(true)}
              className="px-3.5 py-2.5 bg-stone-800 hover:bg-stone-750 text-stone-100 font-lalezar text-sm rounded-xl border border-stone-700 transition-colors flex items-center gap-2 shadow-sm"
            >
              <PlusCircle className="w-4 h-4 text-amber-400" />
              <span>ثبت بیانیه جدید</span>
            </button>

            <a
              href="https://x.com/RepublicofPanke"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-stone-800 hover:bg-stone-700 text-sky-400 rounded-xl border border-stone-700 transition-colors shadow-sm"
              title="مشاهده مستقیم در X.com"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* View Switcher: Interactive Feed vs Official Twitter Widget */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-5">
          <div className="flex items-center gap-1.5 p-1 bg-stone-950 rounded-xl border border-stone-800 self-start">
            <button
              onClick={() => setActiveTab('native')}
              className={`px-4 py-1.5 text-xs sm:text-sm font-lalezar rounded-lg transition-all ${
                activeTab === 'native'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              فید هوشمند و ارسال به استودیو ({filteredTweets.length})
            </button>
            <button
              onClick={() => setActiveTab('embed')}
              className={`px-4 py-1.5 text-xs sm:text-sm font-lalezar rounded-lg transition-all ${
                activeTab === 'embed'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              ویجت رسمی X Timeline
            </button>
          </div>

          {/* Search Bar */}
          {activeTab === 'native' && (
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="w-4 h-4 text-stone-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="جستجو در متن بیانیه‌ها یا هشتگ..."
                className="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-xl pr-10 pl-3 py-2 text-xs text-stone-100 placeholder-stone-500 outline-none transition-colors"
              />
            </div>
          )}
        </div>

        {/* Category Filters with Lalezar */}
        {activeTab === 'native' && (
          <div className="flex items-center gap-2 overflow-x-auto pt-4 pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-lalezar whitespace-nowrap transition-all border ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md shadow-amber-500/20'
                    : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* View Content */}
      {activeTab === 'native' ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredTweets.length === 0 ? (
            <div className="bg-stone-900/60 border border-stone-800 rounded-3xl p-14 text-center">
              <RepublicLogo size="lg" spinSpeed={0} className="mx-auto opacity-30 mb-4" />
              <p className="font-lalezar text-stone-300 text-lg">
                بیانیه‌ای با عبارت جستجو شده یافت نشد.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="mt-3 font-lalezar text-sm text-amber-400 hover:underline"
              >
                پاکسازی فیلترها و مشاهده همه
              </button>
            </div>
          ) : (
            filteredTweets.map((tweet) => {
              const isLiked = likedTweetIds.has(tweet.id);
              const isRetweeted = retweetedTweetIds.has(tweet.id);

              return (
                <article
                  key={tweet.id}
                  className="bg-stone-900/80 hover:bg-stone-900 border-2 border-stone-800 hover:border-amber-500/50 rounded-3xl p-6 transition-all duration-200 backdrop-blur-md shadow-xl group"
                >
                  {/* Top Meta */}
                  <div className="flex items-center justify-between text-xs text-stone-400 mb-3.5">
                    <div className="flex items-center gap-2.5">
                      {tweet.isPinned && (
                        <span className="flex items-center gap-1 text-amber-400 font-lalezar text-xs bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                          <Pin className="w-3 h-3 rotate-45" />
                          <span>بیانیه سنجاق‌شده</span>
                        </span>
                      )}
                      {tweet.isBreaking && (
                        <span className="flex items-center gap-1 text-red-400 font-lalezar text-xs bg-red-600/10 px-2 py-0.5 rounded-md border border-red-500/30">
                          <Flame className="w-3 h-3" />
                          <span>خبر فوری</span>
                        </span>
                      )}
                      <span className="font-lalezar text-stone-400 text-xs">{tweet.category}</span>
                      {tweet.tag && (
                        <span className="text-amber-400 font-mono text-xs">{tweet.tag}</span>
                      )}
                    </div>

                    <span className="font-mono text-xs text-stone-400">{tweet.createdAt}</span>
                  </div>

                  {/* Author Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3.5">
                      <RepublicLogo size="sm" spinSpeed={1} />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-lalezar text-stone-100 text-base sm:text-lg leading-none">
                            {tweet.author}
                          </span>
                          <span className="text-sky-400 text-xs font-mono font-bold">
                            ✓
                          </span>
                        </div>
                        <span className="text-stone-500 text-xs font-mono">
                          @{tweet.handle}
                        </span>
                      </div>
                    </div>

                    {/* Broadcast on TV Button */}
                    <button
                      onClick={() => onSendToTV(tweet.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-red-600/15 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 font-lalezar text-xs sm:text-sm transition-all flex items-center gap-1.5 shrink-0 shadow-md active:scale-95"
                      title="نمایش این خبر در زیرنویس قرمز استودیوی پنکه اینترنشنال"
                    >
                      <Tv className="w-4 h-4" />
                      <span>پخش در استودیو</span>
                    </button>
                  </div>

                  {/* Tweet Content Prose with Lalezar font for impactful Persian aesthetic */}
                  <p className="font-lalezar text-stone-100 text-base sm:text-lg leading-relaxed mb-3 text-right">
                    {tweet.text}
                  </p>

                  {/* Attached News Image */}
                  {tweet.imageUrl && (
                    <div className="relative w-full max-h-80 aspect-video rounded-2xl overflow-hidden border border-stone-800 mb-4 bg-stone-950 group/img">
                      <img
                        src={tweet.imageUrl}
                        alt={tweet.text}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-2.5 right-3 bg-black/70 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[11px] font-lalezar text-amber-300 border border-amber-500/30">
                        تصویر خبر: {tweet.category}
                      </div>
                    </div>
                  )}

                  {/* Bottom Stats & Engagement Bar */}
                  <div className="flex items-center justify-between pt-3.5 border-t border-stone-800 text-xs text-stone-400">
                    <div className="flex items-center gap-6">
                      {/* Like button */}
                      <button
                        onClick={() => toggleLike(tweet.id)}
                        className={`flex items-center gap-1.5 transition-colors ${
                          isLiked ? 'text-rose-500 font-bold' : 'hover:text-rose-400'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500' : ''}`} />
                        <span className="font-mono tabular-nums">
                          {(tweet.likes + (isLiked ? 1 : 0)).toLocaleString('fa-IR')}
                        </span>
                      </button>

                      {/* Retweet button */}
                      <button
                        onClick={() => toggleRetweet(tweet.id)}
                        className={`flex items-center gap-1.5 transition-colors ${
                          isRetweeted ? 'text-emerald-400 font-bold' : 'hover:text-emerald-400'
                        }`}
                      >
                        <Repeat2 className="w-4 h-4" />
                        <span className="font-mono tabular-nums">
                          {(tweet.retweets + (isRetweeted ? 1 : 0)).toLocaleString('fa-IR')}
                        </span>
                      </button>

                      {/* Replies */}
                      <div className="flex items-center gap-1.5 hover:text-sky-400 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span className="font-mono tabular-nums">
                          {tweet.replies.toLocaleString('fa-IR')}
                        </span>
                      </div>
                    </div>

                    {/* Share / Copy & Original Link */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(tweet.id, tweet.text)}
                        className="p-1.5 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-stone-200 transition-colors"
                        title="کپی متن بیانیه"
                      >
                        {copiedId === tweet.id ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Share2 className="w-4 h-4" />
                        )}
                      </button>
                      <a
                        href={tweet.sourceUrl || 'https://x.com/RepublicofPanke'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-stone-400 hover:text-amber-400 transition-colors font-lalezar"
                      >
                        <span>مشاهده در X</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      ) : (
        /* Official Twitter Timeline Widget Embed */
        <div className="bg-stone-900 border-2 border-stone-800 rounded-3xl p-6 min-h-[550px] shadow-2xl">
          <div className="text-center py-2 mb-4 text-xs font-lalezar text-stone-300 flex items-center justify-center gap-2">
            <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>اتصال مستقیم ویجت توئیتر به https://x.com/RepublicofPanke</span>
          </div>

          <div className="w-full flex justify-center">
            <a
              className="twitter-timeline"
              data-theme="dark"
              data-height="700"
              data-chrome="noheader nofooter noborders transparent"
              href="https://x.com/RepublicofPanke"
            >
              در حال بارگذاری توئیت‌های زنده @RepublicofPanke از سرور توئیتر...
            </a>
          </div>
        </div>
      )}

      {/* Modal for Composing New Dispatch / Tweet */}
      {showComposeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-stone-900 border-2 border-amber-500/40 rounded-3xl w-full max-w-lg p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3.5 border-b border-stone-800">
              <h3 className="font-lalezar text-stone-100 text-lg flex items-center gap-2.5">
                <RepublicLogo size="sm" spinSpeed={1} />
                <span>صدور بیانیه رسمی جدید برای جمهوری پنکه</span>
              </h3>
              <button
                onClick={() => setShowComposeModal(false)}
                className="text-stone-400 hover:text-white text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleComposeSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block font-lalezar text-sm text-stone-300 mb-1.5">
                  متن بیانیه / توئیت:
                </label>
                <textarea
                  value={newTweetText}
                  onChange={(e) => setNewTweetText(e.target.value)}
                  rows={4}
                  required
                  placeholder="دستور ریاست وزش برای استقرار پنکه‌های دور ۳ در تمام اماکن عمومی..."
                  className="w-full bg-stone-950 border border-stone-800 focus:border-amber-500 rounded-2xl p-3.5 font-lalezar text-base text-stone-100 placeholder-stone-600 outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-lalezar text-xs text-stone-300 mb-1">
                    دسته‌بندی موضوعی:
                  </label>
                  <select
                    value={newTweetCategory}
                    onChange={(e) =>
                      setNewTweetCategory(e.target.value as TweetItem['category'])
                    }
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl p-2.5 font-lalezar text-xs text-stone-100 outline-none"
                  >
                    <option value="سیاسی">سیاسی و حکومتی</option>
                    <option value="هواشناسی و وزش">هواشناسی و نسیم</option>
                    <option value="اقتصادی">اقتصادی و برق</option>
                    <option value="اجتماعی">جامعه و فرهنگ</option>
                    <option value="بین‌الملل">بین‌الملل و کولرها</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="breakingToggle"
                    checked={isNewTweetBreaking}
                    onChange={(e) => setIsNewTweetBreaking(e.target.checked)}
                    className="accent-amber-500 w-4 h-4 cursor-pointer"
                  />
                  <label
                    htmlFor="breakingToggle"
                    className="font-lalezar text-xs text-stone-300 cursor-pointer"
                  >
                    علامت‌گذاری به عنوان «خبر فوری»
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setShowComposeModal(false)}
                  className="px-4 py-2 font-lalezar text-xs text-stone-400 hover:text-white"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-lalezar text-sm rounded-xl shadow-lg transition-colors"
                >
                  انتشار فوری در سایت و استودیو
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
