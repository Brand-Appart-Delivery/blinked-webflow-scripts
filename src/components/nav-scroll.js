// src/components/nav-scroll.js — nav blanche au scroll sur les pages à hero sombre.
//
// En haut de page, la nav est transparente sur le hero sombre (logo blanc,
// liens blancs). Dès qu'on descend, elle passe en fond blanc avec le logo
// couleur et des liens foncés (classe .nav-is-light, styles : _nav.scss).
//
// Repris du code inline de la home (6 pages) pour l'avoir partout, dont le
// template Services. Actif seulement si la page a un hero sombre
// (.bg_gradient_hero, ou [data-dark-hero] sur un autre hero, ex. fiche cas
// client). Le code inline restant fait la même chose : pas de conflit, ils
// posent la même classe.

const NAV = ".navbar9_component";
const DARK_HERO = ".bg_gradient_hero, [data-dark-hero]";
const THRESHOLD = 20; // px de scroll avant le passage en blanc

export function initNavScroll(root = document) {
  const nav = root.querySelector(`${NAV}:not([data-nav-scroll-ready])`);
  if (!nav || !document.querySelector(DARK_HERO)) return;
  nav.setAttribute("data-nav-scroll-ready", "");

  let ticking = false;
  const update = () => {
    ticking = false;
    nav.classList.toggle("nav-is-light", window.scrollY > THRESHOLD);
  };

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();
}
