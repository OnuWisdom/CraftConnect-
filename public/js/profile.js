 function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
  }

const mySideBar = document.querySelector(".sidebar")
const myMenu = document.querySelector(".menu-toggle")
const overlay = document.querySelector(".overlay")

myMenu.addEventListener("click", ()=>{
    mySideBar.classList.remove('hidden');
})

overlay.addEventListener("click", ()=>{
    mySideBar.classList.add('hidden');
})

const sideBar = document.querySelector('.sidebar');
const iconSideBar = document.querySelector('.icon-sidebar');
const logoIcon = document.querySelectorAll('.logo-icon');

// Function to toggle Sidebar
function toggleSidebar2() {
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
	logo.addEventListener('click', toggleSidebar2);
});

// // Auto-fill today's date
document.addEventListener('DOMContentLoaded', () => {
  const dateElement = document.querySelector('.date');
  const today = new Date();
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  dateElement.textContent = today.toLocaleDateString('en-GB', options);
});

// Sidebar active state
const sidebarItems = document.querySelectorAll('.nav li');
sidebarItems.forEach(item => {
  item.addEventListener('click', () => {
    sidebarItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});

// Left panel section active state (profile section list)
const leftPanelItems = document.querySelectorAll('.left-panel li');
leftPanelItems.forEach(item => {
  item.addEventListener('click', () => {
    leftPanelItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    
    // Optional: Log clicked section
    console.log(`Switched to: ${item.textContent.trim()}`);
    
    // Bonus: Dynamically switch content on right-panel (if extended)
  });
});