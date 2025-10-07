import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

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
  console.log('🚀 Opening Google popup...');
  
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log('✅ Signed in:', user.email);
      
      window.location.href = '/user-dashboard'; // Redirect after successful sign-in
    })
    .catch((error) => {
      console.error('❌ Error:', error.code, error.message);
      
      if (error.code === 'auth/popup-blocked') {
        alert('Please allow popups for this site!');
      } else {
        alert('Sign-in failed: ' + error.message);
      }
    });
}