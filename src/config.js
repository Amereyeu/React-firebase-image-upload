import firebase from "firebase";
import "firebase/storage"

export const app = firebase.initializeApp({
  apiKey: "AIzaSyALbOEzF-46HAcPNqbUvlrnRJ9mk0kocPU",
  authDomain: "fbalbums.firebaseapp.com",
  databaseURL: "https://fbalbums.firebaseio.com",
  projectId: "fbalbums",
  storageBucket: "fbalbums.appspot.com",
  messagingSenderId: "406389035803",
  appId: "1:406389035803:web:2bda7fe8649629800179be",
});
