const animatedItems = document.querySelectorAll(
  '.hero-copy, .hero-card, .section-heading, .service-card, .timeline article, .equipment-card, .benefit-band, .contact-panel, .specialist-card, .gallery-card, .location-card, .map-card'
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

const visitCountElement = document.getElementById('visit-count');

async function updateVisitCounter() {
  if (!visitCountElement) {
    return;
  }

  const namespace = 'physio-center-pernik';
  const key = 'site-visits';
  const storageKey = 'physio-center-pernik-visit-registered';

  try {
    const url = localStorage.getItem(storageKey)
      ? `https://api.countapi.xyz/get/${namespace}/${key}`
      : `https://api.countapi.xyz/hit/${namespace}/${key}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!localStorage.getItem(storageKey)) {
      localStorage.setItem(storageKey, 'true');
    }

    visitCountElement.textContent = typeof data.value === 'number'
      ? data.value.toLocaleString('bg-BG')
      : 'Няма данни';
  } catch (error) {
    visitCountElement.textContent = 'Наличен при онлайн версия';
  }
}

updateVisitCounter();
