// src/animations/footer-logo.js — le logo du footer remonte pendant le scroll.
// Repris de Slater « Footer apparition ».
//
// Classes du site existant : .footer13_component (déclencheur),
// .footer_logo_img (logo animé).

import { hasGsap, hasScrollTrigger } from "../utils/env.js";
import { prefersReducedMotion } from "../utils/motion.js";

const TRIGGER = ".footer13_component";
const LOGO = ".footer_logo_img";

export function initFooterLogo(root = document) {
  if (!hasGsap() || !hasScrollTrigger()) return;
  const logo = root.querySelector(`${LOGO}:not([data-footer-logo-ready])`);
  const trigger = root.querySelector(TRIGGER);
  if (!logo || !trigger) return;
  logo.setAttribute("data-footer-logo-ready", "");

  const { gsap } = window;

  // Mouvement réduit : position finale directement.
  if (prefersReducedMotion()) {
    gsap.set(logo, { y: "7rem", opacity: 1 });
    return;
  }

  gsap.fromTo(
    logo,
    { y: "25rem", opacity: 0 },
    {
      y: "7rem",
      opacity: 1,
      ease: "none", // linéaire : le scrub donne déjà l'inertie
      scrollTrigger: {
        trigger,
        start: "top 80%",
        end: "bottom bottom",
        scrub: 2,
      },
    },
  );
}
