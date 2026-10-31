import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Clock,
  Flame,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  BarChart3,
  Zap,
  AlertCircle,
  Play,
  Shuffle,
  BookOpen,
  GraduationCap,
  Timer,
  Check,
  Volume2,
  VolumeX,
  Brain,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Question, QuizSettings, QuizAttempt, QuestionResult, UserProfile } from '../types/quiz';
import { sound } from '../services/soundService';
import { StorageService } from '../services/storageService';
import { getTimerDifficulty, calculateQuestionScore, FIXED_TIMER_SECONDS } from '../services/scoringService';
import { useLanguage } from '../context/LanguageContext';
import { fetchCnsTestQuestions } from '../services/cnsTestService';

interface QuizPlayViewProps {
  questions: Question[];
  activeProfile: UserProfile;
  soundEnabled: boolean;
  onNavigateToBank?: () => void;
  onProfileUpdated: () => void;
  onQuestionsUploaded?: (questions: Question[]) => void;
  onOpenInstallModal?: () => void;
  onNavigateToSubjects?: () => void;
  activeSubjectName?: string;
}

export const QuizPlayView: React.FC<QuizPlayViewProps> = ({
  questions,
  activeProfile,
  soundEnabled,
  onNavigateToBank,
  onProfileUpdated,
  onQuestionsUploaded,
  onOpenInstallModal,
  onNavigateToSubjects,
  activeSubjectName,
}) => {
  const { t, isRTL, language } = useLanguage();

  // 2 Playing Modes: 'practice' (no timer, with explanation) | 'exam' (30 sec per question)
  const [playMode, setPlayMode] = useState<'practice' | 'exam'>('practice');

  // Config state
  const [settings, setSettings] = useState<QuizSettings>(() => {
    const saved = StorageService.getSettings();
    return {
      ...saved,
      timerSeconds: FIXED_TIMER_SECONDS,
      shuffleQuestions: true,
      shuffleOptions: true,
    };
  });

  const [gameState, setGameState] = useState<'lobby' | 'playing' | 'summary'>('lobby');
  const [isSoundOn, setIsSoundOn] = useState<boolean>(soundEnabled);

  // Active quiz state
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [pointsGainedThisQuestion, setPointsGainedThisQuestion] = useState<number>(0);
  const [shakeCard, setShakeCard] = useState<boolean>(false);

  // Scoring and Streak
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [lastStreakBroken, setLastStreakBroken] = useState<number>(0);
  const [questionResults, setQuestionResults] = useState<QuestionResult[]>([]);

  // Timer per question state (used only in Exam Mode)
  const [timeRemaining, setTimeRemaining] = useState<number>(FIXED_TIMER_SECONDS);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const quizStartTimeRef = useRef<number>(Date.now());
  const timerRef = useRef<number | null>(null);
  const advanceTimeoutRef = useRef<number | null>(null);

  // CNS Test loading state
  const [isLoadingCns, setIsLoadingCns] = useState<boolean>(false);
  const [inlineUploadError, setInlineUploadError] = useState<string | null>(null);
  const [cnsSuccessMessage, setCnsSuccessMessage] = useState<string | null>(null);

  // Current Difficulty Config based on mode
  const activeDifficulty = getTimerDifficulty(playMode === 'exam' ? FIXED_TIMER_SECONDS : 0);

  // Randomize questions & answers helper
  const prepareRandomizedQuestions = useCallback((source: Question[]): Question[] => {
    // 1. Shuffle question order
    const shuffledQ = [...source].sort(() => Math.random() - 0.5);

    // 2. Shuffle answer option places for every question
    return shuffledQ.map((q) => {
      const correctText = q.options[q.correctOptionIndex];
      const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
      const newCorrectIndex = shuffledOptions.indexOf(correctText);

      return {
        ...q,
        options: shuffledOptions,
        correctOptionIndex: newCorrectIndex,
      };
    });
  }, []);

  // Launch quiz
  const handleStartQuiz = () => {
    if (questions.length === 0) return;

    const prepared = prepareRandomizedQuestions(questions);
    setQuizQuestions(prepared);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setLastAnswerCorrect(null);
    setPointsGainedThisQuestion(0);
    setShakeCard(false);
    setCurrentScore(0);
    setCurrentStreak(0);
    setBestStreak(0);
    setLastStreakBroken(0);
    setQuestionResults([]);
    setTimeRemaining(playMode === 'exam' ? FIXED_TIMER_SECONDS : 0);
    setQuestionStartTime(Date.now());
    quizStartTimeRef.current = Date.now();
    setGameState('playing');
  };

  // Complete Quiz
  const handleFinishQuiz = useCallback(
    (results: QuestionResult[]) => {
      const correctCount = results.filter((r) => r.isCorrect).length;
      const wrongCount = results.filter((r) => !r.isCorrect && r.selectedOptionIndex !== -1).length;
      const timedOutCount = results.filter((r) => r.selectedOptionIndex === -1).length;
      const totalTimeSeconds = Math.round((Date.now() - quizStartTimeRef.current) / 1000);
      const accuracy = results.length > 0 ? Math.round((correctCount / results.length) * 100) : 0;
      const diff = getTimerDifficulty(playMode === 'exam' ? FIXED_TIMER_SECONDS : 0);

      const attempt: QuizAttempt = {
        id: `att_${Date.now()}`,
        profileId: activeProfile.id,
        profileName: activeProfile.username,
        timestamp: Date.now(),
        totalQuestions: results.length,
        correctCount,
        wrongCount,
        timedOutCount,
        score: currentScore,
        bestStreak,
        totalTimeSeconds,
        accuracyPercent: accuracy,
        timerSettingSeconds: playMode === 'exam' ? FIXED_TIMER_SECONDS : 0,
        difficultyTier: diff.tier,
        difficultyMultiplier: diff.multiplier,
        results,
      };

      StorageService.recordQuizAttempt(attempt);
      onProfileUpdated();

      if (accuracy >= 70 || correctCount >= 3) {
        sound.playFanfare();
        confetti({
          particleCount: 130,
          spread: 75,
          origin: { y: 0.6 },
        });
      }

      setGameState('summary');
    },
    [activeProfile, currentScore, bestStreak, playMode, onProfileUpdated]
  );

  // Transition to next question
  const advanceToNextQuestion = useCallback(
    (updatedResults: QuestionResult[]) => {
      if (currentIndex + 1 < quizQuestions.length) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption(null);
        setIsAnswered(false);
        setLastAnswerCorrect(null);
        setPointsGainedThisQuestion(0);
        setShakeCard(false);
        setTimeRemaining(playMode === 'exam' ? FIXED_TIMER_SECONDS : 0);
        setQuestionStartTime(Date.now());
      } else {
        handleFinishQuiz(updatedResults);
      }
    },
    [currentIndex, quizQuestions.length, playMode, handleFinishQuiz]
  );

  // Handle option click with buzzer
  const handleSelectOption = useCallback(
    (optionIndex: number) => {
      if (isAnswered || gameState !== 'playing') return;

      const currentQ = quizQuestions[currentIndex];
      if (!currentQ) return;

      setIsAnswered(true);
      setSelectedOption(optionIndex);

      const isCorrect = optionIndex === currentQ.correctOptionIndex;
      setLastAnswerCorrect(isCorrect);

      const timeSpentSec = Math.max(0.1, Number(((Date.now() - questionStartTime) / 1000).toFixed(1)));

      let newStreak = currentStreak;
      let newBestStreak = bestStreak;
      let newScore = currentScore;
      let earned = 0;

      if (isCorrect) {
        sound.playCorrectChime();
        newStreak += 1;
        newBestStreak = Math.max(newBestStreak, newStreak);

        const { points } = calculateQuestionScore(
          playMode === 'exam' ? FIXED_TIMER_SECONDS : 0,
          playMode === 'exam' ? timeRemaining : 0,
          newStreak
        );
        earned = points;
        newScore += earned;

        setCurrentStreak(newStreak);
        setBestStreak(newBestStreak);
        setCurrentScore(newScore);
        setPointsGainedThisQuestion(earned);
        setLastStreakBroken(0);
      } else {
        // Wrong answer buzz immediately
        sound.playWrongBuzz();
        setShakeCard(true);
        if (currentStreak > 0) {
          setLastStreakBroken(currentStreak);
        }
        newStreak = 0;
        setCurrentStreak(0);
        setPointsGainedThisQuestion(0);
      }

      const result: QuestionResult = {
        questionId: currentQ.id,
        questionText: currentQ.questionText,
        options: currentQ.options,
        selectedOptionIndex: optionIndex,
        correctOptionIndex: currentQ.correctOptionIndex,
        isCorrect,
        timeSpentSeconds: timeSpentSec,
        pointsEarned: earned,
      };

      const updatedResults = [...questionResults, result];
      setQuestionResults(updatedResults);

      // In Exam Mode, auto-advance after buzzer delay so user keeps rhythm
      // In Practice Mode, DO NOT auto-advance: let user read the explanation!
      if (playMode === 'exam') {
        advanceTimeoutRef.current = window.setTimeout(() => {
          advanceToNextQuestion(updatedResults);
        }, settings.buzzDelayMs || 700);
      }
    },
    [
      isAnswered,
      gameState,
      quizQuestions,
      currentIndex,
      questionStartTime,
      currentStreak,
      bestStreak,
      currentScore,
      timeRemaining,
      questionResults,
      playMode,
      settings.buzzDelayMs,
      advanceToNextQuestion,
    ]
  );

  // Handle timeout (Exam Mode only)
  const handleTimeout = useCallback(() => {
    if (isAnswered || gameState !== 'playing' || playMode !== 'exam') return;

    const currentQ = quizQuestions[currentIndex];
    if (!currentQ) return;

    setIsAnswered(true);
    setSelectedOption(-1);
    setLastAnswerCorrect(false);
    setPointsGainedThisQuestion(0);
    setShakeCard(true);

    sound.playTimesUpBuzz();
    if (currentStreak > 0) {
      setLastStreakBroken(currentStreak);
    }
    setCurrentStreak(0);

    const result: QuestionResult = {
      questionId: currentQ.id,
      questionText: currentQ.questionText,
      options: currentQ.options,
      selectedOptionIndex: -1,
      correctOptionIndex: currentQ.correctOptionIndex,
      isCorrect: false,
      timeSpentSeconds: FIXED_TIMER_SECONDS,
      pointsEarned: 0,
    };

    const updatedResults = [...questionResults, result];
    setQuestionResults(updatedResults);

    advanceTimeoutRef.current = window.setTimeout(() => {
      advanceToNextQuestion(updatedResults);
    }, settings.buzzDelayMs || 700);
  }, [isAnswered, gameState, playMode, quizQuestions, currentIndex, questionResults, currentStreak, settings.buzzDelayMs, advanceToNextQuestion]);

  // Timer loop for Exam Mode
  useEffect(() => {
    if (gameState !== 'playing' || isAnswered || playMode !== 'exam') {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleTimeout();
          return 0;
        }

        if (prev <= 4 && prev > 1 && soundEnabled) {
          sound.playTick();
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, isAnswered, currentIndex, soundEnabled, playMode, handleTimeout]);

  useEffect(() => {
    return () => {
      if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Keyboard shortcut listener (1-4 or A-D, Space/Enter to advance in practice mode)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;

      if (isAnswered && playMode === 'practice' && (e.key === 'Enter' || e.key === ' ')) {
        advanceToNextQuestion(questionResults);
        return;
      }

      if (isAnswered) return;

      const key = e.key.toLowerCase();
      let index = -1;

      if (key === '1' || key === 'a') index = 0;
      else if (key === '2' || key === 'b') index = 1;
      else if (key === '3' || key === 'c') index = 2;
      else if (key === '4' || key === 'd') index = 3;

      if (index >= 0 && index < (quizQuestions[currentIndex]?.options.length || 0)) {
        handleSelectOption(index);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, isAnswered, currentIndex, quizQuestions, playMode, questionResults, advanceToNextQuestion, handleSelectOption]);

  // CNS Test Loader handler (Fetches from Supabase storage)
  const handleLoadCnsTest = async () => {
    setIsLoadingCns(true);
    setInlineUploadError(null);
    setCnsSuccessMessage(null);
    try {
      const { questions: cnsQuestions, count } = await fetchCnsTestQuestions();
      if (onQuestionsUploaded) {
        onQuestionsUploaded(cnsQuestions);
      }
      setCnsSuccessMessage(
        isRTL
          ? `تم بنجاح تحميل اختبار CNS (${count} سؤال)!`
          : `CNS Test loaded successfully (${count} questions)!`
      );
    } catch (err: any) {
      setInlineUploadError(err.message || 'Failed to download CNS Test file from Supabase.');
    } finally {
      setIsLoadingCns(false);
    }
  };

  const currentQ = quizQuestions[currentIndex];

  const timerPercent = playMode === 'exam' ? (timeRemaining / FIXED_TIMER_SECONDS) * 100 : 100;
  const isUrgentTime = playMode === 'exam' && timeRemaining <= 3;
  const isWarningTime = playMode === 'exam' && timeRemaining <= 5 && !isUrgentTime;

  // LOBBY SCREEN
  if (gameState === 'lobby') {
    return (
      <div className="mx-auto max-w-4xl px-4 py-6">
        {/* Navigation back to Dental Faculty Subjects */}
        {onNavigateToSubjects && (
          <div className="mb-4 flex items-center justify-between flex-wrap gap-2">
            <button
              type="button"
              onClick={onNavigateToSubjects}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100 font-bold text-xs cursor-pointer transition-colors shadow-xs"
            >
              {isRTL ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
              <span>{isRTL ? 'الرجوع إلى مواد طب الأسنان (المرحلة الأولى)' : '← Dental faculty (first level)'}</span>
            </button>
            {activeSubjectName && (
              <span className="text-xs font-bold text-orange-700 bg-orange-50 px-3 py-1 rounded-xl border border-orange-200 flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5 text-orange-500" />
                <span>{activeSubjectName}</span>
              </span>
            )}
          </div>
        )}

        {/* SECTION 1: ARENA BANNER */}
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 sm:p-7 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-sky-600 mb-2">
                <span>{t('arenaBadge')}</span>
                <span>·</span>
                <span>{t('randomizedBadge')}</span>
                <span>·</span>
                <span>{playMode === 'practice' ? t('modePracticeTitle') : t('modeExamTitle')}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {t('arenaTitle')}
              </h1>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                {t('arenaDescription')}
              </p>
            </div>

            <div className="flex items-center gap-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-xs">
              <div className="text-right rtl:text-left">
                <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">{t('highScore')}</div>
                <div className="font-mono text-xl font-extrabold text-orange-500">
                  {activeProfile.highScore.toLocaleString()}
                </div>
              </div>
              <Zap className="h-7 w-7 text-orange-500 shrink-0" />
            </div>
          </div>
        </div>

        {/* LINE SEPARATING HEADER SECTION FROM MODE SELECTOR SECTION */}
        <div className="w-full border-b-2 border-slate-200 my-6" />

        {/* SECTION 2: MODE SELECTOR (PRACTICE VS EXAM) */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-2">
            <span>{t('modeSelectionTitle')}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* PRACTICE MODE CARD */}
            <button
              type="button"
              onClick={() => setPlayMode('practice')}
              className={`p-5 rounded-2xl border-2 text-left rtl:text-right transition-all flex flex-col justify-between cursor-pointer relative overflow-hidden bg-white ${
                playMode === 'practice'
                  ? 'border-orange-500 ring-2 ring-orange-500/20 shadow-md'
                  : 'border-slate-200 hover:border-orange-300 text-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold border border-sky-200">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <span className="font-extrabold text-base text-slate-900">{t('modePracticeTitle')}</span>
                  </div>
                  {playMode === 'practice' && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white text-xs">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {t('modePracticeSubtitle')}
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-sky-700">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{t('modePracticeBadge')}</span>
              </div>
            </button>

            {/* EXAM MODE CARD */}
            <button
              type="button"
              onClick={() => setPlayMode('exam')}
              className={`p-5 rounded-2xl border-2 text-left rtl:text-right transition-all flex flex-col justify-between cursor-pointer relative overflow-hidden bg-white ${
                playMode === 'exam'
                  ? 'border-orange-500 ring-2 ring-orange-500/20 shadow-md'
                  : 'border-slate-200 hover:border-orange-300 text-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold border border-orange-200">
                      <Timer className="w-5 h-5" />
                    </div>
                    <span className="font-extrabold text-base text-slate-900">{t('modeExamTitle')}</span>
                  </div>
                  {playMode === 'exam' && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white text-xs">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {t('modeExamSubtitle')}
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-orange-700">
                <Clock className="w-3.5 h-3.5" />
                <span>{t('modeExamBadge')}</span>
              </div>
            </button>
          </div>
        </div>

        {/* LINE SEPARATING MODE SELECTOR SECTION FROM START/ACTION SECTION */}
        <div className="w-full border-b-2 border-slate-200 my-6" />

        {/* SECTION 3: START ACTION & CNS TEST BUTTON */}
        {questions.length === 0 ? (
          <div className="rounded-2xl border-2 border-slate-200 p-8 sm:p-10 text-center bg-white shadow-xs">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl btn-glossy-orange text-white mb-4 shadow-md">
              <Brain className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-1.5">
              CNS Test
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
              {isRTL
                ? 'اضغط على الزر أدناه لتحميل بنك أسئلة الـ CNS (105 أسئلة MCQ) من Supabase والبدء فوراً.'
                : 'Click the button below to load the Central Nervous System MCQ questions (105 questions) from Supabase and start immediately.'}
            </p>

            <button
              type="button"
              disabled={isLoadingCns}
              onClick={handleLoadCnsTest}
              className="px-8 py-3.5 rounded-2xl text-sm font-black btn-glossy-orange flex items-center justify-center gap-2.5 mx-auto cursor-pointer shadow-md disabled:opacity-50"
            >
              {isLoadingCns ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Brain className="h-4 w-4" />
              )}
              <span>{isLoadingCns ? (isRTL ? 'جاري التحميل...' : 'Loading...') : 'CNS Test'}</span>
            </button>

            {inlineUploadError && (
              <p className="mt-4 text-xs text-rose-600 font-bold bg-rose-50 border-2 border-rose-200 p-3 rounded-2xl max-w-md mx-auto">
                {inlineUploadError}
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="flex items-center gap-4 text-center sm:text-left rtl:sm:text-right">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-orange-200 bg-orange-50 text-orange-600 shrink-0">
                  <Play className="h-6 w-6 fill-orange-500 text-orange-500" />
                </div>
                <div>
                  <div className="flex items-center gap-2 justify-center sm:justify-start rtl:sm:justify-start">
                    <span className="text-xs uppercase tracking-wider font-extrabold text-sky-600">
                      {t('bankReady')}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg text-[11px] font-black border border-slate-200 bg-slate-50">
                      {playMode === 'practice' ? t('modePracticeTitle') : `30s · ${activeDifficulty.tier}`}
                    </span>
                  </div>
                  <h2 className="text-lg font-extrabold text-slate-900 mt-0.5">
                    {t('questionsCountLoaded', { count: questions.length })}
                  </h2>
                </div>
              </div>

              {/* Action Buttons: CNS Test button + Start Quiz button */}
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  disabled={isLoadingCns}
                  onClick={handleLoadCnsTest}
                  className="px-5 py-3.5 rounded-2xl text-xs font-black btn-glossy-orange-outline flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                  title="Load/Reload CNS Test from Supabase"
                >
                  {isLoadingCns ? (
                    <div className="w-3.5 h-3.5 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Brain className="h-4 w-4 text-orange-500" />
                  )}
                  <span>CNS Test</span>
                </button>

                <button
                  type="button"
                  onClick={handleStartQuiz}
                  className="flex-1 sm:flex-initial px-8 py-3.5 rounded-2xl text-sm btn-glossy-orange flex items-center justify-center gap-2.5 shrink-0 cursor-pointer shadow-md"
                >
                  <Play className="h-4 w-4 fill-white" />
                  <span>
                    {playMode === 'practice'
                      ? isRTL
                        ? 'ابدأ التدريب والشروحات'
                        : 'START PRACTICE'
                      : t('startQuizSmashBtn')}
                  </span>
                  {isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {cnsSuccessMessage && (
              <p className="text-xs text-center text-emerald-800 font-bold bg-emerald-50 border-2 border-emerald-300 p-2.5 rounded-2xl">
                {cnsSuccessMessage}
              </p>
            )}

            <p className="text-xs text-center text-slate-400 flex items-center justify-center gap-1">
              <Shuffle className="h-3.5 w-3.5" />
              <span>{t('randomizationNotice')}</span>
            </p>
          </div>
        )}
      </div>
    );
  }

  // GAMEPLAY SCREEN
  if (gameState === 'playing' && currentQ) {
    const potentialBonus =
      playMode === 'exam' ? Math.round(Math.max(0, timeRemaining) * activeDifficulty.speedFactor) : 0;

    return (
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        {/* SECTION 1: CONTROL BUTTONS & STATUS BAR */}
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Control buttons & question counter */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setGameState('lobby')}
                className="px-3.5 py-1.5 rounded-2xl text-xs font-bold btn-glossy-orange-outline flex items-center gap-1.5 cursor-pointer"
                title={t('backToLobbyBtn')}
              >
                {isRTL ? <ArrowRight className="h-3.5 w-3.5" /> : <ArrowLeft className="h-3.5 w-3.5" />}
                <span>{isRTL ? 'خروج' : 'Exit'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsSoundOn(!isSoundOn)}
                className="p-1.5 rounded-2xl text-xs font-bold btn-glossy-orange-outline flex items-center justify-center cursor-pointer"
                title={isSoundOn ? 'Mute' : 'Unmute'}
              >
                {isSoundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </button>

              <span className="text-xs font-extrabold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                {t('questionNumberLabel', { current: currentIndex + 1, total: quizQuestions.length })}
              </span>

              <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-xl border ${activeDifficulty.borderColor} ${activeDifficulty.badgeBg}`}>
                {playMode === 'practice' ? '🎓 Practice' : '⏱️ 30s Exam'}
              </span>
            </div>

            {/* Streak & Score controls */}
            <div className="flex items-center gap-3">
              {/* Live Streak Pill */}
              <div
                className={`flex items-center gap-1.5 px-3 py-1 rounded-2xl text-xs font-bold border transition-all ${
                  currentStreak >= 1
                    ? 'border-amber-300 bg-amber-50 text-amber-700'
                    : 'border-slate-200 bg-slate-50 text-slate-500'
                }`}
              >
                <Flame
                  className={`h-4 w-4 transition-transform duration-300 ${
                    currentStreak >= 3
                      ? 'fill-amber-500 text-amber-500 scale-125 animate-bounce'
                      : currentStreak >= 1
                      ? 'fill-amber-500 text-amber-500 scale-110'
                      : 'text-slate-400'
                  }`}
                />
                <span className="font-mono">{t('liveStreakLabel', { streak: currentStreak })}</span>

                {currentStreak > 1 && (
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500 text-white font-extrabold shadow-xs">
                    {t('liveStreakBonus', { pct: (currentStreak - 1) * 15 })}
                  </span>
                )}
              </div>

              {/* Score Display */}
              <div className="bg-slate-50 px-3 py-1 rounded-2xl border border-slate-200 text-right rtl:text-left">
                <div className="font-mono text-base font-extrabold text-orange-500">
                  {currentScore.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* TIMER BAR: Shown in Exam Mode */}
          {playMode === 'exam' && (
            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Clock
                    className={`h-4 w-4 ${
                      isUrgentTime
                        ? 'text-rose-500 animate-ping'
                        : isWarningTime
                        ? 'text-amber-500'
                        : 'text-sky-600'
                    }`}
                  />
                  <span className="text-xs font-medium text-slate-600">{t('timeLabel')}</span>
                  <span
                    className={`font-mono text-base font-extrabold ${
                      isUrgentTime ? 'text-rose-500 scale-110' : isWarningTime ? 'text-amber-500' : 'text-slate-900'
                    } transition-all`}
                  >
                    {timeRemaining}s
                  </span>
                </div>

                <div className="text-xs font-mono text-slate-500 flex items-center gap-2">
                  <span>
                    {t('baseScoreLabel')} <strong className="text-slate-900">{activeDifficulty.basePoints}</strong>
                  </span>
                  <span>·</span>
                  <span>
                    {t('speedBonusLabel')} <strong className="text-emerald-600">+{potentialBonus} pts</strong>
                  </span>
                </div>
              </div>

              <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    isUrgentTime
                      ? 'bg-rose-500'
                      : isWarningTime
                      ? 'bg-amber-500'
                      : 'bg-orange-500'
                  }`}
                  style={{ width: `${Math.max(0, timerPercent)}%` }}
                />
              </div>
            </div>
          )}

          {/* Practice Mode Untimed Notice */}
          {playMode === 'practice' && (
            <div className="mt-3.5 flex items-center justify-between text-xs text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-2xl border border-emerald-200 font-semibold">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-emerald-600" />
                <span>{isRTL ? 'وضع التدريب: خذ وقتك الكامل للتفكير. سيظهر الشرح بعد الإجابة.' : 'Practice Mode: Take your time. Explanations will appear after answering.'}</span>
              </div>
              <span className="text-[11px] opacity-80 font-bold">Untimed</span>
            </div>
          )}
        </div>

        {/* LINE 1: SEPARATING CONTROL BUTTONS FROM THE QUESTION SECTION */}
        <div className="w-full border-b-2 border-slate-200 my-6" />

        {/* SECTION 2: QUESTION SECTION */}
        <div
          className={`rounded-2xl border-2 bg-white p-6 sm:p-8 shadow-xs transition-all ${
            shakeCard ? 'border-rose-500 animate-buzz-shake shadow-rose-500/20' : 'border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-wider font-extrabold text-orange-500">
              {isRTL ? 'نص السؤال' : 'Question Prompt'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-relaxed">
            {currentQ.questionText}
          </h2>
        </div>

        {/* LINE 2: SEPARATING QUESTION SECTION FROM THE ANSWERS SECTION */}
        <div className="w-full border-b-2 border-slate-200 my-6" />

        {/* SECTION 3: ANSWERS SECTION */}
        <div>
          <div className="text-xs uppercase tracking-wider font-extrabold text-slate-500 mb-3 flex items-center gap-2">
            <span>{isRTL ? 'اختر الإجابة الصحيحة:' : 'Select the correct answer:'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {currentQ.options.map((option, idx) => {
              const letter = isRTL
                ? ['أ', 'ب', 'ج', 'د', 'هـ', 'و'][idx] || String.fromCharCode(65 + idx)
                : String.fromCharCode(65 + idx);
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctOptionIndex;

              let cardStyle =
                'border-slate-200 bg-white text-slate-800 hover:border-orange-500 hover:shadow-orange-500/20 active:scale-[0.99]';
              let badgeStyle = 'btn-glossy-orange';

              if (isAnswered) {
                if (isSelected && isCorrect) {
                  cardStyle =
                    'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-500/30';
                  badgeStyle = 'bg-emerald-600 text-white border-emerald-700';
                } else if (isSelected && !isCorrect) {
                  cardStyle =
                    'border-rose-500 bg-rose-50 text-rose-950 font-bold ring-2 ring-rose-500/30';
                  badgeStyle = 'bg-rose-600 text-white border-rose-700';
                } else if (!isSelected && isCorrect) {
                  cardStyle =
                    'border-emerald-500/80 bg-emerald-50/60 text-emerald-900 font-semibold';
                  badgeStyle = 'bg-emerald-600 text-white border-emerald-700';
                } else {
                  cardStyle =
                    'border-slate-200 bg-slate-50/60 text-slate-400 opacity-60';
                  badgeStyle = 'bg-slate-200 text-slate-500 border-slate-300';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`group relative flex items-center gap-3.5 rounded-2xl border-2 p-4 text-left rtl:text-right transition-all select-none cursor-pointer shadow-xs ${cardStyle}`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold transition-transform group-hover:scale-105 ${badgeStyle}`}
                  >
                    {isAnswered && isCorrect ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : isAnswered && isSelected && !isCorrect ? (
                      <XCircle className="h-5 w-5" />
                    ) : (
                      letter
                    )}
                  </div>
                  <span className="flex-1 text-sm font-bold leading-snug">{option}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* LINE 3: SEPARATING ANSWERS SECTION FROM ACTION / EXPLANATION SECTION */}
        {isAnswered && (
          <>
            <div className="w-full border-b-2 border-slate-200 my-6" />

            {/* SECTION 4: EXPLANATION / ADVANCE ACTION SECTION */}
            {playMode === 'practice' && (
              <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-xs">
                <div className="flex items-center gap-2 mb-2 font-extrabold text-sm text-sky-800">
                  <BookOpen className="h-4 w-4 text-sky-600" />
                  <span>{t('explanationTitle')}</span>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed mb-5">
                  {currentQ.explanation ? (
                    currentQ.explanation
                  ) : (
                    <span>
                      {t('noExplanationGiven')}{' '}
                      <strong className="text-orange-600 font-bold">
                        ({currentQ.options[currentQ.correctOptionIndex]})
                      </strong>
                    </span>
                  )}
                </p>

                {/* Orange Glossy Rounded Button for Next Question */}
                <button
                  type="button"
                  onClick={() => advanceToNextQuestion(questionResults)}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl btn-glossy-orange text-sm flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <span>{t('nextQuestionBtn')}</span>
                  {isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                </button>
              </div>
            )}

            {/* Feedback banner in Exam Mode */}
            {playMode === 'exam' && (
              <div
                className={`rounded-2xl border-2 p-4 text-xs font-bold flex items-center justify-between transition-all ${
                  lastAnswerCorrect
                    ? 'border-emerald-500/50 bg-emerald-50 text-emerald-800'
                    : 'border-rose-500/50 bg-rose-50 text-rose-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  {lastAnswerCorrect ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                  <span>
                    {lastAnswerCorrect
                      ? t('feedbackCorrect', { pts: pointsGainedThisQuestion, mult: activeDifficulty.multiplier })
                      : selectedOption === -1
                      ? t('feedbackTimeout')
                      : t('feedbackWrong')}
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  // SUMMARY SCREEN
  const correctCount = questionResults.filter((r) => r.isCorrect).length;
  const accuracyPercent =
    questionResults.length > 0 ? Math.round((correctCount / questionResults.length) * 100) : 0;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      {/* SECTION 1: RESULT BANNER */}
      <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 sm:p-8 text-center shadow-xs">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 border-2 border-orange-200 text-orange-500 shadow-sm mb-4 text-3xl">
          {accuracyPercent >= 80 ? '🏆' : accuracyPercent >= 50 ? '⭐' : '🎯'}
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl text-xs font-bold border-2 mb-3 bg-sky-50 border-sky-200 text-sky-700">
          <span>{playMode === 'practice' ? '🎓 Practice Complete' : '⏱️ 30s Exam Complete'}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          {t('completedTitle')}
        </h1>

        <div className="my-6 max-w-xs mx-auto rounded-2xl border-2 border-slate-200 bg-slate-50 p-5">
          <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
            {t('finalScoreLabel')}
          </div>
          <div className="font-mono text-3xl font-black text-orange-500">
            {currentScore.toLocaleString()}
          </div>
        </div>
      </div>

      {/* LINE SEPARATING RESULT BANNER FROM STATS GRID */}
      <div className="w-full border-b-2 border-slate-200 my-6" />

      {/* SECTION 2: STATS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-3.5 text-center">
          <div className="text-[11px] text-slate-500 font-semibold">{t('accuracyLabel')}</div>
          <div className="font-mono text-xl font-black text-slate-900 mt-1">{accuracyPercent}%</div>
          <div className="text-[10px] text-slate-500">
            {t('accuracyCount', { correct: correctCount, total: questionResults.length })}
          </div>
        </div>

        <div className="rounded-2xl border-2 border-slate-200 bg-white p-3.5 text-center">
          <div className="text-[11px] text-slate-500 font-semibold">{t('bestStreakLabel')}</div>
          <div className="font-mono text-xl font-black text-amber-500 mt-1">
            {bestStreak} 🔥
          </div>
          <div className="text-[10px] text-slate-500">{t('inARowLabel')}</div>
        </div>

        <div className="rounded-2xl border-2 border-slate-200 bg-white p-3.5 text-center">
          <div className="text-[11px] text-slate-500 font-semibold">Mode</div>
          <div className="font-mono text-sm font-black text-slate-900 mt-1">
            {playMode === 'practice' ? 'Practice' : 'Exam 30s'}
          </div>
          <div className="text-[10px] text-slate-500">{playMode === 'practice' ? 'Untimed' : 'Speed test'}</div>
        </div>

        <div className="rounded-2xl border-2 border-slate-200 bg-white p-3.5 text-center">
          <div className="text-[11px] text-slate-500 font-semibold">Total Questions</div>
          <div className="font-mono text-xl font-black text-sky-600 mt-1">
            {questionResults.length}
          </div>
          <div className="text-[10px] text-slate-500">Reviewed</div>
        </div>
      </div>

      {/* LINE SEPARATING STATS GRID FROM ACTION BUTTONS */}
      <div className="w-full border-b-2 border-slate-200 my-6" />

      {/* SECTION 3: ORANGE GLOSSY ROUNDED ACTION BUTTONS */}
      <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-xs flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={handleStartQuiz}
          className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm btn-glossy-orange flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="h-4 w-4" />
          <span>{t('playAgainBtn')}</span>
        </button>

        <button
          type="button"
          onClick={() => setGameState('lobby')}
          className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm btn-glossy-orange-outline flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{t('backToLobbyBtn')}</span>
        </button>

        {onNavigateToSubjects && (
          <button
            type="button"
            onClick={onNavigateToSubjects}
            className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm border-2 border-orange-300 bg-orange-50 text-orange-700 hover:bg-orange-100 font-black flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <GraduationCap className="h-4 w-4 text-orange-500" />
            <span>{isRTL ? 'مواد طب الأسنان' : 'Dental faculty (first level)'}</span>
          </button>
        )}
      </div>

      {/* LINE SEPARATING ACTION BUTTONS FROM ROUND REVIEW */}
      <div className="w-full border-b-2 border-slate-200 my-6" />

      {/* SECTION 4: ROUND REVIEW WITH EXPLANATIONS */}
      <div>
        <h3 className="text-base font-extrabold text-slate-900 mb-4 flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-sky-600" />
          <span>{t('roundReviewTitle')}</span>
        </h3>

        <div className="space-y-3.5">
          {questionResults.map((res, idx) => {
            const isCorrect = res.isCorrect;
            const chosenAnswer =
              res.selectedOptionIndex === -1 ? t('timedOutLabel') : res.options[res.selectedOptionIndex];
            const correctAnswer = res.options[res.correctOptionIndex];
            const originalQ = quizQuestions.find((q) => q.id === res.questionId);

            return (
              <div
                key={idx}
                className={`rounded-2xl border-2 p-4 sm:p-5 transition-colors bg-white ${
                  isCorrect
                    ? 'border-emerald-300'
                    : 'border-rose-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5 flex-1">
                    <span className="font-mono text-xs font-bold text-slate-400 mt-0.5">#{idx + 1}</span>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-900">{res.questionText}</p>

                      <div className="mt-2 text-xs space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500">{t('yourAnswerLabel')}</span>
                          <span
                            className={`font-bold ${
                              isCorrect ? 'text-emerald-700' : 'text-rose-700'
                            }`}
                          >
                            {chosenAnswer}
                          </span>
                        </div>

                        {!isCorrect && (
                          <div className="flex items-center gap-2">
                            <span className="text-slate-500">{t('correctAnswerLabel')}</span>
                            <span className="text-emerald-700 font-bold">{correctAnswer}</span>
                          </div>
                        )}
                      </div>

                      {/* Explanation in Review */}
                      {originalQ?.explanation && (
                        <div className="mt-3 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                          <strong className="text-emerald-600 font-bold">
                            {t('explanationTitle')}:{' '}
                          </strong>
                          {originalQ.explanation}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-right rtl:text-left shrink-0">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-bold ${
                        isCorrect ? 'text-emerald-700' : 'text-rose-700'
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="h-4 w-4" /> +{res.pointsEarned || 0} pts
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4" /> 0 pts
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
