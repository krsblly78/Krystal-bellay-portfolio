// ==============================
// MENU MOBILE
// ==============================
const menuBtn = document.querySelector('.menu-btn');
const links = document.querySelector('.links');

if (menuBtn && links) {
  menuBtn.addEventListener('click', () => {
    links.classList.toggle('open');
  });
}

// ==============================
// THÈME SOMBRE / CLAIR
// ==============================
const themeBtn = document.querySelector('[data-toggle-theme]');

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  });
}

// ==============================
// COULEUR BLEU / ROSE
// ==============================
const accentBtn = document.querySelector('[data-toggle-accent]');

if (accentBtn) {
  accentBtn.addEventListener('click', () => {
    const html = document.documentElement;
    const isBlue = html.getAttribute('data-accent') === 'blue';
    html.setAttribute('data-accent', isBlue ? 'pink' : 'blue');
  });
}

// ==============================
// ACCORDÉON POUR LA PAGE ÉCOLE
// ==============================
document.querySelectorAll('.competence-header').forEach((header) => {
  header.addEventListener('click', () => {
    header.closest('.competence-block').classList.toggle('open');
  });
});

// ==============================
// FILTRE GALERIE DESIGN
// ==============================
document.querySelectorAll('.design-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    const category = tab.dataset.filter;

    document.querySelectorAll('.design-tab').forEach((item) => {
      item.classList.remove('active');
    });

    tab.classList.add('active');

    document.querySelectorAll('.design-card').forEach((card) => {
      const shouldShow = category === 'all' || card.dataset.cat === category;
      card.style.display = shouldShow ? '' : 'none';
    });
  });
});

// ==============================
// ANIMATION AU SCROLL
// ==============================
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .card, .section-card, .cv-item, .gallery-item, .design-card, .competence-block').forEach((element) => {
  observer.observe(element);
});

/* ==============================
   CARROUSEL 3D DESIGNS
   ============================== */

const carouselCards = document.querySelectorAll('.carousel-card');
const carouselPrev = document.querySelector('.carousel-btn.prev');
const carouselNext = document.querySelector('.carousel-btn.next');

let carouselIndex = 0;

function updateCarousel() {
  if (!carouselCards.length) return;

  carouselCards.forEach((card) => {
    card.classList.remove('active', 'next', 'next-2', 'prev', 'prev-2');
  });

  const total = carouselCards.length;

  const active = carouselIndex;
  const next = (carouselIndex + 1) % total;
  const next2 = (carouselIndex + 2) % total;
  const prev = (carouselIndex - 1 + total) % total;
  const prev2 = (carouselIndex - 2 + total) % total;

  carouselCards[active].classList.add('active');
  carouselCards[next].classList.add('next');
  carouselCards[next2].classList.add('next-2');
  carouselCards[prev].classList.add('prev');
  carouselCards[prev2].classList.add('prev-2');
}

if (carouselCards.length) {
  updateCarousel();

  carouselNext.addEventListener('click', () => {
    carouselIndex = (carouselIndex + 1) % carouselCards.length;
    updateCarousel();
  });

  carouselPrev.addEventListener('click', () => {
    carouselIndex = (carouselIndex - 1 + carouselCards.length) % carouselCards.length;
    updateCarousel();
  });

  carouselCards.forEach((card, index) => {
    card.addEventListener('click', () => {
      carouselIndex = index;
      updateCarousel();
    });
  });
}

/* ==============================
   MINI SLIDERS PREUVES + POPUP
   ============================== */

document.querySelectorAll('.ac-slider').forEach((slider) => {
  const track = slider.querySelector('.ac-slider-track');
  const images = slider.querySelectorAll('img');
  const prevBtn = slider.querySelector('.ac-prev');
  const nextBtn = slider.querySelector('.ac-next');

  let index = 0;

  function updateSlider() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  nextBtn.addEventListener('click', (event) => {
    event.stopPropagation();

    index = (index + 1) % images.length;

    updateSlider();
  });

  prevBtn.addEventListener('click', (event) => {
    event.stopPropagation();

    index = (index - 1 + images.length) % images.length;

    updateSlider();
  });
});

const popup = document.getElementById('imagePopup');
const popupImg = document.getElementById('imagePopupImg');
const popupClose = document.getElementById('imagePopupClose');

document.querySelectorAll('.ac-slider-track img').forEach((img) => {
  img.addEventListener('click', () => {
    popupImg.src = img.src;
    popup.classList.add('open');
  });
});

if (popupClose) {
  popupClose.addEventListener('click', () => {
    popup.classList.remove('open');
    popupImg.src = '';
  });
}

if (popup) {
  popup.addEventListener('click', (event) => {
    if (event.target === popup) {
      popup.classList.remove('open');
      popupImg.src = '';
    }
  });
}