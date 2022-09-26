import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNKZ4k_36xNbX_49cIYGthBvDrLGOqtEs",
  authDomain: "freind-chat-97da7.firebaseapp.com",
  projectId: "freind-chat-97da7",
  storageBucket: "freind-chat-97da7.appspot.com",
  messagingSenderId: "678492733147",
  appId: "1:678492733147:web:aeeda6be51986930b096fe",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
// Create a root reference
export const storage = getStorage();
export const db = getFirestore()
