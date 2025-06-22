// Enhanced Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
  menuToggle.innerHTML = nav.classList.contains('active') ?
    '<i class="fas fa-times"></i>' :
    '<i class="fas fa-bars"></i>';
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
    nav.classList.remove('active');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  }
});

// Parallax effect for background blurs
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.querySelector('.bg-blur-1').style.transform = `translateY(${scrollY * 0.2}px)`;
  document.querySelector('.bg-blur-2').style.transform = `translateY(-${scrollY * 0.2}px)`;
  
  // Header scroll effect
  if (scrollY > 100) {
    document.querySelector('.header').style.padding = '10px 0';
    document.querySelector('.logo img').style.height = '40px';
  } else {
    document.querySelector('.header').style.padding = '20px 0';
    document.querySelector('.logo img').style.height = '50px';
  }
});