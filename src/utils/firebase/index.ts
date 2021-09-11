import { initializeApp } from "firebase/app";
import { getFirestore, } from "firebase/firestore/lite";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyC2r6b2sS7IROGvCDijr1Rn5oMG-YRjqw0",

  authDomain: "prj1-b3aac.firebaseapp.com",

  databaseURL: "https://prj1-b3aac.firebaseio.com",

  projectId: "prj1-b3aac",

  storageBucket: "prj1-b3aac.appspot.com",

  messagingSenderId: "931433149766",

  appId: "1:931433149766:web:09619def9e30f16354e147",
};

const app = initializeApp(firebaseConfig);
// Get a reference to the storage service, which is used to create references in your storage bucket
const db = getFirestore(app);

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
const authFirebase = getAuth();
authFirebase.languageCode = "vn";

export { db, authFirebase, provider };

export default app;
