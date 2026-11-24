// src/animations/home-cases.js — apparition des chiffres des cartes « Nos succès ».
//
// La carte entière apparaît déjà avec cards-reveal (.home-case). Ici, le
// panneau des chiffres (.home-case_kpis) arrive juste après : il monte et
// passe de transparent à visible, une seule fois, quand la carte entre à
// l'écran.
//
// Classes du site (posées dans Webflow) : .home-case, .home-case_kpis.
// État caché initial : _home-cases.scss (seulement si le JS tourne).

import { hasGsap, hasScrollTrigger } from "../utils/env.js";
import { prefersReducedMotion } from "../utils/motion.js";

const CARD = ".home-case";
const PANEL = ".home-case_kpis";

export function initHomeCases(root = document) {
  if (!hasGsap() || !hasScrollTrigger()) return;
  const { gsap } = window;

  root.querySelectorAll(`${CARD}:not([data-home-case-ready])`).forEach((card) => {
    const panel = card.querySelector(PANEL);
    if (!panel) return;
    card.setAttribute("data-home-case-ready", "");

    // Mouvement réduit : panneau visible directement
    if (prefersReducedMotion()) {
      gsap.set(panel, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      panel,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        delay: 0.35, // après l'apparition de la carte
        ease: "expo.out",
        // pas de clearProps : l'état caché du CSS reviendrait
        scrollTrigger: { trigger: card, start: "top 80%", once: true },
      },
    );
  });
}
