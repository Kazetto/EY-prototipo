import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWnkLlZmAFb_w_RKa0n9jPvDmLC6IEqI4",
  authDomain: "ey-prototipo.firebaseapp.com",
  databaseURL: "https://ey-prototipo-default-rtdb.firebaseio.com",
  projectId: "ey-prototipo",
  storageBucket: "ey-prototipo.appspot.com",
  messagingSenderId: "696211407609",
  appId: "1:696211407609:web:fa7f0ef30f39e231c51828",
  measurementId: "G-9RTGRNJZ24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);