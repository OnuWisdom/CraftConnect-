const sideBar = document.querySelector('.sidebar');
const iconSideBar = document.querySelector('.icon-sidebar');
const logoIcon = document.querySelectorAll('.logo-icon');
const filterButtons = document.querySelectorAll('.pill');
const btnActions = document.querySelectorAll('.card-actions');
// const firstButton   = filterButtons[0];           // the one that stays active
let currentActive = document.querySelector('.filter-btn.active');

// Function to toggle Sidebar
function toggleSidebar() {
	if (sideBar.classList.contains('hidden')) {
		sideBar.classList.remove('hidden');
	} else {
		sideBar.classList.add('hidden');
	}

	if (iconSideBar.classList.contains('hidden')) {
		iconSideBar.classList.remove('hidden');
	} else {
		iconSideBar.classList.add('hidden');
	}
}
// It's event listener
logoIcon.forEach((logo) => {
	logo.addEventListener('click', toggleSidebar);
});


// function to format the date dynamically
function formatDate(date = new Date()) {
	const options = {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	};

	return date.toLocaleDateString('en-US', options);
}

function updateDate() {
	const dateElement = document.querySelectorAll('.date');

	dateElement.forEach((date) => {
		if (date) {
			date.textContent = formatDate();
		}
	});
}

// Update date immediately when page loads
updateDate();
// Update date every minute to keep it current
setInterval(updateDate, 60000);

const checkBoxes = document.querySelectorAll(".checkboxx")
const checked = document.getElementById("checked")

checkBoxes.forEach (box =>{
	box.addEventListener("change", function() {
	let checkedCount = 0;
	checkBoxes.forEach (box =>{
		if (box.checked) {
			checkedCount++
		}
	})
	checked.innerText = checkedCount;
})
});