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

