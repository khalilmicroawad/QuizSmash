import { GuestbookEntry, GuestbookCategory } from '../types/guestbook';

const GUESTBOOK_STORAGE_KEY = 'quiz_smash_guestbook_entries_v2';
const USER_REACTIONS_STORAGE_KEY = 'quiz_smash_guestbook_user_reactions_v2';

const SEED_ENTRIES: GuestbookEntry[] = [
  {
    id: 'seed-pin-khalil',
    authorName: 'د. خليل عواد (Dr. Khalil Awad)',
    authorRole: 'مؤسس المنصة واستشاري طب الأسنان',
    university: 'كلية طب الأسنان',
    avatarEmoji: '👨‍⚕️',
    badgeSticker: '🦷 مؤسس كويز سماش',
    message: 'أهلاً وسهلاً بجميع زملائي وأبنائي طلبة كليات طب الأسنان في العراق الحبيب. صُممت منصة كويز سماش لتكون رفيقكم الدائم في التفوق والنجاح في امتحانات الكورس الأول، واختصار مسافات الحفظ والفهم السريري. دعواتي لكم بالتألق الدائم!',
    category: 'motivation',
    timestamp: Date.now() - 3600000 * 24 * 3,
    reactions: { hearts: 142, thumbs: 98, teeth: 215, ideas: 76 },
    isPinned: true,
    accentColor: 'emerald',
  },
  {
    id: 'seed-2',
    authorName: 'د. يوسف حيدر',
    authorRole: 'طالب طب أسنان - مرحلة أولى',
    university: 'جامعة بغداد',
    avatarEmoji: '🦷',
    badgeSticker: '💡 نصيحة دراسية',
    message: 'نصيحة لإخواني بالمرحلة الأولى: تشريح الأسنان (Dental Anatomy) يعتمد على التخيل والـ Landmarks لكل سن. ارسموا الـ Cusp والـ Ridge وركزوا بأسئلة الـ Maxillary Incisors هنا بكويز سماش لأنها تتكرر دائماً بالامتحانات.',
    category: 'tips',
    timestamp: Date.now() - 3600000 * 18,
    reactions: { hearts: 54, thumbs: 39, teeth: 82, ideas: 64 },
    isPinned: false,
    accentColor: 'olive',
  },
  {
    id: 'seed-3',
    authorName: 'مريم علي الكعبي',
    authorRole: 'طالبة طب أسنان - دفعة 2026',
    university: 'الجامعة المستنصرية',
    avatarEmoji: '🌟',
    badgeSticker: '✨ طاقة إيجابية',
    message: 'كل خطوة بالدراسة والجهد الآن هي لبنة لبناء طبيب أسنان ماهر ومتميز بالمستقبل. لا تستصعبوا المواد الطبية، التقسيم والحل المستمر بالمنصة يسهل كل شيء!',
    category: 'motivation',
    timestamp: Date.now() - 3600000 * 12,
    reactions: { hearts: 88, thumbs: 45, teeth: 110, ideas: 32 },
    isPinned: false,
    accentColor: 'emerald',
  },
  {
    id: 'seed-4',
    authorName: 'كرار حسين',
    authorRole: 'ممثل المرحلة الأولى',
    university: 'جامعة بابل',
    avatarEmoji: '🎓',
    badgeSticker: '🎓 دفعة التحدي',
    message: 'تحية لدفعة طب الأسنان في بابل وكل جامعات العراق! تجربة الـ 7 أيام المجانية سمحت للجميع بتجربة كل بنوك الأسئلة للمواد السبعة. شكراً دكتور خليل على هذه المبادرة الرائعة.',
    category: 'batch',
    timestamp: Date.now() - 3600000 * 8,
    reactions: { hearts: 67, thumbs: 52, teeth: 74, ideas: 21 },
    isPinned: false,
    accentColor: 'olive',
  },
  {
    id: 'seed-5',
    authorName: 'زهراء أحمد الجبوري',
    authorRole: 'طالبة طب أسنان متميزة',
    university: 'جامعة الموصل',
    avatarEmoji: '🔬',
    badgeSticker: '💡 نصيحة دراسية',
    message: 'بالكيمياء الطبية والبيولوجي: ركزوا على الـ Enzyme Kinetics والـ Cell Membrane Transport. حل بنوك الأسئلة بعد كل محاضرة يثبت المعلومات بنسبة 90% بدون نسيان.',
    category: 'tips',
    timestamp: Date.now() - 3600000 * 5,
    reactions: { hearts: 41, thumbs: 33, teeth: 59, ideas: 48 },
    isPinned: false,
    accentColor: 'emerald',
  },
  {
    id: 'seed-6',
    authorName: 'مصطفى فراس البصري',
    authorRole: 'طالب طب أسنان - مرحلة أولى',
    university: 'جامعة البصرة',
    avatarEmoji: '⚡',
    badgeSticker: '🦷 أطباء المستقبل',
    message: 'من ثغر العراق الباسم إلى كل كليات طب الأسنان، فخورين بهذا المستوى التفاعلي. المؤقت 30 ثانية يعودنا على سرعة البديهة والتركيز مثل قاعة الامتحان بالضبط.',
    category: 'batch',
    timestamp: Date.now() - 3600000 * 2,
    reactions: { hearts: 53, thumbs: 37, teeth: 96, ideas: 19 },
    isPinned: false,
    accentColor: 'olive',
  },
];

