import { signInWithGoogle, } from './googlefirebaseconfig.js';

  const googleBtn = document.getElementById('google-btn');

if (googleBtn) {
  googleBtn.addEventListener('click', (e) => {
    console.log('🖱️ Google button clicked!');
    e.preventDefault();
    signInWithGoogle()
  });
} else {
  console.error('❌ Google button not found!');
}

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

    // Password toggle
  function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    field.type = field.type === 'password' ? 'text' : 'password';
  }

  window.togglePassword = togglePassword;

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

