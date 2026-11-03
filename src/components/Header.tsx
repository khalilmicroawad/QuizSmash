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
    signOutUser,
  } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-[#FAF9F6]/95 backdrop-blur-md transition-colors shadow-xs">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand wordmark with glossy orange rounded icon */}
        <button
          type="button"
          onClick={() => onSelectTab('subjects')}
          className="flex items-center gap-2 text-base font-black tracking-tight text-slate-900 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <img
            src="/assets/aistudio/icon_9d2c6e5c.png"
            alt="Quiz Smash Logo"
            className="h-8 w-8 rounded-xl object-contain shadow-xs border border-orange-200"
          />
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

        {/* Right Action Controls: Language, Service Usage Counter, Status & Sign Out */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Service Usage Counter Badge */}
          {user && (
            <div className="flex items-center gap-1.5">
              <span
                title={isRTL ? `استخدام الخدمة: ${usedLogins} من ${maxLogins}` : `Service Usage: ${usedLogins} of ${maxLogins}`}
                className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-xl bg-orange-50 border border-orange-200 text-orange-700 shadow-xs"
              >
                <Zap className="w-3 h-3 text-orange-500 fill-orange-500" />
                <span>
                  {isRTL
                    ? `${usedLogins}/${maxLogins} دخول`
                    : `${usedLogins}/${maxLogins} Logins`}
                </span>
              </span>

              {/* Status Badge (VIP button removed) */}
              {isTrialActive && (
                <span className="text-sky-700 bg-sky-50 px-2.5 py-1 rounded-xl border border-sky-200 font-mono text-[11px] font-bold">
                  {timeLeftFormatted}
                </span>
              )}
            </div>
          )}

          {/* Owner Codes Portal (Strictly visible only for dr.khalil.awad@gmail.com) */}
          {user && user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() && (
            <button
              type="button"
              onClick={() => setIsAdminOpen(true)}
              title={isRTL ? 'مستودع الأكواد (المالك د. خليل)' : 'Owner Codes Bank'}
              className="flex h-8 items-center gap-1.5 px-2.5 rounded-xl bg-slate-900 text-amber-400 border border-slate-700 hover:bg-slate-800 transition-colors font-bold text-xs cursor-pointer shadow-xs"
            >
              <Shield className="h-3.5 w-3.5 text-amber-400" />
              <span className="hidden sm:inline">{isRTL ? 'أكواد المالك' : 'Owner Codes'}</span>
            </button>
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

          {/* Sign Out (Visible in header when unlocked; on PaywallView it is down of the page) */}
          {user && isUnlocked && (
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

      {/* Owner Private Code Bank Modal */}
      <AdminCodesPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </header>
  );
};
