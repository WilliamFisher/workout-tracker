import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAHrtgdF34CJhL0_8HCphNvx5jQyw758kQ",
  authDomain: "workout-tracker-b761f.firebaseapp.com",
  projectId: "workout-tracker-b761f",
  storageBucket: "workout-tracker-b761f.appspot.com",
  messagingSenderId: "672446121913",
  appId: "1:672446121913:web:dc89bcc90352d4c1ca5868",
};
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const db = app.firestore();
export default app;
