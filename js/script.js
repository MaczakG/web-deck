// ---------- Preloader ----------
const preloader = document.getElementById('preloader');
window.addEventListener('load', () => {
  setTimeout(() => {
    preloader?.classList.add('is-done');
    document.body.classList.add('is-loaded');
  }, 1200);
});
// Fallback in case 'load' never fires quickly (slow fonts etc.)
setTimeout(() => preloader?.classList.add('is-done'), 3200);

// ---------- Wrap data-reveal-text content for slide-up reveal ----------
document.querySelectorAll('[data-reveal-text]').forEach((el) => {
  const wrapper = document.createElement('span');
  wrapper.className = 'line-inner';
  wrapper.innerHTML = el.innerHTML;
  el.innerHTML = '';
  el.appendChild(wrapper);
});

// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('nav-open');
  });
  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => mainNav.classList.remove('nav-open'));
  });
}

// ---------- Sticky header + scroll progress ----------
const header = document.getElementById('siteHeader');
const progressBar = document.getElementById('progressBar');
const onScroll = () => {
  if (header) header.classList.toggle('is-scrolled', window.scrollY > 30);
  if (progressBar) {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    progressBar.style.width = `${pct}%`;
  }
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ---------- Scroll reveal ----------
const revealTargets = document.querySelectorAll('[data-reveal], [data-reveal-text]');
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

// ---------- Statement strike-through trigger ----------
const statement = document.querySelector('.statement');
if (statement && 'IntersectionObserver' in window) {
  const statementObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        statement.classList.add('is-inview');
        statementObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  statementObserver.observe(statement);
}

// ---------- Kinetic hero word ----------
const kineticWords = ['több.', 'karakteresebb.', 'meggyőzőbb.', 'emlékezetesebb.'];
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
  }, 2600);
}

// ---------- Count-up numbers ----------
const countEls = document.querySelectorAll('.count-up');
if ('IntersectionObserver' in window && countEls.length) {
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10) || 0;
      const suffix = el.dataset.suffix || '';
      const duration = 1300;
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
  }, { threshold: 0.6 });
  countEls.forEach((el) => countObserver.observe(el));
}

// ---------- Magnetic buttons ----------
const fineHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
if (fineHover) {
  document.querySelectorAll('.btn-magnetic').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.4}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0, 0)'; });
  });
}

// ---------- Custom cursor bubble (VIEW / EXPLORE) ----------
const cursorBubble = document.getElementById('cursorBubble');
const cursorBubbleText = document.getElementById('cursorBubbleText');
if (cursorBubble && fineHover) {
  window.addEventListener('mousemove', (e) => {
    cursorBubble.style.left = `${e.clientX}px`;
    cursorBubble.style.top = `${e.clientY}px`;
  });
  document.querySelectorAll('[data-cursor]').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursorBubbleText.textContent = el.dataset.cursor;
      cursorBubble.classList.add('is-active');
    });
    el.addEventListener('mouseleave', () => cursorBubble.classList.remove('is-active'));
  });
}

// ---------- Services hover preview image ----------
const servicePreview = document.getElementById('servicePreview');
const servicePreviewImg = document.getElementById('servicePreviewImg');
if (servicePreview && fineHover) {
  document.querySelectorAll('.service-row').forEach((row) => {
    row.addEventListener('mouseenter', () => {
      servicePreviewImg.src = row.dataset.img;
      servicePreview.classList.add('is-active');
    });
    row.addEventListener('mouseleave', () => servicePreview.classList.remove('is-active'));
  });
  document.addEventListener('mousemove', (e) => {
    servicePreview.style.transform = `translate(${e.clientX - 170}px, ${e.clientY - 200}px)`;
  });
}

// ---------- Process horizontal scroll (pinned section) ----------
const processSection = document.querySelector('.process');
const processTrack = document.getElementById('processTrack');
if (processSection && processTrack && window.innerWidth > 760) {
  const updateProcess = () => {
    const rect = processSection.getBoundingClientRect();
    const total = processSection.offsetHeight - window.innerHeight;
    if (total <= 0) return;
    const progress = Math.min(Math.max(-rect.top / total, 0), 1);
    const maxScroll = Math.max(processTrack.scrollWidth - processTrack.parentElement.clientWidth, 0);
    processTrack.style.transform = `translateX(${-progress * maxScroll}px)`;
  };
  updateProcess();
  window.addEventListener('scroll', updateProcess, { passive: true });
  window.addEventListener('resize', updateProcess);
}

// ---------- FAQ accordion ----------
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
