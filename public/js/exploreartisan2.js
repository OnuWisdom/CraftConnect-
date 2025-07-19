
// Select all nav links
  const navLinks = document.querySelectorAll('.links a');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Remove 'active' from all links
      navLinks.forEach(link => link.classList.remove('active'));

      // Add 'active' to the clicked link
      this.classList.add('active');
    });
  });


  // Save the clicked nav link href to localStorage
document.querySelectorAll('.links a').forEach(link => {
  link.addEventListener('click', function () {
    localStorage.setItem('activeLink', this.href);
  });
});

// On page load, activate the correct link
window.addEventListener('DOMContentLoaded', () => {
  const activeLink = localStorage.getItem('activeLink');
  if (activeLink) {
    document.querySelectorAll('.links a').forEach(link => {
      if (link.href === activeLink) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
});








