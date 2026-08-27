// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('nav-open');
    navToggle.classList.toggle('is-active', isOpen);
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('nav-open');
      navToggle.classList.remove('is-active');
    });
  });
}

// Services carousel
const track = document.getElementById('servicesTrack');
const prevBtn = document.getElementById('carPrev');
const nextBtn = document.getElementById('carNext');

function scrollByCard(direction) {
  if (!track) return;
  const card = track.querySelector('.service-card');
  const gap = 22;
  const distance = (card ? card.offsetWidth : 270) + gap;
  track.scrollBy({ left: direction * distance, behavior: 'smooth' });
}

prevBtn?.addEventListener('click', () => scrollByCard(-1));
nextBtn?.addEventListener('click', () => scrollByCard(1));

// FAQ accordion
document.querySelectorAll('.faq-item').forEach((item) => {
  const question = item.querySelector('.faq-question');
  question?.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach((openItem) => {
      if (openItem !== item) openItem.classList.remove('open');
    });
    item.classList.toggle('open', !isOpen);
  });
});
