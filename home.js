document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();

          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);

          if (targetElement) {
              const headerOffset = document.querySelector('.header').offsetHeight; // Get fixed header height
              const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
              const offsetPosition = elementPosition - headerOffset - 20; // Additional padding

              window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
              });

              // Close mobile menu if open
              const navLinks = document.querySelector('.nav-links');
              const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
              if (navLinks.classList.contains('open')) {
                  navLinks.classList.remove('open');
                  mobileNavToggle.setAttribute('aria-expanded', 'false');
                  mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>'; // Restore bars icon
              }
          }
      });
  });

  // Mobile Navigation Toggle
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileNavToggle && navLinks) {
      mobileNavToggle.addEventListener('click', () => {
          const isExpanded = navLinks.classList.toggle('open');
          mobileNavToggle.setAttribute('aria-expanded', isExpanded);
          if (isExpanded) {
              mobileNavToggle.innerHTML = '<i class="fas fa-times"></i>'; // Change to close icon
          } else {
              mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>'; // Restore bars icon
          }
      });
  }

  // Scroll-Triggered Animations using Intersection Observer
  const animateElements = document.querySelectorAll('.animate-on-scroll, .animate-fade-in, .animate-slide-up, .animate-slide-left, .animate-slide-right');

  const observerOptions = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.15 // Element is visible when 15% of it is in the viewport
  };

  const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target); // Stop observing once animated
          }
      });
  };

  const sectionObserver = new IntersectionObserver(observerCallback, observerOptions);

  animateElements.forEach(el => {
      sectionObserver.observe(el);
  });

  // Highlight active navigation link on scroll
  const sections = document.querySelectorAll('section');
  const navLinksList = document.querySelectorAll('.nav-links a');

  const highlightNavLink = () => {
      let current = '';
      // Loop in reverse to prioritize sections higher up the viewport
      for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          const headerOffset = document.querySelector('.header').offsetHeight;
          const sectionTop = section.offsetTop - headerOffset - 50; // Adjust for header and padding

          if (pageYOffset >= sectionTop) {
              current = section.getAttribute('id');
              break;
          }
      }


      navLinksList.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').includes(current)) {
              link.classList.add('active');
          }
      });
  };

  window.addEventListener('scroll', highlightNavLink);
  highlightNavLink(); // Call on load to set initial active link

  // Basic Form Validation (Client-side only, backend needed for actual email sending)
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault(); // Prevent default form submission

          const nameInput = document.getElementById('name');
          const emailInput = document.getElementById('email');
          const messageInput = document.getElementById('message');

          let isValid = true;

          // Simple validation: check if fields are not empty
          if (nameInput.value.trim() === '') {
              alert("Будь ласка, введіть ваше ім'я.");
              isValid = false;
          } else if (emailInput.value.trim() === '') {
              alert("Будь ласка, введіть ваш Email.");
              isValid = false;
          } else if (!validateEmail(emailInput.value.trim())) {
              alert("Будь ласка, введіть коректний Email.");
              isValid = false;
          } else if (messageInput.value.trim() === '') {
              alert("Будь ласка, введіть ваше повідомлення.");
              isValid = false;
          }

          if (isValid) {
              // In a real application, you would send this data to a server.
              // Example using Fetch API (requires a backend endpoint):
              /*
              fetch('YOUR_BACKEND_ENDPOINT_HERE', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      name: nameInput.value.trim(),
                      email: emailInput.value.trim(),
                      message: messageInput.value.trim()
                  }),
              })
              .then(response => response.json())
              .then(data => {
                  alert('Повідомлення успішно надіслано!');
                  contactForm.reset();
              })
              .catch((error) => {
                  console.error('Error:', error);
                  alert('Виникла помилка при відправленні повідомлення. Спробуйте пізніше.');
              });
              */

              alert("Повідомлення успішно надіслано! (Це демо, дані не відправлені)");
              contactForm.reset(); // Clear the form
          }
      });
  }

  function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
  }
});