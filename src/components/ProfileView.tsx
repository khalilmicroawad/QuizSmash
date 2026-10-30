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

interface ProfileViewProps {
  activeProfile: UserProfile;
  onProfileUpdated: () => void;
  onStartQuiz: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  activeProfile,
  onStartQuiz,
}) => {
  const { t, isRTL, language } = useLanguage();
  const { user, isPermanent, isTrialActive, timeLeftFormatted } = useAuth();

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
      {/* User Overview Card */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-6 mb-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-orange-500 to-sky-600 flex items-center justify-center font-black text-white text-lg shadow-sm shadow-orange-500/20 shrink-0">
              {(user?.email?.charAt(0) || activeProfile.username.charAt(0) || 'U').toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black text-slate-900 dark:text-white">
                  {user?.email?.split('@')[0] || activeProfile.username}
                </h1>
                {isPermanent ? (
                  <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-md border border-orange-500/20">
                    VIP 20,000 IQD
                  </span>
                ) : isTrialActive ? (
                  <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-md border border-sky-500/20 font-mono">
                    24h Trial ({timeLeftFormatted})
                  </span>
                ) : null}
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">{user?.email || 'Gmail Account'}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onStartQuiz}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-black text-xs shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Play className="h-3.5 w-3.5 fill-white" />
            <span>{t('navPlay')}</span>
          </button>
        </div>
      </div>

      {/* 4 Essential Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 text-center">
          <div className="flex items-center justify-center text-orange-500 mb-1">
            <Trophy className="h-4 w-4" />
          </div>
          <div className="text-[11px] text-slate-500 font-semibold">{t('highScore')}</div>
          <div className="font-mono text-lg font-black text-slate-900 dark:text-white mt-0.5">
            {activeProfile.highScore.toLocaleString()}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 text-center">
          <div className="flex items-center justify-center text-sky-500 mb-1">
            <Target className="h-4 w-4" />
          </div>
          <div className="text-[11px] text-slate-500 font-semibold">{t('statAccuracy')}</div>
          <div className="font-mono text-lg font-black text-slate-900 dark:text-white mt-0.5">
            {overallAccuracy}%
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 text-center">
          <div className="flex items-center justify-center text-amber-500 mb-1">
            <Flame className="h-4 w-4" />
          </div>
          <div className="text-[11px] text-slate-500 font-semibold">{t('statBestStreak')}</div>
          <div className="font-mono text-lg font-black text-slate-900 dark:text-white mt-0.5">
            {activeProfile.bestStreak} 🔥
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 text-center">
          <div className="flex items-center justify-center text-emerald-500 mb-1">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div className="text-[11px] text-slate-500 font-semibold">{t('statQuizzesRun')}</div>
          <div className="font-mono text-lg font-black text-slate-900 dark:text-white mt-0.5">
            {activeProfile.totalQuizzes}
          </div>
        </div>
      </div>

      {/* Performance Progress Chart */}
      {chartData.length > 0 && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 mb-6">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
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
                    borderRadius: '8px',
                    fontSize: '12px',
                    backgroundColor: '#07131e',
                    border: '1px solid #1e293b',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="correct" fill="#0284c7" name={t('chartCorrect')} radius={[4, 4, 0, 0]} />
                <Bar dataKey="wrong" fill="#f97316" name={t('chartIncorrect')} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};
