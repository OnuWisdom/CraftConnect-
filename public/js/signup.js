import { signInWithGoogle, initAuthListener } from './googlefirebaseconfig.js';

// Initialize auth listener when page loads
initAuthListener();

// Google Sign-in button
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

// Password toggle
function togglePassword(fieldId) {
  const field = document.getElementById(fieldId);
  field.type = field.type === 'password' ? 'text' : 'password';
}

window.togglePassword = togglePassword;

// Artisan fields toggle
document.querySelectorAll('input[name="role"]').forEach(radio => {
  radio.addEventListener('change', function() {
    const artisanFields = document.getElementById('artisan-fields');
    const locationInput = document.getElementById('location');
    
    if (this.value === 'artisan') {
      artisanFields.style.display = 'block';
      locationInput.required = true;
    } else {
      artisanFields.style.display = 'none';
      locationInput.required = false;
    }
  });
});