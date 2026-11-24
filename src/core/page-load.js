// src/core/page-load.js — comportement au chargement de la page.
//
// 1. Rechargement : on repart toujours du haut de la page (le navigateur
//    restaure sinon l'ancienne position, ce qui casse les apparitions et
//    l'intro). Exception : une URL avec #ancre, gérée par core.js.
//    La même règle est dans le head code Webflow pour agir avant ce script.
//
// 2. Images chargées tout de suite (pas en lazy-load) là où on les voit dès
//    l'arrivée ou très vite : cartes « Nos succès » de la home et toutes les
//    images des fiches cas client. Évite aussi les sauts de hauteur au scroll.
//    Option Webflow : [data-eager-images] sur un conteneur pour en ajouter.

const EAGER = [".home-case_image", ".home-case_image-reverse", "[data-eager-images] img"];
const CASE_STUDY_PATH = /^\/case-studie\//; // template « Réalisations »

function scrollToTopOnReload() {
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  if (!window.location.hash) window.scrollTo(0, 0);
}

function loadImagesNow(root) {
  const selectors = CASE_STUDY_PATH.test(window.location.pathname) ? ["main img", ...EAGER] : EAGER;
  root.querySelectorAll(selectors.join(",")).forEach((img) => {
    if (img.loading === "lazy") img.loading = "eager"; // déclenche le chargement
  });
}

export function initPageLoad(root = document) {
  scrollToTopOnReload();
  loadImagesNow(root);
}
