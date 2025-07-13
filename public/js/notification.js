// script.js
const sideBar = document.querySelector('.sidebar');
const iconSideBar = document.querySelector('.icon-sidebar');
const logoIcon = document.querySelectorAll('.logo-icon');

const notifications = [
  {
    title: "Profile Incomplete",
    message: "Complete your profile to increase your chances of getting hired.",
    read: false,
  showButton: true // this is our trigger!

  },
  { title: "New Message", message: "You have a new message from Gabriel." },
  {
    title: "Order Confirmed",
    message: "Great news! Your order with John has been confirmed.",
  },
  { title: "New Order Request", message: "John has requested a custom order." },
  {
    title: "New review alert",
    message: "You've received a new review from John.",
  },
  { title: "Happy Salah", message: "Happy Salah! Bola" },
  {
    title: "Update your portfolio",
    message:
      "Haven't added new work in a while, keep your portfolio fresh and attract more clients.",
  },
  {
    title: "Project deadline reminder",
    message: "Reminder: Your order for John is due in 2 days.",
  },
];

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



function completeProfile() {
  alert("Redirecting to profile setup...");
  // You can use: window.location.href = "/profile";
}

function completeProfile() {
  alert("Redirecting to profile setup...");
}

function replyToMessage() {
  alert("Opening message thread with Gabriel...");
}

function renderNotifications(filter = "all") {
  const list = document.getElementById("notificationList");
  list.innerHTML = "";

  const filtered = notifications.filter((n) => {
    if (filter === "read") return n.read;
    if (filter === "unread") return !n.read;
    return true;
  });

  filtered.forEach((n) => {
    const li = document.createElement("li");
    li.className = `notification ${n.read ? "read" : ""}`;

    let buttonHTML = "";
    if (n.title === "Profile Incomplete") {
      buttonHTML = `<button class="action-btn" onclick="completeProfile()">Complete Profile</button>`;
    } else if (n.title === "New Message") {
      buttonHTML = `<button class="action-btn" onclick="replyToMessage()">Tap to Reply</button>`;
    }

    li.innerHTML = `
      <div class='profile-style'>
        <img src="images/profile.jpeg" alt="User" class="profile-pic" />
        <div>
          <strong>${n.title}</strong>
          <p>${n.message}</p>
          ${buttonHTML}
        </div>
      </div>
    `;

    list.appendChild(li);
  });
}

document.querySelector('.icon-search').addEventListener('click', () => {
  alert('Search activated 🔍');
});

document.querySelector('.icon-bell').addEventListener('click', () => {
  alert('No new notifications 🛎️');
});

document.querySelector('.icon-settings').addEventListener('click', () => {
  alert('Settings opened ⚙️');
});

document.querySelector('.profile-pic').addEventListener('click', () => {
  alert('Profile page coming right up 👤');
  
});

function filterNotifications(type) {
  document
    .querySelectorAll(".tab")
    .forEach((tab) => tab.classList.remove("active"));
  document.querySelector(`.tab[onclick*="${type}"]`).classList.add("active");
  renderNotifications(type);
}

window.onload = () => renderNotifications();
