import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyANtJhRFJERgcRvjYrQQKhLFG1WD_XMako",
  authDomain: "dvlyon-naturalcycles.firebaseapp.com",
  projectId: "dvlyon-naturalcycles",
  storageBucket: "dvlyon-naturalcycles.appspot.com",
  messagingSenderId: "927385975948",
  appId: "1:927385975948:web:264a93fb521b7877034fa9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
