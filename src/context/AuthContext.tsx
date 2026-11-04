import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient.js';
import {
  COURSE_1_ACCESS_CODES_100,
  normalizeAccessCode,
  isCourse1AccessCode,
  is13FigureFormat,
} from '../data/course1Codes';
import { CourseCodeService } from '../services/courseCodeService';
import { UserAccessTrackerService, UserAccessRecord } from '../services/userAccessTrackerService';

export interface AccessState {
  isUnlocked: boolean;
  isPermanent: boolean;
  hasSubscription: boolean;
  firstActivatedAt: number | null;
  trialExpiresAt: number | null;
  lastCodeUsed?: string;
  allowedCourse?: string; // e.g. 'stage-1'
  maxLogins: number; // 100 logins
  usedLogins: number; // Counter of times user used service
  lastLoginDateString?: string; // YYYY-MM-DD
  lastLoginTimestamp?: number;
}

interface AuthContextType {
  user: User | null;
  isUnlocked: boolean;
  isPermanent: boolean;
  hasSubscription: boolean;
  allowedCourse?: string;
  isTrialActive: boolean;
  trialExpiresAt: number | null;
  timeLeftFormatted: string;
  secondsRemaining: number;
  maxLogins: number;
  usedLogins: number;
  remainingLogins: number;
  // User Access Tracking based on unique identifier
  remainingAttempts: number;
  accessedCount: number;
  maxAttempts: number;
  accessRecord: UserAccessRecord | null;
  refreshAccessTracking: () => Promise<void>;
  dailyLoginExpiredNotice: boolean;
  dismissDailyNotice: () => void;
  ownerWhatsApp: string;
  isLoading: boolean;
  submitAccessCode: (
    code: string,
    targetCourseId?: string
  ) => Promise<{ success: boolean; type: 'trial' | 'subscription' | 'invalid'; message: string }>;
  activate2DayTrial: (code?: string, targetCourseId?: string) => void;
  activate24HourTrial: (code?: string, targetCourseId?: string) => void; // Backward compatibility alias
  unlockSubscription100: (code?: string, targetCourseId?: string) => void;
  unlockPermanent: (code?: string, targetCourseId?: string) => void; // Backward compatibility alias
  setOwnerWhatsApp: (phone: string) => void;
  lockApp: () => void;
  signOutUser: () => Promise<void>;
  testFastForwardExpired: () => void;
  testResetTrial: () => void;
  testSimulateNewDay: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_ACCESS_PREFIX = 'quiz_smash_user_access_v6_';
const LOCAL_WHATSAPP_KEY = 'quiz_smash_owner_whatsapp_v6';

// Default owner WhatsApp number (can be edited in app by owner)
export const DEFAULT_WHATSAPP_NUMBER = '9647700000000';
export const PRICE_IQD = '20,000 IQD';
export const MAX_SUBSCRIPTION_LOGINS = 100;

// 2 Days = 48 Hours
export const DURATION_48_HOURS_MS = 2 * 24 * 60 * 60 * 1000;

// Accepted codes list
const TRIAL_CODES = [
  'TRIAL',
  'TRIAL48',
  'FREE',
  'FREE48',
  'START',
  'TEST48',
  '2DAY',
  '2DAYS',
  '48H',
  '48HOUR',
  'TRIAL24',
  'FREE24',
];

const SUBSCRIPTION_CODES = [
  '100',
  '100LOGINS',
  'SUB100',
  '20000',
  '20000IQD',
  '20K',
  '20KIQD',
  'VIP',
  'VIP2026',
  'SMASH20K',
  'UNLIMITED',
  'PAID',
  'IQD20000',
  'DRKHALIL',
];

const getTodayDateString = (): string => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dailyLoginExpiredNotice, setDailyLoginExpiredNotice] = useState<boolean>(false);
  const [accessRecord, setAccessRecord] = useState<UserAccessRecord | null>(null);

  const [access, setAccess] = useState<AccessState>({
    isUnlocked: false,
    isPermanent: false,
    hasSubscription: false,
    firstActivatedAt: null,
    trialExpiresAt: null,
    maxLogins: MAX_SUBSCRIPTION_LOGINS,
    usedLogins: 0,
  });

  const [ownerWhatsApp, setOwnerWhatsAppState] = useState<string>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_WHATSAPP_KEY);
      if (stored) return stored;
    } catch {
      // Ignore
    }
    return DEFAULT_WHATSAPP_NUMBER;
  });

  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);

  const refreshAccessTracking = async () => {
    if (user?.id) {
      const rec = await UserAccessTrackerService.recordAccess(user.id, user.email || undefined);
      setAccessRecord(rec);
    }
  };

  // Load user access state helper
  const loadUserAccess = (userId: string): AccessState => {
    try {
      const stored = localStorage.getItem(`${LOCAL_ACCESS_PREFIX}${userId}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          maxLogins: MAX_SUBSCRIPTION_LOGINS,
          usedLogins: 0,
          hasSubscription: false,
          ...parsed,
        };
      }
    } catch {
      // Ignore
    }
    return {
      isUnlocked: false,
      isPermanent: false,
      hasSubscription: false,
      firstActivatedAt: null,
      trialExpiresAt: null,
      maxLogins: MAX_SUBSCRIPTION_LOGINS,
      usedLogins: 0,
    };
  };

  // Save access state
  const saveAccess = (newState: AccessState, targetUser = user) => {
    setAccess(newState);
    if (targetUser?.id) {
      try {
        localStorage.setItem(`${LOCAL_ACCESS_PREFIX}${targetUser.id}`, JSON.stringify(newState));
      } catch {
        // Ignore
      }
    }
  };

  // Record a daily login session usage for 100-login subscription counter
  const recordDailyLoginUsage = (currentAccess: AccessState, userId: string): AccessState => {
    const today = getTodayDateString();
    const sessionKey = `quiz_smash_session_day_${userId}`;
    const storedSessionDay = sessionStorage.getItem(sessionKey);

    // If it's a new day or session hasn't been recorded yet for today
    if (currentAccess.lastLoginDateString !== today || storedSessionDay !== today) {
      const nextUsed = (currentAccess.usedLogins || 0) + 1;
      const isExhausted = currentAccess.hasSubscription && nextUsed > currentAccess.maxLogins;

      const updated: AccessState = {
        ...currentAccess,
        usedLogins: nextUsed,
        lastLoginDateString: today,
        lastLoginTimestamp: Date.now(),
        // If 100 logins reached, subscription is exhausted
        isUnlocked: isExhausted ? false : currentAccess.isUnlocked,
      };

      sessionStorage.setItem(sessionKey, today);
      try {
        localStorage.setItem(`${LOCAL_ACCESS_PREFIX}${userId}`, JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    }
    return currentAccess;
  };

  // Initialize Supabase Auth Session and enforce daily login
  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!isMounted) return;
      if (session?.user) {
        const today = getTodayDateString();
        const userAccess = loadUserAccess(session.user.id);
        const sessionKey = `quiz_smash_session_day_${session.user.id}`;
        const storedSessionDay = sessionStorage.getItem(sessionKey);

        // REQUIREMENT: Everyday the site will force the user to login again!
        // If user logged in on a previous day and hasn't logged in today, force logout!
        if (userAccess.lastLoginDateString && userAccess.lastLoginDateString !== today && storedSessionDay !== today) {
          try {
            await supabase.auth.signOut();
          } catch {
            // Ignore
          }
          if (!isMounted) return;
          setUser(null);
          setDailyLoginExpiredNotice(true);
          if (window.location.pathname !== '/login') {
            window.history.replaceState({}, '', '/login');
          }
          setIsLoading(false);
          return;
        }

        // Active valid session for today: record login usage and update state
        const updated = recordDailyLoginUsage(userAccess, session.user.id);
        setUser(session.user);
        setAccess(updated);
        UserAccessTrackerService.recordAccess(session.user.id, session.user.email || undefined).then((rec) => {
          if (isMounted) setAccessRecord(rec);
        });

        if (window.location.pathname === '/login') {
          window.history.replaceState({}, '', '/');
        }
      } else {
        setUser(null);
        setAccessRecord(null);
        if (window.location.pathname !== '/login') {
          window.history.replaceState({}, '', '/login');
        }
      }
      setIsLoading(false);
    }).catch(() => {
      if (isMounted) {
        setUser(null);
        setAccessRecord(null);
        if (window.location.pathname !== '/login') {
          window.history.replaceState({}, '', '/login');
        }
        setIsLoading(false);
      }
    });

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!isMounted) return;
      if (session?.user) {
        const userAccess = loadUserAccess(session.user.id);
        const updated = recordDailyLoginUsage(userAccess, session.user.id);
        setUser(session.user);
        setAccess(updated);
        setDailyLoginExpiredNotice(false);
        UserAccessTrackerService.recordAccess(session.user.id, session.user.email || undefined).then((rec) => {
          if (isMounted) setAccessRecord(rec);
        });

        if (window.location.pathname === '/login') {
          window.history.replaceState({}, '', '/');
        }
      } else {
        setUser(null);
        setAccessRecord(null);
        setAccess({
          isUnlocked: false,
          isPermanent: false,
          hasSubscription: false,
          firstActivatedAt: null,
          trialExpiresAt: null,
          maxLogins: MAX_SUBSCRIPTION_LOGINS,
          usedLogins: 0,
        });
        if (window.location.pathname !== '/login') {
          window.history.replaceState({}, '', '/login');
        }
      }
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const setOwnerWhatsApp = (phone: string) => {
    const cleaned = phone.replace(/[^0-9]/g, '');
    setOwnerWhatsAppState(cleaned);
    try {
      localStorage.setItem(LOCAL_WHATSAPP_KEY, cleaned);
    } catch {
      // Ignore
    }
  };

  // 1-second countdown loop for trial
  useEffect(() => {
    if (access.isPermanent || access.hasSubscription) {
      setSecondsRemaining(999999);
      return;
    }

    if (!access.trialExpiresAt) {
      setSecondsRemaining(0);
      return;
    }

    const checkTimer = () => {
      const now = Date.now();
      const diffMs = access.trialExpiresAt! - now;
      const secs = Math.max(0, Math.floor(diffMs / 1000));
      setSecondsRemaining(secs);

      // If expired, ensure unlocked is updated
      if (secs <= 0 && access.isUnlocked && !access.isPermanent && !access.hasSubscription) {
        saveAccess({
          ...access,
          isUnlocked: false,
        });
      }
    };

    checkTimer();
    const interval = setInterval(checkTimer, 1000);
    return () => clearInterval(interval);
  }, [access, user]);

  const hasSubscription = Boolean(access.hasSubscription);
  const isPermanent = Boolean(access.isPermanent || access.hasSubscription);
  const isTrialActive = Boolean(!isPermanent && access.trialExpiresAt && secondsRemaining > 0);
  const isLoginsExhausted = hasSubscription && access.usedLogins > access.maxLogins;
  const isUnlocked = (isPermanent || isTrialActive) && !isLoginsExhausted;

  // Format remaining time: "2d 0h", "1d 18h", "23h 45m" or "12m 30s"
  const formatTimeLeft = (totalSeconds: number): string => {
    if (isPermanent) return 'Subscription Active';
    if (totalSeconds <= 0) return 'Expired';

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (days > 0) {
      return `${days}d ${hours}h`;
    }
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m ${seconds}s`;
  };

  // Submit code logic (Supports 100 13-figure codes for Course 1, subscription, & trial)
  const submitAccessCode = async (rawCode: string, targetCourseId?: string) => {
    const cleaned = normalizeAccessCode(rawCode);
    const code = rawCode.trim().toUpperCase();
    const now = Date.now();
    const today = getTodayDateString();

    // 1. Check if input is a 13-figure code or in Course 1 codes list
    if (is13FigureFormat(cleaned) || isCourse1AccessCode(cleaned)) {
      const validation = await CourseCodeService.validateAndRedeemCode(
        cleaned,
        targetCourseId || 'stage-1',
        user?.id,
        user?.email
      );

      if (!validation.isValid) {
        return {
          success: false,
          type: 'invalid' as const,
          message: validation.errorMessage || 'الكود غير صالح.',
        };
      }

      const currentUsed = access.usedLogins > 0 ? access.usedLogins : 1;
      const newState: AccessState = {
        isUnlocked: true,
        isPermanent: true,
        hasSubscription: true,
        allowedCourse: 'stage-1',
        firstActivatedAt: access.firstActivatedAt || now,
        trialExpiresAt: null,
        lastCodeUsed: cleaned,
        maxLogins: 100,
        usedLogins: currentUsed,
        lastLoginDateString: today,
        lastLoginTimestamp: now,
      };

      if (user?.id) {
        sessionStorage.setItem(`quiz_smash_session_day_${user.id}`, today);
      }
      saveAccess(newState);

      return {
        success: true,
        type: 'subscription' as const,
        message: 'تم تفعيل كود المرحلة الأولى (100 تسجيل دخول) بنجاح! تم فتح أسئلة المرحلة الأولى.',
      };
    }

    // 2. Check 100-Login Subscription Codes
    if (
      SUBSCRIPTION_CODES.includes(code) ||
      code.startsWith('SUB-') ||
      code.startsWith('VIP-') ||
      code.startsWith('PAID-') ||
      code.startsWith('CODE100-')
    ) {
      if (targetCourseId && targetCourseId !== 'stage-1') {
        return {
          success: false,
          type: 'invalid' as const,
          message: 'عذراً! هذا الكود مخصص للمرحلة الأولى فقط، ولا يمكن استخدامه للمراحل الأخرى.',
        };
      }

      const currentUsed = access.usedLogins > 0 ? access.usedLogins : 1;
      const newState: AccessState = {
        isUnlocked: true,
        isPermanent: true,
        hasSubscription: true,
        allowedCourse: 'stage-1',
        firstActivatedAt: access.firstActivatedAt || now,
        trialExpiresAt: null,
        lastCodeUsed: code,
        maxLogins: MAX_SUBSCRIPTION_LOGINS,
        usedLogins: currentUsed,
        lastLoginDateString: today,
        lastLoginTimestamp: now,
      };

      if (user?.id) {
        sessionStorage.setItem(`quiz_smash_session_day_${user.id}`, today);
      }
      saveAccess(newState);

      return {
        success: true,
        type: 'subscription' as const,
        message: 'تم تفعيل كود الاشتراك (100 تسجيل دخول) بنجاح! شكراً لك.',
      };
    }

    // 3. Check 2-Day (48-Hour) Free Trial Codes
    if (TRIAL_CODES.includes(code) || code.startsWith('TRIAL-') || code.startsWith('FREE-')) {
      const newState: AccessState = {
        isUnlocked: true,
        isPermanent: false,
        hasSubscription: false,
        allowedCourse: 'stage-1',
        firstActivatedAt: access.firstActivatedAt || now,
        trialExpiresAt: now + DURATION_48_HOURS_MS,
        lastCodeUsed: code,
        maxLogins: MAX_SUBSCRIPTION_LOGINS,
        usedLogins: Math.max(1, access.usedLogins),
        lastLoginDateString: today,
        lastLoginTimestamp: now,
      };

      if (user?.id) {
        sessionStorage.setItem(`quiz_smash_session_day_${user.id}`, today);
      }
      saveAccess(newState);

      return {
        success: true,
        type: 'trial' as const,
        message: 'تم تفعيل التجربة المجانية لمدة يومين (48 ساعة) بنجاح للمرحلة الأولى!',
      };
    }

    return {
      success: false,
      type: 'invalid' as const,
      message: 'الكود غير صحيح. يرجى إدخال أحد أكواد الـ 13 رقماً المخصصة للمرحلة الأولى (100 تسجيل دخول).',
    };
  };

  const activate2DayTrial = (code = 'FREE_TRIAL_2DAYS', targetCourseId = 'stage-1') => {
    const now = Date.now();
    const today = getTodayDateString();
    const newState: AccessState = {
      isUnlocked: true,
      isPermanent: false,
      hasSubscription: false,
      allowedCourse: targetCourseId,
      firstActivatedAt: now,
      trialExpiresAt: now + DURATION_48_HOURS_MS,
      lastCodeUsed: code,
      maxLogins: MAX_SUBSCRIPTION_LOGINS,
      usedLogins: Math.max(1, access.usedLogins),
      lastLoginDateString: today,
      lastLoginTimestamp: now,
    };
    if (user?.id) {
      sessionStorage.setItem(`quiz_smash_session_day_${user.id}`, today);
    }
    saveAccess(newState);
  };

  // Backward compatibility alias
  const activate24HourTrial = (code?: string, targetCourseId?: string) => {
    activate2DayTrial(code, targetCourseId);
  };

  const unlockSubscription100 = (code = 'SUB_100_LOGINS', targetCourseId = 'stage-1') => {
    const now = Date.now();
    const today = getTodayDateString();
    const newState: AccessState = {
      isUnlocked: true,
      isPermanent: true,
      hasSubscription: true,
      allowedCourse: targetCourseId,
      firstActivatedAt: access.firstActivatedAt || now,
      trialExpiresAt: null,
      lastCodeUsed: code,
      maxLogins: MAX_SUBSCRIPTION_LOGINS,
      usedLogins: Math.max(1, access.usedLogins),
      lastLoginDateString: today,
      lastLoginTimestamp: now,
    };
    if (user?.id) {
      sessionStorage.setItem(`quiz_smash_session_day_${user.id}`, today);
    }
    saveAccess(newState);
  };

  const unlockPermanent = (code?: string, targetCourseId?: string) => {
    unlockSubscription100(code, targetCourseId);
  };

  const lockApp = () => {
    saveAccess({
      ...access,
      isUnlocked: false,
      isPermanent: false,
      hasSubscription: false,
      trialExpiresAt: 0,
    });
  };

  const signOutUser = async () => {
    try {
      if (user?.id) {
        sessionStorage.removeItem(`quiz_smash_session_day_${user.id}`);
      }
      await supabase.auth.signOut();
    } catch {
      // Ignore
    }
    setUser(null);
    if (window.location.pathname !== '/login') {
      window.history.replaceState({}, '', '/login');
    }
  };

  const dismissDailyNotice = () => {
    setDailyLoginExpiredNotice(false);
  };

  const testFastForwardExpired = () => {
    saveAccess({
      ...access,
      isUnlocked: false,
      isPermanent: false,
      hasSubscription: false,
      trialExpiresAt: Date.now() - 1000,
    });
  };

  const testResetTrial = () => {
    activate2DayTrial('TEST_RESET');
  };

  // Test helper: simulate that yesterday's date was last login, triggering tomorrow's forced login check
  const testSimulateNewDay = () => {
    if (!user) return;
    const yesterday = new Date(Date.now() - 86400000);
    const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
    const modified: AccessState = {
      ...access,
      lastLoginDateString: yesterdayStr,
    };
    sessionStorage.removeItem(`quiz_smash_session_day_${user.id}`);
    saveAccess(modified);
    signOutUser();
    setDailyLoginExpiredNotice(true);
  };

  const usedLogins = access.usedLogins || 0;
  const maxLogins = access.maxLogins || MAX_SUBSCRIPTION_LOGINS;
  const remainingLogins = Math.max(0, maxLogins - usedLogins);

  const maxAttempts = accessRecord?.maxAttempts ?? maxLogins;
  const accessedCount = accessRecord?.accessedCount ?? usedLogins;
  const remainingAttempts = accessRecord?.remainingAttempts ?? Math.max(0, maxAttempts - accessedCount);

  return (
    <AuthContext.Provider
      value={{
        user,
        isUnlocked,
        isPermanent,
        hasSubscription,
        allowedCourse: access.allowedCourse,
        isTrialActive,
        trialExpiresAt: access.trialExpiresAt,
        timeLeftFormatted: formatTimeLeft(secondsRemaining),
        secondsRemaining,
        maxLogins,
        usedLogins,
        remainingLogins,
        remainingAttempts,
        accessedCount,
        maxAttempts,
        accessRecord,
        refreshAccessTracking,
        dailyLoginExpiredNotice,
        dismissDailyNotice,
        ownerWhatsApp,
        isLoading,
        submitAccessCode,
        activate2DayTrial,
        activate24HourTrial,
        unlockSubscription100,
        unlockPermanent,
        setOwnerWhatsApp,
        lockApp,
        signOutUser,
        testFastForwardExpired,
        testResetTrial,
        testSimulateNewDay,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
