import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export default defineNuxtPlugin((nuxtApp) => {
// TODO: Move firebase config to global config file.
  const config = useRuntimeConfig();
  console.log(`config: ${config}`);

  const firebaseConfig = {
    apiKey: "AIzaSyCtHIhBCYkQeafAn_ICQowTWumlPRwxkU0",
    authDomain: "altair-on-the-web.firebaseapp.com",
    projectId: "altair-on-the-web",
    storageBucket: "altair-on-the-web.appspot.com",
    messagingSenderId: "470937183370",
    appId: "1:470937183370:web:d99db4a8ca1ee3ac3e3973",
    measurementId: "G-7DGSTFLF85",
  };

  initializeApp(firebaseConfig);
});
