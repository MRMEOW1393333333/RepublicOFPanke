import { TweetItem, NewsHeadline } from '../types/panke';

const INITIAL_TWEETS: TweetItem[] = [
  {
    id: 'tweet-1',
    text: 'بیانیه شماره ۴۰۱۰ کاخ ریاست وزش: با توجه به موج گرمای سراسری، کلیه پنکه‌های میهن موظفند به دور ۳ ارتقا یافته و در حالت نوسان ۱۸۰ درجه مستقر شوند. مقاومت در برابر نسیم جرم است!',
    author: 'جمهوری پنکه',
    handle: 'RepublicofPanke',
    createdAt: '۲۵ دقیقه پیش',
    likes: 12450,
    retweets: 3820,
    replies: 512,
    isPinned: true,
    isBreaking: true,
    category: 'سیاسی',
    tag: '#فرمان_ملی_وزش',
    sourceUrl: 'https://x.com/RepublicofPanke',
    imageUrl: '/src/assets/images/news_presidential_podium_1791304549219.jpg',
  },
  {
    id: 'tweet-2',
    text: 'سازمان ملی سنجش پره‌ها اعلام کرد: انجام تست گفتن «آآآآآآآآآآ» در فاصله ۱۰ سانتی‌متری پره‌ها برای تمام متقاضیان گذرنامه پنکه‌ای الزامی است تا میزان طنین لرزش صدای شهروندی سنجیده شود.',
    author: 'جمهوری پنکه',
    handle: 'RepublicofPanke',
    createdAt: '۱ ساعت پیش',
    likes: 8930,
    retweets: 2140,
    replies: 420,
    isBreaking: true,
    category: 'اجتماعی',
    tag: '#فرهنگ_پنکه‌ای',
    sourceUrl: 'https://x.com/RepublicofPanke',
    imageUrl: '/official_flag.jpg',
  },
  {
    id: 'tweet-3',
    text: 'هشدار امنیتی پنکه اینترنشنال: گزارش‌ها حاکی از نفوذ مخفیانه کولرهای گازی متجاوز با گرید انرژی F به مرزهای خنکی است. پدافند پنکه‌های ایستاده پایه‌بلند پارس خزر در حالت آماده‌باش سرخ قرار گرفت.',
    author: 'جمهوری پنکه',
    handle: 'RepublicofPanke',
    createdAt: '۳ ساعت پیش',
    likes: 7120,
    retweets: 1840,
    replies: 310,
    isBreaking: true,
    category: 'بین‌الملل',
    tag: '#پدافند_پره‌ها',
    sourceUrl: 'https://x.com/RepublicofPanke',
    imageUrl: '/src/assets/images/news_fan_defense_1791304563103.jpg',
  },
  {
    id: 'tweet-4',
    text: 'بانک مرکزی جمهوری پنکه: ارزش برابری هر دور در دقیقه (RPM) در بازار آزاد نسیم به ۲۴۰۰ وات-ساعت رسید. سرمایه‌گذاری در پنکه‌های سه‌پره رومیزی بدون لرزش موتور به شهروندان توصیه می‌گردد.',
    author: 'جمهوری پنکه',
    handle: 'RepublicofPanke',
    createdAt: '۵ ساعت پیش',
    likes: 5410,
    retweets: 990,
    replies: 185,
    isBreaking: false,
    category: 'اقتصادی',
    tag: '#بورس_نسیم',
    sourceUrl: 'https://x.com/RepublicofPanke',
    imageUrl: '/src/assets/images/news_gold_vault_1791304613835.jpg',
  },
  {
    id: 'tweet-5',
    text: 'پیام مهم به ملت شریف: کولر گازی نماد اشرافیت برودتی و قبض‌های نجومی است! پنکه رفیق گرمابه و گلستان، وفادار در قطعی برق و آرامش‌بخش روزهای نداری است. پره‌ها هرگز تسلیم نمی‌شوند.',
    author: 'جمهوری پنکه',
    handle: 'RepublicofPanke',
    createdAt: '۸ ساعت پیش',
    likes: 14890,
    retweets: 4720,
    replies: 890,
    isBreaking: false,
    category: 'سیاسی',
    tag: '#نه_به_کولرگازی',
    sourceUrl: 'https://x.com/RepublicofPanke',
    imageUrl: '/src/assets/images/news_presidential_podium_1791304549219.jpg',
  },
  {
    id: 'tweet-6',
    text: 'سازمان هواشناسی و وزش: تا پایان هفته در اکثر استان‌ها شاهد نسیم مطبوع با شاخص خنکی ۳ ستاره خواهیم بود. از قرار دادن گردن به مدت طولانی در مسیر مستقیم دور ۳ خودداری کنید.',
    author: 'جمهوری پنکه',
    handle: 'RepublicofPanke',
    createdAt: 'دیروز',
    likes: 4210,
    retweets: 730,
    replies: 142,
    isBreaking: false,
    category: 'هواشناسی و وزش',
    tag: '#پیش_بینی_باد',
    sourceUrl: 'https://x.com/RepublicofPanke',
    imageUrl: '/src/assets/images/news_weather_breeze_1791304576300.jpg',
  },
  {
    id: 'tweet-7',
    text: 'قوه قضاییه جمهوری پنکه: پرتاب خودکار، کاغذ مچاله یا قاشق چای‌خوری به داخل توری محافظ پنکه مصداق خرابکاری در صنایع سنگین وزش بوده و مرتکب به ۳ روز محرومیت از باد مستقیم محکوم می‌شود.',
    author: 'جمهوری پنکه',
    handle: 'RepublicofPanke',
    createdAt: '۲ روز پیش',
    likes: 11200,
    retweets: 3200,
    replies: 620,
    isBreaking: false,
    category: 'اجتماعی',
    tag: '#قانون_توری',
    sourceUrl: 'https://x.com/RepublicofPanke',
    imageUrl: '/src/assets/images/news_fan_defense_1791304563103.jpg',
  },
  {
    id: 'tweet-8',
    text: 'دیپلماسی نسیم: مذاکرات صلح‌آمیز جمهوری پنکه با هیئت عالی‌رتبه بادبزن‌های حصیری جنوب کشور با موفقیت به پایان رسید و قرارداد تبادل هوای خنک امضا گردید.',
    author: 'جمهوری پنکه',
    handle: 'RepublicofPanke',
    createdAt: '۳ روز پیش',
    likes: 6730,
    retweets: 1210,
    replies: 210,
    isBreaking: false,
    category: 'بین‌الملل',
    tag: '#دیپلماسی_بادبزن',
    sourceUrl: 'https://x.com/RepublicofPanke',
    imageUrl: '/official_flag.jpg',
  },
];

