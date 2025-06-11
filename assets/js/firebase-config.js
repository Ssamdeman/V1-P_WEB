// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";


const firebaseConfig = {
  apiKey: assets/keys/Text.txt,
  authDomain: "v1-per-page.firebaseapp.com",
  projectId: "v1-per-page",
  storageBucket: "v1-per-page.firebasestorage.app",
  messagingSenderId: "963106159907",
  appId: "1:963106159907:web:be1c951493cd92fd502096",
  measurementId: "G-RDGJFS2K97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);




// // Test write
// async function testWrite() {
//   try {
//     const docRef = await addDoc(collection(db, "test"), {
//       message: "Test successful",
//       timestamp: new Date()
//     });
//     console.log("Document written, ID:", docRef.id);
//   } catch (e) {
//     console.error("Error:", e);
//   }
// }

// // Test read
// async function testRead() {
//   const querySnapshot = await getDocs(collection(db, "test"));
//   querySnapshot.forEach((doc) => {
//     console.log(doc.id, "=>", doc.data());
//   });
// }

// // Run tests
// testWrite();
// testRead();