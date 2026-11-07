import React, { useState } from 'react';
import { Zap, Timer, Users, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { DigitalAnimatedGuestCounter } from './DigitalAnimatedGuestCounter';

export const BottomStatusBar: React.FC = () => {
  const {
    user,
    isUnlocked,
    isTrialActive,
    timeLeftFormatted,
    remainingAttempts,
    maxAttempts,
  } = useAuth();
  const { isRTL } = useLanguage();
  const [isCounterModalOpen, setIsCounterModalOpen] = useState(false);

  return (
    <>
      <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#D9E2CE] bg-[#FAF9F6]/95 backdrop-blur-md shadow-sm py-2 px-3 sm:px-6">
        <div className="mx-auto max-w-5xl flex items-center justify-between sm:justify-center gap-2 sm:gap-6">
          {/* 1. ICONS & BADGE OF NUMBER OF ATTEMPTS */}
          {user && (
            <div
              title={
                isRTL
                  ? `المحاولات المتبقية: ${remainingAttempts} من ${maxAttempts}`
                  : `Remaining Attempts: ${remainingAttempts} of ${maxAttempts}`
              }
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 shadow-2xs font-mono text-xs font-bold shrink-0"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-400 shrink-0" />
              <span className="font-black text-emerald-700">{remainingAttempts}</span>
              <span className="text-emerald-400 font-normal">/</span>
              <span className="text-emerald-600 font-normal">{maxAttempts}</span>
            </div>
          )}

          {/* 2. TRIAL PERIOD (7-DAY COUNTDOWN) */}
          {user && isTrialActive && (
            <div
              title={
                isRTL
                  ? `فترة التجربة المجانية (7 أيام) - الوقت المتبقي: ${timeLeftFormatted}`
                  : `7-Day Free Trial - Time Left: ${timeLeftFormatted}`
              }
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#F2F5ED] border border-[#D9E2CE] text-[#3E5022] shadow-2xs font-mono text-xs font-bold shrink-0"
            >
              <Timer className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{timeLeftFormatted}</span>
            </div>
          )}

          {/* 3. GUEST COUNTER (STARTS AT 1 AND GOES UP) */}
          <div className="shrink-0">
            <DigitalAnimatedGuestCounter
              variant="badge"
              onOpenModal={() => setIsCounterModalOpen(true)}
            />
          </div>
        </div>
      </footer>

      {/* Guest Counter Modal if clicked from bottom */}
      <DigitalAnimatedGuestCounter
        variant="modal"
        isOpen={isCounterModalOpen}
        onClose={() => setIsCounterModalOpen(false)}
      />
    </>
  );
};