const LOCAL_STORAGE_KEY = 'republic_of_panke_tweets_v3';
const LAST_SYNC_KEY = 'republic_of_panke_last_sync_v3';

export const getSavedTweets = (): TweetItem[] => {
  if (typeof window === 'undefined') return INITIAL_TWEETS;
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Failed to read saved tweets:', e);
  }
  return INITIAL_TWEETS;
};

export const saveTweets = (tweets: TweetItem[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tweets));
  } catch (e) {
    console.warn('Failed to save tweets:', e);
  }
};

export const getLastSyncTime = (): string => {
  if (typeof window === 'undefined') return 'هم‌اکنون';
  return localStorage.getItem(LAST_SYNC_KEY) || 'چند لحظه پیش';
};

export const setLastSyncTime = (time: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LAST_SYNC_KEY, time);
};

// Convert Tweet into a Breaking News Headline for Panke International
export const tweetToNewsHeadline = (tweet: TweetItem): NewsHeadline => {
  const urgency = tweet.isBreaking ? 'فوری' : tweet.isPinned ? 'عاجل' : 'زنده';
  return {
    id: `news-${tweet.id}`,
    urgency,
    title: tweet.text.length > 85 ? tweet.text.slice(0, 85) + '...' : tweet.text,
    details: tweet.text,
    source: `@RepublicofPanke (${tweet.author})`,
    timestamp: tweet.createdAt,
    category: tweet.category,
    readCount: tweet.likes + tweet.retweets,
  };
};

