

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

