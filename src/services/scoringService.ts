export interface DifficultyConfig {
  tier: string;
  multiplier: number;
  basePoints: number;
  speedFactor: number;
  color: string;
  badgeBg: string;
  borderColor: string;
}

export const FIXED_TIMER_SECONDS = 30;

/**
 * Standard configuration for the fixed 30-second question timer.
 */
export function getTimerDifficulty(timerSeconds: number = FIXED_TIMER_SECONDS): DifficultyConfig {
  if (timerSeconds === 0) {
    return {
      tier: 'Practice Mode',
      multiplier: 1.0,
      basePoints: 100,
      speedFactor: 0,
      color: 'text-emerald-600 dark:text-emerald-400',
      badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300',
      borderColor: 'border-emerald-400 dark:border-emerald-500/80',
    };
  }

  return {
    tier: '30s Exam Challenge',
    multiplier: 1.5,
    basePoints: 200,
    speedFactor: 15, // Answers at 20s remaining get +300 speed bonus!
    color: 'text-indigo-600 dark:text-indigo-400',
    badgeBg: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300',
    borderColor: 'border-indigo-400 dark:border-indigo-500/80',
  };
}

/**
 * Calculates question score from timer remaining and streak.
 */
export function calculateQuestionScore(
  timerSeconds: number = FIXED_TIMER_SECONDS,
  timeRemaining: number,
  currentStreak: number
): { points: number; base: number; speedBonus: number; streakMultiplier: number } {
  if (timerSeconds === 0) {
    const base = 100;
    const streakMultiplier = 1 + Math.max(0, currentStreak - 1) * 0.1;
    const points = Math.round(base * streakMultiplier);
    return {
      points,
      base,
      speedBonus: 0,
      streakMultiplier,
    };
  }

  const diff = getTimerDifficulty(timerSeconds);
  const base = diff.basePoints;
  const speedBonus = Math.round(Math.max(0, timeRemaining) * diff.speedFactor);
  const streakMultiplier = 1 + Math.max(0, currentStreak - 1) * 0.15;
  const points = Math.round((base + speedBonus) * streakMultiplier);

  return {
    points,
    base,
    speedBonus,
    streakMultiplier,
  };
}
