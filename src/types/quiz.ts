export interface Question {
  id: string;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  explanation?: string;
}

export interface QuizSettings {
  timerSeconds: number; // e.g. 5, 10, 15, 20, 30, 45, 60, or custom
  questionCount: number; // 5, 10, 20, 30, 50, or 0 (all)
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  soundEnabled: boolean;
  buzzDelayMs: number;
}

export interface QuestionResult {
  questionId: string;
  questionText: string;
  options: string[];
  selectedOptionIndex: number; // -1 if timed out
  correctOptionIndex: number;
  isCorrect: boolean;
  timeSpentSeconds: number;
  pointsEarned?: number;
}

export interface QuizAttempt {
  id: string;
  profileId: string;
  profileName: string;
  timestamp: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  timedOutCount: number;
  score: number;
  bestStreak: number;
  totalTimeSeconds: number;
  accuracyPercent: number;
  timerSettingSeconds: number;
  difficultyTier?: string;
  difficultyMultiplier?: number;
  results: QuestionResult[];
}

export interface UserProfile {
  id: string;
  username: string;
  avatarColor: string;
  title: string;
  createdAt: number;
  totalQuizzes: number;
  totalCorrect: number;
  totalWrong: number;
  bestStreak: number;
  highScore: number;
  history: QuizAttempt[];
}

export interface LeaderboardEntry {
  id: string;
  profileId: string;
  username: string;
  avatarColor: string;
  title: string;
  score: number;
  accuracyPercent: number;
  bestStreak: number;
  durationSeconds: number;
  timerSeconds: number;
  difficultyTier?: string;
  difficultyMultiplier?: number;
  timestamp: number;
  isCurrentUser?: boolean;
}

export interface ParseResult {
  questions: Question[];
  errors: string[];
  warnings: string[];
}
