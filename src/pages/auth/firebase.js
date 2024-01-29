import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";

import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPUvM6OdWnd1BJolmnjIVoDJ0kD5tHh3A",
  authDomain: "tap-on-26989.firebaseapp.com",
  projectId: "tap-on-26989",
  storageBucket: "tap-on-26989.appspot.com",
  messagingSenderId: "307235100072",
  appId: "1:307235100072:web:8dc5b1ad8095844364b99d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app)

const imageDb = getStorage(app);

export {app, auth, db , imageDb};