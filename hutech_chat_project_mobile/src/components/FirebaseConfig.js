import * as firebase from "firebase";
import { getDatabase } from "firebase/database";

var config = {
  apiKey: "AIzaSyCaOGpolBJybzlKStHJsqsP5Dnh0KwJK2c",
  authDomain: "nc-chat-1462e.firebaseapp.com",
  databaseURL:
    "https://nc-chat-1462e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nc-chat-1462e",
  storageBucket: "nc-chat-1462e.appspot.com",
  messagingSenderId: "1020049738569",
  appId: "1:1020049738569:web:c179c2480aed4fd9f26898",
  measurementId: "G-71ZLNT7JWY",
};

const app = firebase.initializeApp(config);
const db = getDatabase(app);
export { db };
