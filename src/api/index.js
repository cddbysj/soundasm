import firebase from "firebase/app";
import "firebase/firestore";

import { FirebaseConfig } from "../config/keys";
firebase.initializeApp(FirebaseConfig);

const db = firebase.firestore();
export const audioRef = db.collection("audios");
export const todosRef = db.collection("todos");
