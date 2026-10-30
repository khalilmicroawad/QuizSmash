import React, { useState, useMemo } from 'react';
import {
  User,
  Trophy,
  Flame,
  Target,
  Clock,
  UserPlus,
  Edit3,
  Award,
  BarChart3,
  Layers,
  Columns,
  CheckCircle2,
  XCircle,
  TrendingUp,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import { UserProfile } from '../types/quiz';
import { StorageService } from '../services/storageService';
import { useLanguage } from '../context/LanguageContext';

interface ProfileViewProps {
  activeProfile: UserProfile;
  onProfileUpdated: () => void;
  onStartQuiz: () => void;
}

const AVATAR_COLORS = [
  { name: 'Indigo', class: 'bg-indigo-600' },
  { name: 'Emerald', class: 'bg-emerald-600' },
  { name: 'Rose', class: 'bg-rose-600' },
  { name: 'Amber', class: 'bg-amber-600' },
  { name: 'Violet', class: 'bg-violet-600' },
  { name: 'Cyan', class: 'bg-cyan-600' },
];

export const ProfileView: React.FC<ProfileViewProps> = ({
  activeProfile,
  onProfileUpdated,
  onStartQuiz,
}) => {
  const { t, isRTL, language } = useLanguage();
  const [profiles, setProfiles] = useState<UserProfile[]>(() => StorageService.getProfiles());
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);

  // Chart configuration state
  const [chartDisplayMode, setChartDisplayMode] = useState<'stacked' | 'grouped'>('stacked');
  const [attemptLimit, setAttemptLimit] = useState<number>(10);

  // Edit state
  const [editName, setEditName] = useState<string>(activeProfile.username);
  const [editTitle, setEditTitle] = useState<string>(activeProfile.title);
  const [editColor, setEditColor] = useState<string>(activeProfile.avatarColor);

  // New Profile state
  const [newName, setNewName] = useState<string>('');
  const [newTitle, setNewTitle] = useState<string>(language === 'ar' ? 'متحدي' : 'Scholar');
  const [newColor, setNewColor] = useState<string>('bg-indigo-600');

  const totalAnswered = activeProfile.totalCorrect + activeProfile.totalWrong;
  const overallAccuracy =
    totalAnswered > 0 ? Math.round((activeProfile.totalCorrect / totalAnswered) * 100) : 0;

  // Handle save edit
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...activeProfile,
      username: editName.trim() || 'Player',
      title: editTitle.trim() || (language === 'ar' ? 'متحدي' : 'Scholar'),
      avatarColor: editColor,
    };
    StorageService.saveProfile(updated);
    setIsEditing(false);
    setProfiles(StorageService.getProfiles());
    onProfileUpdated();
  };

  // Handle create new profile
  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    StorageService.createProfile(
      newName.trim(),
      newTitle.trim() || (language === 'ar' ? 'متحدي' : 'Scholar'),
      newColor
    );
    setIsCreatingNew(false);
    setNewName('');
    setProfiles(StorageService.getProfiles());
    onProfileUpdated();
  };

  // Handle switch active profile
  const handleSwitchProfile = (id: string) => {
    StorageService.setActiveProfileId(id);
    const updated = StorageService.getActiveProfile();
    setEditName(updated.username);
    setEditTitle(updated.title);
    setEditColor(updated.avatarColor);
    onProfileUpdated();
  };

  // Historical chart data: ordered chronologically (oldest to newest) to show performance progression over time
  const chartData = useMemo(() => {
    if (!activeProfile.history || activeProfile.history.length === 0) return [];

    const sorted = [...activeProfile.history].sort((a, b) => a.timestamp - b.timestamp);
    const sliced = attemptLimit > 0 ? sorted.slice(-attemptLimit) : sorted;

    return sliced.map((att, idx) => {
      const date = new Date(att.timestamp);
      const shortDate = date.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
        month: 'numeric',
        day: 'numeric',
      });
      const fullDate = `${date.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
        month: 'short',
        day: 'numeric',
      })} ${date.toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })}`;

      const incorrect = Math.max(0, (att.wrongCount || 0) + (att.timedOutCount || 0));

      return {
        id: att.id,
        attemptNumber: idx + 1,
        label: `#${idx + 1}`,
        shortDate,
        fullDate,
        correct: att.correctCount,
        incorrect: incorrect,
        total: att.totalQuestions,
        score: att.score,
        accuracy: att.accuracyPercent,
        bestStreak: att.bestStreak,
      };
    });
  }, [activeProfile.history, attemptLimit, language]);

  // Aggregate stats for the active chart window
  const chartTotals = useMemo(() => {
    if (!chartData || chartData.length === 0) return { correct: 0, incorrect: 0, accuracy: 0 };
    const correct = chartData.reduce((acc, curr) => acc + curr.correct, 0);
    const incorrect = chartData.reduce((acc, curr) => acc + curr.incorrect, 0);
    const total = correct + incorrect;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    return { correct, incorrect, accuracy };
  }, [chartData]);

  // Custom Tooltip for Recharts
  const CustomChartTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{ payload: (typeof chartData)[0] }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 shadow-xl text-xs space-y-1.5 min-w-[180px] z-50">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5 font-bold text-slate-900 dark:text-white">
            <span>
              {t('chartAttempt')} {data.label}
            </span>
            <span className="text-[10px] text-slate-500 font-normal">{data.fullDate}</span>
          </div>
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>{t('chartCorrect')}</span>
            </span>
            <span className="font-mono font-bold">{data.correct}</span>
          </div>
          <div className="flex items-center justify-between text-rose-500 dark:text-rose-400 font-semibold">
            <span className="flex items-center gap-1.5">
              <XCircle className="h-3.5 w-3.5" />
              <span>{t('chartIncorrect')}</span>
            </span>
            <span className="font-mono font-bold">{data.incorrect}</span>
          </div>
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-300 pt-1 border-t border-slate-100 dark:border-slate-800">
            <span>{t('accuracyLabel')}</span>
            <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
              {data.accuracy}%
            </span>
          </div>
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
            <span>{t('chartScore')}</span>
            <span className="font-mono font-bold text-slate-900 dark:text-white">
              {data.score.toLocaleString()}
            </span>
          </div>
          {data.bestStreak > 0 && (
            <div className="flex items-center justify-between text-amber-500 font-semibold">
              <span className="flex items-center gap-1">
                <Flame className="h-3.5 w-3.5" />
                <span>{t('statBestStreak')}</span>
              </span>
              <span className="font-mono">{data.bestStreak} 🔥</span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Top Banner: Profile Card & Quick Actions */}
      <div className="mb-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div
              className={`h-16 w-16 sm:h-20 sm:w-20 rounded-2xl ${activeProfile.avatarColor} flex items-center justify-center font-extrabold text-white text-2xl sm:text-3xl shadow-lg ring-2 ring-black/5 dark:ring-white/10 shrink-0`}
            >
              {activeProfile.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {activeProfile.username}
                </h1>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-1 rounded text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  title={t('editProfileBtn')}
                >
                  <Edit3 className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-0.5">{activeProfile.title}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                {new Date(activeProfile.createdAt).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US')}
              </p>
            </div>
          </div>

          {/* Profile Switcher Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setIsCreatingNew(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
            >
              <UserPlus className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>{t('newProfileBtn')}</span>
            </button>

            <button
              type="button"
              onClick={onStartQuiz}
              className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm transition-all"
            >
              {t('navPlay')}
            </button>
          </div>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4 max-w-lg">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">{t('editProfileBtn')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-1">{t('displayNameLabel')}</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-1">{t('titleLabel')}</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-1.5">{t('avatarColorLabel')}</label>
              <div className="flex items-center gap-2">
                {AVATAR_COLORS.map((col) => (
                  <button
                    key={col.name}
                    type="button"
                    onClick={() => setEditColor(col.class)}
                    className={`h-7 w-7 rounded-lg ${col.class} transition-transform ${
                      editColor === col.class ? 'ring-2 ring-indigo-500 scale-110' : 'opacity-70 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500"
              >
                {t('saveChangesBtn')}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 rounded-lg text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                {t('cancelBtn')}
              </button>
            </div>
          </form>
        )}

        {/* Create Profile Form */}
        {isCreatingNew && (
          <form onSubmit={handleCreateProfile} className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4 max-w-lg">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">{t('createProfileBtn')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-1">{t('displayNameLabel')}</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Alex"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-1">{t('titleLabel')}</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Trivia Explorer"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-1.5">{t('avatarColorLabel')}</label>
              <div className="flex items-center gap-2">
                {AVATAR_COLORS.map((col) => (
                  <button
                    key={col.name}
                    type="button"
                    onClick={() => setNewColor(col.class)}
                    className={`h-7 w-7 rounded-lg ${col.class} transition-transform ${
                      newColor === col.class ? 'ring-2 ring-indigo-500 scale-110' : 'opacity-70 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500"
              >
                {t('createProfileBtn')}
              </button>
              <button
                type="button"
                onClick={() => setIsCreatingNew(false)}
                className="px-3 py-1.5 rounded-lg text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                {t('cancelBtn')}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Switch Profiles Strip */}
      {profiles.length > 1 && (
        <div className="mb-8 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
            {t('switchActiveProfileLabel')}
          </div>
          <div className="flex flex-wrap gap-2">
            {profiles.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleSwitchProfile(p.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                  p.id === activeProfile.id
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-900 dark:text-white ring-1 ring-indigo-500 font-bold'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className={`h-4 w-4 rounded ${p.avatarColor} flex items-center justify-center text-[10px] font-bold text-white`}>
                  {p.username.charAt(0).toUpperCase()}
                </div>
                <span>{p.username}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 4 Performance Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1">
            <span>{t('statHighScore')}</span>
            <Trophy className="h-4 w-4 text-amber-500" />
          </div>
          <div className="font-mono text-2xl font-bold text-slate-900 dark:text-white">{activeProfile.highScore.toLocaleString()}</div>
          <div className="text-[10px] text-slate-400 mt-1">{t('statPersonalRecord')}</div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1">
            <span>{t('statAccuracy')}</span>
            <Target className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="font-mono text-2xl font-bold text-slate-900 dark:text-white">{overallAccuracy}%</div>
          <div className="text-[10px] text-slate-400 mt-1">{t('statCorrectCount', { count: activeProfile.totalCorrect })}</div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1">
            <span>{t('statBestStreak')}</span>
            <Flame className="h-4 w-4 text-amber-500" />
          </div>
          <div className="font-mono text-2xl font-bold text-amber-500 dark:text-amber-400">{activeProfile.bestStreak} 🔥</div>
          <div className="text-[10px] text-slate-400 mt-1">{t('statConsecutive')}</div>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1">
            <span>{t('statQuizzesRun')}</span>
            <Award className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="font-mono text-2xl font-bold text-indigo-600 dark:text-indigo-400">{activeProfile.totalQuizzes}</div>
          <div className="text-[10px] text-slate-400 mt-1">{t('statRoundsCompleted')}</div>
        </div>
      </div>

      {/* Historical Performance Recharts Bar Chart */}
      <div className="mb-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <BarChart3 className="h-5 w-5" />
              </div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {t('performanceChartTitle')}
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {t('performanceChartSubtitle')}
            </p>
          </div>

          {/* Chart Controls */}
          {chartData.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
              {/* Stacked / Grouped Toggle */}
              <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-0.5 text-xs">
                <button
                  type="button"
                  onClick={() => setChartDisplayMode('stacked')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-semibold transition-all ${
                    chartDisplayMode === 'stacked'
                      ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title={t('chartViewStacked')}
                >
                  <Layers className="h-3.5 w-3.5" />
                  <span>{t('chartViewStacked')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setChartDisplayMode('grouped')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-semibold transition-all ${
                    chartDisplayMode === 'grouped'
                      ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title={t('chartViewGrouped')}
                >
                  <Columns className="h-3.5 w-3.5" />
                  <span>{t('chartViewGrouped')}</span>
                </button>
              </div>

              {/* Attempt Count Filter */}
              {activeProfile.history.length > 5 && (
                <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-0.5 text-xs">
                  {[5, 10, 20].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setAttemptLimit(num)}
                      className={`px-2 py-1 rounded-md font-mono text-[11px] font-semibold transition-all ${
                        attemptLimit === num
                          ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                          : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setAttemptLimit(0)}
                    className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-all ${
                      attemptLimit === 0
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    All
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {chartData.length === 0 ? (
          <div className="py-12 px-4 text-center rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30">
            <BarChart3 className="h-10 w-10 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
              {t('chartNoDataYet')}
            </p>
            <button
              type="button"
              onClick={onStartQuiz}
              className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm transition-all"
            >
              {t('navPlay')}
            </button>
          </div>
        ) : (
          <div>
            {/* Quick Summary Pill Bar above Chart */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 text-xs">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span className="text-slate-600 dark:text-slate-400">{t('chartCorrect')}:</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {chartTotals.correct}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                  <span className="text-slate-600 dark:text-slate-400">{t('chartIncorrect')}:</span>
                  <span className="font-mono font-bold text-rose-500 dark:text-rose-400">
                    {chartTotals.incorrect}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">{t('statAccuracy')}:</span>
                <span className="font-mono font-extrabold text-indigo-600 dark:text-indigo-400">
                  {chartTotals.accuracy}%
                </span>
                <span className="text-slate-300 dark:text-slate-700">·</span>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  {t('chartAttemptsCount', { count: chartData.length })}
                </span>
              </div>
            </div>

            {/* Recharts Container */}
            <div className="h-72 w-full min-w-0" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 15, right: 15, left: -20, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(148, 163, 184, 0.15)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="label"
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: '#cbd5e1' }}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: '#cbd5e1' }}
                    allowDecimals={false}
                  />
                  <Tooltip
                    content={<CustomChartTooltip />}
                    cursor={{ fill: 'rgba(99, 102, 241, 0.08)' }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    wrapperStyle={{ paddingTop: '8px', fontSize: '11px' }}
                  />
                  {chartDisplayMode === 'stacked' ? (
                    <>
                      <Bar
                        dataKey="correct"
                        name={t('chartCorrect')}
                        fill="#10b981"
                        stackId="attemptStack"
                        radius={[0, 0, 4, 4]}
                        maxBarSize={44}
                      />
                      <Bar
                        dataKey="incorrect"
                        name={t('chartIncorrect')}
                        fill="#f43f5e"
                        stackId="attemptStack"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={44}
                      />
                    </>
                  ) : (
                    <>
                      <Bar
                        dataKey="correct"
                        name={t('chartCorrect')}
                        fill="#10b981"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={28}
                      />
                      <Bar
                        dataKey="incorrect"
                        name={t('chartIncorrect')}
                        fill="#f43f5e"
                        radius={[4, 4, 0, 0]}
                        maxBarSize={28}
                      />
                    </>
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* Match History Table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <span>{t('recentAttemptsTitle')}</span>
          </h3>
          <span className="text-xs text-slate-500 font-mono">
            {activeProfile.history?.length || 0}
          </span>
        </div>

        {(!activeProfile.history || activeProfile.history.length === 0) ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            {t('noAttemptsRecorded')}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left rtl:text-right text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-4">{t('colDate')}</th>
                  <th className="py-2.5 px-4 text-right rtl:text-left">{t('colScore')}</th>
                  <th className="py-2.5 px-4 text-right rtl:text-left">{t('colAccuracy')}</th>
                  <th className="py-2.5 px-4 text-right rtl:text-left">{t('colBestStreak')}</th>
                  <th className="py-2.5 px-4 text-right rtl:text-left">{t('colTimerPace')}</th>
                  <th className="py-2.5 px-4 text-right rtl:text-left">{t('colDuration')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {activeProfile.history.map((att) => (
                  <tr key={att.id} className="text-slate-800 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/80">
                    <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                      {new Date(att.timestamp).toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' })},{' '}
                      {new Date(att.timestamp).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="py-3 px-4 text-right rtl:text-left font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {att.score.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right rtl:text-left font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                      {att.accuracyPercent}% ({att.correctCount}/{att.totalQuestions})
                    </td>
                    <td className="py-3 px-4 text-right rtl:text-left font-mono text-amber-500 dark:text-amber-400">
                      {att.bestStreak} 🔥
                    </td>
                    <td className="py-3 px-4 text-right rtl:text-left font-mono text-slate-700 dark:text-slate-300">
                      <span>{att.timerSettingSeconds ? `${att.timerSettingSeconds}s` : '10s'}</span>
                      {att.difficultyMultiplier && (
                        <span className="ltr:ml-1 rtl:mr-1 text-[10px] px-1 rounded bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/60 font-semibold">
                          {att.difficultyMultiplier}x
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right rtl:text-left font-mono text-slate-500 dark:text-slate-400">
                      {att.totalTimeSeconds}s
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
