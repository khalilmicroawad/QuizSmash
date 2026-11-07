import { supabase } from '../supabaseClient.js';

const LOCAL_VISITOR_ID_KEY = 'quiz_smash_visitor_id_v3';
const LOCAL_MY_VISITOR_NUM_KEY = 'quiz_smash_my_visitor_num_v3';
const LOCAL_GLOBAL_VISITOR_COUNT_KEY = 'quiz_smash_global_visitor_count_v3';

// Guest counter starts with number 1 and goes up
const BASELINE_VISITOR_COUNT = 0;

export interface VisitorInfo {
  visitorNumber: number;
  totalGuests: number;
  isFirstVisit: boolean;
  visitTimestamp: number;
  visitorId: string;
}

export class VisitorCounterService {
  private static cachedInfo: VisitorInfo | null = null;

  /**
   * Initializes or fetches the current guest's visitor number
   * and increments the global guest counter if this is a new visitor.
   */
  static getVisitorInfo(): VisitorInfo {
    if (this.cachedInfo) {
      return this.cachedInfo;
    }

    try {
      let visitorId = localStorage.getItem(LOCAL_VISITOR_ID_KEY);
      const storedVisitorNum = localStorage.getItem(LOCAL_MY_VISITOR_NUM_KEY);
      const storedGlobalCount = localStorage.getItem(LOCAL_GLOBAL_VISITOR_COUNT_KEY);

      const currentGlobal = storedGlobalCount
        ? Math.max(BASELINE_VISITOR_COUNT, parseInt(storedGlobalCount, 10))
        : BASELINE_VISITOR_COUNT;

      let isFirstVisit = false;
      let myNumber: number;

      if (!visitorId || !storedVisitorNum) {
        // Brand new guest!
        isFirstVisit = true;
        visitorId = `guest_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
        localStorage.setItem(LOCAL_VISITOR_ID_KEY, visitorId);

        // Increment global guest counter by 1 for this new guest
        const newGlobal = currentGlobal + 1;
        myNumber = newGlobal;

        localStorage.setItem(LOCAL_GLOBAL_VISITOR_COUNT_KEY, newGlobal.toString());
        localStorage.setItem(LOCAL_MY_VISITOR_NUM_KEY, myNumber.toString());

        // Asynchronously sync visit to Supabase if possible (graceful non-blocking)
        this.syncVisitToSupabase(visitorId, myNumber);
      } else {
        // Returning guest - preserve their unique visitor number!
        myNumber = parseInt(storedVisitorNum, 10);
      }

      this.cachedInfo = {
        visitorNumber: myNumber,
        totalGuests: Math.max(myNumber, currentGlobal),
        isFirstVisit,
        visitTimestamp: Date.now(),
        visitorId,
      };

      return this.cachedInfo;
    } catch {
      // Fallback in case of private mode restriction
      return {
        visitorNumber: BASELINE_VISITOR_COUNT + 1,
        totalGuests: BASELINE_VISITOR_COUNT + 1,
        isFirstVisit: true,
        visitTimestamp: Date.now(),
        visitorId: 'guest_fallback',
      };
    }
  }

  /**
   * Optional background sync to record guest count in Supabase
   */
  private static async syncVisitToSupabase(visitorId: string, visitorNumber: number): Promise<void> {
    try {
      // Fire-and-forget logging
      await supabase.from('site_visits').insert([
        {
          visitor_id: visitorId,
          visitor_number: visitorNumber,
          visited_at: new Date().toISOString(),
          user_agent: navigator.userAgent,
        },
      ]);
    } catch {
      // Gracefully ignore if table doesn't exist
    }
  }

  /**
   * Reset visitor counter for testing purposes
   */
  static testResetVisitor(): VisitorInfo {
    try {
      localStorage.removeItem(LOCAL_VISITOR_ID_KEY);
      localStorage.removeItem(LOCAL_MY_VISITOR_NUM_KEY);
      this.cachedInfo = null;
    } catch {
      // Ignore
    }
    return this.getVisitorInfo();
  }
}