export class GuestbookService {
  static getEntries(): GuestbookEntry[] {
    try {
      const stored = localStorage.getItem(GUESTBOOK_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Ignore
    }
    // Return seeds and persist
    this.saveEntries(SEED_ENTRIES);
    return SEED_ENTRIES;
  }

  static saveEntries(entries: GuestbookEntry[]): void {
    try {
      localStorage.setItem(GUESTBOOK_STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // Ignore
    }
  }

  static addEntry(params: {
    authorName: string;
    authorRole: string;
    university?: string;
    avatarEmoji: string;
    badgeSticker: string;
    message: string;
    category: GuestbookCategory;
    accentColor?: string;
  }): GuestbookEntry {
    const entries = this.getEntries();
    const newEntry: GuestbookEntry = {
      id: `gb_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      authorName: params.authorName.trim(),
      authorRole: params.authorRole.trim() || 'طالب طب أسنان',
      university: params.university?.trim() || 'كلية طب الأسنان',
      avatarEmoji: params.avatarEmoji || '🦷',
      badgeSticker: params.badgeSticker || '🦷 طبيب المستقبل',
      message: params.message.trim(),
      category: params.category || 'motivation',
      timestamp: Date.now(),
      reactions: { hearts: 1, thumbs: 1, teeth: 2, ideas: 1 },
      isPinned: false,
      accentColor: params.accentColor || 'emerald',
    };

    const updated = [newEntry, ...entries];
    this.saveEntries(updated);
    return newEntry;
  }

  static getUserReactions(): Record<string, Record<string, boolean>> {
    try {
      const stored = localStorage.getItem(USER_REACTIONS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Ignore
    }
    return {};
  }

  static saveUserReactions(reactions: Record<string, Record<string, boolean>>): void {
    try {
      localStorage.setItem(USER_REACTIONS_STORAGE_KEY, JSON.stringify(reactions));
    } catch {
      // Ignore
    }
  }

  static toggleReaction(
    entryId: string,
    reactionType: keyof GuestbookEntry['reactions']
  ): { updatedEntry: GuestbookEntry | null; hasReacted: boolean } {
    const entries = this.getEntries();
    const userReactions = this.getUserReactions();
    const entryIndex = entries.findIndex((e) => e.id === entryId);

    if (entryIndex === -1) {
      return { updatedEntry: null, hasReacted: false };
    }

    const entry = { ...entries[entryIndex] };
    const entryUserReactions = userReactions[entryId] || {};
    const currentlyReacted = Boolean(entryUserReactions[reactionType]);

    if (currentlyReacted) {
      entry.reactions[reactionType] = Math.max(0, (entry.reactions[reactionType] || 1) - 1);
      entryUserReactions[reactionType] = false;
    } else {
      entry.reactions[reactionType] = (entry.reactions[reactionType] || 0) + 1;
      entryUserReactions[reactionType] = true;
    }

    entries[entryIndex] = entry;
    userReactions[entryId] = entryUserReactions;

    this.saveEntries(entries);
    this.saveUserReactions(userReactions);

    return { updatedEntry: entry, hasReacted: !currentlyReacted };
  }

  static resetToDefaults(): GuestbookEntry[] {
    this.saveEntries(SEED_ENTRIES);
    return SEED_ENTRIES;
  }
}
