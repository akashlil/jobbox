import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD2P7w7wh0ZHtWUS0bFGhHdxcgI--4GupM",
  authDomain: "jobbox-26c84.firebaseapp.com",
  projectId: "jobbox-26c84",
  storageBucket: "jobbox-26c84.appspot.com",
  messagingSenderId: "1095650491529",
  appId: "1:1095650491529:web:9ddd076b48c61f78899a58",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
