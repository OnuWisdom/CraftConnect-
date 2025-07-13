
 function toggleNav() {
            const navLinks = document.getElementById('navLinks');
            navLinks.classList.toggle('active');
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





document.querySelectorAll('.circle-nav-container').forEach(container => {
  const dots = container.querySelectorAll('.circle-nav');
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      
      // Remove active class
      dots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');

      // Find the corresponding slider near this dot group
      const parent = container.previousElementSibling; // assumes slider is just before the nav
      const slider = parent?.classList.contains('artisan-mainContainer') ? parent : null;

      if (!slider) return;

      // Move the slider to the corresponding "page"
      slider.style.transform = `translateX(-${index * 19}%)`;
    });
  });
});



setTimeout(() =>{

  const flashMsg = document.getElementById('flashMessage');
  if (flashMsg) {

    flashMsg.style.opacity = '0',
    flashMsg.style.transition = 'opacity 0.5s ease-out';
    setTimeout(() =>{

      flashMsg.style.display = 'none';
    }, 500);

  }


}, 4000);


