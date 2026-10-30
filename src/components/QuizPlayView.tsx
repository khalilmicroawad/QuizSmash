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
  Upload,
  Play,
  Shuffle,
  BookOpen,
  GraduationCap,
  Timer,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Question, QuizSettings, QuizAttempt, QuestionResult, UserProfile } from '../types/quiz';
import { sound } from '../services/soundService';
import { StorageService } from '../services/storageService';
import { parseQuestionBank, getSampleTxtTemplate } from '../services/questionParser';
import { getTimerDifficulty, calculateQuestionScore, FIXED_TIMER_SECONDS } from '../services/scoringService';
import { useLanguage } from '../context/LanguageContext';

interface QuizPlayViewProps {
  questions: Question[];
  activeProfile: UserProfile;
  soundEnabled: boolean;
  onNavigateToBank: () => void;
  onProfileUpdated: () => void;
  onQuestionsUploaded?: (questions: Question[]) => void;
  onOpenInstallModal?: () => void;
}

export const QuizPlayView: React.FC<QuizPlayViewProps> = ({
  questions,
  activeProfile,
  soundEnabled,
  onNavigateToBank,
  onProfileUpdated,
  onQuestionsUploaded,
  onOpenInstallModal,
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

  // Inline upload state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [inlineUploadError, setInlineUploadError] = useState<string | null>(null);

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

  // Inline upload handler
  const handleInlineFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = (event.target?.result as string) || '';
      const result = parseQuestionBank(text);
      if (result.questions.length > 0) {
        StorageService.saveQuestions(result.questions);
        setInlineUploadError(null);
        if (onQuestionsUploaded) {
          onQuestionsUploaded(result.questions);
        }
      } else {
        setInlineUploadError(
          isRTL
            ? 'تعذر العثور على أسئلة صالحة. تأكد من أن كل إجابة صحيحة تبدأ بعلامة "+".'
            : 'Could not find questions in file. Verify that correct answers start with a "+" symbol.'
        );
      }
    };
    reader.readAsText(file);
  };

  const currentQ = quizQuestions[currentIndex];

  const timerPercent = playMode === 'exam' ? (timeRemaining / FIXED_TIMER_SECONDS) * 100 : 100;
  const isUrgentTime = playMode === 'exam' && timeRemaining <= 3;
  const isWarningTime = playMode === 'exam' && timeRemaining <= 5 && !isUrgentTime;

  // LOBBY SCREEN
  if (gameState === 'lobby') {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="mb-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                <span>{t('arenaBadge')}</span>
                <span>·</span>
                <span>{t('randomizedBadge')}</span>
                <span>·</span>
                <span>{playMode === 'practice' ? t('modePracticeTitle') : t('modeExamTitle')}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {t('arenaTitle')}
              </h1>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                {t('arenaDescription')}
              </p>
            </div>

            <div className="flex items-center gap-4 bg-white dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 shadow-xs">
              <div className="text-right rtl:text-left">
                <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">{t('highScore')}</div>
                <div className="font-mono text-xl font-extrabold text-indigo-600 dark:text-indigo-400">
                  {activeProfile.highScore.toLocaleString()}
                </div>
              </div>
              <Zap className="h-8 w-8 text-indigo-500 shrink-0" />
            </div>
          </div>
        </div>

        {/* MODE SELECTOR (PRACTICE VS EXAM) */}
        <div className="mb-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2">
            <span>{t('modeSelectionTitle')}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* PRACTICE MODE CARD (Ocean Blue) */}
            <button
              type="button"
              onClick={() => setPlayMode('practice')}
              className={`p-5 rounded-2xl border text-left rtl:text-right transition-all flex flex-col justify-between cursor-pointer relative overflow-hidden ${
                playMode === 'practice'
                  ? 'border-sky-500 bg-sky-50/80 dark:bg-sky-950/40 text-slate-900 dark:text-white ring-2 ring-sky-500/30 shadow-md'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-sky-300 dark:hover:border-sky-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <span className="font-extrabold text-base">{t('modePracticeTitle')}</span>
                  </div>
                  {playMode === 'practice' && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-600 text-white text-xs">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  {t('modePracticeSubtitle')}
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-sky-700 dark:text-sky-400">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{t('modePracticeBadge')}</span>
              </div>
            </button>

            {/* EXAM MODE CARD (Chromic Orange) */}
            <button
              type="button"
              onClick={() => setPlayMode('exam')}
              className={`p-5 rounded-2xl border text-left rtl:text-right transition-all flex flex-col justify-between cursor-pointer relative overflow-hidden ${
                playMode === 'exam'
                  ? 'border-orange-500 bg-orange-50/80 dark:bg-orange-950/40 text-slate-900 dark:text-white ring-2 ring-orange-500/30 shadow-md'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-orange-300 dark:hover:border-orange-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
                      <Timer className="w-5 h-5" />
                    </div>
                    <span className="font-extrabold text-base">{t('modeExamTitle')}</span>
                  </div>
                  {playMode === 'exam' && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white text-xs">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  {t('modeExamSubtitle')}
                </p>
              </div>

              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-orange-700 dark:text-orange-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{t('modeExamBadge')}</span>
              </div>
            </button>
          </div>
        </div>

        {/* QUESTIONS STATUS & START BUTTON */}
        {questions.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-8 sm:p-12 text-center bg-white/50 dark:bg-slate-900/40">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleInlineFileSelect}
              accept=".txt"
              className="hidden"
              id="inline-txt-file"
            />
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 dark:bg-orange-950/60 text-orange-500 dark:text-orange-400 mb-4">
              <Upload className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              {t('emptyBankTitle')}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6 leading-relaxed">
              {t('emptyBankDesc')}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <label
                htmlFor="inline-txt-file"
                className="cursor-pointer px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/25 flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                <span>{t('uploadBankBtn')}</span>
              </label>

              <button
                type="button"
                onClick={() => {
                  const sample = parseQuestionBank(getSampleTxtTemplate(language));
                  StorageService.saveQuestions(sample.questions);
                  if (onQuestionsUploaded) {
                    onQuestionsUploaded(sample.questions);
                  }
                }}
                className="px-5 py-3 rounded-xl font-semibold text-xs text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                {t('loadSampleBtn')}
              </button>
            </div>

            {inlineUploadError && (
              <p className="mt-4 text-xs text-rose-500 font-medium">{inlineUploadError}</p>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* BIG PLAY BUTTON BANNER */}
            <div
              className={`rounded-2xl border-2 p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5 transition-all ${
                playMode === 'practice'
                  ? 'border-sky-500/80 bg-gradient-to-r from-sky-50 via-white to-blue-50 dark:from-sky-950/70 dark:via-slate-900 dark:to-blue-950/60'
                  : 'border-orange-500/80 bg-gradient-to-r from-orange-50 via-white to-amber-50 dark:from-orange-950/70 dark:via-slate-900 dark:to-amber-950/60'
              }`}
            >
              <div className="flex items-center gap-4 text-center sm:text-left rtl:sm:text-right">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl border shrink-0 ${
                    playMode === 'practice'
                      ? 'bg-sky-100 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 border-sky-300 dark:border-sky-500/40'
                      : 'bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 border-orange-300 dark:border-orange-500/40'
                  }`}
                >
                  {playMode === 'practice' ? (
                    <GraduationCap className="h-7 w-7" />
                  ) : (
                    <Play className="h-7 w-7 fill-orange-500 dark:fill-orange-400 text-orange-500" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 justify-center sm:justify-start rtl:sm:justify-start">
                    <span className="text-xs uppercase tracking-wider font-extrabold text-sky-600 dark:text-sky-400">
                      {t('bankReady')}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-black border ${activeDifficulty.borderColor} ${activeDifficulty.badgeBg}`}>
                      {playMode === 'practice' ? t('modePracticeTitle') : `30s · ${activeDifficulty.tier}`}
                    </span>
                    <span className="text-xs text-orange-600 dark:text-orange-400 flex items-center gap-1 font-semibold">
                      <Shuffle className="h-3 w-3" />
                      <span>{t('randomizedBadge')}</span>
                    </span>
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                    {t('questionsCountLoaded', { count: questions.length })}
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    {playMode === 'practice'
                      ? t('modePracticeSubtitle')
                      : t('playingWithTimerDesc', {
                          seconds: FIXED_TIMER_SECONDS,
                          base: activeDifficulty.basePoints,
                        })}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleStartQuiz}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl font-black text-sm text-white active:scale-95 transition-all shadow-xl bg-gradient-to-r from-orange-500 via-amber-500 to-sky-600 hover:from-orange-600 hover:to-sky-700 shadow-orange-500/25 flex items-center justify-center gap-2.5 shrink-0 cursor-pointer"
                >
                  <Play className="h-5 w-5 fill-white" />
                  <span>
                    {playMode === 'practice'
                      ? isRTL
                        ? 'ابدأ التدريب والشروحات'
                        : 'START PRACTICE'
                      : t('startQuizSmashBtn')}
                  </span>
                  {isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                </button>

                <button
                  type="button"
                  onClick={onNavigateToBank}
                  className="text-xs text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 px-3 py-2 cursor-pointer font-bold"
                >
                  {t('manageTxtBankBtn')}
                </button>
              </div>
            </div>

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
        {/* TOP STATUS BAR: Progress, Mode Badge, Live Streak & Score */}
        <div className="mb-4 flex items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">
              {t('questionNumberLabel', { current: currentIndex + 1, total: quizQuestions.length })}
            </span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full border ${activeDifficulty.borderColor} ${activeDifficulty.badgeBg}`}>
              {playMode === 'practice' ? '🎓 Practice (Untimed)' : '⏱️ 30s Exam'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Streak Pill */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                currentStreak >= 1
                  ? 'border-amber-300 dark:border-amber-700/80 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400'
              }`}
            >
              <Flame
                className={`h-4 w-4 transition-transform duration-300 ${
                  currentStreak >= 3
                    ? 'fill-amber-500 text-amber-500 scale-125 animate-bounce'
                    : currentStreak >= 1
                    ? 'fill-amber-500 text-amber-500 scale-110'
                    : 'text-slate-400 dark:text-slate-500'
                }`}
              />
              <span className="font-mono">{t('liveStreakLabel', { streak: currentStreak })}</span>

              {currentStreak > 1 && (
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500 text-white font-extrabold shadow-xs">
                  {t('liveStreakBonus', { pct: (currentStreak - 1) * 15 })}
                </span>
              )}
            </div>

            {/* Score */}
            <div className="text-right rtl:text-left">
              <div className="font-mono text-base font-extrabold text-slate-900 dark:text-white">
                {currentScore.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* TIMER BAR: Shown in Exam Mode */}
        {playMode === 'exam' && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Clock
                  className={`h-4 w-4 ${
                    isUrgentTime
                      ? 'text-rose-500 animate-ping'
                      : isWarningTime
                      ? 'text-amber-500'
                      : 'text-indigo-600 dark:text-indigo-400'
                  }`}
                />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{t('timeLabel')}</span>
                <span
                  className={`font-mono text-base font-extrabold ${
                    isUrgentTime ? 'text-rose-500 scale-110' : isWarningTime ? 'text-amber-500' : 'text-slate-900 dark:text-white'
                  } transition-all`}
                >
                  {timeRemaining}s
                </span>
              </div>

              <div className="text-xs font-mono text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <span>
                  {t('baseScoreLabel')} <strong className="text-slate-900 dark:text-white">{activeDifficulty.basePoints}</strong>
                </span>
                <span>·</span>
                <span>
                  {t('speedBonusLabel')} <strong className="text-emerald-600 dark:text-emerald-400">+{potentialBonus} pts</strong>
                </span>
              </div>
            </div>

            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  isUrgentTime
                    ? 'bg-rose-500'
                    : isWarningTime
                    ? 'bg-amber-500'
                    : 'bg-indigo-600 dark:bg-indigo-500'
                }`}
                style={{ width: `${Math.max(0, timerPercent)}%` }}
              />
            </div>
          </div>
        )}

        {/* Practice Mode Untimed Notice */}
        {playMode === 'practice' && (
          <div className="mb-4 flex items-center justify-between text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800/60 font-semibold">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span>{isRTL ? 'وضع التدريب: خذ وقتك الكامل للتفكير. سيظهر الشرح بعد الإجابة.' : 'Practice Mode: Take your time. Explanations will appear after answering.'}</span>
            </div>
            <span className="text-[11px] opacity-80">Untimed</span>
          </div>
        )}

        {/* QUESTION CARD */}
        <div
          className={`rounded-2xl border bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-md transition-all ${
            shakeCard ? 'border-rose-500 animate-buzz-shake shadow-rose-500/20' : 'border-slate-200 dark:border-slate-800'
          }`}
        >
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-relaxed">
              {currentQ.questionText}
            </h2>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {currentQ.options.map((option, idx) => {
              const letter = isRTL
                ? ['أ', 'ب', 'ج', 'د', 'هـ', 'و'][idx] || String.fromCharCode(65 + idx)
                : String.fromCharCode(65 + idx);
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctOptionIndex;

              let cardStyle =
                'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-900';
              let badgeStyle =
                'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300';

              if (isAnswered) {
                if (isSelected && isCorrect) {
                  cardStyle =
                    'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-100 font-bold ring-2 ring-emerald-500/30';
                  badgeStyle = 'border-emerald-500 bg-emerald-600 text-white';
                } else if (isSelected && !isCorrect) {
                  cardStyle =
                    'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-950 dark:text-rose-100 font-bold ring-2 ring-rose-500/30';
                  badgeStyle = 'border-rose-500 bg-rose-600 text-white';
                } else if (!isSelected && isCorrect) {
                  cardStyle =
                    'border-emerald-500/80 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold';
                  badgeStyle = 'border-emerald-500 bg-emerald-600 text-white';
                } else {
                  cardStyle =
                    'border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/30 text-slate-400 dark:text-slate-600 opacity-60';
                  badgeStyle =
                    'border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-400';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`group relative flex items-center gap-3.5 rounded-xl border p-4 text-left rtl:text-right transition-all select-none cursor-pointer ${cardStyle}`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border font-mono text-xs font-bold transition-colors ${badgeStyle}`}
                  >
                    {isAnswered && isCorrect ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : isAnswered && isSelected && !isCorrect ? (
                      <XCircle className="h-4 w-4" />
                    ) : (
                      letter
                    )}
                  </div>
                  <span className="flex-1 text-sm leading-snug">{option}</span>
                </button>
              );
            })}
          </div>

          {/* PRACTICE MODE: EXPLANATION CARD & MANUAL NEXT BUTTON */}
          {isAnswered && playMode === 'practice' && (
            <div className="mt-6 p-5 rounded-2xl border-2 border-sky-500/40 bg-sky-50/80 dark:bg-sky-950/40 text-right">
              <div className="flex items-center gap-2 mb-2 font-extrabold text-sm text-sky-800 dark:text-sky-300">
                <BookOpen className="h-4 w-4 text-sky-500" />
                <span>{t('explanationTitle')}</span>
              </div>

              <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed mb-4">
                {currentQ.explanation ? (
                  currentQ.explanation
                ) : (
                  <span>
                    {t('noExplanationGiven')}{' '}
                    <strong className="text-orange-500 font-bold">
                      ({currentQ.options[currentQ.correctOptionIndex]})
                    </strong>
                  </span>
                )}
              </p>

              <button
                type="button"
                onClick={() => advanceToNextQuestion(questionResults)}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
              >
                <span>{t('nextQuestionBtn')}</span>
                {isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
              </button>
            </div>
          )}

          {/* Feedback banner in Exam Mode */}
          {isAnswered && playMode === 'exam' && (
            <div
              className={`mt-6 rounded-xl border p-3.5 text-xs font-bold flex items-center justify-between transition-all ${
                lastAnswerCorrect
                  ? 'border-emerald-500/50 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
                  : 'border-rose-500/50 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300'
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
        </div>
      </div>
    );
  }

  // SUMMARY SCREEN
  const correctCount = questionResults.filter((r) => r.isCorrect).length;
  const accuracyPercent =
    questionResults.length > 0 ? Math.round((correctCount / questionResults.length) * 100) : 0;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      {/* Summary Card (Personal Mastery Focus - No Social Comparison) */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 text-center shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-emerald-600 text-white shadow-lg mb-4 text-2xl">
          {accuracyPercent >= 80 ? '🏆' : accuracyPercent >= 50 ? '⭐' : '🎯'}
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border mb-3 bg-indigo-50 dark:bg-indigo-950 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300">
          <span>{playMode === 'practice' ? '🎓 Practice Complete' : '⏱️ 30s Exam Complete'}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          {t('completedTitle')}
        </h1>

        <div className="my-6 max-w-xs mx-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 p-5">
          <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
            {t('finalScoreLabel')}
          </div>
          <div className="font-mono text-3xl font-black text-indigo-600 dark:text-indigo-400">
            {currentScore.toLocaleString()}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto my-6">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-3">
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{t('accuracyLabel')}</div>
            <div className="font-mono text-xl font-bold text-slate-900 dark:text-white mt-1">{accuracyPercent}%</div>
            <div className="text-[10px] text-slate-500">
              {t('accuracyCount', { correct: correctCount, total: questionResults.length })}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-3">
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{t('bestStreakLabel')}</div>
            <div className="font-mono text-xl font-bold text-amber-500 dark:text-amber-400 mt-1">
              {bestStreak} 🔥
            </div>
            <div className="text-[10px] text-slate-500">{t('inARowLabel')}</div>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-3">
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Mode</div>
            <div className="font-mono text-sm font-bold text-slate-900 dark:text-white mt-1">
              {playMode === 'practice' ? 'Practice' : 'Exam 30s'}
            </div>
            <div className="text-[10px] text-slate-500">{playMode === 'practice' ? 'Untimed' : 'Speed test'}</div>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-3">
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Total Questions</div>
            <div className="font-mono text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">
              {questionResults.length}
            </div>
            <div className="text-[10px] text-slate-500">Reviewed</div>
          </div>
        </div>

        {/* Action buttons (Personal navigation only - NO LEADERBOARD) */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800/80">
          <button
            type="button"
            onClick={handleStartQuiz}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-sm cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
            <span>{t('playAgainBtn')}</span>
          </button>

          <button
            type="button"
            onClick={() => setGameState('lobby')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <span>{t('backToLobbyBtn')}</span>
          </button>
        </div>
      </div>

      {/* QUESTION REVIEW WITH DETAILED EXPLANATIONS */}
      <div className="mt-8">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
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
                className={`rounded-2xl border p-4 sm:p-5 transition-colors ${
                  isCorrect
                    ? 'border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20'
                    : 'border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5 flex-1">
                    <span className="font-mono text-xs font-bold text-slate-400 mt-0.5">#{idx + 1}</span>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{res.questionText}</p>

                      <div className="mt-2 text-xs space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 dark:text-slate-400">{t('yourAnswerLabel')}</span>
                          <span
                            className={`font-semibold ${
                              isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'
                            }`}
                          >
                            {chosenAnswer}
                          </span>
                        </div>

                        {!isCorrect && (
                          <div className="flex items-center gap-2">
                            <span className="text-slate-500 dark:text-slate-400">{t('correctAnswerLabel')}</span>
                            <span className="text-emerald-700 dark:text-emerald-400 font-bold">{correctAnswer}</span>
                          </div>
                        )}
                      </div>

                      {/* Explanation in Review */}
                      {originalQ?.explanation && (
                        <div className="mt-3 p-3 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                          <strong className="text-emerald-600 dark:text-emerald-400 font-bold">
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
                        isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'
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
