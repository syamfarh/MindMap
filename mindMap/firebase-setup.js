// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAXMqIl1SVRmb2cTJu_eBUG2j4PQOAkeY",
  authDomain: "mindmap-1379f.firebaseapp.com",
  projectId: "mindmap-1379f",
  storageBucket: "mindmap-1379f.appspot.com",
  messagingSenderId: "413225519539",
  appId: "1:413225519539:web:7e5dfbc94e23cf969f23c6",
  measurementId: "G-582EEDYHKH",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
//const analytics = getAnalytics(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const storage = getStorage(app);
