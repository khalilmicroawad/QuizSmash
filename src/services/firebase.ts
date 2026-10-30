import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

// ============================================================================
// ⚙️ FIREBASE CONFIGURATION CREDENTIALS PLACEHOLDER
// Paste your Firebase web app configuration below from the Firebase Console:
// (Firebase Console -> Project Settings -> General -> Your apps -> Web app)
// ============================================================================
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Check if actual configuration has been provided
export const isFirebaseConfigured = (): boolean => {
  return (
    firebaseConfig.apiKey !== "YOUR_API_KEY_HERE" &&
    firebaseConfig.apiKey.length > 10 &&
    firebaseConfig.projectId !== "YOUR_PROJECT_ID"
  );
};

// Initialize Firebase safely
let app: any = null;
let auth: any = null;
let db: any = null;

if (isFirebaseConfigured()) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
  } catch (error) {
    console.warn('Firebase initialization error, running in demo/offline mode:', error);
  }
}

export interface UserTrialRecord {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  firstLoginAt: number;
  trialExpiresAt: number;
  isSubscribed: boolean;
  subscribedAt?: number;
  plan?: string;
}

const LOCAL_STORAGE_KEY_USER = 'quiz_smash_auth_user';
const LOCAL_STORAGE_KEY_TRIAL = 'quiz_smash_trial_record';

export const DURATION_24_HOURS_MS = 24 * 60 * 60 * 1000;

// Local persistent fallback for trial data
const getLocalTrialRecord = (uid: string): UserTrialRecord | null => {
  try {
    const raw = localStorage.getItem(`${LOCAL_STORAGE_KEY_TRIAL}_${uid}`);
    if (raw) return JSON.parse(raw);
  } catch {
    // Ignore storage parse error
  }
  return null;
};

const saveLocalTrialRecord = (record: UserTrialRecord) => {
  try {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_TRIAL}_${record.uid}`, JSON.stringify(record));
  } catch {
    // Ignore storage write error
  }
};

/**
 * Sync or create user trial record in Firestore / LocalStorage
 */
export async function syncUserTrial(
  uid: string,
  email: string,
  displayName: string,
  photoURL?: string
): Promise<UserTrialRecord> {
  const now = Date.now();

  // Try fetching from Firestore if configured
  if (db) {
    try {
      const userDocRef = doc(db, 'users', uid);
      const snapshot = await getDoc(userDocRef);

      if (snapshot.exists()) {
        const data = snapshot.data() as UserTrialRecord;
        saveLocalTrialRecord(data);
        return data;
      } else {
        // First login: create 24-hour trial
        const newRecord: UserTrialRecord = {
          uid,
          email,
          displayName: displayName || email.split('@')[0],
          photoURL: photoURL || '',
          firstLoginAt: now,
          trialExpiresAt: now + DURATION_24_HOURS_MS,
          isSubscribed: false,
        };

        await setDoc(userDocRef, newRecord);
        saveLocalTrialRecord(newRecord);
        return newRecord;
      }
    } catch (err) {
      console.warn('Firestore read/write failed, falling back to local persistence:', err);
    }
  }

  // Local fallback
  const local = getLocalTrialRecord(uid);
  if (local) {
    return local;
  }

  const initialRecord: UserTrialRecord = {
    uid,
    email,
    displayName: displayName || email.split('@')[0],
    photoURL: photoURL || '',
    firstLoginAt: now,
    trialExpiresAt: now + DURATION_24_HOURS_MS,
    isSubscribed: false,
  };
  saveLocalTrialRecord(initialRecord);
  return initialRecord;
}

/**
 * Mark user as subscribed in Firestore / Local
 */
export async function subscribeUser(uid: string, plan = 'Pro Annual'): Promise<UserTrialRecord> {
  const now = Date.now();
  if (db) {
    try {
      const userDocRef = doc(db, 'users', uid);
      await updateDoc(userDocRef, {
        isSubscribed: true,
        subscribedAt: now,
        plan,
      });
    } catch (err) {
      console.warn('Firestore subscription update failed, falling back to local:', err);
    }
  }

  const local = getLocalTrialRecord(uid) || {
    uid,
    email: '',
    displayName: 'User',
    firstLoginAt: now,
    trialExpiresAt: now,
    isSubscribed: false,
  };

  local.isSubscribed = true;
  local.subscribedAt = now;
  local.plan = plan;
  saveLocalTrialRecord(local);
  return local;
}

/**
 * Sign in with Google (Gmail only)
 */
export async function loginWithGoogle(): Promise<{
  user: { uid: string; email: string; displayName: string; photoURL?: string };
  trial: UserTrialRecord;
}> {
  if (auth && isFirebaseConfigured()) {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const result = await signInWithPopup(auth, provider);
    const fbUser = result.user;
    const user = {
      uid: fbUser.uid,
      email: fbUser.email || '',
      displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'Quiz Master',
      photoURL: fbUser.photoURL || undefined,
    };

    const trial = await syncUserTrial(user.uid, user.email, user.displayName, user.photoURL);
    return { user, trial };
  }

  // Graceful Demo / Simulator login for immediate testing before pasting credentials
  const demoEmail = 'user@gmail.com';
  const demoUid = 'demo_google_user_001';
  const demoUser = {
    uid: demoUid,
    email: demoEmail,
    displayName: 'Quiz Master',
    photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  };

  const trial = await syncUserTrial(demoUser.uid, demoUser.email, demoUser.displayName, demoUser.photoURL);
  localStorage.setItem(LOCAL_STORAGE_KEY_USER, JSON.stringify(demoUser));
  return { user: demoUser, trial };
}

/**
 * Sign out
 */
export async function logout(): Promise<void> {
  if (auth && isFirebaseConfigured()) {
    try {
      await firebaseSignOut(auth);
    } catch (err) {
      console.warn('Firebase sign out error:', err);
    }
  }
  localStorage.removeItem(LOCAL_STORAGE_KEY_USER);
}

/**
 * Subscribe to Auth State
 */
export function onAuthChanged(callback: (user: FirebaseUser | null) => void) {
  if (auth && isFirebaseConfigured()) {
    return onAuthStateChanged(auth, callback);
  }
  return () => {};
}

/**
 * Test Simulator Helpers (Quickly test 24h expiration and reset in UI)
 */
export function simulateExpireTrial(uid: string): UserTrialRecord {
  const local = getLocalTrialRecord(uid) || {
    uid,
    email: 'user@gmail.com',
    displayName: 'Quiz Master',
    firstLoginAt: Date.now() - DURATION_24_HOURS_MS - 1000,
    trialExpiresAt: Date.now() - 1000,
    isSubscribed: false,
  };

  local.trialExpiresAt = Date.now() - 1000; // Expired 1s ago
  local.isSubscribed = false;
  saveLocalTrialRecord(local);
  return local;
}

export function simulateResetTrial(uid: string): UserTrialRecord {
  const now = Date.now();
  const local = getLocalTrialRecord(uid) || {
    uid,
    email: 'user@gmail.com',
    displayName: 'Quiz Master',
    firstLoginAt: now,
    trialExpiresAt: now + DURATION_24_HOURS_MS,
    isSubscribed: false,
  };

  local.firstLoginAt = now;
  local.trialExpiresAt = now + DURATION_24_HOURS_MS;
  local.isSubscribed = false;
  saveLocalTrialRecord(local);
  return local;
}
