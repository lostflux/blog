// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtHIhBCYkQeafAn_ICQowTWumlPRwxkU0",
  authDomain: "altair-on-the-web.firebaseapp.com",
  projectId: "altair-on-the-web",
  storageBucket: "altair-on-the-web.appspot.com",
  messagingSenderId: "470937183370",
  appId: "1:470937183370:web:d99db4a8ca1ee3ac3e3973",
  measurementId: "G-7DGSTFLF85"
};


export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: "AIzaSyCtHIhBCYkQeafAn_ICQowTWumlPRwxkU0",
    authDomain: "altair-on-the-web.firebaseapp.com",
    projectId: "altair-on-the-web",
    storageBucket: "altair-on-the-web.appspot.com",
    messagingSenderId: "470937183370",
    appId: "1:470937183370:web:d99db4a8ca1ee3ac3e3973",
    measurementId: "G-7DGSTFLF85"
  };

  const app = initializeApp(firebaseConfig);
})





