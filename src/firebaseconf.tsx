import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyCfRgZcZ9EuSEprlr9kMamhK5Qm9Uh8XK8",
  authDomain: "ts-todolist-github.firebaseapp.com",
  projectId: "ts-todolist-github",
  storageBucket: "ts-todolist-github.appspot.com",
  messagingSenderId: "453316360639",
  appId: "1:453316360639:web:0bcaec94fedf6bd67c890a",
  measurementId: "G-DVBMQKZ5MS"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export default db;