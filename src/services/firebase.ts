import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  getDocFromServer,
  setDoc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// CRITICAL: Initialize Firestore with the provisioned firestoreDatabaseId
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Firebase Storage for files
export const storage = getStorage(app);

// Connection test as required by Firebase integration guidelines
async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client appears offline, verify network connection.');
    }
  }
}
testFirestoreConnection();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
    },
    operationType,
    path,
  };
  console.warn('Firestore Operation Notice: ', JSON.stringify(errInfo));
  return errInfo;
}

// User Trial & Access Record Interface
export interface FirebaseUserAccess {
  uid: string;
  email: string;
  displayName?: string;
  isUnlocked: boolean;
  hasSubscription: boolean;
  trialExpiresAt: number | null;
  usedLogins: number;
  maxLogins: number;
  allowedCourse?: string;
  updatedAt: string;
}

/**
 * 1. GOOGLE SIGN IN (POPUP)
 */
export async function loginWithGooglePopup(): Promise<FirebaseUser> {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

/**
 * 2. EMAIL & PASSWORD SIGN IN
 */
export async function loginWithEmail(email: string, pass: string): Promise<FirebaseUser> {
  const result = await signInWithEmailAndPassword(auth, email.trim(), pass);
  return result.user;
}

/**
 * 3. EMAIL & PASSWORD REGISTER
 */
export async function registerWithEmail(
  email: string,
  pass: string,
  fullName?: string
): Promise<FirebaseUser> {
  const result = await createUserWithEmailAndPassword(auth, email.trim(), pass);
  if (fullName && result.user) {
    try {
      await updateProfile(result.user, { displayName: fullName });
    } catch {
      // Ignore
    }
  }
  return result.user;
}

/**
 * 4. SIGN OUT
 */
export async function firebaseSignOutUser(): Promise<void> {
  await firebaseSignOut(auth);
}

/**
 * 5. AUTH STATE LISTENER
 */
export function onFirebaseAuthState(callback: (user: FirebaseUser | null) => void) {
  return onAuthStateChanged(auth, callback);
}

/**
 * 6. FIRESTORE SYNC: Load or initialize user access document
 */
export async function syncFirebaseUserAccess(
  user: FirebaseUser,
  initialTrialMs = 7 * 24 * 60 * 60 * 1000
): Promise<FirebaseUserAccess> {
  const userAccessRef = doc(db, 'access', user.uid);
  const userProfileRef = doc(db, 'users', user.uid);
  const now = Date.now();

  try {
    const accessSnap = await getDoc(userAccessRef);

    // Save profile metadata
    await setDoc(
      userProfileRef,
      {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || user.email?.split('@')[0] || 'Dental Student',
        photoURL: user.photoURL || '',
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    if (accessSnap.exists()) {
      return accessSnap.data() as FirebaseUserAccess;
    } else {
      // New user registration: automatically grant 7-day trial!
      const initialAccess: FirebaseUserAccess = {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        isUnlocked: true,
        hasSubscription: false,
        trialExpiresAt: now + initialTrialMs,
        usedLogins: 0,
        maxLogins: 100,
        allowedCourse: 'stage-1',
        updatedAt: new Date().toISOString(),
      };

      await setDoc(userAccessRef, initialAccess);
      return initialAccess;
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `access/${user.uid}`);
    // Return fallback in-memory state
    return {
      uid: user.uid,
      email: user.email || '',
      isUnlocked: true,
      hasSubscription: false,
      trialExpiresAt: now + initialTrialMs,
      usedLogins: 0,
      maxLogins: 100,
      allowedCourse: 'stage-1',
      updatedAt: new Date().toISOString(),
    };
  }
}

/**
 * 7. FILE STORAGE: Upload study document or image to Firebase Storage
 */
export async function uploadFileToFirebaseStorage(
  file: File,
  folder = 'study_materials'
): Promise<{ fileId: string; fileName: string; fileSize: number; fileUrl: string; uploaderUid: string }> {
  if (!auth.currentUser) {
    throw new Error('User must be logged in to upload files to Firebase Storage.');
  }

  const safeFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const fileId = `file_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const storagePath = `${folder}/${auth.currentUser.uid}/${fileId}_${safeFileName}`;
  const fileRef = ref(storage, storagePath);

  // Upload to Firebase Storage
  const snapshot = await uploadBytes(fileRef, file);
  const fileUrl = await getDownloadURL(snapshot.ref);

  const fileData = {
    fileId,
    fileName: file.name,
    fileSize: file.size,
    fileUrl,
    uploaderUid: auth.currentUser.uid,
    uploadedAt: new Date().toISOString(),
  };

  // Record metadata in Firestore files collection
  try {
    await setDoc(doc(db, 'files', fileId), fileData);
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `files/${fileId}`);
  }

  return fileData;
}

/**
 * 8. FILE STORAGE: Delete file
 */
export async function deleteFileFromFirebaseStorage(fileId: string, storagePath: string): Promise<void> {
  try {
    const fileRef = ref(storage, storagePath);
    await deleteObject(fileRef);
    await setDoc(doc(db, 'files', fileId), { deleted: true, deletedAt: new Date().toISOString() }, { merge: true });
  } catch (err) {
    console.warn('Error deleting file from storage:', err);
  }
}
