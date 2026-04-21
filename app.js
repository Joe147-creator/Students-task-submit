import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Firebase config (can be empty for now, but MUST NOT break code)
const firebaseConfig = {
  apiKey: "AIzaSyDd5zj4W-zTCrcFsyjvd404hil4z8cZrZc",
  authDomain: "to-do-list-hub.firebaseapp.com",
  projectId: "to-do-list-hub",
  storageBucket: "to-do-list-hub.firebasestorage.app",
  messagingSenderId: "1041844637711",
  appId: "1:1041844637711:web:1277030d43b84c538d537a"
};

// Initialize Firebase safely
let db;
try {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (e) {
  console.log("Firebase not connected yet");
}

// Elements
const studentInput = document.getElementById("studentName");
const taskInput = document.getElementById("taskText");
const button = document.getElementById("submitBtn");

// CLICK EVENT
button.addEventListener("click", async () => {

  const student = studentInput.value.trim();
  const task = taskInput.value.trim();

  if (!student || !task) {
    alert("Please fill all fields");
    return;
  }

  // ⚡ ALWAYS CLEAR FIRST (important fix)
  studentInput.value = "";
  taskInput.value = "";

  console.clear();
  console.log("Local data:", { student, task });

  // Try Firebase (if connected)
  try {
    if (db) {
      await addDoc(collection(db, "studentTasks"), {
        studentName: student,
        task: task,
        createdAt: new Date()
      });

      console.log("Saved to Firebase ✔");
    } else {
      console.log("Firebase not ready — saved locally only");
    }

    alert("Task submitted!");

  } catch (error) {
    console.error("Firebase error:", error);
  }
});