// Booking form submission
// document.getElementById("bookingForm").addEventListener("submit", function(e) {
//   e.preventDefault();
//   const status = document.getElementById("formStatus");
//   status.textContent = "Submitting your booking...";

//   setTimeout(() => {
//     status.textContent = "Thank you, your booking has been received!";
//     this.reset(); // clear form
//   }, 2000);
// });

// Profile dropdown toggle
const userProfile = document.querySelector(".user-profile");
const dropdown = document.querySelector(".profile-dropdown");

userProfile.addEventListener("click", () => {
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
});

// ✅ Fixed menu toggle function
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const closeToggle = document.querySelector('.close-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.add('active');
  });

  closeToggle.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });

  // Close menu when clicking a nav link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
});