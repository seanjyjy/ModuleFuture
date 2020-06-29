import * as firebase from "firebase";
import firestore from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA-4tdWDKV8OkHEZT6tTKUbIE_12qgWOYg",
  authDomain: "modulefuture-f1249.firebaseapp.com",
  databaseURL: "https://modulefuture-f1249.firebaseio.com",
  projectId: "modulefuture-f1249",
  storageBucket: "modulefuture-f1249.appspot.com",
  messagingSenderId: "221873161251",
  appId: "1:221873161251:web:c72b3bbefb305c99c7dd96",
  measurementId: "G-375XLHHMCB",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

firebase.firestore();
export default firebase;
