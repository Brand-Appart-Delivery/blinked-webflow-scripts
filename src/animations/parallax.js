// src/animations/parallax.js — image qui défile plus lentement que la page.
//
// L'image descend légèrement pendant que sa section remonte (GSAP +
// ScrollTrigger, scrub). Rien si mouvement réduit.
//
// STRUCTURE (Webflow) :
//   img[data-parallax-img]          image (dans un parent en overflow hidden)
// OPTIONS :
//   data-parallax-img="20"          décalage en % de la hauteur de l'image (défaut 20)
//   [data-parallax-y="-80"]         élément décalé de -80px quand sa section
//                                   sort par le haut (carte « Résultat clé »)
//
// + initStoryParallax : récits du cas client (voir plus bas).

import { hasGsap, hasScrollTrigger } from "../utils/env.js";
import { prefersReducedMotion } from "../utils/motion.js";

const DEFAULT_SHIFT = 20;

// --- Récits du cas client : texte et médias à des vitesses différentes -------
// Blocs [data-cs-block^="recit"] (composants « CS · Récit A à D »). Le texte
// (.cs_legend) bouge peu, chaque média un peu plus, avec des amplitudes
// différentes pour donner de la profondeur. Chaque case (.cs_media_item de
// premier niveau) bouge d'un bloc : un média reste avec son crédit, une
// colonne photo + légende + photo (Récit C) garde ses écarts. Les cases sont
// côte à côte, donc des vitesses différentes ne les font pas se chevaucher.
// Desktop uniquement, rien si mouvement réduit.
const STORY_TEXT_SHIFT = 12; // px
const STORY_MEDIA_SHIFTS = [36, 60, 24]; // px, en boucle sur les cases médias

function storyTargets(block) {
  // Cases de premier niveau (pas celles imbriquées dans une autre case)
  const items = [...block.querySelectorAll(".cs_media_item")].filter(
    (item) => !item.parentElement.closest(".cs_media_item"),
  );
  // Case texte seul : vitesse du texte ; sinon vitesse d'un média
  const texts = items.filter((item) => !item.querySelector(".cs_media"));
  const medias = items.filter((item) => item.querySelector(".cs_media"));
  return { texts, medias };
}

export function initStoryParallax(root = document) {
  if (!hasGsap() || !hasScrollTrigger()) return;
  const { gsap } = window;
  const blocks = [...root.querySelectorAll('[data-cs-block^="recit"]:not([data-story-parallax-ready])')];
  if (!blocks.length) return;

  const mm = gsap.matchMedia();
  mm.add("(min-width: 992px) and (prefers-reduced-motion: no-preference)", () => {
    blocks.forEach((block) => {
      block.setAttribute("data-story-parallax-ready", "");
      const { texts, medias } = storyTargets(block);
      const scrollTrigger = { trigger: block, start: "top bottom", end: "bottom top", scrub: true };
      const move = (el, shift) =>
        gsap.fromTo(el, { y: shift }, { y: -shift, ease: "none", scrollTrigger: { ...scrollTrigger } });

      texts.forEach((el) => move(el, STORY_TEXT_SHIFT));
      medias.forEach((el, i) => move(el, STORY_MEDIA_SHIFTS[i % STORY_MEDIA_SHIFTS.length]));
    });
  });
}

// --- Élément qui glisse en plus du défilement (ex. carte « Résultat clé ») --
// [data-parallax-y="-80"] : décalage en px pendant que sa section sort de
// l'écran par le haut (négatif = monte plus vite que la page). Desktop.
function initParallaxY(root) {
  const { gsap } = window;
  const els = [...root.querySelectorAll("[data-parallax-y]:not([data-parallax-y-ready])")];
  if (!els.length) return;
  const mm = gsap.matchMedia();
  mm.add("(min-width: 992px) and (prefers-reduced-motion: no-preference)", () => {
    els.forEach((el) => {
      el.setAttribute("data-parallax-y-ready", "");
      const shift = parseFloat(el.getAttribute("data-parallax-y")) || -60;
      const trigger = el.closest("section, header") || el.parentElement;
      gsap.fromTo(
        el,
        { y: 0 },
        { y: shift, ease: "none", scrollTrigger: { trigger, start: "top top", end: "bottom top", scrub: true } },
      );
    });
  });
}

export function initParallax(root = document) {
  if (!hasGsap() || !hasScrollTrigger() || prefersReducedMotion()) return;
  const { gsap } = window;
  initParallaxY(root);

  root.querySelectorAll("[data-parallax-img]:not([data-parallax-ready])").forEach((img) => {
    img.setAttribute("data-parallax-ready", "");
    const shift = parseFloat(img.getAttribute("data-parallax-img")) || DEFAULT_SHIFT;
    // Déclencheur : la section qui contient l'image
    const trigger = img.closest("section, header") || img.parentElement;

    gsap.fromTo(
      img,
      { yPercent: 0 },
      {
        yPercent: shift,
        ease: "none",
        scrollTrigger: { trigger, start: "top top", end: "bottom top", scrub: true },
      },
    );
  });
}
