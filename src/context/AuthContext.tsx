import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient.js';

export interface AccessState {
  isUnlocked: boolean;
  isPermanent: boolean;
  firstActivatedAt: number | null;
  trialExpiresAt: number | null;
  lastCodeUsed?: string;
}

interface AuthContextType {
  user: User | null;
  isUnlocked: boolean;
  isPermanent: boolean;
  isTrialActive: boolean;
  trialExpiresAt: number | null;
  timeLeftFormatted: string;
  secondsRemaining: number;
  ownerWhatsApp: string;
  isLoading: boolean;
  submitAccessCode: (code: string) => { success: boolean; type: 'trial' | 'permanent' | 'invalid'; message: string };
  activate24HourTrial: (code?: string) => void;
  unlockPermanent: (code?: string) => void;
  setOwnerWhatsApp: (phone: string) => void;
  lockApp: () => void;
  signOutUser: () => Promise<void>;
  testFastForwardExpired: () => void;
  testResetTrial: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_ACCESS_PREFIX = 'quiz_smash_user_access_v5_';
const LOCAL_WHATSAPP_KEY = 'quiz_smash_owner_whatsapp_v5';

// Default owner WhatsApp number (can be edited in app by owner)
export const DEFAULT_WHATSAPP_NUMBER = '9647700000000';
export const PRICE_IQD = '20,000 IQD';

const DURATION_24_HOURS_MS = 24 * 60 * 60 * 1000;

// Accepted codes list
const TRIAL_CODES = ['TRIAL', 'TRIAL24', 'FREE', 'FREE24', 'START', 'TEST24', '24H', '24HOUR'];

const UNLIMITED_CODES = [
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [access, setAccess] = useState<AccessState>({
    isUnlocked: false,
    isPermanent: false,
    firstActivatedAt: null,
    trialExpiresAt: null,
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

  // Load user access state helper
  const loadUserAccess = (userId: string): AccessState => {
    try {
      const stored = localStorage.getItem(`${LOCAL_ACCESS_PREFIX}${userId}`);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Ignore
    }
    return {
      isUnlocked: false,
      isPermanent: false,
      firstActivatedAt: null,
      trialExpiresAt: null,
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

  // Initialize Supabase Auth Session
  useEffect(() => {
    let isMounted = true;

    // Protect private pages with supabase.auth.getSession() — if no session, redirect to /login
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!isMounted) return;
      if (session?.user) {
        setUser(session.user);
        const userAccess = loadUserAccess(session.user.id);
        setAccess(userAccess);
        if (window.location.pathname === '/login') {
          window.history.replaceState({}, '', '/');
        }
      } else {
        setUser(null);
        if (window.location.pathname !== '/login') {
          window.history.replaceState({}, '', '/login');
        }
      }
      setIsLoading(false);
    }).catch(() => {
      if (isMounted) {
        setUser(null);
        if (window.location.pathname !== '/login') {
          window.history.replaceState({}, '', '/login');
        }
        setIsLoading(false);
      }
    });

    // Listen for auth state changes (sign in, sign out, token refresh)
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return;
      if (session?.user) {
        setUser(session.user);
        const userAccess = loadUserAccess(session.user.id);
        setAccess(userAccess);
        if (window.location.pathname === '/login') {
          window.history.replaceState({}, '', '/');
        }
      } else {
        setUser(null);
        setAccess({
          isUnlocked: false,
          isPermanent: false,
          firstActivatedAt: null,
          trialExpiresAt: null,
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

  // 1-second countdown loop
  useEffect(() => {
    if (access.isPermanent) {
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
      if (secs <= 0 && access.isUnlocked && !access.isPermanent) {
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

  const isPermanent = Boolean(access.isPermanent);
  const isTrialActive = Boolean(!isPermanent && access.trialExpiresAt && secondsRemaining > 0);
  const isUnlocked = isPermanent || isTrialActive;

  // Format remaining time: "23h 45m" or "12m 30s"
  const formatTimeLeft = (totalSeconds: number): string => {
    if (isPermanent) return 'Unlimited';
    if (totalSeconds <= 0) return 'Expired';
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m ${seconds}s`;
  };

  // Submit code logic
  const submitAccessCode = (rawCode: string) => {
    const code = rawCode.trim().toUpperCase();
    const now = Date.now();

    // Check Unlimited VIP Codes (20,000 IQD)
    if (UNLIMITED_CODES.includes(code) || code.startsWith('VIP-') || code.startsWith('PAID-')) {
      const newState: AccessState = {
        isUnlocked: true,
        isPermanent: true,
        firstActivatedAt: access.firstActivatedAt || now,
        trialExpiresAt: null,
        lastCodeUsed: code,
      };
      saveAccess(newState);
      return {
        success: true,
        type: 'permanent' as const,
        message: 'تم تفعيل الوصول غير المحدود بنجاح! شكراً لك.',
      };
    }

    // Check 24-Hour Trial Codes
    if (TRIAL_CODES.includes(code) || code.startsWith('TRIAL-') || code.startsWith('FREE-')) {
      const newState: AccessState = {
        isUnlocked: true,
        isPermanent: false,
        firstActivatedAt: access.firstActivatedAt || now,
        trialExpiresAt: now + DURATION_24_HOURS_MS,
        lastCodeUsed: code,
      };
      saveAccess(newState);
      return {
        success: true,
        type: 'trial' as const,
        message: 'تم تفعيل التجربة المجانية لمدة 24 ساعة بنجاح!',
      };
    }

    return {
      success: false,
      type: 'invalid' as const,
      message: 'الكود غير صحيح. يرجى التأكد من الكود أو التواصل عبر واتساب للحصول على الكود.',
    };
  };

  const activate24HourTrial = (code = 'FREE_TRIAL') => {
    const now = Date.now();
    saveAccess({
      isUnlocked: true,
      isPermanent: false,
      firstActivatedAt: now,
      trialExpiresAt: now + DURATION_24_HOURS_MS,
      lastCodeUsed: code,
    });
  };

  const unlockPermanent = (code = 'PAID_20000IQD') => {
    saveAccess({
      isUnlocked: true,
      isPermanent: true,
      firstActivatedAt: access.firstActivatedAt || Date.now(),
      trialExpiresAt: null,
      lastCodeUsed: code,
    });
  };

  const lockApp = () => {
    saveAccess({
      isUnlocked: false,
      isPermanent: false,
      firstActivatedAt: access.firstActivatedAt,
      trialExpiresAt: 0,
    });
  };

  const signOutUser = async () => {
    try {
      await supabase.auth.signOut();
    } catch {
      // Ignore
    }
    setUser(null);
    if (window.location.pathname !== '/login') {
      window.history.replaceState({}, '', '/login');
    }
  };

  const testFastForwardExpired = () => {
    saveAccess({
      ...access,
      isUnlocked: false,
      isPermanent: false,
      trialExpiresAt: Date.now() - 1000,
    });
  };

  const testResetTrial = () => {
    activate24HourTrial('TEST_RESET');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isUnlocked,
        isPermanent,
        isTrialActive,
        trialExpiresAt: access.trialExpiresAt,
        timeLeftFormatted: formatTimeLeft(secondsRemaining),
        secondsRemaining,
        ownerWhatsApp,
        isLoading,
        submitAccessCode,
        activate24HourTrial,
        unlockPermanent,
        setOwnerWhatsApp,
        lockApp,
        signOutUser,
        testFastForwardExpired,
        testResetTrial,
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
