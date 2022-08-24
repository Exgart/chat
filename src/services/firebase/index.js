import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase, serverTimestamp } from 'firebase/database'
import { getStorage } from 'firebase/storage'

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
}

const app = initializeApp(config)

export const auth = getAuth(app)

export const database = getDatabase(
  app,
  process.env.REACT_APP_FIREBASE_REALTIME_DB_URL
)

export const storage = getStorage(app)

export const getServerTimeStamp = () => serverTimestamp()

export default app