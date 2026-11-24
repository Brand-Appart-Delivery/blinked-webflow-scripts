// src/components/cases-slider.js — carrousel de cas clients (fiches service).
// Maquette Figma 2896-4892 : carte active large au centre (accroche, chiffres,
// bouton « Découvrir »), cartes voisines étroites avec le logo client, les
// deux voisines directes légèrement plus bas. Défilement en boucle.
//
// STRUCTURE (posée dans Webflow, template Services) :
//   section[data-cslider]
//     [data-cslider-viewport]               zone visible (overflow hidden)
//       Collection List → Réalisations
//         .w-dyn-items                      piste (déplacée en translateX)
//           .w-dyn-item > .cslider_card[data-cslider-card]
//             a[data-cslider-link]          bouton « Découvrir » (fiche)
//             a.cslider_overlay             ajouté par le JS : lien transparent
//                                           devant toute la carte (même adresse)
//     button[data-cslider-prev] / button[data-cslider-next]
//
// Les états sont des classes : .is-active (carte centrale), .is-near
// (voisines directes, décalées vers le bas). Styles : _cslider.scss.
// Pour la boucle, la liste est copiée plusieurs fois avant et après (au moins
// MIN_BUFFER cartes de chaque côté) ; dès que la piste s'arrête, on se recale
// sans animation sur les cartes d'origine. Les copies sont masquées aux
// lecteurs d'écran.

import { prefersReducedMotion } from "../utils/motion.js";
import { t } from "../utils/i18n.js";

const SWIPE_MIN = 40; // px : glissé minimum pour changer de carte
const MIN_BUFFER = 12; // cartes copiées au minimum de chaque côté (boucle)
const SETTLE_DELAY = 800; // ms : recalage de secours après le dernier clic

// Largeur d'une carte dans un état donné, mesurée sur une copie invisible
// (les vraies cartes peuvent être en pleine transition).
function measure(track, card, active) {
  const probe = card.cloneNode(true);
  probe.classList.toggle("is-active", active);
  probe.style.cssText = "position:absolute;visibility:hidden;transition:none;left:0;top:0;";
  track.appendChild(probe);
  const width = probe.getBoundingClientRect().width;
  probe.remove();
  return width;
}

