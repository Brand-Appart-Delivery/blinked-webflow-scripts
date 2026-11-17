// src/sections/testimonials-sticky.js — titre sticky de la section avis.
// Repris de Slater « Testimonials section ».
//
// Classes du site existant :
//   .section_avis            section (déclencheur)
//     .is-avis-title-sticky  titre : descend et s'estompe au scroll,
//                            petit rebond selon la vitesse de scroll

import { hasGsap, hasScrollTrigger } from "../utils/env.js";
import { prefersReducedMotion } from "../utils/motion.js";

export function initTestimonialsSticky(root = document) {
  if (!hasGsap() || !hasScrollTrigger() || prefersReducedMotion()) return;
  const section = root.querySelector(".section_avis:not([data-avis-ready])");
  const title = section && section.querySelector(".is-avis-title-sticky");
  if (!title) return;
  section.setAttribute("data-avis-ready", "");

  const { gsap, ScrollTrigger } = window;

  // 1. Position (top) + opacité liées au scroll.
  gsap.to(title, {
    top: "10rem",
    opacity: 0.6,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.5,
      invalidateOnRefresh: true,
    },
  });

  // 2. Rebond selon la vitesse de scroll.
  ScrollTrigger.create({
    trigger: section,
    onUpdate: (self) => {
      gsap.to(title, {
        y: self.getVelocity() / 400,
        duration: 0.6,
        ease: "back.out(3)",
        overwrite: "auto",
      });
    },
  });
}
