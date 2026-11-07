import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  BookOpen,
  X,
  Plus,
  Heart,
  ThumbsUp,
  Sparkles,
  Send,
  Pin,
  MessageSquare,
  GraduationCap,
  Lightbulb,
  Award,
  Flame,
  Check,
  Search,
  RotateCcw,
} from 'lucide-react';
import { GuestbookEntry, GuestbookCategory } from '../types/guestbook';
import { GuestbookService } from '../services/guestbookService';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

interface DigitalAnimatedGuestbookProps {
  isOpen: boolean;
  onClose: () => void;
}

const AVATARS = ['🦷', '👨‍⚕️', '👩‍⚕️', '🌟', '🔬', '⚡', '🎓', '🏆', '💎', '🩺'];
const BADGE_STICKERS = [
  '🦷 طبيب المستقبل',
  '💡 نصيحة دراسية',
  '✨ طاقة إيجابية',
  '🎓 دفعة التحدي',
  '🔬 شغف علمي',
  '🔥 همة عالية',
  '🥇 المركز الأول',
];

export const DigitalAnimatedGuestbook: React.FC<DigitalAnimatedGuestbookProps> = ({
  isOpen,
  onClose,
}) => {
  const { isRTL } = useLanguage();
  const { user } = useAuth();

  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<GuestbookCategory>('all');
  const [userReactions, setUserReactions] = useState<Record<string, Record<string, boolean>>>({});
  const [isSigningOpen, setIsSigningOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [authorName, setAuthorName] = useState(
    user?.user_metadata?.full_name || user?.email?.split('@')[0] || ''
  );
  const [authorRole, setAuthorRole] = useState('طالب طب أسنان - مرحلة أولى');
  const [university, setUniversity] = useState('كلية طب الأسنان');
  const [selectedAvatar, setSelectedAvatar] = useState('🦷');
  const [selectedBadge, setSelectedBadge] = useState('🦷 طبيب المستقبل');
  const [messageText, setMessageText] = useState('');
  const [formCategory, setFormCategory] = useState<GuestbookCategory>('motivation');
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = () => {
    const data = GuestbookService.getEntries();
    setEntries(data);
    setUserReactions(GuestbookService.getUserReactions());
  };

  const handleToggleReaction = (entryId: string, reactionType: keyof GuestbookEntry['reactions']) => {
    const res = GuestbookService.toggleReaction(entryId, reactionType);
    if (res.updatedEntry) {
      setEntries((prev) =>
        prev.map((item) => (item.id === entryId ? res.updatedEntry! : item))
      );
      setUserReactions(GuestbookService.getUserReactions());
      if (res.hasReacted) {
        confetti({
          particleCount: 20,
          spread: 40,
          origin: { y: 0.7 },
          colors: ['#556B2F', '#10b981', '#f59e0b', '#3b82f6'],
        });
      }
    }
  };

  const handleSignGuestbook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const newEntry = GuestbookService.addEntry({
      authorName: authorName.trim() || 'طالب كويز سماش',
      authorRole: authorRole.trim() || 'طالب طب أسنان',
      university: university.trim() || 'كلية طب الأسنان',
      avatarEmoji: selectedAvatar,
      badgeSticker: selectedBadge,
      message: messageText.trim(),
      category: formCategory,
      accentColor: formCategory === 'tips' ? 'olive' : 'emerald',
    });

    setEntries([newEntry, ...entries]);
    setMessageText('');
    setFormSuccess(true);

    // Big festive confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#556B2F', '#059669', '#10b981', '#f59e0b', '#ec4899'],
      });
    } catch {
      // Ignore
    }

    setTimeout(() => {
      setFormSuccess(false);
      setIsSigningOpen(false);
    }, 1200);
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesCategory =
      selectedCategory === 'all' ? true : entry.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === ''
        ? true
        : entry.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entry.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (entry.university && entry.university.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const formatDate = (timestamp: number) => {
    try {
      return new Intl.DateTimeFormat(isRTL ? 'ar-IQ' : 'en-GB', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(timestamp));
    } catch {
      return new Date(timestamp).toLocaleDateString();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-hidden select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl border border-[#D9E2CE] shadow-2xl flex flex-col overflow-hidden text-slate-900"
        >
          {/* TOP BAR / HEADER */}
          <div className="p-4 sm:p-5 border-b border-[#D9E2CE] bg-[#FAF9F6] flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl btn-glossy-emerald text-white flex items-center justify-center shadow-md shrink-0">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-black text-slate-900">
                    {isRTL ? 'سجل الزوار الرقمي التفاعلي' : 'Digital Animated Guestbook'}
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300">
                    {entries.length} {isRTL ? 'توقيع' : 'Signatures'}
                  </span>
                </div>
                <p className="text-xs text-[#556B2F]">
                  {isRTL
                    ? 'رسائل تحفيز، نصائح دراسية، ومشاركات أطباء أسنان المستقبل في العراق'
                    : 'Encouraging words, study tips, and thoughts from Iraqi dental students'}
                </p>
              </div>
            </div>

            {/* ACTION CONTROLS - ICON ONLY */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsSigningOpen(!isSigningOpen)}
                title={isSigningOpen ? (isRTL ? 'إلغاء التوقيع' : 'Cancel Sign') : (isRTL ? 'أضف توقيعك ورسالتك' : 'Sign Guestbook')}
                aria-label={isSigningOpen ? (isRTL ? 'إلغاء التوقيع' : 'Cancel Sign') : (isRTL ? 'أضف توقيعك ورسالتك' : 'Sign Guestbook')}
                className={`w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer shadow-xs transition-transform active:scale-95 ${
                  isSigningOpen
                    ? 'bg-rose-50 border border-rose-200 text-rose-600'
                    : 'btn-glossy-emerald text-white'
                }`}
              >
                {isSigningOpen ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </button>

              <button
                type="button"
                onClick={onClose}
                title={isRTL ? 'إغلاق السجل' : 'Close Guestbook'}
                aria-label={isRTL ? 'إغلاق السجل' : 'Close Guestbook'}
                className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 flex items-center justify-center cursor-pointer transition-colors shadow-xs"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* SIGNING DRAWER / ACCORDION */}
          <AnimatePresence>
            {isSigningOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden border-b border-[#D9E2CE] bg-gradient-to-br from-[#F2F5ED] via-white to-[#FAF9F6] p-4 sm:p-5 shrink-0"
              >
                <form onSubmit={handleSignGuestbook} className="space-y-3 max-w-2xl mx-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-[#4D5D28] mb-1">
                        {isRTL ? 'اسمك الكريم:' : 'Your Name:'}
                      </label>
                      <input
                        type="text"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        placeholder={isRTL ? 'د. الاسم الكامل' : 'Dr. Full Name'}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#D9E2CE] bg-white text-slate-900 font-bold focus:outline-none focus:border-emerald-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#4D5D28] mb-1">
                        {isRTL ? 'الجامعة / الكلية:' : 'University:'}
                      </label>
                      <input
                        type="text"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        placeholder={isRTL ? 'جامعة بغداد، بابل، المستنصرية...' : 'College of Dentistry'}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#D9E2CE] bg-white text-slate-900 focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#4D5D28] mb-1">
                        {isRTL ? 'التصنيف:' : 'Category:'}
                      </label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value as GuestbookCategory)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-[#D9E2CE] bg-white text-slate-900 font-bold focus:outline-none focus:border-emerald-500"
                      >
                        <option value="motivation">{isRTL ? '🌟 تحفيز ودعوات' : 'Motivation'}</option>
                        <option value="tips">{isRTL ? '💡 نصيحة دراسية' : 'Study Tip'}</option>
                        <option value="batch">{isRTL ? '🎓 ذكريات الدفعة' : 'Batch Memory'}</option>
                      </select>
                    </div>
                  </div>

                  {/* AVATAR & STICKER PICKER */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div>
                      <span className="block text-[10px] font-bold text-[#4D5D28] mb-1">
                        {isRTL ? 'اختر الأيقونة الرمزية:' : 'Choose Avatar:'}
                      </span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {AVATARS.map((emoji) => (
                          <button
                            key={emoji}
                            type="button"
                            onClick={() => setSelectedAvatar(emoji)}
                            title={emoji}
                            aria-label={emoji}
                            className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm cursor-pointer transition-transform ${
                              selectedAvatar === emoji
                                ? 'bg-emerald-600 text-white shadow-xs scale-110'
                                : 'bg-white border border-[#D9E2CE] hover:bg-[#F2F5ED]'
                            }`}
                          >
                            <span>{emoji}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="block text-[10px] font-bold text-[#4D5D28] mb-1">
                        {isRTL ? 'وسام المشاركة:' : 'Sticker Badge:'}
                      </span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {BADGE_STICKERS.slice(0, 4).map((badge) => (
                          <button
                            key={badge}
                            type="button"
                            onClick={() => setSelectedBadge(badge)}
                            title={badge}
                            aria-label={badge}
                            className={`px-2 py-1 rounded-xl text-[10px] font-bold cursor-pointer transition-colors ${
                              selectedBadge === badge
                                ? 'btn-glossy-olive text-white shadow-xs'
                                : 'bg-white border border-[#D9E2CE] text-slate-700 hover:bg-[#F2F5ED]'
                            }`}
                          >
                            <span>{badge}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* MESSAGE TEXTAREA */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#4D5D28] mb-1">
                      {isRTL ? 'رسالتك أو نصيحتك لزملائك في طب الأسنان:' : 'Your message or study tip:'}
                    </label>
                    <textarea
                      rows={2}
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder={isRTL ? 'اكتب كلمة طيبة، نصيحة لدراسة المواد، أو دعوة بالتوفيق للجميع...' : 'Write an encouraging message or tip...'}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#D9E2CE] bg-white text-slate-900 focus:outline-none focus:border-emerald-500 leading-relaxed"
                      required
                    />
                  </div>

                  {/* SUBMIT BUTTON - ICON ONLY WITH TITLE & ARIA-LABEL */}
                  <div className="flex items-center justify-end gap-2 pt-1">
                    {formSuccess ? (
                      <span className="text-xs font-bold text-emerald-800 flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-300">
                        <Check className="w-4 h-4 text-emerald-600" />
                        {isRTL ? 'تم تسجيل توقيعك بنجاح!' : 'Signature added!'}
                      </span>
                    ) : null}

                    <button
                      type="submit"
                      disabled={!messageText.trim()}
                      title={isRTL ? 'نشر التوقيع والرسالة في سجل الزوار' : 'Post Signature to Guestbook'}
                      aria-label={isRTL ? 'نشر التوقيع والرسالة في سجل الزوار' : 'Post Signature to Guestbook'}
                      className="w-12 h-10 rounded-xl btn-glossy-emerald text-white flex items-center justify-center cursor-pointer shadow-md disabled:opacity-40 transition-transform active:scale-95"
                    >
                      <Send className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SEARCH & CATEGORY FILTERS - ICON-ONLY BUTTONS WITH TITLE & ARIA-LABEL */}
          <div className="px-4 py-3 bg-[#FAF9F6] border-b border-[#D9E2CE] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            {/* Filter Buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-[#F2F5ED] rounded-2xl border border-[#D9E2CE] w-full sm:w-auto justify-center">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                title={isRTL ? 'عرض جميع المشاركات' : 'View All Entries'}
                aria-label={isRTL ? 'عرض جميع المشاركات' : 'View All Entries'}
                className={`w-9 h-8 rounded-xl flex items-center justify-center cursor-pointer transition-all ${
                  selectedCategory === 'all'
                    ? 'btn-glossy-emerald text-white shadow-xs'
                    : 'text-[#4D5D28] hover:bg-white'
                }`}
              >
                <Sparkles className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setSelectedCategory('tips')}
                title={isRTL ? 'نصائح دراسية' : 'Study Tips'}
                aria-label={isRTL ? 'نصائح دراسية' : 'Study Tips'}
                className={`w-9 h-8 rounded-xl flex items-center justify-center cursor-pointer transition-all ${
                  selectedCategory === 'tips'
                    ? 'btn-glossy-emerald text-white shadow-xs'
                    : 'text-[#4D5D28] hover:bg-white'
                }`}
              >
                <Lightbulb className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setSelectedCategory('motivation')}
                title={isRTL ? 'تحفيز ودعوات' : 'Motivation'}
                aria-label={isRTL ? 'تحفيز ودعوات' : 'Motivation'}
                className={`w-9 h-8 rounded-xl flex items-center justify-center cursor-pointer transition-all ${
                  selectedCategory === 'motivation'
                    ? 'btn-glossy-emerald text-white shadow-xs'
                    : 'text-[#4D5D28] hover:bg-white'
                }`}
              >
                <Flame className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setSelectedCategory('batch')}
                title={isRTL ? 'دفعة طب الأسنان' : 'Dental Batch'}
                aria-label={isRTL ? 'دفعة طب الأسنان' : 'Dental Batch'}
                className={`w-9 h-8 rounded-xl flex items-center justify-center cursor-pointer transition-all ${
                  selectedCategory === 'batch'
                    ? 'btn-glossy-emerald text-white shadow-xs'
                    : 'text-[#4D5D28] hover:bg-white'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Search */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isRTL ? 'بحث بالاسم أو الجامعة...' : 'Search entries...'}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-[#D9E2CE] bg-white text-slate-900 focus:outline-none focus:border-emerald-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* GUESTBOOK CARDS LIST (ANIMATED GRID) */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 bg-gradient-to-b from-white via-[#FAF9F6] to-[#F2F5ED]">
            {filteredEntries.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <MessageSquare className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                <p className="text-xs font-bold text-slate-500">
                  {isRTL ? 'لا توجد مشاركات مطابقة للبحث' : 'No entries found'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredEntries.map((entry, index) => {
                  const isPinned = Boolean(entry.isPinned);
                  const entryReactions = userReactions[entry.id] || {};

                  return (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: Math.min(index * 0.04, 0.4) }}
                      className={`rounded-2xl p-4 transition-shadow relative overflow-hidden flex flex-col justify-between ${
                        isPinned
                          ? 'border-2 border-emerald-500 bg-gradient-to-br from-emerald-50/90 via-[#F2F5ED] to-white shadow-md'
                          : 'border border-[#D9E2CE] bg-white hover:border-emerald-400/80 shadow-xs hover:shadow-sm'
                      }`}
                    >
                      {/* Pinned Marker */}
                      {isPinned && (
                        <div className="absolute top-2.5 left-2.5 rtl:left-auto rtl:right-2.5 flex items-center gap-1 text-[10px] font-black text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-300 shadow-xs">
                          <Pin className="w-3 h-3 text-emerald-700" />
                          <span>{isRTL ? 'مثبت' : 'Pinned'}</span>
                        </div>
                      )}

                      {/* Top Author Metadata */}
                      <div className={`flex items-start gap-2.5 mb-2.5 ${isPinned ? 'pt-5 sm:pt-0' : ''}`}>
                        <div className="w-10 h-10 rounded-2xl bg-[#F2F5ED] border border-[#D9E2CE] flex items-center justify-center text-xl shrink-0 shadow-xs">
                          {entry.avatarEmoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h3 className="text-xs font-black text-slate-900 truncate">
                              {entry.authorName}
                            </h3>
                            <span className="text-[10px] font-bold px-2 py-0.2 rounded-md bg-[#F2F5ED] text-[#4D5D28] border border-[#D9E2CE]">
                              {entry.badgeSticker}
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-500 flex items-center gap-2 mt-0.5">
                            <span>{entry.university}</span>
                            <span>•</span>
                            <span className="font-mono">{formatDate(entry.timestamp)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Message Content */}
                      <p className="text-xs text-slate-700 leading-relaxed my-2 whitespace-pre-wrap font-sans">
                        {entry.message}
                      </p>

                      {/* Interactive Emoji Reactions Bar - ICON-ONLY BUTTONS WITH COUNTERS */}
                      <div className="pt-2.5 border-t border-[#EAEFE2] flex items-center justify-between gap-1 mt-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {/* Heart Reaction */}
                          <button
                            type="button"
                            onClick={() => handleToggleReaction(entry.id, 'hearts')}
                            title={isRTL ? 'إعجاب (قلب)' : 'Heart'}
                            aria-label={isRTL ? 'إعجاب (قلب)' : 'Heart'}
                            className={`px-2 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-transform active:scale-90 ${
                              entryReactions.hearts
                                ? 'bg-rose-100 text-rose-700 border border-rose-300 shadow-xs scale-105'
                                : 'bg-[#F2F5ED] hover:bg-rose-50 text-slate-600 border border-[#D9E2CE]'
                            }`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${entryReactions.hearts ? 'fill-rose-500 text-rose-500' : 'text-slate-500'}`} />
                            <span className="font-mono text-[10px]">{entry.reactions.hearts || 0}</span>
                          </button>

                          {/* Tooth Reaction (Dental Pride) */}
                          <button
                            type="button"
                            onClick={() => handleToggleReaction(entry.id, 'teeth')}
                            title={isRTL ? 'فخر طب الأسنان' : 'Dental Pride'}
                            aria-label={isRTL ? 'فخر طب الأسنان' : 'Dental Pride'}
                            className={`px-2 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-transform active:scale-90 ${
                              entryReactions.teeth
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs scale-105'
                                : 'bg-[#F2F5ED] hover:bg-emerald-50 text-slate-600 border border-[#D9E2CE]'
                            }`}
                          >
                            <span className="text-xs">🦷</span>
                            <span className="font-mono text-[10px]">{entry.reactions.teeth || 0}</span>
                          </button>

                          {/* Lightbulb Reaction (Study Tip) */}
                          <button
                            type="button"
                            onClick={() => handleToggleReaction(entry.id, 'ideas')}
                            title={isRTL ? 'فكرة ممتازة' : 'Great Idea'}
                            aria-label={isRTL ? 'فكرة ممتازة' : 'Great Idea'}
                            className={`px-2 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-transform active:scale-90 ${
                              entryReactions.ideas
                                ? 'bg-amber-100 text-amber-800 border border-amber-300 shadow-xs scale-105'
                                : 'bg-[#F2F5ED] hover:bg-amber-50 text-slate-600 border border-[#D9E2CE]'
                            }`}
                          >
                            <Lightbulb className={`w-3.5 h-3.5 ${entryReactions.ideas ? 'fill-amber-400 text-amber-600' : 'text-slate-500'}`} />
                            <span className="font-mono text-[10px]">{entry.reactions.ideas || 0}</span>
                          </button>

                          {/* Thumbs Up Reaction */}
                          <button
                            type="button"
                            onClick={() => handleToggleReaction(entry.id, 'thumbs')}
                            title={isRTL ? 'أحسنت' : 'Thumbs Up'}
                            aria-label={isRTL ? 'أحسنت' : 'Thumbs Up'}
                            className={`px-2 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-transform active:scale-90 ${
                              entryReactions.thumbs
                                ? 'bg-blue-100 text-blue-800 border border-blue-300 shadow-xs scale-105'
                                : 'bg-[#F2F5ED] hover:bg-blue-50 text-slate-600 border border-[#D9E2CE]'
                            }`}
                          >
                            <ThumbsUp className={`w-3.5 h-3.5 ${entryReactions.thumbs ? 'fill-blue-500 text-blue-500' : 'text-slate-500'}`} />
                            <span className="font-mono text-[10px]">{entry.reactions.thumbs || 0}</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* BOTTOM CONTROLS BAR */}
          <div className="p-3 bg-[#FAF9F6] border-t border-[#D9E2CE] flex items-center justify-between gap-3 text-xs shrink-0">
            <span className="text-[11px] text-[#4D5D28] font-bold">
              {isRTL
                ? 'كويز سماش • مجتمع طلبة طب الأسنان في العراق'
                : 'Quiz Smash • Iraqi Dental Students Community'}
            </span>

            <button
              type="button"
              onClick={() => setIsSigningOpen(true)}
              title={isRTL ? 'أضف توقيعك ورسالتك الآن' : 'Sign Now'}
              aria-label={isRTL ? 'أضف توقيعك ورسالتك الآن' : 'Sign Now'}
              className="w-9 h-9 rounded-xl btn-glossy-emerald text-white flex items-center justify-center cursor-pointer shadow-xs transition-transform active:scale-95"
            >
              <Plus className="w-5 h-5 text-white" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
