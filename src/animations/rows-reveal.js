// src/animations/rows-reveal.js — apparition ligne par ligne au scroll.
//
// Les lignes d'une liste montent et apparaissent l'une après l'autre quand la
// liste entre dans l'écran (une seule fois). Rien si mouvement réduit.
//
// STRUCTURE : liste des plateformes du cas client
//   [data-cs-block="plateformes"] .cs_platform     lignes (composant « CS · Plateformes »)
// Pour une autre liste : ajouter son sélecteur dans ROWS.

import { hasGsap, hasScrollTrigger } from "../utils/env.js";
import { prefersReducedMotion } from "../utils/motion.js";

const ROWS = ['[data-cs-block="plateformes"] .cs_platform'];

export function initRowsReveal(root = document) {
  if (!hasGsap() || !hasScrollTrigger() || prefersReducedMotion()) return;
  const { gsap } = window;

  // Regroupe les lignes par liste (leur parent commun)
  const lists = new Map();
  root.querySelectorAll(ROWS.join(",")).forEach((row) => {
    if (row.hasAttribute("data-rows-ready") || row.classList.contains("is-empty")) return;
    row.setAttribute("data-rows-ready", "");
    const list = row.parentElement;
    if (!lists.has(list)) lists.set(list, []);
    lists.get(list).push(row);
  });

  lists.forEach((rows, list) => {
    gsap.fromTo(
      rows,
      { autoAlpha: 0, y: 24 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: { trigger: list, start: "top 85%", once: true },
      },
    );
  });
}
