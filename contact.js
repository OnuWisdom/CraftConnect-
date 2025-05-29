function toggleNav() {
    var nav = document.getElementById("navLinks");
    nav.classList.toggle("active");
    document.body.classList.toggle("nav-open");
}

// Fucntion For the Profile Dropdown
function toggleDropdown() {
	const dropdown = document.getElementById('dropdown');
	const arrow = document.getElementById('arrow');

	// Toggle dropdown visibility
	dropdown.style.display =
		dropdown.style.display === 'block' ? 'none' : 'block';

	// Toggle arrow rotation
	arrow.classList.toggle('active');
}

// Close the dropdown when clicking outside
document.addEventListener('click', (event) => {
	const dropdown = document.getElementById('dropdown');
	const profileInfo = document.querySelector('.profile-info');

	if (!profileInfo.contains(event.target)) {
		dropdown.style.display = 'none';
		document.getElementById('arrow').classList.remove('active');
	}
});


// form validation

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('contact-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const fullName = document.getElementById('full-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!fullName || !email || !subject || !message || !phone) {
            alert('All fields are required.');
            return;
        }

		// check for valid email format

        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
		

        const formData = { fullName, email, phone, subject, message };
		
		 
        try {
            const response = await fetch('https://reqres.in/api/users', {
                method: 'POST',
                // headers: { 'Content-Type': 'application/json' },
				headers: { 'Content-Type': 'application/json', 'x-api-key': 'reqres-free-v1' },				

                body: JSON.stringify(formData)
            });
			// handle response
			
            const result = await response.json();
			if (response.ok) {
				showCustomAlert("Thank you for reaching out!<br>We've received your message and will get back to you via email within 24 hours.", "✅");
				document.getElementById('contact-form').reset();
			} else {
				showCustomAlert('Error submitting form: ' + result.error, "❌");
			}
        } catch (error) {
			alert('An error occurred. Please try again later.');
            console.error('Fetch error:', error);
        }
    });
});
// close custom alert
function closeCustomAlert() {
	document.getElementById('custom-alert').style.display = 'none';
}
// handle custom alert for form submission
function showCustomAlert(message, icon = "✅") {
const alertBox = document.getElementById('custom-alert');
document.getElementById('custom-alert-message').innerHTML = message;
document.getElementById('custom-alert-icon').innerHTML = `<span class="custom-alert-icon">${icon}</span>`;
alertBox.style.display = 'block';
}


// FAQ section
document.querySelectorAll('.faq-question').forEach(item => {
      item.addEventListener('click', () => {
        const answer = item.nextElementSibling;
        const isActive = answer.classList.contains('active');

       
        // Toggle the clicked answer and question
        answer.classList.toggle('active');
        item.classList.toggle('active');
      });
    });