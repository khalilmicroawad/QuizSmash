import React from 'react';
import {
  Trophy,
  Flame,
  Target,
  Play,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Zap,
  Calendar,
  ShieldCheck,
  Shield,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { UserProfile } from '../types/quiz';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { AdminCodesPortal, ADMIN_EMAIL } from './AdminCodesPortal';

interface ProfileViewProps {
  activeProfile: UserProfile;
  onProfileUpdated: () => void;
  onStartQuiz: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  activeProfile,
  onStartQuiz,
}) => {
  const { t, isRTL } = useLanguage();
  const [isAdminOpen, setIsAdminOpen] = React.useState(false);
  const {
    user,
    isPermanent,
    isTrialActive,
    hasSubscription,
    timeLeftFormatted,
    usedLogins,
    maxLogins,
    remainingLogins,
    remainingAttempts,
    accessedCount,
    maxAttempts,
  } = useAuth();

  const totalAnswered = activeProfile.totalCorrect + activeProfile.totalWrong;
  const overallAccuracy =
    totalAnswered > 0 ? Math.round((activeProfile.totalCorrect / totalAnswered) * 100) : 0;

  // Chart data from recent history
  const chartData = (activeProfile.history || []).slice(-8).map((att, idx) => {
    const date = new Date(att.timestamp);
    const label = `${date.getMonth() + 1}/${date.getDate()}`;
    return {
      attempt: `#${idx + 1}`,
      date: label,
      score: att.score,
      correct: att.correctCount,
      wrong: (att.wrongCount || 0) + (att.timedOutCount || 0),
      accuracy: att.accuracyPercent,
    };
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      {/* SECTION 1: USER OVERVIEW CARD */}
      <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="h-12 w-12 rounded-2xl btn-glossy-emerald flex items-center justify-center font-bold text-white text-lg shadow-xs shrink-0">
              {(user?.user_metadata?.first_name?.charAt(0) || user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || activeProfile.username.charAt(0) || 'U').toUpperCase()}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900">
                  {user?.user_metadata?.full_name || activeProfile.username || user?.email?.split('@')[0]}
                </h1>
                {hasSubscription ? (
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-xl border border-emerald-200">
                    {isRTL ? 'اشتراك 100 دخول' : '100-Login Subscription'}
                  </span>
                ) : isPermanent ? (
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-xl border border-emerald-200">
                    {isRTL ? 'اشتراك مفعل' : 'Active Subscription'}
                  </span>
                ) : isTrialActive ? (
                  <span className="text-[11px] font-bold text-[#4D5D28] bg-[#F2F5ED] px-2.5 py-0.5 rounded-xl border border-[#D9E2CE] font-mono">
                    {isRTL ? `تجربة 7 أيام: ${timeLeftFormatted}` : `7-Day Trial: ${timeLeftFormatted}`}
                  </span>
                ) : null}
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">{user?.email || 'Student Account'}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onStartQuiz}
            title={t('navPlay')}
            aria-label={t('navPlay')}
            className="w-10 h-10 rounded-xl btn-glossy-emerald text-white flex items-center justify-center cursor-pointer shadow-xs transition-transform active:scale-95 shrink-0"
          >
            <Play className="h-4 w-4 fill-white" />
          </button>
        </div>
      </div>

      {/* OWNER CODES BANK CARD (EXCLUSIVELY FOR DR. KHALIL) */}
      {user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() && (
        <div className="mt-4 rounded-2xl border border-slate-900 bg-slate-900 text-white p-5 shadow-md flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-white">
                  {isRTL ? 'مستودع أكواد المرحلة الأولى (100 كود)' : 'Course 1 Code Bank (100 Codes)'}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {isRTL ? 'خاص بالمالك' : 'Owner Only'}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5">
                {isRTL
                  ? 'الأكواد الـ 100 المكونة من 13 رقماً محفوظة هنا بأمان لنسخها وإرسالها للطلاب.'
                  : 'Your 100 13-figure codes are stored here securely for distribution to students.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsAdminOpen(true)}
            title={isRTL ? 'فتح مستودع الأكواد' : 'Open Codes Bank'}
            aria-label={isRTL ? 'فتح مستودع الأكواد' : 'Open Codes Bank'}
            className="w-10 h-10 rounded-xl btn-glossy-olive text-white flex items-center justify-center cursor-pointer shrink-0 transition-transform active:scale-95 shadow-xs"
          >
            <Shield className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* SUBSCRIPTION USAGE CARD */}
      <div className="mt-4 rounded-2xl border border-[#D9E2CE] bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-600 fill-emerald-600" />
            <h2 className="text-sm font-bold text-slate-900">
              {isRTL ? 'رصيد المحاولات المتبقية للاستخدام' : 'Remaining Access Attempts'}
            </h2>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200 font-mono">
            {remainingAttempts} / {maxAttempts} {isRTL ? 'محاولة متبقية' : 'Attempts Left'}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-3">
          <div
            className="h-full bg-emerald-600 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, Math.max(3, (remainingAttempts / maxAttempts) * 100))}%` }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 text-[11px] block">{isRTL ? 'المحاولات المستهلكة' : 'Accessed Attempts'}</span>
            <span className="font-mono text-base font-bold text-slate-900">{accessedCount}</span>
          </div>
          <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200">
            <span className="text-emerald-900 text-[11px] block">{isRTL ? 'المحاولات المتبقية' : 'Remaining Attempts'}</span>
            <span className="font-mono text-base font-bold text-emerald-700">{remainingAttempts}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 text-[11px] block">{isRTL ? 'إعادة تسجيل الدخول اليومي' : 'Daily Re-login Security'}</span>
            <span className="text-emerald-700 font-bold text-xs flex items-center gap-1 mt-0.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{isRTL ? 'مفعلة يومياً' : 'Active (Daily)'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* LINE SEPARATING OVERVIEW FROM STATS GRID */}
      <div className="w-full border-b-2 border-slate-200 my-6" />

      {/* SECTION 2: 4 ESSENTIAL STATS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 text-center shadow-xs">
          <div className="flex items-center justify-center text-orange-500 mb-1">
            <Trophy className="h-4 w-4" />
          </div>
          <div className="text-[11px] text-slate-500 font-semibold">{t('highScore')}</div>
          <div className="font-mono text-lg font-black text-slate-900 mt-0.5">
            {activeProfile.highScore.toLocaleString()}
          </div>
        </div>

        <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 text-center shadow-xs">
          <div className="flex items-center justify-center text-sky-600 mb-1">
            <Target className="h-4 w-4" />
          </div>
          <div className="text-[11px] text-slate-500 font-semibold">{t('statAccuracy')}</div>
          <div className="font-mono text-lg font-black text-slate-900 mt-0.5">
            {overallAccuracy}%
          </div>
        </div>

        <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 text-center shadow-xs">
          <div className="flex items-center justify-center text-amber-500 mb-1">
            <Flame className="h-4 w-4" />
          </div>
          <div className="text-[11px] text-slate-500 font-semibold">{t('statBestStreak')}</div>
          <div className="font-mono text-lg font-black text-amber-500 mt-0.5">
            {activeProfile.bestStreak} 🔥
          </div>
        </div>

        <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 text-center shadow-xs">
          <div className="flex items-center justify-center text-emerald-600 mb-1">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div className="text-[11px] text-slate-500 font-semibold">{t('statQuizzesRun')}</div>
          <div className="font-mono text-lg font-black text-slate-900 mt-0.5">
            {activeProfile.totalQuizzes}
          </div>
        </div>
      </div>

      {/* LINE SEPARATING STATS GRID FROM PROGRESS CHART */}
      {chartData.length > 0 && <div className="w-full border-b-2 border-slate-200 my-6" />}

      {/* SECTION 3: PERFORMANCE PROGRESS CHART */}
      {chartData.length > 0 && (
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-900 mb-4">
            {t('performanceChartTitle')}
          </h2>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="attempt" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    fontSize: '12px',
                    backgroundColor: '#ffffff',
                    border: '2px solid #e2e8f0',
                    color: '#0f172a',
                  }}
                />
                <Bar dataKey="correct" fill="#0284c7" name={t('chartCorrect')} radius={[4, 4, 0, 0]} />
                <Bar dataKey="wrong" fill="#f97316" name={t('chartIncorrect')} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Owner Private Code Bank Modal */}
      <AdminCodesPortal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
};
