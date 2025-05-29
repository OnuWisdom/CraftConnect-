// ------------------- About Page Script ------------------- //
// Function For the Profile Dropdown
function toggleDropdown() {
	let dropdown = document.getElementById("dropdown");
	let arrow = document.getElementById("arrow");

	// Toggle dropdown visibility
	dropdown.classList.toggle("dropdown");

	// Toggle arrow rotation
	arrow.classList.toggle("active");
}

// Close the dropdown when clicking outside
document.addEventListener('click', (event) => {
	let dropdown = document.getElementById ('dropdown');
	let profileInfo = document.querySelector ('.profile-info');

	if (!profileInfo.contains(event.target)) {
		dropdown.style.display = 'none';
		document.getElementById('arrow').classList.remove('active');
	}
});

// ---Mobile Navbar Toggle--- //

// Navbar toggle function for mobile
function toggleNavbar() {
	let navbar = document.querySelector('.navbar');
	navbar.classList.toggle('show');
}
