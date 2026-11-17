// src/components/magnetic.js — effet magnétique : l'élément suit la souris.
// Repris de Slater « Magnetism ».
//
// STRUCTURE (attribut à poser dans Webflow) :
//   [data-magnetic]          n'importe quel élément (bouton, lien…)

import { hasGsap, hasFinePointer } from "../utils/env.js";
import { prefersReducedMotion } from "../utils/motion.js";

const STRENGTH = 3; // diviseur : plus petit = attraction plus forte

export function initMagnetic(root = document) {
  if (!hasGsap() || !hasFinePointer() || prefersReducedMotion()) return;
  const { gsap } = window;

  root.querySelectorAll("[data-magnetic]:not([data-magnetic-ready])").forEach((el) => {
    el.setAttribute("data-magnetic-ready", "");

    // quickTo : une seule tween réutilisée, fluide à chaque mousemove.
    const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "power4.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "power4.out" });

    el.addEventListener("mousemove", (e) => {
      const { width, height, left, top } = el.getBoundingClientRect();
      xTo((e.clientX - (left + width / 2)) / STRENGTH);
      yTo((e.clientY - (top + height / 2)) / STRENGTH);
    });

    el.addEventListener("mouseleave", () => {
      xTo(0);
      yTo(0);
    });
  });
}
