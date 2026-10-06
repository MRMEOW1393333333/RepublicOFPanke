export interface TweetItem {
  id: string;
  text: string;
  author: string;
  handle: string;
  createdAt: string;
  likes: number;
  retweets: number;
  replies: number;
  isPinned?: boolean;
  isBreaking?: boolean;
  category: 'سیاسی' | 'هواشناسی و وزش' | 'اقتصادی' | 'اجتماعی' | 'بین‌الملل';
  tag?: string;
  sourceUrl?: string;
  imageUrl?: string;
}

export interface NewsHeadline {
  id: string;
  urgency: 'عاجل' | 'فوری' | 'اختصاصی' | 'زنده';
  title: string;
  details: string;
  source: string;
  timestamp: string;
  category: string;
  readCount: number;
}

export type FanSpeed = 0 | 1 | 2 | 3;

export interface CitizenCard {
  nationalCode: string;
  fullName: string;
  fanModel: string;
  speedChoice: 'دور ۱ (نسیم)' | 'دور ۲ (متعادل)' | 'دور ۳ (توربو)';
  hometown: string;
  issueDate: string;
  photoUrl?: string;
}