// Generate fresh syndicated tweets on user sync request
const DYNAMIC_DISPATCH_POOL = [
  'وزارت صنعت پنکه: طرح جایگزینی پنکه‌های قدیمی با مدل‌های ۵ پره فوق‌بی‌صدا با سوبسید نسیمی آغاز شد.',
  'فوری: شورای نگهبان وزش تایید کرد: تنظیم درجه پنکه روی عدد ۱ در گرمای بالای ۳۵ درجه خلاف عرف است.',
  'سازمان حمایت از مصرف‌کنندگان باد: قیمت دولتی تافت مو جهت مقابله با اثرات باد شدید پنکه ابلاغ شد.',
  'دیدار صمیمانه وزرای خارجه جمهوری پنکه و کولرهای آبی: ائتلاف تاریخی خنکی بدون گاز فرئون تشکیل گردید.',
  'سخنگوی دولت پنکه: تمامی شایعات مربوط به کمبود روغن موتور محورهای گردان تکذیب می‌شود. انبارها پر است.',
];

export const simulateSyncWithAccount = async (
  currentTweets: TweetItem[]
): Promise<{ newTweets: TweetItem[]; addedCount: number }> => {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Determine if we should generate an updated live dispatch
  const existingTexts = new Set(currentTweets.map((t) => t.text));
  const candidate = DYNAMIC_DISPATCH_POOL.find((text) => !existingTexts.has(text));

  let updatedList = [...currentTweets];
  let added = 0;

  if (candidate) {
    const newTweet: TweetItem = {
      id: `tweet-live-${Date.now()}`,
      text: candidate,
      author: 'جمهوری پنکه',
      handle: 'RepublicofPanke',
      createdAt: 'همین الان',
      likes: Math.floor(Math.random() * 2000) + 1500,
      retweets: Math.floor(Math.random() * 800) + 400,
      replies: Math.floor(Math.random() * 150) + 50,
      isBreaking: true,
      category: 'سیاسی',
      tag: '#خبر_فوری_پنکه',
      sourceUrl: 'https://x.com/RepublicofPanke',
    };
    updatedList = [newTweet, ...currentTweets];
    added = 1;
  } else {
    // If all candidates present, increment engagement stats to show live activity
    updatedList = currentTweets.map((t, idx) =>
      idx < 3
        ? {
            ...t,
            likes: t.likes + Math.floor(Math.random() * 15) + 3,
            retweets: t.retweets + Math.floor(Math.random() * 5) + 1,
          }
        : t
    );
  }

  const nowTime = new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
  setLastSyncTime(`امروز ساعت ${nowTime}`);
  saveTweets(updatedList);

  return { newTweets: updatedList, addedCount: added };
};

export const addCustomTweet = (
  text: string,
  category: TweetItem['category'] = 'سیاسی',
  isBreaking = false,
  currentTweets: TweetItem[]
): TweetItem[] => {
  const newTweet: TweetItem = {
    id: `tweet-custom-${Date.now()}`,
    text,
    author: 'جمهوری پنکه',
    handle: 'RepublicofPanke',
    createdAt: 'لحظاتی پیش',
    likes: 1,
    retweets: 0,
    replies: 0,
    isBreaking,
    category,
    tag: '#بیانیه_ملی',
    sourceUrl: 'https://x.com/RepublicofPanke',
  };

  const updated = [newTweet, ...currentTweets];
  saveTweets(updated);
  return updated;
};
