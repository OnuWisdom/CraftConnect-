// Function For the Profile Dropdown
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
