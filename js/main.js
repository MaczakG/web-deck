document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("nav-open");
    });
  }

  document.querySelectorAll(".nav-mobile a").forEach((link) => {
    link.addEventListener("click", () => document.body.classList.remove("nav-open"));
  });

  document.querySelectorAll(".faq-item").forEach((item) => {
    const q = item.querySelector(".faq-q");
    q.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      item.parentElement.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("is-open"));
      if (!isOpen) item.classList.add("is-open");
    });
  });

  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    const params = new URLSearchParams(window.location.search);
    const csomag = params.get("csomag");
    if (csomag) {
      const select = contactForm.querySelector("#csomag");
      if (select) select.value = csomag;
    }

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = contactForm.querySelector("#name").value;
      const email = contactForm.querySelector("#email").value;
      const csomagValue = contactForm.querySelector("#csomag").value;
      const message = contactForm.querySelector("#message").value;
      const subject = encodeURIComponent("Ajánlatkérés — WebDeck");
      const body = encodeURIComponent(
        `Név: ${name}\nEmail: ${email}\nÉrdeklődés: ${csomagValue}\n\nÜzenet:\n${message}`
      );
      window.location.href = `mailto:info@webdeck.hu?subject=${subject}&body=${body}`;
    });
  }
});
