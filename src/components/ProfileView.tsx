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
      {/* SECTION 1: USER OVERVIEW CARD */}
      <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="h-12 w-12 rounded-2xl btn-glossy-orange flex items-center justify-center font-black text-white text-lg shadow-sm shrink-0">
              {(user?.email?.charAt(0) || activeProfile.username.charAt(0) || 'U').toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black text-slate-900">
                  {user?.email?.split('@')[0] || activeProfile.username}
                </h1>
                {isPermanent ? (
                  <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-xl border border-orange-200">
                    VIP 20,000 IQD
                  </span>
                ) : isTrialActive ? (
                  <span className="text-[11px] font-bold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-xl border border-sky-200 font-mono">
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
            className="w-full sm:w-auto px-6 py-2.5 rounded-2xl btn-glossy-orange text-xs font-black shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="h-3.5 w-3.5 fill-white" />
            <span>{t('navPlay')}</span>
          </button>
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
    </div>
  );
};
