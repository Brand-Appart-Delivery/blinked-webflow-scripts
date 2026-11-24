// src/utils/scroll-refresh.js
// Point d'entrée unique pour recalculer ScrollTrigger.
// ScrollTrigger.refresh() recalcule TOUS les déclencheurs de la page : on
// regroupe les demandes (resize, contenu chargé, switch, bannière...) pour
// n'en lancer qu'un seul à la fois.
// ScrollTrigger gère déjà seul le resize de fenêtre et le chargement de page :
// inutile de l'appeler pour ça.
// Jamais pendant un scroll : un refresh coûte cher (tous les déclencheurs)
// et provoquait des à-coups au premier scroll de la home, quand les images
// en lazy-load font grandir la page. On attend que le scroll s'arrête.

const SCROLL_IDLE = 250; // ms sans scroll avant de lancer le refresh

let timer = null;
let dueAt = 0;
let lastScroll = 0;

window.addEventListener("scroll", () => (lastScroll = Date.now()), { passive: true });

function run() {
  const sinceScroll = Date.now() - lastScroll;
  if (sinceScroll < SCROLL_IDLE) {
    timer = setTimeout(run, SCROLL_IDLE - sinceScroll);
    return;
  }
  timer = null;
  window.ScrollTrigger.refresh();
}

export function requestScrollRefresh(delay = 150) {
  if (typeof window.ScrollTrigger === "undefined") return;

  // Une demande plus tardive repousse l'échéance, une plus proche ne
  // l'avance pas : le refresh part une fois tout stabilisé.
  const target = Date.now() + delay;
  if (timer && target <= dueAt) return;

  clearTimeout(timer);
  dueAt = target;
  timer = setTimeout(run, delay);
}
