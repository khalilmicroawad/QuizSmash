import { QuizAttempt, UserProfile } from '../types/quiz';

export interface SubjectMasteryInfo {
  subjectId: string;
  level: number; // 0 to 5
  titleEn: string;
  titleAr: string;
  badgeLabelEn: string;
  badgeLabelAr: string;
  totalCorrect: number;
  totalAnswered: number;
  accuracyPercent: number;
  sessionsCount: number;
  minCorrect: number;
  nextTarget: number | null;
  progressPercent: number; // 0 - 100
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  badgeIcon: 'seed' | 'bronze' | 'silver' | 'gold' | 'master' | 'crown';
}

// Mastery Levels Thresholds based on questions answered correctly in previous sessions:
// Level 0: 0 correct -> Novice / غير مصنف (0/15)
// Level 1: 1 - 15 correct -> Apprentice / متدرب (Target: 15)
// Level 2: 16 - 45 correct -> Scholar / دارس متمكن (Target: 45)
// Level 3: 46 - 80 correct -> Specialist / مختص متقدم (Target: 80)
// Level 4: 81 - 104 correct -> Master / خبير معتمد (Target: 105)
// Level 5: 105+ correct -> Grandmaster / أستاذ أول (Mastered All CNS MCQs)

const MASTERY_TIERS = [
  {
    level: 0,
    minCorrect: 0,
    nextTarget: 15,
    titleEn: 'Novice',
    titleAr: 'مبتدئ',
    badgeBg: 'bg-slate-50',
    badgeBorder: 'border-slate-200',
    badgeText: 'text-slate-600',
    badgeIcon: 'seed' as const,
  },
  {
    level: 1,
    minCorrect: 1,
    nextTarget: 15,
    titleEn: 'Apprentice',
    titleAr: 'متدرب',
    badgeBg: 'bg-emerald-50',
    badgeBorder: 'border-emerald-200',
    badgeText: 'text-emerald-700',
    badgeIcon: 'bronze' as const,
  },
  {
    level: 2,
    minCorrect: 16,
    nextTarget: 45,
    titleEn: 'Scholar',
    titleAr: 'دارس متمكن',
    badgeBg: 'bg-sky-50',
    badgeBorder: 'border-sky-200',
    badgeText: 'text-sky-700',
    badgeIcon: 'silver' as const,
  },
  {
    level: 3,
    minCorrect: 46,
    nextTarget: 80,
    titleEn: 'Specialist',
    titleAr: 'مختص متقدم',
    badgeBg: 'bg-amber-50',
    badgeBorder: 'border-amber-200',
    badgeText: 'text-amber-800',
    badgeIcon: 'gold' as const,
  },
  {
    level: 4,
    minCorrect: 81,
    nextTarget: 105,
    titleEn: 'Master',
    titleAr: 'خبير معتمد',
    badgeBg: 'bg-orange-50',
    badgeBorder: 'border-orange-300',
    badgeText: 'text-orange-700',
    badgeIcon: 'master' as const,
  },
  {
    level: 5,
    minCorrect: 105,
    nextTarget: null,
    titleEn: 'Grandmaster',
    titleAr: 'أستاذ أول',
    badgeBg: 'bg-gradient-to-r from-orange-500 to-amber-500',
    badgeBorder: 'border-orange-500',
    badgeText: 'text-white',
    badgeIcon: 'crown' as const,
  },
];

export class MasteryService {
  /**
   * Calculate mastery level for a specific dental subject based on previous session history.
   * If an attempt has no subjectId, it is attributed to 'general-human-anatomy' (the active CNS test subject).
   */
  public static calculateSubjectMastery(
    subjectId: string,
    history: QuizAttempt[] = []
  ): SubjectMasteryInfo {
    // Filter attempts belonging to this subject
    const subjectAttempts = history.filter((attempt) => {
      if (attempt.subjectId) {
        return attempt.subjectId === subjectId;
      }
      // Legacy attempts without subjectId default to general-human-anatomy
      return subjectId === 'general-human-anatomy';
    });

    const sessionsCount = subjectAttempts.length;
    const totalCorrect = subjectAttempts.reduce((acc, att) => acc + (att.correctCount || 0), 0);
    const totalAnswered = subjectAttempts.reduce((acc, att) => acc + (att.totalQuestions || 0), 0);
    const accuracyPercent = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

    // Determine tier based on total questions answered correctly in previous sessions
    let tierIndex = 0;
    if (totalCorrect === 0) {
      tierIndex = 0;
    } else if (totalCorrect < 16) {
      tierIndex = 1;
    } else if (totalCorrect < 46) {
      tierIndex = 2;
    } else if (totalCorrect < 81) {
      tierIndex = 3;
    } else if (totalCorrect < 105) {
      tierIndex = 4;
    } else {
      tierIndex = 5;
    }

    const tier = MASTERY_TIERS[tierIndex];

    // Compute progress percent towards next tier target
    let progressPercent = 0;
    if (tier.level === 0) {
      progressPercent = 0;
    } else if (tier.nextTarget === null) {
      progressPercent = 100;
    } else {
      const prevTarget = tierIndex === 1 ? 0 : MASTERY_TIERS[tierIndex - 1].nextTarget || 0;
      const targetDelta = tier.nextTarget - prevTarget;
      const currentDelta = Math.max(0, totalCorrect - prevTarget);
      progressPercent = Math.min(100, Math.round((currentDelta / targetDelta) * 100));
    }

    return {
      subjectId,
      level: tier.level,
      titleEn: tier.titleEn,
      titleAr: tier.titleAr,
      badgeLabelEn: `Mastery Level ${tier.level} · ${tier.titleEn}`,
      badgeLabelAr: `مستوى الإتقان ${tier.level} · ${tier.titleAr}`,
      totalCorrect,
      totalAnswered,
      accuracyPercent,
      sessionsCount,
      minCorrect: tier.minCorrect,
      nextTarget: tier.nextTarget,
      progressPercent,
      badgeBg: tier.badgeBg,
      badgeBorder: tier.badgeBorder,
      badgeText: tier.badgeText,
      badgeIcon: tier.badgeIcon,
    };
  }

  /**
   * Get all mastery levels for all dental faculty subjects at once
   */
  public static getAllSubjectsMastery(
    subjectIds: string[],
    history: QuizAttempt[] = []
  ): Record<string, SubjectMasteryInfo> {
    const map: Record<string, SubjectMasteryInfo> = {};
    for (const id of subjectIds) {
      map[id] = this.calculateSubjectMastery(id, history);
    }
    return map;
  }
}
