import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCepIXx1rbx-sLoystsQBtpMzx5TN2VOuo",
  authDomain: "clone-3c087.firebaseapp.com",
  projectId: "clone-3c087",
  storageBucket: "clone-3c087.appspot.com",
  messagingSenderId: "722414852325",
  appId: "1:722414852325:web:3ce70d93bc6bf05d009c0c",
};

const appFirebase = firebase.initializeApp(firebaseConfig);

const db = appFirebase.firestore();
const auth = firebase.auth();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export { db, auth, timestamp };
