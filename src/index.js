// src/index.js — point d'entrée du bundle (compilé en /main.js).
//
// Chaque module exporte initXxx(root = document) et ne fait rien si sa
// section est absente de la page. L'ordre compte :
//   - transformations du contenu CMS (rich text, embeds) avant tout ce qui
//     lit l'article ;
//   - animations et sections épinglées en dernier, mesurées sur la mise en
//     page finale.
// Ajouter une fonctionnalité : créer son fichier, l'importer ici, l'appeler.

import { onReady } from "./utils/on-ready.js";
import { initCore } from "./core/core.js";
import { initSvgInline } from "./content/svg-inline.js";
import { initTitleAccent } from "./content/title-accent.js";
import { initCaseStudy } from "./content/case-study.js";
import { initBento } from "./components/bento.js";
import { initSliders } from "./components/sliders.js";
import { initMagnetic } from "./components/magnetic.js";
import { initCasesFilter } from "./components/cases-filter.js";
import { initCasesSlider } from "./components/cases-slider.js";
import { initVideoPlayer } from "./components/video-player.js";
import { initGallery } from "./components/gallery.js";
import { initNavDropdown } from "./components/nav-dropdown.js";
import { initNavScroll } from "./components/nav-scroll.js";
import { initLogoMarquee } from "./components/logo-marquee.js";
import { initCardsReveal } from "./animations/cards-reveal.js";
import { initImageReveal } from "./animations/image-reveal.js";
import { initParallax, initStoryParallax } from "./animations/parallax.js";
import { initRowsReveal } from "./animations/rows-reveal.js";
import { initFooterLogo } from "./animations/footer-logo.js";
import { initTestimonialsSticky } from "./sections/testimonials-sticky.js";

onReady(() => {
  initCore();

  // Contenu CMS
  initSvgInline();
  initTitleAccent();
  initBento(); // avant case-study : retire les cases vides du bento
  initCaseStudy();

  // Composants
  initSliders();
  initMagnetic();
  initNavDropdown();
  initNavScroll();
  initLogoMarquee();
  initCasesFilter();
  initCasesSlider();
  initVideoPlayer();
  initGallery();

  // Animations et sections (en dernier)
  initCardsReveal();
  initImageReveal();
  initParallax();
  initStoryParallax();
  initRowsReveal();
  initFooterLogo();
  initTestimonialsSticky();
});

console.log(`%c[Blinked] main.js — build ${__BUILD_DATE__}`, "color:#7dd3fc");
