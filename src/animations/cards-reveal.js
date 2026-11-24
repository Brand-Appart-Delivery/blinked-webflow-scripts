// src/animations/cards-reveal.js — apparition des cartes au scroll.
// Repris de Slater « cards apparition ».
//
// Les cartes montent et apparaissent par groupe (stagger) quand elles
// entrent à l'écran, une seule fois.
// Exception aux conventions : on cible les classes du site existant
// (posées avant la reprise du projet) pour ne rien changer dans Webflow.
// L'état caché initial est dans src/styles/_cards-reveal.scss : garder
// les deux listes synchronisées.

import { hasGsap, hasScrollTrigger } from "../utils/env.js";
import { prefersReducedMotion } from "../utils/motion.js";

const SELECTORS = [
  ".services_card",
  ".chiffre-cle_block_bloc",
  ".home-case",
  ".temoignages_block",
  ".blog34_item-link",
  ".groupe_grid_block",
  ".confiance_logo_block",
  ".faq6_question",
  ".processus_layout_card",
  "[data-cases-card]", // cartes de la page Réalisations (pas celle du méga-menu)
];

export function initCardsReveal(root = document) {
  if (!hasGsap() || !hasScrollTrigger()) return;
  const { gsap, ScrollTrigger } = window;

  SELECTORS.forEach((selector) => {
    const items = [...root.querySelectorAll(`${selector}:not([data-reveal-ready])`)];
    if (!items.length) return;
    items.forEach((el) => el.setAttribute("data-reveal-ready", ""));

    if (prefersReducedMotion()) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    ScrollTrigger.batch(items, {
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          overwrite: true,
          // Fin de l'apparition : on libère le calque réservé par le
          // will-change du CSS (sinon chaque carte garde son calque et alourdit
          // tout le scroll de la page).
          onComplete: () => batch.forEach((el) => (el.style.willChange = "auto")),
        }),
      start: "top 85%",
      once: true,
    });
  });
}
