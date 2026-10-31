import React from 'react';
import { User, Play, Zap, Globe, LogOut, GraduationCap } from 'lucide-react';
import { UserProfile } from '../types/quiz';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

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
  const { user, isUnlocked, isPermanent, isTrialActive, timeLeftFormatted, signOutUser } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-slate-200 bg-white/95 backdrop-blur-md transition-colors shadow-xs">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand wordmark with glossy orange rounded icon */}
        <button
          type="button"
          onClick={() => onSelectTab('subjects')}
          className="flex items-center gap-2 text-base font-black tracking-tight text-slate-900 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600 border border-orange-500 border-t-orange-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_2px_6px_rgba(249,115,22,0.3)] text-white">
            <Zap className="h-4 w-4 fill-white" />
          </div>
          <span>
            {isRTL ? (
              <>كويز <span className="text-orange-500">سماش</span></>
            ) : (
              <>Quiz <span className="text-orange-500">Smash</span></>
            )}
          </span>
        </button>

        {/* Clean Nav Tabs with Orange Glossy Rounded active state (Simplified: Dental Faculty, Play, Profile) */}
        {user && isUnlocked && (
          <nav className="hidden sm:flex items-center gap-1.5 p-1 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-bold">
            <button
              type="button"
              onClick={() => onSelectTab('subjects')}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'subjects'
                  ? 'btn-glossy-orange'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <GraduationCap className="h-3.5 w-3.5" />
              <span>{isRTL ? 'المواد (المرحلة الأولى)' : 'Dental Faculty'}</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectTab('play')}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'play'
                  ? 'btn-glossy-orange'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Play className="h-3.5 w-3.5" />
              <span>{t('navPlay')}</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectTab('profile')}
              className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'profile'
                  ? 'btn-glossy-orange'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <User className="h-3.5 w-3.5" />
              <span>{t('navProfile')}</span>
            </button>
          </nav>
        )}

        {/* Right Action Controls: Language, Status & Sign Out (No Day/Night Switcher) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Status Badge */}
          {user && (
            <div className="text-xs font-bold">
              {isPermanent ? (
                <span className="text-white bg-gradient-to-b from-orange-400 to-orange-600 px-2.5 py-1 rounded-xl shadow-xs border border-orange-500 font-extrabold text-[11px]">
                  VIP
                </span>
              ) : isTrialActive ? (
                <span className="text-sky-700 bg-sky-50 px-2.5 py-1 rounded-xl border border-sky-200 font-mono text-[11px] font-bold">
                  {timeLeftFormatted}
                </span>
              ) : null}
            </div>
          )}

          {/* Language Switcher */}
          <button
            type="button"
            onClick={toggleLanguage}
            title={t('switchLangTooltip')}
            aria-label={t('switchLangTooltip')}
            className="flex h-8 items-center gap-1 px-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:border-orange-400 hover:text-orange-500 transition-colors font-bold text-xs cursor-pointer shadow-xs"
          >
            <Globe className="h-3.5 w-3.5 text-sky-500 shrink-0" />
            <span>{language === 'en' ? 'العربية' : 'English'}</span>
          </button>

          {/* Sign Out */}
          {user && (
            <button
              type="button"
              onClick={() => signOutUser()}
              title={isRTL ? 'تسجيل الخروج' : 'Sign Out'}
              aria-label={isRTL ? 'تسجيل الخروج' : 'Sign Out'}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-rose-500 hover:border-rose-300 transition-colors cursor-pointer shadow-xs"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile nav tabs */}
      {user && isUnlocked && (
        <div className="flex sm:hidden border-t-2 border-slate-200 bg-white px-3 py-1.5 justify-around text-xs font-bold">
          <button
            type="button"
            onClick={() => onSelectTab('subjects')}
            className={`py-1.5 px-3 rounded-xl transition-all flex items-center gap-1.5 ${
              currentTab === 'subjects'
                ? 'btn-glossy-orange'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="h-3.5 w-3.5" />
            <span>{isRTL ? 'المواد' : 'Subjects'}</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('play')}
            className={`py-1.5 px-3 rounded-xl transition-all flex items-center gap-1.5 ${
              currentTab === 'play'
                ? 'btn-glossy-orange'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Play className="h-3.5 w-3.5" />
            <span>{t('navPlay')}</span>
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('profile')}
            className={`py-1.5 px-3 rounded-xl transition-all flex items-center gap-1.5 ${
              currentTab === 'profile'
                ? 'btn-glossy-orange'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="h-3.5 w-3.5" />
            <span>{t('navProfile')}</span>
          </button>
        </div>
      )}
    </header>
  );
};
