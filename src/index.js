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
import { initCollapses } from "./components/collapse.js";
import { initSvgInline } from "./content/svg-inline.js";
import { initSliders } from "./components/sliders.js";
import { initMagnetic } from "./components/magnetic.js";
import { initCardsReveal } from "./animations/cards-reveal.js";
import { initImageReveal } from "./animations/image-reveal.js";
import { initFooterLogo } from "./animations/footer-logo.js";
import { initTestimonialsSticky } from "./sections/testimonials-sticky.js";

onReady(() => {
  initCore();

  // Contenu CMS
  initSvgInline();

  // Composants
  initCollapses();
  initSliders();
  initMagnetic();

  // Animations et sections (en dernier)
  initCardsReveal();
  initImageReveal();
  initFooterLogo();
  initTestimonialsSticky();
});

console.log(`%c[Blinked] main.js — build ${__BUILD_DATE__}`, "color:#7dd3fc");
