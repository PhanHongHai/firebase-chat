import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  getAuth,
} from "firebase/auth";

// Your web app's Firebase configuration

console.log('a',process.env.PORT);
console.log('a',process.env.REACT_APP_FIREBASE_API_KEY);


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "",

  authDomain: "prj1-b3aac.firebaseapp.com",

  databaseURL: "https://prj1-b3aac.firebaseio.com",

  projectId: "prj1-b3aac",

  storageBucket: "prj1-b3aac.appspot.com",

  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID || "",

  appId: process.env.REACT_APP_FIREBASE_APP_ID || "",
};

const app = initializeApp(firebaseConfig);
// Get a reference to the storage service, which is used to create references in your storage bucket
const db = getFirestore(app);

const providerGoogle = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();
const authFirebase = getAuth();

providerGoogle.addScope("https://www.googleapis.com/auth/contacts.readonly");
authFirebase.languageCode = "vn";
providerFacebook.setCustomParameters({
  display: "popup",
});


export { db, authFirebase, providerGoogle, providerFacebook };

export default app;
