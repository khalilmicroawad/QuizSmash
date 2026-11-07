export type GuestbookCategory = 'all' | 'tips' | 'motivation' | 'batch';

export interface GuestbookReactions {
  hearts: number;
  thumbs: number;
  teeth: number;
  ideas: number;
}

export interface GuestbookEntry {
  id: string;
  authorName: string;
  authorRole: string;
  university?: string;
  avatarEmoji: string;
  badgeSticker: string;
  message: string;
  category: GuestbookCategory;
  timestamp: number;
  reactions: GuestbookReactions;
  isPinned?: boolean;
  accentColor?: string;
}
