import React, { useState } from 'react';
import { User, Play, Zap, Globe, LogOut, GraduationCap, Shield } from 'lucide-react';
import { UserProfile } from '../types/quiz';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { AdminCodesPortal, ADMIN_EMAIL } from './AdminCodesPortal';

interface HeaderProps {
  currentTab: 'subjects' | 'play' | 'profile' | 'bank';
  onSelectTab: (tab: 'subjects' | 'play' | 'profile' | 'bank') => void;
  activeProfile?: UserProfile;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
  isQuizActive?: boolean;
  onQuickStart?: () => void;
  onOpenInstallModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
}) => {
  const { language, toggleLanguage, t, isRTL } = useLanguage();
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const {
    user,
    isUnlocked,
    isPermanent,
    isTrialActive,
    timeLeftFormatted,
    usedLogins,
    maxLogins,
    remainingAttempts,
    accessedCount,
    maxAttempts,
    signOutUser,
  } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-[#FAF9F6]/95 backdrop-blur-md transition-colors shadow-xs">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand wordmark with clean rounded icon */}
        <button
          type="button"
          onClick={() => onSelectTab('subjects')}
          className="flex items-center gap-2 text-base font-black tracking-tight text-slate-900 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <img
            src="/assets/aistudio/icon_9d2c6e5c.png"
            alt="Quiz Smash Logo"
            className="h-8 w-8 rounded-xl object-contain shadow-xs border border-emerald-200"
          />
          <span>
            {isRTL ? (
              <>كويز <span className="text-emerald-600">سماش</span></>
            ) : (
              <>Quiz <span className="text-emerald-600">Smash</span></>
            )}
          </span>
        </button>

        {/* Clean Nav Tabs with Glossy Emerald / Olive buttons - No button text */}
        {user && isUnlocked && (
          <nav className="hidden sm:flex items-center gap-2 p-1.5 bg-[#F2F5ED] rounded-2xl border border-[#D9E2CE]">
            <button
              type="button"
              onClick={() => onSelectTab('subjects')}
              title={isRTL ? 'المواد' : 'Subjects'}
              aria-label={isRTL ? 'المواد' : 'Subjects'}
              className={`w-10 h-9 rounded-xl transition-all flex items-center justify-center cursor-pointer ${
                currentTab === 'subjects'
                  ? 'btn-glossy-emerald text-white'
                  : 'text-emerald-700 hover:text-emerald-900 hover:bg-white'
              }`}
            >
              <GraduationCap className={`h-5 w-5 ${currentTab === 'subjects' ? 'text-white' : 'text-emerald-600'}`} />
            </button>

            <button
              type="button"
              onClick={() => onSelectTab('play')}
              title={t('navPlay')}
              aria-label={t('navPlay')}
              className={`w-10 h-9 rounded-xl transition-all flex items-center justify-center cursor-pointer ${
                currentTab === 'play'
                  ? 'btn-glossy-emerald text-white'
                  : 'text-purple-700 hover:text-purple-900 hover:bg-white'
              }`}
            >
              <Play className={`h-4 w-4 fill-current ${currentTab === 'play' ? 'text-white' : 'text-purple-600'}`} />
            </button>

            <button
              type="button"
              onClick={() => onSelectTab('profile')}
              title={t('navProfile')}
              aria-label={t('navProfile')}
              className={`w-10 h-9 rounded-xl transition-all flex items-center justify-center cursor-pointer ${
                currentTab === 'profile'
                  ? 'btn-glossy-emerald text-white'
                  : 'text-sky-700 hover:text-sky-900 hover:bg-white'
              }`}
            >
              <User className={`h-5 w-5 ${currentTab === 'profile' ? 'text-white' : 'text-sky-600'}`} />
            </button>
          </nav>
        )}

        {/* Right Action Controls: Language, Service Usage Counter, Status & Sign Out */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Service Usage Counter Badge (Olive / Emerald) */}
          {user && (
            <div className="flex items-center gap-1.5">
              <span
                title={isRTL ? `المحاولات المتبقية: ${remainingAttempts} من ${maxAttempts}` : `Remaining Attempts: ${remainingAttempts} of ${maxAttempts}`}
                className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 shadow-xs"
              >
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                <span>
                  {isRTL
                    ? `${remainingAttempts} محاولة متبقية`
                    : `${remainingAttempts} Attempts Left`}
                </span>
              </span>

              {isTrialActive && (
                <span className="text-[#3E5022] bg-[#F2F5ED] px-2.5 py-1 rounded-xl border border-[#D9E2CE] font-mono text-[11px] font-bold">
                  {timeLeftFormatted}
                </span>
              )}
            </div>
          )}

          {/* Owner Codes Portal (Strictly visible only for dr.khalil.awad@gmail.com) - Icon Only */}
          {user && user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() && (
            <button
              type="button"
              onClick={() => setIsAdminOpen(true)}
              title={isRTL ? 'مستودع الأكواد (المالك د. خليل)' : 'Owner Codes Bank'}
              aria-label={isRTL ? 'مستودع الأكواد (المالك د. خليل)' : 'Owner Codes Bank'}
              className="flex h-9 w-9 items-center justify-center rounded-xl btn-glossy-olive cursor-pointer shadow-xs"
            >
              <Shield className="h-4 w-4 text-amber-300" />
            </button>
          )}

          {/* Language Switcher - Icon Only */}
          <button
            type="button"
            onClick={toggleLanguage}
            title={t('switchLangTooltip')}
            aria-label={t('switchLangTooltip')}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#D9E2CE] bg-white text-[#4D5D28] hover:border-emerald-500 hover:text-emerald-700 transition-colors cursor-pointer shadow-xs"
          >
            <Globe className="h-4 w-4 text-sky-500 shrink-0" />
          </button>

          {/* Sign Out - Icon Only */}
          {user && isUnlocked && (
            <button
              type="button"
              onClick={() => signOutUser()}
              title={isRTL ? 'تسجيل الخروج' : 'Sign Out'}
              aria-label={isRTL ? 'تسجيل الخروج' : 'Sign Out'}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-rose-200 bg-rose-50/60 text-rose-500 hover:text-rose-600 hover:bg-rose-100 hover:border-rose-300 transition-colors cursor-pointer shadow-xs"
            >
              <LogOut className="h-4 w-4 text-rose-500" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile nav tabs - Icon Only */}
      {user && isUnlocked && (
        <div className="flex sm:hidden border-t border-[#D9E2CE] bg-white px-3 py-2 justify-around">
          <button
            type="button"
            onClick={() => onSelectTab('subjects')}
            title={isRTL ? 'المواد' : 'Subjects'}
            aria-label={isRTL ? 'المواد' : 'Subjects'}
            className={`w-11 h-9 rounded-xl flex items-center justify-center transition-all ${
              currentTab === 'subjects'
                ? 'btn-glossy-emerald text-white'
                : 'text-emerald-600 hover:text-emerald-800'
            }`}
          >
            <GraduationCap className={`h-5 w-5 ${currentTab === 'subjects' ? 'text-white' : 'text-emerald-600'}`} />
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('play')}
            title={t('navPlay')}
            aria-label={t('navPlay')}
            className={`w-11 h-9 rounded-xl flex items-center justify-center transition-all ${
              currentTab === 'play'
                ? 'btn-glossy-emerald text-white'
                : 'text-purple-600 hover:text-purple-800'
            }`}
          >
            <Play className={`h-4 w-4 fill-current ${currentTab === 'play' ? 'text-white' : 'text-purple-600'}`} />
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('profile')}
            title={t('navProfile')}
            aria-label={t('navProfile')}
            className={`w-11 h-9 rounded-xl flex items-center justify-center transition-all ${
              currentTab === 'profile'
                ? 'btn-glossy-emerald text-white'
                : 'text-sky-600 hover:text-sky-800'
            }`}
          >
            <User className={`h-5 w-5 ${currentTab === 'profile' ? 'text-white' : 'text-sky-600'}`} />
          </button>
        </div>
      )}

      {/* Owner Private Code Bank Modal */}
      <AdminCodesPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </header>
  );
};
