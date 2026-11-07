import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Users,
  Sparkles,
  Award,
  Share2,
  RefreshCw,
  X,
  Check,
  GraduationCap,
} from 'lucide-react';
import { VisitorCounterService, VisitorInfo } from '../services/visitorCounterService';
import { useLanguage } from '../context/LanguageContext';

interface DigitalAnimatedGuestCounterProps {
  variant?: 'card' | 'badge' | 'modal';
  isOpen?: boolean;
  onClose?: () => void;
  onOpenModal?: () => void;
}

export const DigitalAnimatedGuestCounter: React.FC<DigitalAnimatedGuestCounterProps> = ({
  variant = 'card',
  isOpen = false,
  onClose,
  onOpenModal,
}) => {
  const { isRTL } = useLanguage();
  const [visitorInfo, setVisitorInfo] = useState<VisitorInfo | null>(null);
  const [displayNumber, setDisplayNumber] = useState<number>(0);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const info = VisitorCounterService.getVisitorInfo();
    setVisitorInfo(info);

    // Smooth count-up animation
    const target = info.visitorNumber;
    const start = Math.max(0, target - 25);
    setDisplayNumber(start);

    let current = start;
    const stepTime = 35;
    const timer = setInterval(() => {
      current += 1;
      if (current >= target) {
        setDisplayNumber(target);
        clearInterval(timer);
        if (info.isFirstVisit) {
          try {
            confetti({
              particleCount: 45,
              spread: 60,
              origin: { y: 0.6 },
              colors: ['#556B2F', '#059669', '#10b981', '#f59e0b'],
            });
          } catch {
            // Ignore
          }
        }
      } else {
        setDisplayNumber(current);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const handleCelebrate = () => {
    try {
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#556B2F', '#059669', '#10b981', '#f59e0b', '#3b82f6'],
      });
    } catch {
      // Ignore
    }
  };

  const handleShare = () => {
    const num = visitorInfo?.visitorNumber || displayNumber;
    const text = isRTL
      ? `أنا الزائر رقم #${num.toLocaleString()} في منصة كويز سماش لطلبة طب الأسنان! 🦷🎓`
      : `I am visitor #${num.toLocaleString()} on Quiz Smash Dental Platform! 🦷🎓`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const visitorNumber = visitorInfo?.visitorNumber || displayNumber;
  const digits = visitorNumber.toString().split('');

  // 1. COMPACT BADGE (For Bottom Status Bar)
  if (variant === 'badge') {
    return (
      <div
        title={
          isRTL
            ? `أنت الزائر رقم #${visitorNumber.toLocaleString()}`
            : `You are visitor #${visitorNumber.toLocaleString()}`
        }
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-gradient-to-r from-emerald-50 via-[#F2F5ED] to-emerald-50 border border-emerald-300 text-emerald-900 shadow-xs text-xs font-bold font-mono"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
        </span>
        <Users className="w-3.5 h-3.5 text-emerald-700" />
        <span className="font-black text-emerald-800">#{displayNumber.toLocaleString()}</span>
        {onOpenModal && (
          <button
            type="button"
            onClick={onOpenModal}
            title={isRTL ? 'عرض تفاصيل عداد الزوار' : 'View Visitor Counter Details'}
            aria-label={isRTL ? 'عرض تفاصيل عداد الزوار' : 'View Visitor Counter Details'}
            className="w-5 h-5 rounded-md btn-glossy-emerald text-white flex items-center justify-center cursor-pointer shadow-2xs transition-transform active:scale-95"
          >
            <Sparkles className="w-3 h-3 text-amber-300" />
          </button>
        )}
      </div>
    );
  }

  // 2. MODAL DIALOG
  if (variant === 'modal') {
    if (!isOpen) return null;

    return (
      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm select-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="w-full max-w-md bg-white rounded-3xl border-2 border-emerald-500/40 shadow-2xl p-6 relative overflow-hidden text-slate-900 text-center"
          >
            {/* Top Close Button - Icon Only */}
            <div className="flex justify-end mb-2">
              <button
                type="button"
                onClick={onClose}
                title={isRTL ? 'إغلاق عداد الزوار' : 'Close Counter'}
                aria-label={isRTL ? 'إغلاق عداد الزوار' : 'Close Counter'}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Icon Header */}
            <div className="mx-auto w-14 h-14 rounded-2xl btn-glossy-emerald text-white flex items-center justify-center shadow-md mb-3">
              <Users className="w-7 h-7" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F2F5ED] text-[#4D5D28] text-[11px] font-bold border border-[#D9E2CE] mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{isRTL ? 'عداد الزوار الرقمي المباشر' : 'Live Digital Guest Counter'}</span>
            </div>

            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              {isRTL ? 'أنت الزائر رقم' : 'You Are Visitor Number'}
            </h3>

            {/* ODOMETER / FLIP DIGITS */}
            <div className="my-5 flex items-center justify-center gap-1.5 sm:gap-2">
              <div className="w-9 sm:w-11 h-12 sm:h-14 rounded-xl bg-gradient-to-b from-[#556B2F] to-[#4D5D28] text-white font-mono font-black text-xl sm:text-2xl flex items-center justify-center shadow-md border-b-2 border-emerald-800">
                #
              </div>
              {digits.map((digit, idx) => (
                <motion.div
                  key={`${digit}-${idx}`}
                  initial={{ y: -10, opacity: 0.8 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                  className="w-9 sm:w-11 h-12 sm:h-14 rounded-xl bg-gradient-to-b from-white via-[#F2F5ED] to-[#E6ECDC] border-2 border-emerald-500/50 text-emerald-900 font-mono font-black text-xl sm:text-2xl flex items-center justify-center shadow-md"
                >
                  {digit}
                </motion.div>
              ))}
            </div>

            <p className="text-xs text-[#556B2F] leading-relaxed mb-4 max-w-xs mx-auto">
              {isRTL
                ? 'أهلاً بك في منصة كويز سماش لطلبة كليات طب الأسنان في العراق! رقمك محفوظ في سجل زوار المنصة.'
                : 'Welcome to Quiz Smash for Iraqi Dental Faculty Students! Your visitor number is recorded.'}
            </p>

            {/* ACTION BUTTONS - ICON ONLY WITH TITLE & ARIA-LABEL */}
            <div className="flex items-center justify-center gap-2 pt-2 border-t border-[#D9E2CE]">
              <button
                type="button"
                onClick={handleCelebrate}
                title={isRTL ? 'احتفال بالرقم' : 'Celebrate'}
                aria-label={isRTL ? 'احتفال بالرقم' : 'Celebrate'}
                className="w-11 h-10 rounded-xl btn-glossy-emerald text-white flex items-center justify-center cursor-pointer shadow-md transition-transform active:scale-95"
              >
                <Sparkles className="w-5 h-5 text-amber-300" />
              </button>

              <button
                type="button"
                onClick={handleShare}
                title={
                  isCopied
                    ? isRTL
                      ? 'تم النسخ بنجاح!'
                      : 'Copied!'
                    : isRTL
                    ? 'نسخ ومشاركة رقم الزائر'
                    : 'Share Visitor Number'
                }
                aria-label={
                  isCopied
                    ? isRTL
                      ? 'تم النسخ بنجاح!'
                      : 'Copied!'
                    : isRTL
                    ? 'نسخ ومشاركة رقم الزائر'
                    : 'Share Visitor Number'
                }
                className="w-11 h-10 rounded-xl btn-glossy-olive text-white flex items-center justify-center cursor-pointer shadow-md transition-transform active:scale-95"
              >
                {isCopied ? <Check className="w-5 h-5 text-white" /> : <Share2 className="w-5 h-5 text-white" />}
              </button>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }

  // 3. FULL CARD (For DentalFacultyHub & AccessGate)
  return (
    <div className="mb-6 rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-50/80 via-[#F2F5ED] to-white p-4 sm:p-5 shadow-xs relative overflow-hidden text-slate-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left / Info */}
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-12 h-12 rounded-2xl btn-glossy-emerald text-white flex items-center justify-center shadow-md shrink-0">
            <Users className="w-6 h-6" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black border border-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                <span>{isRTL ? 'عداد الزوار الرقمي' : 'Digital Guest Counter'}</span>
              </span>
              <span className="text-[10px] text-[#4D5D28] font-bold">
                🦷 {isRTL ? 'مجتمع طب الأسنان' : 'Dental Community'}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              <span>{isRTL ? 'أنت الزائر رقم' : 'You are guest number'}</span>
              <span className="text-emerald-700 font-mono">#{displayNumber.toLocaleString()}</span>
            </h3>

            <p className="text-[11px] text-[#556B2F] leading-snug">
              {isRTL
                ? 'تم تسجيل زيارتك لمنصة كويز سماش المخصصة لطلبة كليات طب الأسنان في العراق'
                : 'Your visit is recorded on Quiz Smash platform for Iraqi dental faculty students'}
            </p>
          </div>
        </div>

        {/* Right / Odometer Display & Action Buttons */}
        <div className="flex items-center justify-between sm:justify-end gap-3 self-center sm:self-auto w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#D9E2CE]">
          {/* DIGITAL DIGITS REEL */}
          <div className="flex items-center gap-1 font-mono">
            <div className="w-7 h-9 rounded-lg bg-[#556B2F] text-white font-black text-sm flex items-center justify-center shadow-xs">
              #
            </div>
            {digits.map((digit, i) => (
              <div
                key={`${digit}-${i}`}
                className="w-7 h-9 rounded-lg bg-white border border-emerald-300 text-emerald-900 font-black text-base flex items-center justify-center shadow-xs"
              >
                {digit}
              </div>
            ))}
          </div>

          {/* ICON-ONLY BUTTONS (ZERO BUTTON TEXT) */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleCelebrate}
              title={isRTL ? 'احتفال وتأثيرات بالرقم' : 'Celebrate'}
              aria-label={isRTL ? 'احتفال وتأثيرات بالرقم' : 'Celebrate'}
              className="w-9 h-9 rounded-xl btn-glossy-emerald text-white flex items-center justify-center cursor-pointer shadow-xs transition-transform active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
            </button>

            <button
              type="button"
              onClick={handleShare}
              title={
                isCopied
                  ? isRTL
                    ? 'تم النسخ!'
                    : 'Copied!'
                  : isRTL
                  ? 'نسخ ومشاركة رقم الزائر'
                  : 'Share Visitor Number'
              }
              aria-label={
                isCopied
                  ? isRTL
                    ? 'تم النسخ!'
                    : 'Copied!'
                  : isRTL
                  ? 'نسخ ومشاركة رقم الزائر'
                  : 'Share Visitor Number'
              }
              className="w-9 h-9 rounded-xl btn-glossy-olive text-white flex items-center justify-center cursor-pointer shadow-xs transition-transform active:scale-95"
            >
              {isCopied ? <Check className="w-4 h-4 text-white" /> : <Share2 className="w-4 h-4 text-white" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
