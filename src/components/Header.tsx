import React from 'react';
import { Volume2, VolumeX, User, Award, BookOpen, Play, Sun, Moon, Zap, Globe, Smartphone, LogOut } from 'lucide-react';
import { UserProfile } from '../types/quiz';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  currentTab: 'play' | 'bank' | 'profile';
  onSelectTab: (tab: 'play' | 'bank' | 'profile') => void;
  activeProfile: UserProfile;
  soundEnabled: boolean;
  onToggleSound: () => void;
  isQuizActive: boolean;
  onQuickStart: () => void;
  onOpenInstallModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  activeProfile,
  soundEnabled,
  onToggleSound,
  isQuizActive,
  onQuickStart,
  onOpenInstallModal,
}) => {
  const { toggleTheme, isDark } = useTheme();
  const { language, toggleLanguage, t, isRTL } = useLanguage();
  const { user, isUnlocked, isPermanent, isTrialActive, timeLeftFormatted, testFastForwardExpired, lockApp, signOutUser } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-sky-950/30 dark:border-slate-800/80 bg-white/95 dark:bg-[#07131e]/95 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 lg:px-8">
        {/* Brand wordmark - Chromic Orange + Ocean Blue */}
        <button
          onClick={() => onSelectTab('play')}
          className="flex items-center gap-2.5 text-left text-lg font-black tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 via-amber-500 to-sky-600 font-black text-white shadow-md shadow-orange-500/25">
            <Zap className="h-5 w-5 fill-white" />
          </div>
          <span className="tracking-tight">
            {isRTL ? (
              <>كويز <span className="text-orange-500 dark:text-orange-400">سماش</span></>
            ) : (
              <>Quiz <span className="text-orange-500 dark:text-orange-400">Smash</span></>
            )}
          </span>
        </button>

        {/* Clean & Simple navigation links */}
        {user && isUnlocked && (
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <button
              onClick={() => onSelectTab('play')}
              className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                currentTab === 'play'
                  ? 'text-orange-500 dark:text-orange-400 font-extrabold'
                  : 'hover:text-sky-600 dark:hover:text-sky-400'
              }`}
            >
              <Play className="h-4 w-4" />
              <span>{t('navPlay')}</span>
            </button>

            <button
              onClick={() => onSelectTab('bank')}
              className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                currentTab === 'bank'
                  ? 'text-orange-500 dark:text-orange-400 font-extrabold'
                  : 'hover:text-sky-600 dark:hover:text-sky-400'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>{t('navBank')}</span>
            </button>

            <button
              onClick={() => onSelectTab('profile')}
              className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                currentTab === 'profile'
                  ? 'text-orange-500 dark:text-orange-400 font-extrabold'
                  : 'hover:text-sky-600 dark:hover:text-sky-400'
              }`}
            >
              <User className="h-4 w-4" />
              <span>{t('navProfile')}</span>
            </button>
          </nav>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Mobile APK / Install */}
          {onOpenInstallModal && (
            <button
              type="button"
              onClick={onOpenInstallModal}
              title={t('installOnPhone')}
              aria-label={t('installOnPhone')}
              className="flex h-9 items-center gap-1.5 px-2.5 sm:px-3 rounded-xl border border-sky-500/30 bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 hover:bg-sky-100 dark:hover:bg-sky-900/60 transition-all font-bold text-xs"
            >
              <Smartphone className="h-4 w-4 text-sky-600 dark:text-sky-400 shrink-0" />
              <span className="hidden sm:inline">{t('installOnPhone')}</span>
              <span className="sm:hidden font-mono">APK</span>
            </button>
          )}

          {/* Simple Prominent Language Switcher (Ocean Blue pill) */}
          <button
            type="button"
            onClick={toggleLanguage}
            title={t('switchLangTooltip')}
            aria-label={t('switchLangTooltip')}
            className="flex h-9 items-center gap-1.5 px-3 rounded-xl border border-sky-400/30 bg-sky-50/80 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 hover:border-orange-400 hover:text-orange-500 transition-all shadow-xs font-bold text-xs"
          >
            <Globe className="h-4 w-4 text-sky-500 shrink-0" />
            <span>{language === 'en' ? 'العربية' : 'English'}</span>
          </button>

          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? t('themeDarkTooltip') : t('themeLightTooltip')}
            title={isDark ? t('themeDarkTooltip') : t('themeLightTooltip')}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
          >
            {isDark ? <Sun className="h-4 w-4 text-orange-400" /> : <Moon className="h-4 w-4 text-sky-600" />}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? t('soundOnTooltip') : t('soundOffTooltip')}
            title={soundEnabled ? t('soundOnTooltip') : t('soundOffTooltip')}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4 text-orange-500" />
            ) : (
              <VolumeX className="h-4 w-4 text-slate-400" />
            )}
          </button>

          {/* Authenticated User Status Badges */}
          {user ? (
            <div className="flex items-center gap-1.5">
              {isPermanent ? (
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/40 text-orange-600 dark:text-orange-400 font-extrabold text-[11px] shadow-sm">
                  <span>⭐ VIP دائم</span>
                </div>
              ) : isTrialActive ? (
                <div
                  className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/40 text-sky-600 dark:text-sky-400 font-bold text-[11px] shadow-sm"
                  title="24-Hour Free Trial Remaining"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                  <span>⏳ {timeLeftFormatted}</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 font-bold text-[11px]">
                  <span>🔒 20,000 IQD</span>
                </div>
              )}

              {/* Test Expire Button for previewing the paywall */}
              {isTrialActive && (
                <button
                  type="button"
                  onClick={testFastForwardExpired}
                  title="Expire 24h trial to preview paywall"
                  className="hidden lg:flex items-center px-1.5 py-0.5 text-[10px] rounded border border-slate-300 dark:border-slate-700 text-slate-500 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                >
                  ⚡ فحص
                </button>
              )}

              {/* User Email Pill */}
              <div
                className="flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-900/60"
                title={user.email || ''}
              >
                <div className="h-6 w-6 rounded-lg bg-gradient-to-tr from-sky-600 to-blue-700 flex items-center justify-center text-xs font-bold text-white">
                  {(user.email?.charAt(0) || 'G').toUpperCase()}
                </div>
                <span className="hidden sm:inline text-xs font-bold text-slate-800 dark:text-slate-200 max-w-[90px] truncate">
                  {user.email?.split('@')[0]}
                </span>
              </div>

              {/* Sign Out Button */}
              <button
                type="button"
                onClick={() => signOutUser()}
                title={isRTL ? 'تسجيل الخروج' : 'Sign Out'}
                aria-label={isRTL ? 'تسجيل الخروج' : 'Sign Out'}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-400 hover:text-rose-500 hover:border-rose-300 dark:hover:border-rose-900 transition-colors cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-600 dark:text-orange-400 text-xs font-bold">
              <span>Gmail Auth</span>
            </div>
          )}

          {!isQuizActive && (
            <button
              onClick={onQuickStart}
              className="px-3.5 sm:px-4 py-2 text-xs font-black text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-95 transition-all shadow-md shadow-orange-500/25 rounded-xl whitespace-nowrap shrink-0"
            >
              {t('quickStart')}
            </button>
          )}
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="flex md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#07131e]/95 px-2 py-1 justify-around text-xs">
        <button
          onClick={() => onSelectTab('play')}
          className={`py-2 px-3 rounded-lg transition-colors font-bold ${
            currentTab === 'play'
              ? 'text-orange-500 dark:text-orange-400 bg-orange-500/10'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          {t('navPlay')}
        </button>
        <button
          onClick={() => onSelectTab('bank')}
          className={`py-2 px-3 rounded-lg transition-colors font-bold ${
            currentTab === 'bank'
              ? 'text-orange-500 dark:text-orange-400 bg-orange-500/10'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          {t('navBank')}
        </button>
        <button
          onClick={() => onSelectTab('profile')}
          className={`py-2 px-3 rounded-lg transition-colors font-bold ${
            currentTab === 'profile'
              ? 'text-orange-500 dark:text-orange-400 bg-orange-500/10'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          {t('navProfile')}
        </button>
        {onOpenInstallModal && (
          <button
            onClick={onOpenInstallModal}
            className="py-2 px-2.5 rounded-lg font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1"
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span>APK</span>
          </button>
        )}
      </div>
    </header>
  );
};
