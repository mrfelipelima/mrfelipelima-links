import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,                             // Auth / General Use
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
  projectId: process.env.FIREBASE_PROJETID,
}

const firebaseApp = initializeApp(firebaseConfig)

export { firebaseApp }
