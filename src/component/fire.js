import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDB3Re-gSU5sralIe2HoGjzf31XDoA3jQ4",
  authDomain: "screem-59e13.firebaseapp.com",
  projectId: "screem-59e13",
  storageBucket: "screem-59e13.appspot.com",
  messagingSenderId: "723245489543",
  appId: "1:723245489543:web:cf1d3409ea8a9644024722",
  measurementId: "G-WPD421EXYN",
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore, firebase };
