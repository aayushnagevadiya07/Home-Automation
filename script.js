import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6b97iUeSOoVWOBKyuTT2uxK4WosuhgkA",
  authDomain: "smart-home-808e9.firebaseapp.com",
  databaseURL: "https://smart-home-808e9-default-rtdb.firebaseio.com",
  projectId: "smart-home-808e9",
  storageBucket: "smart-home-808e9.appspot.com",
  messagingSenderId: "346452735231",
  appId: "1:346452735231:web:35da6234ad68044b0a48ca",
  measurementId: "G-PLCV5TW9VZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// DOM Elements
const checkBtn = document.getElementById("checkStatusBtn");
const statusText = document.getElementById("statusText");

// Function to check ESP32 status
function checkESP32Status() {
  const lastSeenRef = ref(db, "status/lastSeen");

  onValue(lastSeenRef, (snapshot) => {
    const lastSeen = snapshot.val();
    const now = Date.now();

    if (lastSeen && now - lastSeen < 10000) {
      statusText.textContent = "ESP32 is ONLINE ✅";
      statusText.style.color = "green";
    } else {
      statusText.textContent = "ESP32 is OFFLINE ❌";
      statusText.style.color = "red";
    }
  });
}

// Trigger once when button is clicked
checkBtn.addEventListener("click", checkESP32Status);

// Check every 5 seconds automatically
setInterval(checkESP32Status, 5000);