function setupSlider(section) {
  const viewport = section.querySelector("[data-cslider-viewport]");
  const track = viewport?.querySelector(".w-dyn-items");
  if (!track) return;
  const originals = [...track.children];
  const count = originals.length;
  if (!count) return;
  section.setAttribute("data-cslider-ready", "");

  const prevBtn = section.querySelector("[data-cslider-prev]");
  const nextBtn = section.querySelector("[data-cslider-next]");

  // Une seule carte : pas de navigation, pas de boucle.
  const loop = count > 1;
  if (!loop) {
    prevBtn?.setAttribute("hidden", "");
    nextBtn?.setAttribute("hidden", "");
  }

  // Toute la carte est cliquable : un lien transparent posé devant, avec
  // l'adresse du bouton « Découvrir ». Caché aux lecteurs d'écran et hors
  // tabulation (le bouton reste la cible clavier). Ajouté avant les copies.
  originals.forEach((item) => {
    const card = item.querySelector("[data-cslider-card]") || item;
    const link = card.querySelector("[data-cslider-link]");
    if (!link || card.querySelector(".cslider_overlay")) return;
    const overlay = document.createElement("a");
    overlay.className = "cslider_overlay";
    overlay.href = link.getAttribute("href") || "#";
    if (link.target) overlay.target = link.target;
    overlay.setAttribute("aria-hidden", "true");
    overlay.tabIndex = -1;
    card.appendChild(overlay);
  });

  // Copies avant / après pour la boucle : [copies][originaux][copies].
  // Assez de copies de chaque côté (au moins MIN_BUFFER cartes) pour qu'un
  // enchaînement de clics rapides n'atteigne jamais le bout de la piste
  // avant le recalage sur les originaux.
  const copies = loop ? Math.max(2, Math.ceil(MIN_BUFFER / count)) : 0;
  const start = copies * count; // position de la 1re carte d'origine
  const makeClones = () =>
    originals.map((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.setAttribute("data-cslider-clone", "");
      return clone;
    });
  for (let c = 0; c < copies; c += 1) {
    track.prepend(...makeClones());
    track.append(...makeClones());
  }

  const items = [...track.children];
  const cards = items.map((item) => item.querySelector("[data-cslider-card]") || item);

  originals.forEach((item, i) => {
    const card = item.querySelector("[data-cslider-card]") || item;
    card.setAttribute("role", "group");
    card.setAttribute("aria-label", t("cases.slide", { index: i + 1, total: count }));
  });

  let index = start; // première carte des originaux
  let small = 0;
  let big = 0;
  let gap = 0;

  function measureAll() {
    gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    small = measure(track, cards[0], false);
    big = measure(track, cards[0], true);
  }

  // Sans transition (boucle, redimensionnement) : on coupe puis on rétablit.
  function withoutTransition(fn) {
    section.classList.add("is-instant");
    fn();
    void track.offsetWidth; // force le calcul avant de rétablir les transitions
    section.classList.remove("is-instant");
  }

  function render() {
    cards.forEach((card, i) => {
      const active = i === index;
      card.classList.toggle("is-active", active);
      card.classList.toggle("is-near", Math.abs(i - index) === 1);
      // Seul le bouton de la carte active est atteignable au clavier.
      card.querySelectorAll("a:not(.cslider_overlay), button").forEach((el) => {
        if (active && !items[i].hasAttribute("data-cslider-clone")) el.removeAttribute("tabindex");
        else el.setAttribute("tabindex", "-1");
      });
    });
    // Centre de la carte active, calculé avec les largeurs finales.
    const center = index * (small + gap) + big / 2;
    const x = viewport.clientWidth / 2 - center;
    track.style.transform = `translate3d(${x}px, 0, 0)`;
  }

  // Revient dans les originaux si on est sur une copie (invisible : même contenu).
  function normalize() {
    if (!loop) return;
    if (index < start || index >= start + count) {
      index = start + (((index - start) % count) + count) % count;
      withoutTransition(render);
    }
  }

  // Fin du mouvement : recalage dès que la piste s'arrête (transitionend),
  // avec un minuteur de secours si l'événement ne vient pas.
  let settleTimer = null;
  track.addEventListener("transitionend", (e) => {
    if (e.target !== track || e.propertyName !== "transform") return;
    clearTimeout(settleTimer);
    normalize();
  });

  function goTo(next) {
    if (loop) next = Math.max(0, Math.min(items.length - 1, next));
    else next = Math.max(0, Math.min(count - 1, next));
    if (next === index) return;
    index = next;
    render();
    if (prefersReducedMotion()) {
      normalize();
      return;
    }
    clearTimeout(settleTimer);
    settleTimer = setTimeout(normalize, SETTLE_DELAY);
  }

  prevBtn?.addEventListener("click", () => goTo(index - 1));
  nextBtn?.addEventListener("click", () => goTo(index + 1));

  // Clic sur une carte non active : elle devient active (sans ouvrir).
  // Clic sur la carte active : le lien posé devant ouvre la fiche.
  let swiped = false;
  cards.forEach((card, i) => {
    card.addEventListener("click", (e) => {
      if (swiped) {
        e.preventDefault();
        return;
      }
      if (i !== index) {
        e.preventDefault();
        goTo(i);
        return;
      }
      const link = card.querySelector("[data-cslider-link]");
      if (link && !e.target.closest("a")) link.click();
    });
  });

  // Glissé (souris ou doigt)
  let startX = null;
  let startY = 0;
  viewport.addEventListener("pointerdown", (e) => {
    startX = e.clientX;
    startY = e.clientY;
    swiped = false;
  });
  viewport.addEventListener("pointerup", (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    startX = null;
    if (Math.abs(dx) > SWIPE_MIN && Math.abs(dx) > Math.abs(dy)) {
      swiped = true;
      goTo(index + (dx < 0 ? 1 : -1));
      setTimeout(() => (swiped = false), 0);
    }
  });
  viewport.addEventListener("pointercancel", () => (startX = null));
  // Empêche le glisser-déposer natif des images / liens
  viewport.addEventListener("dragstart", (e) => e.preventDefault());

  // Flèches du clavier quand le focus est dans le carrousel
  section.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goTo(index - 1);
    else if (e.key === "ArrowRight") goTo(index + 1);
  });

  // Redimensionnement : nouvelles largeurs (rem fluides, breakpoints)
  let resizeFrame = 0;
  window.addEventListener(
    "resize",
    () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        measureAll();
        withoutTransition(render);
      });
    },
    { passive: true },
  );

  measureAll();
  withoutTransition(render);
}

export function initCasesSlider(root = document) {
  root.querySelectorAll("[data-cslider]:not([data-cslider-ready])").forEach(setupSlider);
}
