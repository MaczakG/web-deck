// ---------- Mobile nav toggle ----------
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

// ---------- Sticky header ----------
const header = document.getElementById('siteHeader');
const onScrollHeader = () => {
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 30);
};
onScrollHeader();
window.addEventListener('scroll', onScrollHeader, { passive: true });

// ---------- Scroll reveal ----------
const revealTargets = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window && revealTargets.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealTargets.forEach((el) => revealObserver.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add('is-visible'));
}

// ---------- Kinetic hero word ----------
const kineticWords = ['eladnak', 'meggyőznek', 'konvertálnak', 'ügyfelet hoznak', 'dolgoznak helyetted'];
const kineticEl = document.getElementById('kineticWord');
if (kineticEl) {
  let wordIndex = 0;
  setInterval(() => {
    kineticEl.classList.add('is-swapping');
    setTimeout(() => {
      wordIndex = (wordIndex + 1) % kineticWords.length;
      kineticEl.textContent = kineticWords[wordIndex];
      kineticEl.classList.remove('is-swapping');
    }, 400);
  }, 2400);
}

// ---------- Count-up stats ----------
const countEls = document.querySelectorAll('.count-up');
if ('IntersectionObserver' in window && countEls.length) {
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10) || 0;
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  countEls.forEach((el) => countObserver.observe(el));
}

// ---------- Process timeline scroll fill ----------
const processFill = document.getElementById('processFill');
const processSection = document.querySelector('.process');
if (processFill && processSection && 'IntersectionObserver' in window) {
  const fillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        processFill.style.width = '100%';
        fillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.35 });
  fillObserver.observe(processSection);
}

// ---------- Hero deck mouse parallax ----------
const heroDeck = document.getElementById('heroDeck');
if (heroDeck && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const cards = heroDeck.querySelectorAll('.deck-card');
  heroDeck.addEventListener('mousemove', (e) => {
    const rect = heroDeck.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    cards.forEach((card, i) => {
      const depth = (i + 1) * 6;
      card.style.setProperty('--mx', `${px * depth}px`);
      card.style.setProperty('--my', `${py * depth}px`);
    });
  });
  heroDeck.addEventListener('mouseleave', () => {
    cards.forEach((card) => {
      card.style.setProperty('--mx', '0px');
      card.style.setProperty('--my', '0px');
    });
  });
}

// ---------- Magnetic buttons ----------
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('.btn-magnetic').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.4}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

// ---------- Custom cursor ----------
const cursorDot = document.getElementById('cursorDot');
if (cursorDot && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  window.addEventListener('mousemove', (e) => {
    cursorDot.classList.add('is-active');
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
  });
  document.querySelectorAll('a, button').forEach((el) => {
    el.addEventListener('mouseenter', () => cursorDot.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => cursorDot.classList.remove('is-hover'));
  });
} else if (cursorDot) {
  cursorDot.style.display = 'none';
}

// ---------- Testimonial carousel ----------
const testTrack = document.getElementById('testimonialTrack');
const testPrev = document.getElementById('testPrev');
const testNext = document.getElementById('testNext');
function scrollTestimonials(direction) {
  if (!testTrack) return;
  const card = testTrack.querySelector('.testimonial-card');
  const gap = 22;
  const distance = (card ? card.offsetWidth : 300) + gap;
  testTrack.scrollBy({ left: direction * distance, behavior: 'smooth' });
}
testPrev?.addEventListener('click', () => scrollTestimonials(-1));
testNext?.addEventListener('click', () => scrollTestimonials(1));
