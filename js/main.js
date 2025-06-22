// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  htmlElement.setAttribute('data-theme', savedTheme);
}

themeToggle.addEventListener('click', () => {
  if (htmlElement.getAttribute('data-theme') === 'dark') {
    htmlElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  } else {
    htmlElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
});

// Keyboard accessibility for theme toggle
themeToggle.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    themeToggle.click();
  }
});

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const nav = document.querySelector('nav');

mobileToggle.addEventListener('click', () => {
  const expanded = mobileToggle.getAttribute('aria-expanded') === 'true' || false;
  mobileToggle.setAttribute('aria-expanded', !expanded);
  nav.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (nav.classList.contains('active') &&
    !nav.contains(e.target) &&
    !mobileToggle.contains(e.target)) {
    nav.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Use smooth scrolling if supported
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      } else {
        // Fallback for older browsers
        window.scrollTo(0, targetElement.offsetTop - 80);
      }
      
      // Close mobile menu if open
      if (nav.classList.contains('active')) {
        nav.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

// Update copyright year
document.addEventListener('DOMContentLoaded', () => {
  const year = new Date().getFullYear();
  document.getElementById('current-year').textContent = year;
});

// Throttle function for scroll events
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function() {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  }
}

// Example of a throttled scroll event
window.addEventListener('scroll', throttle(function() {
  // Parallax or other scroll effects would go here
}, 100));