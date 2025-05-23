document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling для навігаційних посилань
  document.querySelectorAll('nav a').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();

          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });

  // Опціонально: Додавання класу до хедера при прокручуванні для візуальних змін
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) { // Налаштуйте значення за потреби
          header.classList.add('scrolled');
      } else {
          header.classList.remove('scrolled');
      }
  });

  // Для цього сайту немає FAQ акордеона, але якщо додасте, можна розкоментувати:
  /*
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
          const answer = question.nextElementSibling;

          faqQuestions.forEach(otherQuestion => {
              if (otherQuestion !== question && otherQuestion.classList.contains('active')) {
                  otherQuestion.classList.remove('active');
                  otherQuestion.nextElementSibling.classList.remove('show');
              }
          });

          question.classList.toggle('active');
          answer.classList.toggle('show');
      });
  });
  */
});