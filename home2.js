document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for navigation links
  document.querySelectorAll('nav a').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();

          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });

  // FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
          const answer = question.nextElementSibling;

          // Close other open answers
          faqQuestions.forEach(otherQuestion => {
              if (otherQuestion !== question && otherQuestion.classList.contains('active')) {
                  otherQuestion.classList.remove('active');
                  otherQuestion.nextElementSibling.classList.remove('show');
              }
          });

          // Toggle current answer
          question.classList.toggle('active');
          answer.classList.toggle('show');
      });
  });

  // Optional: Add a class to header on scroll for visual change
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) { // Adjust value as needed
          header.classList.add('scrolled');
      } else {
          header.classList.remove('scrolled');
      }
  });
});