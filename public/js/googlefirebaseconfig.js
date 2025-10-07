import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, GoogleAuthProvider, getRedirectResult, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCt6eacS1LAvuulrVRfsp45zdnj1gZqEKY",
  authDomain: "craftconnect-deb3d.firebaseapp.com",
  projectId: "craftconnect-deb3d",
  storageBucket: "craftconnect-deb3d.firebasestorage.app",
  messagingSenderId: "556003335719",
  appId: "1:556003335719:web:ca3c67a63b21dd561e7802",
  measurementId: "G-LYFJM9NHCQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export function signInWithGoogle() {
  console.log('🚀 Starting Google redirect...');
  signInWithRedirect(auth, provider)
    .catch((error) => {
      console.error('❌ Redirect error:', error);
      alert('Failed to redirect: ' + error.message);
    });
}

export function initAuthListener() {
  console.log('👂 Setting up auth listener...');
  
  // Check for redirect result first
  getRedirectResult(auth)
    .then((result) => {
      console.log('📦 Redirect result:', result);
      
      if (result && result.user) {
        const user = result.user;
        console.log('✅ USER SIGNED IN:', user.email);
        alert(`Welcome ${user.displayName}!`);
        
        // Redirect to home
        setTimeout(() => {
          window.location.href = '/home';
        }, 1000);
      } else {
        console.log('ℹ️ No redirect result');
      }
    })
    .catch((error) => {
      console.error('❌ Error:', error.code, error.message);
    });
  
  // Set up listener for auth changes
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('🔔 Auth state: User logged in', user.email);
    } else {
      console.log('🔔 Auth state: No user');
    }
  });
}