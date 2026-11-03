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
  X,
  Trophy,
  Monitor,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Question, QuizSettings, QuizAttempt, QuestionResult, UserProfile } from '../types/quiz';
import { sound } from '../services/soundService';
import { StorageService } from '../services/storageService';
import { getTimerDifficulty, calculateQuestionScore, FIXED_TIMER_SECONDS } from '../services/scoringService';
import { useLanguage } from '../context/LanguageContext';
import { fetchCnsTestQuestions } from '../services/cnsTestService';
import { fetchComputerTestQuestions } from '../services/computerTestService';

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
  activeSubjectId?: string;
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
  activeSubjectId,
}) => {
  const { t, isRTL, language } = useLanguage();

  // 2 Playing Modes: 'exam' (30 sec per question countdown) | 'practice' (no timer, with explanation)
  const [playMode, setPlayMode] = useState<'practice' | 'exam'>('exam');

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

  // Timer per question state (used only in Exam Mode: 30 to 0 countdown)
  const [timeRemaining, setTimeRemaining] = useState<number>(FIXED_TIMER_SECONDS);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const quizStartTimeRef = useRef<number>(Date.now());
  const timerRef = useRef<number | null>(null);
  const advanceTimeoutRef = useRef<number | null>(null);
  const hasTimedOutRef = useRef<boolean>(false);
  const lastTickedSecondRef = useRef<number>(FIXED_TIMER_SECONDS);

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
  const handleStartQuiz = (modeOverride?: 'practice' | 'exam') => {
    if (questions.length === 0) return;

    const targetMode = modeOverride || playMode;
    if (modeOverride) {
      setPlayMode(modeOverride);
    }

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
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    hasTimedOutRef.current = false;
    lastTickedSecondRef.current = FIXED_TIMER_SECONDS;
    setTimeRemaining(targetMode === 'exam' ? FIXED_TIMER_SECONDS : 0);
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
        subjectId: activeSubjectId || 'general-human-anatomy',
        subjectName: activeSubjectName || 'General Human Anatomy',
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
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        hasTimedOutRef.current = false;
        lastTickedSecondRef.current = FIXED_TIMER_SECONDS;
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

  // Rock-solid 30-to-0 seconds countdown for Exam Mode based on wall-clock elapsed time
  useEffect(() => {
    if (gameState !== 'playing' || isAnswered || playMode !== 'exam') {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    const intervalId = window.setInterval(() => {
      const elapsedMs = Date.now() - questionStartTime;
      const elapsedSec = Math.floor(elapsedMs / 1000);
      const remaining = Math.max(0, FIXED_TIMER_SECONDS - elapsedSec);

      setTimeRemaining(remaining);

      // Play tick sound once per second when reaching 4, 3, 2, 1
      if (remaining <= 4 && remaining >= 1 && lastTickedSecondRef.current !== remaining) {
        lastTickedSecondRef.current = remaining;
        if (soundEnabled) {
          sound.playTick();
        }
      }

      // Trigger timeout exactly when reaching 0
      if (remaining <= 0 && !hasTimedOutRef.current) {
        hasTimedOutRef.current = true;
        clearInterval(intervalId);
        if (timerRef.current === intervalId) {
          timerRef.current = null;
        }
        handleTimeout();
      }
    }, 100);

    timerRef.current = intervalId;

    return () => {
      clearInterval(intervalId);
      if (timerRef.current === intervalId) {
        timerRef.current = null;
      }
    };
  }, [gameState, isAnswered, currentIndex, questionStartTime, playMode, soundEnabled, handleTimeout]);

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

  // Computer MCQ Loader handler (Fetches from Supabase storage)
  const handleLoadComputerTest = async () => {
    setIsLoadingCns(true);
    setInlineUploadError(null);
    setCnsSuccessMessage(null);
    try {
      const { questions: compQuestions, count } = await fetchComputerTestQuestions();
      if (onQuestionsUploaded) {
        onQuestionsUploaded(compQuestions);
      }
      setCnsSuccessMessage(
        isRTL
          ? `تم بنجاح تحميل اختبار الحاسوب (${count} سؤال)!`
          : `Computer MCQs loaded successfully (${count} questions)!`
      );
    } catch (err: any) {
      setInlineUploadError(err.message || 'Failed to download Computer MCQ file from Supabase.');
    } finally {
      setIsLoadingCns(false);
    }
  };

  const currentQ = quizQuestions[currentIndex];

  const timerPercent = playMode === 'exam' ? Math.max(0, Math.min(100, (timeRemaining / FIXED_TIMER_SECONDS) * 100)) : 100;
  const isUrgentTime = playMode === 'exam' && timeRemaining <= 5;
  const isWarningTime = playMode === 'exam' && timeRemaining <= 10 && !isUrgentTime;

  // LOBBY SCREEN (MATCHING SCREENSHOT 1)
  if (gameState === 'lobby') {
    const recentAttempts = activeProfile.history || [];

    return (
      <div className="mx-auto max-w-xl px-4 py-8 sm:px-6">
        {/* TOP BAR: ROUND CIRCULAR BACK BUTTON */}
        {onNavigateToSubjects && (
          <div className="mb-6">
            <button
              type="button"
              onClick={onNavigateToSubjects}
              className="w-11 h-11 rounded-full border border-slate-200/90 bg-white shadow-xs flex items-center justify-center text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
              title={isRTL ? 'الرجوع إلى المواد' : 'Back to subjects'}
            >
              {isRTL ? <ArrowRight className="w-5 h-5 text-slate-800" /> : <ArrowLeft className="w-5 h-5 text-slate-800" />}
            </button>
          </div>
        )}

        {/* SUBTITLE TRACKER (MATCHING "5 QUESTIONS" IN SCREENSHOT 1) */}
        <div className="text-xs uppercase tracking-widest font-extrabold text-[#5B51D8] mb-2">
          {questions.length || 100} {isRTL ? 'أسئلة' : 'QUESTIONS'}
        </div>

        {/* MAIN SUBJECT TITLE (MATCHING "tgxt" IN SCREENSHOT 1) */}
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-8">
          {activeSubjectName || (isRTL ? 'كلية طب الأسنان (المرحلة الأولى)' : 'Dental faculty (first level)')}
        </h1>

        {/* TWO PRIMARY MODE CARDS: STUDY MODE & EXAM MODE */}
        <div className="space-y-4">
          {/* CARD 1: STUDY MODE (SOFT MINT GREEN CARD) */}
          <button
            type="button"
            onClick={() => handleStartQuiz('practice')}
            className="w-full text-left rtl:text-right p-6 sm:p-7 rounded-[28px] border border-[#B7F0D8] bg-[#EFFCF6] hover:bg-[#E6F9F0] transition-all cursor-pointer shadow-xs group block"
          >
            <div className="flex items-center gap-2.5 text-[#059669] mb-2.5">
              <BookOpen className="w-5 h-5 stroke-[2.5]" />
              <span className="font-black text-xl text-[#064E3B]">
                {isRTL ? 'وضع التدريب' : 'Study mode'}
              </span>
            </div>
            <p className="text-sm sm:text-base text-[#065F46]/80 font-medium mb-6">
              {isRTL
                ? 'بدون مؤقت زمني. شروحات وتغذية راجعة فورية بعد كل إجابة.'
                : 'No timer. Instant feedback on every answer.'}
            </p>
            <div className="inline-flex items-center gap-2 text-sm sm:text-base font-black text-[#059669] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
              <span>{isRTL ? 'ابدأ التدريب ←' : 'Start studying →'}</span>
            </div>
          </button>

          {/* CARD 2: EXAM MODE (SOFT PASTEL LAVENDER CARD) */}
          <button
            type="button"
            onClick={() => handleStartQuiz('exam')}
            className="w-full text-left rtl:text-right p-6 sm:p-7 rounded-[28px] border border-[#DDD6FE] bg-[#F5F3FF] hover:bg-[#EDE9FE] transition-all cursor-pointer shadow-xs group block"
          >
            <div className="flex items-center gap-2.5 text-[#7C3AED] mb-2.5">
              <Timer className="w-5 h-5 stroke-[2.5]" />
              <span className="font-black text-xl text-[#2E1065]">
                {isRTL ? 'وضع الامتحان' : 'Exam mode'}
              </span>
            </div>
            <p className="text-sm sm:text-base text-[#5B21B6]/80 font-medium mb-6">
              {isRTL
                ? '30 ثانية لكل سؤال. حساب النتيجة في النهاية.'
                : '30 seconds each. Score at the end.'}
            </p>
            <div className="inline-flex items-center gap-2 text-sm sm:text-base font-black text-[#7C3AED] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
              <span>{isRTL ? 'ابدأ الامتحان ←' : 'Start exam →'}</span>
            </div>
          </button>
        </div>

        {/* Quick test loaders (CNS & Computer) */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 font-semibold pt-4 px-1">
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={isLoadingCns}
              onClick={handleLoadComputerTest}
              className="hover:text-slate-700 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Monitor className="w-3.5 h-3.5 text-slate-500" />
              <span>{isLoadingCns ? '...' : isRTL ? 'تحميل الحاسوب (60)' : 'Load Computer (60)'}</span>
            </button>
            <span className="text-slate-300">·</span>
            <button
              type="button"
              disabled={isLoadingCns}
              onClick={handleLoadCnsTest}
              className="hover:text-slate-700 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Brain className="w-3.5 h-3.5 text-slate-500" />
              <span>{isLoadingCns ? '...' : isRTL ? 'تحميل CNS (105)' : 'Load CNS (105)'}</span>
            </button>
          </div>
          <span className="flex items-center gap-1">
            <Shuffle className="w-3.5 h-3.5" />
            <span>{isRTL ? 'ترتيب عشوائي' : 'Randomized'}</span>
          </span>
        </div>

        {cnsSuccessMessage && (
          <p className="mt-3 text-xs text-center text-emerald-800 font-bold bg-[#DCFCE7] border border-[#BBF7D0] p-3 rounded-2xl">
            {cnsSuccessMessage}
          </p>
        )}

        {/* SECTION: RECENT RESULTS (MATCHING SCREENSHOT 1) */}
        <div className="mt-10">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4">
            {isRTL ? 'النتائج الأخيرة' : 'Recent results'}
          </h2>

          <div className="rounded-[24px] border border-slate-200/80 bg-white shadow-xs divide-y divide-slate-100 overflow-hidden">
            {recentAttempts.length > 0 ? (
              recentAttempts.slice(0, 5).map((att, idx) => {
                const isExam = att.timerSettingSeconds > 0;
                const timeDiffMs = Date.now() - att.timestamp;
                let timeAgo = 'less than a minute ago';
                if (timeDiffMs < 60000) timeAgo = 'less than a minute ago';
                else if (timeDiffMs < 3600000) timeAgo = `${Math.floor(timeDiffMs / 60000)}m ago`;
                else if (timeDiffMs < 86400000) timeAgo = `${Math.floor(timeDiffMs / 3600000)}h ago`;
                else timeAgo = `${Math.floor(timeDiffMs / 86400000)} days ago`;

                return (
                  <div key={idx} className="p-4 sm:p-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                          isExam ? 'bg-[#F5F3FF] text-[#7C3AED]' : 'bg-[#EFFCF6] text-[#059669]'
                        }`}
                      >
                        {isExam ? <Clock className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-black text-slate-900 text-base">
                            {att.correctCount}/{att.totalQuestions} correct
                          </span>
                          <span className="text-slate-400 font-bold text-sm">
                            {att.accuracyPercent}%
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 font-medium mt-0.5">
                          {isExam ? 'Exam' : 'Study'} · {timeAgo}
                        </div>
                      </div>
                    </div>
                    <Trophy className="w-5 h-5 text-amber-500 shrink-0" />
                  </div>
                );
              })
            ) : (
              /* Reference screenshot samples if no history yet */
              <>
                <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-[#F5F3FF] text-[#7C3AED] flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-black text-slate-900 text-base">4/5 correct</span>
                        <span className="text-slate-400 font-bold text-sm">80%</span>
                      </div>
                      <div className="text-xs text-slate-400 font-medium mt-0.5">
                        Exam · less than a minute ago
                      </div>
                    </div>
                  </div>
                  <Trophy className="w-5 h-5 text-amber-500 shrink-0" />
                </div>

                <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-[#F5F3FF] text-[#7C3AED] flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-black text-slate-900 text-base">5/5 correct</span>
                        <span className="text-slate-400 font-bold text-sm">100%</span>
                      </div>
                      <div className="text-xs text-slate-400 font-medium mt-0.5">
                        Exam · 2 days ago
                      </div>
                    </div>
                  </div>
                  <Trophy className="w-5 h-5 text-amber-500 shrink-0" />
                </div>

                <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-[#EFFCF6] text-[#059669] flex items-center justify-center shrink-0">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-black text-slate-900 text-base">4/5 correct</span>
                        <span className="text-slate-400 font-bold text-sm">80%</span>
                      </div>
                      <div className="text-xs text-slate-400 font-medium mt-0.5">
                        Study · 2 days ago
                      </div>
                    </div>
                  </div>
                  <Trophy className="w-5 h-5 text-amber-500 shrink-0" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // GAMEPLAY SCREEN (MATCHING SCREENSHOT 2)
  if (gameState === 'playing' && currentQ) {
    const potentialBonus =
      playMode === 'exam' ? Math.round(Math.max(0, timeRemaining) * activeDifficulty.speedFactor) : 0;

    return (
      <div className="mx-auto max-w-xl px-4 py-8 sm:px-6">
        {/* TOP BAR: CIRCULAR BACK BUTTON, MODE PILL, QUESTION COUNTER */}
        <div className="flex items-center justify-between gap-4 mb-3">
          <button
            type="button"
            onClick={() => setGameState('lobby')}
            className="w-11 h-11 rounded-full border border-slate-200/90 bg-white shadow-xs flex items-center justify-center text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer shrink-0"
            title={isRTL ? 'الرجوع إلى الساحة' : 'Back to lobby'}
          >
            {isRTL ? <ArrowRight className="w-5 h-5 text-slate-800" /> : <ArrowLeft className="w-5 h-5 text-slate-800" />}
          </button>

          {/* Mode Pill Badge (Matching "STUDY" in Screenshot 2) */}
          {playMode === 'practice' ? (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#E6F9F0] text-[#059669] border border-[#B7F0D8]">
              <BookOpen className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{isRTL ? 'تدريب' : 'STUDY'}</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#F3E8FF] text-[#7C3AED] border border-[#DDD6FE]">
              <Timer className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{isRTL ? 'امتحان 30ث' : 'EXAM 30s'}</span>
            </div>
          )}

          {/* Question counter (Matching "1/5" in Screenshot 2) */}
          <span className="text-sm font-bold text-slate-400">
            {currentIndex + 1}/{quizQuestions.length}
          </span>
        </div>

        {/* THIN PROGRESS BAR DIRECTLY BELOW HEADER */}
        <div className="h-1 w-full bg-slate-200/80 rounded-full overflow-hidden my-4">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              playMode === 'exam' ? 'bg-[#7C3AED]' : 'bg-slate-400'
            }`}
            style={{
              width: `${
                playMode === 'exam'
                  ? Math.max(0, timerPercent)
                  : ((currentIndex + 1) / quizQuestions.length) * 100
              }%`,
            }}
          />
        </div>

        {/* EXAM MODE 30 TO 0 SECONDS COUNTDOWN HERO */}
        {playMode === 'exam' && (
          <div
            className={`flex items-center justify-between px-4 py-2.5 rounded-2xl mb-5 transition-all duration-300 ${
              isUrgentTime
                ? 'bg-rose-50 border-2 border-rose-300 shadow-sm text-rose-700'
                : isWarningTime
                ? 'bg-amber-50 border-2 border-amber-200 text-amber-700'
                : 'bg-[#F5F3FF] border border-[#DDD6FE] text-[#7C3AED]'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider">
              <Clock
                className={`w-4 h-4 ${
                  isUrgentTime ? 'text-rose-600 animate-pulse' : ''
                }`}
              />
              <span>
                {isUrgentTime
                  ? (isRTL ? 'الوقت ينفد بسرعة!' : 'Final Seconds!')
                  : (isRTL ? 'مؤقت الامتحان: 30 إلى 0 ثانية' : 'Exam Timer: 30 to 0s')}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold opacity-80">
                +{potentialBonus} pts
              </span>
              <span
                className={`font-mono text-xl font-black ${
                  isUrgentTime ? 'text-rose-600 animate-bounce' : ''
                }`}
              >
                {timeRemaining}s
              </span>
            </div>
          </div>
        )}

        {/* QUESTION PROMPT (MATCHING SCREENSHOT 2) */}
        <div className="mb-8">
          <div className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-2">
            {isRTL ? `السؤال ${currentIndex + 1}` : `QUESTION ${currentIndex + 1}`}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug tracking-tight">
            {currentQ.questionText}
          </h2>
        </div>

        {/* OPTIONS VERTICAL STACK (MATCHING SCREENSHOT 2) */}
        <div className="space-y-3.5">
          {currentQ.options.map((option, idx) => {
            const letter = String.fromCharCode(65 + idx);
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctOptionIndex;

            let cardStyle =
              'border-slate-200/90 bg-white text-slate-600 hover:border-slate-300';
            let badgeStyle = 'bg-slate-100 text-slate-400';
            let icon: React.ReactNode = letter;

            if (isAnswered) {
              if (isCorrect) {
                cardStyle = 'border-[#059669] border-2 bg-[#F0FDF4] text-slate-900 font-bold';
                badgeStyle = 'bg-[#059669] text-white';
                icon = <Check className="w-5 h-5 stroke-[3]" />;
              } else if (isSelected && !isCorrect) {
                cardStyle = 'border-[#EF4444] border-2 bg-[#FEF2F2] text-slate-900 font-bold';
                badgeStyle = 'bg-[#EF4444] text-white';
                icon = <X className="w-5 h-5 stroke-[3]" />;
              } else {
                cardStyle = 'border-slate-200/50 bg-white/50 text-slate-300 opacity-60';
                badgeStyle = 'bg-slate-100 text-slate-300';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`w-full rounded-2xl border-2 p-4 sm:p-5 flex items-center gap-4 transition-all text-left rtl:text-right cursor-pointer select-none ${cardStyle}`}
              >
                <div
                  className={`w-10 h-10 rounded-xl font-bold flex items-center justify-center shrink-0 transition-colors ${badgeStyle}`}
                >
                  {icon}
                </div>
                <span className="flex-1 text-base sm:text-lg font-semibold leading-snug">
                  {option}
                </span>
              </button>
            );
          })}
        </div>

        {/* FEEDBACK BOX (MATCHING "Not quite" IN SCREENSHOT 2) */}
        {isAnswered && (
          <div>
            {lastAnswerCorrect ? (
              <div className="rounded-2xl bg-[#DCFCE7]/70 border border-[#BBF7D0] p-4 sm:p-5 mt-6 flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-full bg-[#059669] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-[#14532D] text-base">
                    {isRTL ? 'إجابة صحيحة!' : 'Correct!'}
                  </h3>
                  <p className="text-slate-700 text-sm mt-0.5 leading-relaxed">
                    {currentQ.explanation
                      ? currentQ.explanation
                      : isRTL
                      ? `الإجابة هي ${currentQ.options[currentQ.correctOptionIndex]}.`
                      : `The answer is ${currentQ.options[currentQ.correctOptionIndex]}.`}
                  </p>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl bg-[#FEE2E2]/70 border border-[#FECACA] p-4 sm:p-5 mt-6 flex items-start gap-3.5">
                <div className="w-7 h-7 rounded-full bg-[#EF4444] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-4 h-4 stroke-[3]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-[#991B1B] text-base">
                    {isRTL ? 'إجابة غير صحيحة' : 'Not quite'}
                  </h3>
                  <p className="text-slate-700 text-sm mt-0.5 leading-relaxed">
                    {isRTL ? 'الإجابة هي ' : 'The answer is '}
                    <strong className="font-bold text-slate-900">
                      {currentQ.options[currentQ.correctOptionIndex]}
                    </strong>
                    .{currentQ.explanation ? ` ${currentQ.explanation}` : ''}
                  </p>
                </div>
              </div>
            )}

            {/* BOTTOM NEXT QUESTION BUTTON (MATCHING SCREENSHOT 2) */}
            <button
              type="button"
              onClick={() => advanceToNextQuestion(questionResults)}
              className="w-full py-4 px-6 rounded-2xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-black text-base shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99] mt-6"
            >
              <span>{isRTL ? 'السؤال التالي ←' : 'Next question →'}</span>
            </button>
          </div>
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

      {/* SECTION 3: ACTION BUTTONS */}
      <div className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-xs flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => handleStartQuiz()}
          className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm bg-[#4F46E5] hover:bg-[#4338CA] text-white font-black flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-indigo-500/20 transition-all"
        >
          <RotateCcw className="h-4 w-4" />
          <span>{t('playAgainBtn')}</span>
        </button>

        <button
          type="button"
          onClick={() => setGameState('lobby')}
          className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-bold bg-white flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <span>{t('backToLobbyBtn')}</span>
        </button>

        {onNavigateToSubjects && (
          <button
            type="button"
            onClick={onNavigateToSubjects}
            className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm border border-[#DDD6FE] bg-[#F5F3FF] text-[#7C3AED] hover:bg-[#EDE9FE] font-black flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <GraduationCap className="h-4 w-4 text-[#7C3AED]" />
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
