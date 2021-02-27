import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0U7Hp4zkHRA5AnWn6_hwtHaWq4PL7OxE",
  authDomain: "throw-money-fe082.firebaseapp.com",
  projectId: "throw-money-fe082",
  storageBucket: "throw-money-fe082.appspot.com",
  messagingSenderId: "564920687291",
  appId: "1:564920687291:web:8d3d21ad79f3edfa7ea79e",
  measurementId: "G-DJXHB4HDE3" 
};

firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

export default firebase;
