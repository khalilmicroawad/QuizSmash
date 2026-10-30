import { Question, UserProfile, LeaderboardEntry, QuizAttempt, QuizSettings } from '../types/quiz';
import { DEFAULT_QUESTIONS } from '../data/defaultQuestions';

const STORAGE_KEYS = {
  QUESTIONS: 'quizpulse_questions_v3',
  PROFILES: 'quizpulse_profiles_v3',
  ACTIVE_PROFILE_ID: 'quizpulse_active_profile_id_v3',
  LEADERBOARD: 'quizpulse_leaderboard_v3',
  SETTINGS: 'quizpulse_settings_v3',
};

const SEED_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: 'lb_seed_1',
    profileId: 'seed_1',
    username: 'Dr. Sofia Chen',
    avatarColor: 'bg-emerald-500',
    title: 'Quiz Master',
    score: 2850,
    accuracyPercent: 100,
    bestStreak: 12,
    durationSeconds: 42,
    timerSeconds: 10,
    timestamp: Date.now() - 3600000 * 4,
  },
  {
    id: 'lb_seed_2',
    profileId: 'seed_2',
    username: 'Alex Rivera',
    avatarColor: 'bg-blue-500',
    title: 'Speed Champ',
    score: 2480,
    accuracyPercent: 92,
    bestStreak: 9,
    durationSeconds: 48,
    timerSeconds: 15,
    timestamp: Date.now() - 3600000 * 12,
  },
];

const DEFAULT_PROFILE: UserProfile = {
  id: 'profile_default',
  username: 'Dr. Khalil Awad',
  avatarColor: 'bg-indigo-600',
  title: 'Quiz Master',
  createdAt: Date.now(),
  totalQuizzes: 0,
  totalCorrect: 0,
  totalWrong: 0,
  bestStreak: 0,
  highScore: 0,
  history: [],
};

const DEFAULT_SETTINGS: QuizSettings = {
  timerSeconds: 30,
  questionCount: 0, // 0 = play all questions from the uploaded file
  shuffleQuestions: true, // appear randomly every time
  shuffleOptions: true, // answer places appear randomly every time
  soundEnabled: true,
  buzzDelayMs: 650,
};

export class StorageService {
  // --- Questions (Only user-uploaded questions) ---
  public static getQuestions(): Question[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
      if (!data) {
        return [];
      }
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  public static saveQuestions(questions: Question[]): void {
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
  }

  public static appendQuestions(newQuestions: Question[]): { total: number; added: number } {
    const existing = this.getQuestions();
    const existingTexts = new Set(existing.map((q) => q.questionText.trim().toLowerCase()));
    const filtered = newQuestions.filter((q) => !existingTexts.has(q.questionText.trim().toLowerCase()));
    const merged = [...existing, ...filtered];
    this.saveQuestions(merged);
    return { total: merged.length, added: filtered.length };
  }

  public static clearQuestions(): Question[] {
    localStorage.removeItem(STORAGE_KEYS.QUESTIONS);
    return [];
  }

  // --- Profiles ---
  public static getProfiles(): UserProfile[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILES);
      if (!data) {
        const initial = [DEFAULT_PROFILE];
        localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(initial));
        localStorage.setItem(STORAGE_KEYS.ACTIVE_PROFILE_ID, DEFAULT_PROFILE.id);
        return initial;
      }
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : [DEFAULT_PROFILE];
    } catch {
      return [DEFAULT_PROFILE];
    }
  }

  public static getActiveProfile(): UserProfile {
    const profiles = this.getProfiles();
    const activeId = localStorage.getItem(STORAGE_KEYS.ACTIVE_PROFILE_ID);
    const found = profiles.find((p) => p.id === activeId);
    return found || profiles[0] || DEFAULT_PROFILE;
  }

  public static setActiveProfileId(id: string): void {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_PROFILE_ID, id);
  }

  public static saveProfile(updated: UserProfile): void {
    const profiles = this.getProfiles();
    const index = profiles.findIndex((p) => p.id === updated.id);
    if (index >= 0) {
      profiles[index] = updated;
    } else {
      profiles.push(updated);
    }
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));
  }

  public static createProfile(username: string, title = 'Quiz Master', avatarColor = 'bg-violet-600'): UserProfile {
    const newProfile: UserProfile = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      username: username.trim() || 'New Player',
      avatarColor,
      title,
      createdAt: Date.now(),
      totalQuizzes: 0,
      totalCorrect: 0,
      totalWrong: 0,
      bestStreak: 0,
      highScore: 0,
      history: [],
    };
    const profiles = this.getProfiles();
    profiles.push(newProfile);
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));
    localStorage.setItem(STORAGE_KEYS.ACTIVE_PROFILE_ID, newProfile.id);
    return newProfile;
  }

  public static recordQuizAttempt(attempt: QuizAttempt): void {
    const profile = this.getActiveProfile();
    profile.totalQuizzes += 1;
    profile.totalCorrect += attempt.correctCount;
    profile.totalWrong += attempt.wrongCount + attempt.timedOutCount;
    profile.bestStreak = Math.max(profile.bestStreak, attempt.bestStreak);
    profile.highScore = Math.max(profile.highScore, attempt.score);

    profile.history = [attempt, ...(profile.history || [])].slice(0, 20);
    this.saveProfile(profile);

    this.addLeaderboardEntry({
      id: `lb_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      profileId: profile.id,
      username: profile.username,
      avatarColor: profile.avatarColor,
      title: profile.title,
      score: attempt.score,
      accuracyPercent: attempt.accuracyPercent,
      bestStreak: attempt.bestStreak,
      durationSeconds: attempt.totalTimeSeconds,
      timerSeconds: attempt.timerSettingSeconds,
      difficultyTier: attempt.difficultyTier,
      difficultyMultiplier: attempt.difficultyMultiplier,
      timestamp: attempt.timestamp,
      isCurrentUser: true,
    });
  }

  // --- Leaderboard ---
  public static getLeaderboard(): LeaderboardEntry[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(SEED_LEADERBOARD));
        return SEED_LEADERBOARD;
      }
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : SEED_LEADERBOARD;
    } catch {
      return SEED_LEADERBOARD;
    }
  }

  public static addLeaderboardEntry(entry: LeaderboardEntry): void {
    const list = this.getLeaderboard();
    list.push(entry);
    list.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.durationSeconds - b.durationSeconds;
    });
    localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(list.slice(0, 100)));
  }

  public static clearLeaderboard(): void {
    localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify([]));
  }

  // --- Settings ---
  public static getSettings(): QuizSettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (!data) return DEFAULT_SETTINGS;
      return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  public static saveSettings(settings: QuizSettings): void {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }
}
