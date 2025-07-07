// Auto-rotate product cards every 5 seconds
document.addEventListener('DOMContentLoaded', () => {
  // Carousel functionality
  const carousel = document.querySelector('.carousel-inner');
  if (carousel) {
    const items = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;
    
    function rotateCarousel() {
      currentIndex = (currentIndex + 1) % items.length;
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    setInterval(rotateCarousel, 5000);
  }
  
  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
});