import { getApps, initializeApp } from 'firebase/app';
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';

const CLIENT_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.SECRET_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.SECRET_FIREBASE_PROJECT_ID,
  storageBucket: process.env.SECRET_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.SECRET_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.SECRET_FIREBASE_APP_ID,
};

const app = getApps().length < 1 ? initializeApp(CLIENT_CONFIG) : undefined;
const auth = getAuth(app);
//setPersistence(auth, browserSessionPersistence);

export { auth };
