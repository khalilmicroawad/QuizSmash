import React from 'react';
import { User, BookOpen, Play, Sun, Moon, Zap, Globe, LogOut } from 'lucide-react';
import { UserProfile } from '../types/quiz';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  currentTab: 'play' | 'bank' | 'profile';
  onSelectTab: (tab: 'play' | 'bank' | 'profile') => void;
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
  const { toggleTheme, isDark } = useTheme();
  const { language, toggleLanguage, t, isRTL } = useLanguage();
  const { user, isUnlocked, isPermanent, isTrialActive, timeLeftFormatted, signOutUser } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-[#07131e]/95 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand wordmark - Chromic Orange + Ocean Blue */}
        <button
          type="button"
          onClick={() => onSelectTab('play')}
          className="flex items-center gap-2 text-base font-black tracking-tight text-slate-900 dark:text-white cursor-pointer hover:opacity-90 transition-opacity"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-sky-600 text-white shadow-sm shadow-orange-500/20">
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

        {/* Clean Nav Tabs */}
        {user && isUnlocked && (
          <nav className="hidden sm:flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
            <button
              type="button"
              onClick={() => onSelectTab('play')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'play'
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Play className="h-3.5 w-3.5" />
              <span>{t('navPlay')}</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectTab('bank')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'bank'
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>{t('navBank')}</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectTab('profile')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'profile'
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <User className="h-3.5 w-3.5" />
              <span>{t('navProfile')}</span>
            </button>
          </nav>
        )}

        {/* Right Action Controls: Language, Theme, Status & Sign Out */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Status Badge */}
          {user && (
            <div className="text-xs font-bold">
              {isPermanent ? (
                <span className="text-orange-600 dark:text-orange-400 bg-orange-500/10 px-2 py-1 rounded-lg border border-orange-500/20">
                  VIP
                </span>
              ) : isTrialActive ? (
                <span className="text-sky-600 dark:text-sky-400 bg-sky-500/10 px-2 py-1 rounded-lg border border-sky-500/20 font-mono text-[11px]">
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
            className="flex h-8 items-center gap-1 px-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-orange-500 transition-colors font-bold text-xs cursor-pointer"
          >
            <Globe className="h-3.5 w-3.5 text-sky-500 shrink-0" />
            <span>{language === 'en' ? 'العربية' : 'English'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? t('themeDarkTooltip') : t('themeLightTooltip')}
            title={isDark ? t('themeDarkTooltip') : t('themeLightTooltip')}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-orange-500 transition-colors cursor-pointer"
          >
            {isDark ? <Sun className="h-3.5 w-3.5 text-orange-400" /> : <Moon className="h-3.5 w-3.5 text-sky-600" />}
          </button>

          {/* Sign Out */}
          {user && (
            <button
              type="button"
              onClick={() => signOutUser()}
              title={isRTL ? 'تسجيل الخروج' : 'Sign Out'}
              aria-label={isRTL ? 'تسجيل الخروج' : 'Sign Out'}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile nav tabs */}
      {user && isUnlocked && (
        <div className="flex sm:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#07131e]/95 px-2 py-1 justify-around text-xs font-bold">
          <button
            type="button"
            onClick={() => onSelectTab('play')}
            className={`py-1.5 px-3 rounded-md transition-colors ${
              currentTab === 'play'
                ? 'text-orange-500 bg-orange-500/10'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            {t('navPlay')}
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('bank')}
            className={`py-1.5 px-3 rounded-md transition-colors ${
              currentTab === 'bank'
                ? 'text-orange-500 bg-orange-500/10'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            {t('navBank')}
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('profile')}
            className={`py-1.5 px-3 rounded-md transition-colors ${
              currentTab === 'profile'
                ? 'text-orange-500 bg-orange-500/10'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            {t('navProfile')}
          </button>
        </div>
      )}
    </header>
  );
};
