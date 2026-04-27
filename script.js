const animatedItems = document.querySelectorAll(
  '.hero-copy, .hero-card, .section-heading, .service-card, .timeline article, .equipment-card, .benefit-band, .contact-panel'
);

animatedItems.forEach((item) => item.classList.add('fade-in'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

animatedItems.forEach((item) => observer.observe(item));
