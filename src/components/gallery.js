// src/components/gallery.js — galerie horizontale avec flèches (créas vidéo).
//
// La piste défile nativement (doigt / trackpad, scroll-snap en CSS), à la
// souris par glisser-déposer, et avec les flèches (une carte par clic).
// Les flèches sont désactivées en bout de piste et masquées s'il n'y a rien à
// faire défiler. Au chargement, la piste part toujours du début.
//
// STRUCTURE (Webflow, composant « CS · Galerie créas ») :
//   [data-cs-block] (ou [data-gallery])     conteneur
//     button[data-gallery-prev] / button[data-gallery-next]
//     [data-gallery-track]                  piste (cartes en enfants directs)
// Classes : .is-static (rien à faire défiler), .is-dragging (glisser souris).
// Styles : _case-study.scss.

import { prefersReducedMotion } from "../utils/motion.js";
import { t } from "../utils/i18n.js";

const MIN_OVERFLOW = 24; // px : en dessous, rien à faire défiler
const DRAG_THRESHOLD = 5; // px : au-delà, un clic devient un glisser

const behavior = () => (prefersReducedMotion() ? "auto" : "smooth");

function setupGallery(track) {
  track.setAttribute("data-gallery-ready", "");
  const scope = track.closest("[data-gallery], [data-cs-block]") || track.parentElement;
  const prev = scope.querySelector("[data-gallery-prev]");
  const next = scope.querySelector("[data-gallery-next]");
  prev?.setAttribute("aria-label", t("gallery.prev"));
  next?.setAttribute("aria-label", t("gallery.next"));

  const cards = () => [...track.children].filter((el) => el.offsetParent !== null);
  const maxScroll = () => track.scrollWidth - track.clientWidth;

  // Positions d'arrêt : chaque carte alignée sur le début de la piste
  const stops = () => {
    const padding = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    const origin = track.getBoundingClientRect().left - track.scrollLeft + padding;
    const max = maxScroll();
    return cards().map((card) => Math.min(max, Math.max(0, card.getBoundingClientRect().left - origin)));
  };

  // Carte suivante / précédente depuis la position actuelle
  const go = (dir) => {
    const now = track.scrollLeft;
    const list = stops();
    const target =
      dir > 0
        ? (list.find((x) => x > now + 2) ?? maxScroll())
        : ([...list].reverse().find((x) => x < now - 2) ?? 0);
    track.scrollTo({ left: target, behavior: behavior() });
  };

  prev?.addEventListener("click", () => go(-1));
  next?.addEventListener("click", () => go(1));

  // --- Glisser à la souris (le tactile défile déjà nativement) --------------
  let drag = null;

  track.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse" || e.button !== 0 || scope.classList.contains("is-static")) return;
    drag = { x: e.clientX, left: track.scrollLeft, moved: false };
  });

  window.addEventListener("pointermove", (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    if (!drag.moved && Math.abs(dx) < DRAG_THRESHOLD) return;
    if (!drag.moved) {
      drag.moved = true;
      track.classList.add("is-dragging");
    }
    track.scrollLeft = drag.left - dx;
  });

  window.addEventListener("pointerup", () => {
    if (!drag) return;
    const { moved } = drag;
    drag = null;
    if (!moved) return;
    track.classList.remove("is-dragging");
    // Se cale sur la carte la plus proche
    const now = track.scrollLeft;
    const target = stops().reduce((best, x) => (Math.abs(x - now) < Math.abs(best - now) ? x : best), 0);
    track.scrollTo({ left: target, behavior: behavior() });
    // Le clic qui suit le glisser ne doit pas lancer une vidéo
    const block = (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
    };
    track.addEventListener("click", block, true);
    setTimeout(() => track.removeEventListener("click", block, true), 0);
  });

  // Pas de glisser-déposer natif des images
  track.addEventListener("dragstart", (e) => e.preventDefault());

  // --- État des flèches selon la position ------------------------------------
  // Le calage (scroll-snap) se fait sur le bord du texte : même retrait que la
  // marge intérieure de la piste. En CSS, le % de scroll-padding porterait
  // sur la largeur de la piste (plein écran) et vaudrait 0.
  const syncInset = () => {
    const style = getComputedStyle(track);
    track.style.scrollPaddingLeft = style.paddingLeft;
    track.style.scrollPaddingRight = style.paddingRight;
  };

  let frame = 0;
  const update = () => {
    frame = 0;
    syncInset();
    const max = maxScroll();
    const scrollable = max > MIN_OVERFLOW;
    scope.classList.toggle("is-static", !scrollable);
    if (prev) prev.disabled = !scrollable || track.scrollLeft <= 2;
    if (next) next.disabled = !scrollable || track.scrollLeft >= max - 2;
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  track.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });

  // Départ au début de la piste (le navigateur peut restaurer une position)
  track.scrollLeft = 0;
  requestAnimationFrame(() => {
    track.scrollLeft = 0;
    update();
  });
  update();
}

export function initGallery(root = document) {
  root.querySelectorAll("[data-gallery-track]:not([data-gallery-ready])").forEach(setupGallery);
}
