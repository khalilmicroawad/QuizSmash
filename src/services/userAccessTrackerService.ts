import { supabase } from '../supabaseClient.js';

export interface UserAccessSessionEntry {
  timestamp: number;
  dateString: string;
  courseId?: string;
}

export interface UserAccessRecord {
  userId: string;
  userEmail?: string;
  maxAttempts: number; // Total allowed attempts (default 100)
  accessedCount: number; // Number of times accessed
  remainingAttempts: number; // maxAttempts - accessedCount
  firstAccessedAt: number | null;
  lastAccessedAt: number | null;
  lastAccessDateString: string;
  accessHistory: UserAccessSessionEntry[];
  isExhausted: boolean;
}

const STORAGE_PREFIX = 'quiz_smash_user_access_tracker_v1_';
const DEFAULT_MAX_ATTEMPTS = 100;

// In-memory fallback for testing / SSR
const memoryStore = new Map<string, string>();

function safeGet(key: string, isSession = false): string | null {
  try {
    if (typeof window !== 'undefined') {
      const storage = isSession ? window.sessionStorage : window.localStorage;
      if (storage) return storage.getItem(key);
    }
  } catch {
    // fallback
  }
  return memoryStore.get(key) || null;
}

function safeSet(key: string, value: string, isSession = false): void {
  try {
    if (typeof window !== 'undefined') {
      const storage = isSession ? window.sessionStorage : window.localStorage;
      if (storage) {
        storage.setItem(key, value);
        return;
      }
    }
  } catch {
    // fallback
  }
  memoryStore.set(key, value);
}

function getTodayString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Service that tracks the number of times a user has accessed the service
 * based on their unique identifier (userId).
 */
export class UserAccessTrackerService {
  /**
   * Retrieve the current access record for a given unique user identifier.
   */
  static getAccessRecord(userId: string, defaultMax = DEFAULT_MAX_ATTEMPTS): UserAccessRecord {
    if (!userId) {
      return {
        userId: '',
        maxAttempts: defaultMax,
        accessedCount: 0,
        remainingAttempts: defaultMax,
        firstAccessedAt: null,
        lastAccessedAt: null,
        lastAccessDateString: '',
        accessHistory: [],
        isExhausted: false,
      };
    }

    try {
      const raw = safeGet(`${STORAGE_PREFIX}${userId}`);
      if (raw) {
        const parsed = JSON.parse(raw);
        const maxAttempts = parsed.maxAttempts || defaultMax;
        const accessedCount = parsed.accessedCount || 0;
        const remainingAttempts = Math.max(0, maxAttempts - accessedCount);
        return {
          userId,
          userEmail: parsed.userEmail || '',
          maxAttempts,
          accessedCount,
          remainingAttempts,
          firstAccessedAt: parsed.firstAccessedAt || null,
          lastAccessedAt: parsed.lastAccessedAt || null,
          lastAccessDateString: parsed.lastAccessDateString || '',
          accessHistory: parsed.accessHistory || [],
          isExhausted: accessedCount >= maxAttempts,
        };
      }
    } catch (err) {
      console.warn('Error reading user access record from storage:', err);
    }

    return {
      userId,
      maxAttempts: defaultMax,
      accessedCount: 0,
      remainingAttempts: defaultMax,
      firstAccessedAt: null,
      lastAccessedAt: null,
      lastAccessDateString: '',
      accessHistory: [],
      isExhausted: false,
    };
  }

  /**
   * Record a new access for the unique user identifier.
   * Increments the accessed counter and calculates remaining attempts.
   */
  static async recordAccess(
    userId: string,
    userEmail?: string,
    courseId?: string,
    options?: { forceNewAttempt?: boolean; customMax?: number }
  ): Promise<UserAccessRecord> {
    if (!userId) {
      return this.getAccessRecord('');
    }

    const current = this.getAccessRecord(userId, options?.customMax || DEFAULT_MAX_ATTEMPTS);
    const today = getTodayString();
    const sessionTokenKey = `quiz_smash_session_token_${userId}`;
    const storedSessionToken = safeGet(sessionTokenKey, true);

    // Only increment attempt if new daily/login session or explicitly requested
    const shouldIncrement =
      options?.forceNewAttempt ||
      current.lastAccessDateString !== today ||
      storedSessionToken !== today ||
      current.accessedCount === 0;

    let updatedCount = current.accessedCount;
    const now = Date.now();

    if (shouldIncrement) {
      updatedCount += 1;
      safeSet(sessionTokenKey, today, true);
    }

    const maxAttempts = options?.customMax || current.maxAttempts || DEFAULT_MAX_ATTEMPTS;
    const remainingAttempts = Math.max(0, maxAttempts - updatedCount);
    const isExhausted = updatedCount >= maxAttempts;

    const newHistoryEntry: UserAccessSessionEntry = {
      timestamp: now,
      dateString: today,
      courseId: courseId || 'stage-1',
    };

    const updatedRecord: UserAccessRecord = {
      userId,
      userEmail: userEmail || current.userEmail || '',
      maxAttempts,
      accessedCount: updatedCount,
      remainingAttempts,
      firstAccessedAt: current.firstAccessedAt || now,
      lastAccessedAt: now,
      lastAccessDateString: today,
      accessHistory: [newHistoryEntry, ...(current.accessHistory || []).slice(0, 49)],
      isExhausted,
    };

    // Save locally
    try {
      safeSet(`${STORAGE_PREFIX}${userId}`, JSON.stringify(updatedRecord));
    } catch (err) {
      console.warn('Error persisting user access record locally:', err);
    }

    // Persist to Supabase user metadata asynchronously
    try {
      await supabase.auth.updateUser({
        data: {
          accessed_count: updatedCount,
          max_attempts: maxAttempts,
          remaining_attempts: remainingAttempts,
          last_accessed_at: new Date(now).toISOString(),
        },
      });
    } catch {
      // Non-fatal if offline
    }

    return updatedRecord;
  }

  /**
   * Convenience method to get remaining attempts directly.
   */
  static getRemainingAttempts(userId: string): number {
    return this.getAccessRecord(userId).remainingAttempts;
  }

  /**
   * Update max allowed attempts for a user (e.g. after code redemption or reset).
   */
  static setMaxAttempts(userId: string, newMax: number): UserAccessRecord {
    const record = this.getAccessRecord(userId, newMax);
    const updated: UserAccessRecord = {
      ...record,
      maxAttempts: newMax,
      remainingAttempts: Math.max(0, newMax - record.accessedCount),
      isExhausted: record.accessedCount >= newMax,
    };

    try {
      safeSet(`${STORAGE_PREFIX}${userId}`, JSON.stringify(updated));
    } catch {
      // ignore
    }

    return updated;
  }
}
