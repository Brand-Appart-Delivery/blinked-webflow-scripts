// src/animations/image-reveal.js — révélation des images au scroll.
// Repris de Slater « img ».
//
// STRUCTURE (classes du site existant) :
//   .image-mask              conteneur (déclencheur)
//     .image-reveal          image : zoom arrière + fondu, une seule fois

import { hasGsap, hasScrollTrigger } from "../utils/env.js";
import { prefersReducedMotion } from "../utils/motion.js";

export function initImageReveal(root = document) {
  if (!hasGsap() || !hasScrollTrigger()) return;
  const { gsap } = window;

  root.querySelectorAll(".image-mask:not([data-image-reveal-ready])").forEach((mask) => {
    mask.setAttribute("data-image-reveal-ready", "");
    const img = mask.querySelector(".image-reveal");
    if (!img || prefersReducedMotion()) return;

    gsap.fromTo(
      img,
      { scale: 1.15, opacity: 0, yPercent: 8 },
      {
        scale: 1,
        opacity: 1,
        yPercent: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: mask,
          start: "top 90%",
          once: true,
        },
      },
    );
  });
}
