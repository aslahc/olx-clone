import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD12LD8d_oMOO9fVNmMbLNE6_F_d7jHl9o",
  authDomain: "fir-2ecd9.firebaseapp.com",
  projectId: "fir-2ecd9",
  storageBucket: "fir-2ecd9.appspot.com",
  messagingSenderId: "95705052528",
  appId: "1:95705052528:web:6dbbc34d9e446af4520bb5",
  measurementId: "G-2LQJCKWWY2",
};

const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
