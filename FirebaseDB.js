import * as firebase from "firebase";
import firestore from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBz20T1txVQnw6qwAqIGFoK7EeGNBJKLuo",
  authDomain: "orbital-modulefuture.firebaseapp.com",
  databaseURL: "https://orbital-modulefuture.firebaseio.com",
  projectId: "orbital-modulefuture",
  storageBucket: "orbital-modulefuture.appspot.com",
  messagingSenderId: "1064329s740488",
  appId: "1:1064329740488:web:90eac8ba1af1c9c96ae5fd",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

firebase.firestore();
export default firebase;
