import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { isUsingEmulator } from '@lib/env';
import { getFirebaseConfig } from './config';
import type { Auth } from 'firebase/auth';
import type { Functions } from 'firebase/functions';
import type { Firestore } from 'firebase/firestore';
import type { FirebaseApp } from 'firebase/app';
import type { FirebaseStorage } from 'firebase/storage';

type Firebase = {
  auth: Auth | null;
  storage: FirebaseStorage | null;
  firestore: Firestore | null;
  functions: Functions | null;
  firebaseApp: FirebaseApp | null;
};

function initialize(): Firebase {
  const config = getFirebaseConfig();
  
  // Guard check: If keys are missing during Vercel build time, return empty objects to prevent a crash
  if (!config.apiKey || !config.projectId) {
    return { firebaseApp: null, auth: null, firestore: null, storage: null, functions: null };
  }

  // Safely initialize or grab the existing app instance
  const firebaseApp = getApps().length > 0 ? getApp() : initializeApp(config);

  const auth = getAuth(firebaseApp);
  const storage = getStorage(firebaseApp);
  const firestore = getFirestore(firebaseApp);
  const functions = getFunctions(firebaseApp);

  return { firebaseApp, auth, firestore, storage, functions };
}

function connectToEmulator({
  auth,
  storage,
  firestore,
  functions,
  firebaseApp
}: Firebase): Firebase {
  if (auth) connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
  if (storage) connectStorageEmulator(storage, 'localhost', 9199);
  if (firestore) connectFirestoreEmulator(firestore, 'localhost', 8080);
  if (functions) connectFunctionsEmulator(functions, 'localhost', 5001);

  return { firebaseApp, auth, firestore, storage, functions };
}

export function getFirebase(): Firebase {
  const firebase = initialize();

  if (isUsingEmulator && firebase.firebaseApp) {
    return connectToEmulator(firebase);
  }

  return firebase;
}

const { firestore: db, auth, storage } = getFirebase();
export { db, auth, storage };
