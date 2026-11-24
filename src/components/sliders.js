// src/components/sliders.js — carrousels Swiper du site.
// Repris de Slater « Swiper ». Swiper est chargé par Webflow (head).
//
// Classes du site existant :
//   .swiper.is-equipe        équipe : 1 / 2 / 4 slides, effet zigzag vertical
//   .swiper.is-cs            études de cas : slider sous 992px, désactivé au-dessus
//   .swiper_arrow.is-prev / .is-next (+ .is-cs pour les études de cas)

const ZIGZAG_OFFSET = 50; // px : décalage vers le bas des slides éloignées

// La slide active est en haut, les autres descendent selon leur distance.
function applyZigZag(swiper) {
  swiper.slides.forEach((slide) => {
    const y = Math.abs(Math.sin(slide.progress * (Math.PI / 2))) * ZIGZAG_OFFSET;
    slide.style.transform = `translate3d(0, ${y}px, 0)`;
  });
}

function initEquipe(root) {
  const el = root.querySelector(".swiper.is-equipe:not([data-slider-ready])");
  if (!el) return;
  el.setAttribute("data-slider-ready", "");

  new window.Swiper(el, {
    slidesPerView: 1,
    runCallbacksOnInit: false,
    spaceBetween: 20,
    speed: 1000,
    grabCursor: true,
    watchSlidesProgress: true,
    loop: true,
    navigation: {
      nextEl: ".swiper_arrow.is-next",
      prevEl: ".swiper_arrow.is-prev",
    },
    breakpoints: {
      768: { slidesPerView: 2, spaceBetween: 30 },
      1024: { slidesPerView: 4, spaceBetween: 40 },
    },
    on: {
      init: applyZigZag,
      setTranslate: applyZigZag,
      setTransition(swiper, duration) {
        swiper.slides.forEach((slide) => {
          slide.style.transitionDuration = `${duration}ms`;
          slide.style.transitionTimingFunction = "cubic-bezier(0.25, 1, 0.5, 1)";
        });
      },
    },
  });
}

function initCaseStudies(root) {
  const el = root.querySelector(".swiper.is-cs:not([data-slider-ready])");
  if (!el) return;
  el.setAttribute("data-slider-ready", "");

  new window.Swiper(el, {
    slidesPerView: 1,
    spaceBetween: 16, // les slides voisines débordent (CSS) : un écart entre elles
    loop: true,
    autoHeight: false, // le CSS impose une hauteur uniforme
    navigation: {
      nextEl: ".swiper_arrow.is-next.is-cs",
      prevEl: ".swiper_arrow.is-prev.is-cs",
    },
    breakpoints: {
      0: { enabled: true },
      992: { enabled: false },
    },
  });
}

export function initSliders(root = document) {
  if (typeof window.Swiper === "undefined") return;
  initEquipe(root);
  initCaseStudies(root);
}
