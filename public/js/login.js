import { signInWithGoogle, checkRedirectResult } from './googlefirebaseconfig.js';

// Check for redirect result on page load
checkRedirectResult();

// Google Sign-in button
document.getElementById('google-btn').addEventListener('click', (e) => {
  e.preventDefault();
  signInWithGoogle();
});

// Your existing signup.js code (password toggle, form validation, etc.)
function fave(fieldId) {
  const field = document.getElementById(fieldId);
  field.type = field.type === 'password' ? 'text' : 'password';
}

// Make it global so HTML onclick can access it
window.fave = fave;


document
    .getElementById("login-form")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        alert("Login functionality coming soon!");
    });

function togglePassword() {
    const passwordInput = document.getElementById("password");
    const toggleIcon = document.getElementById("toggle-password");

    if (passwordInput.type === "password") {
        passwordInput.type = "text"; 
        toggleIcon.textContent = "🙈"; 
    } else {
        passwordInput.type = "password"; 
        toggleIcon.textContent = "👁️"; 
    }
}

