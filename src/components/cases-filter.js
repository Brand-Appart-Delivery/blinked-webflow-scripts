// src/components/cases-filter.js — filtre par secteur de la page Réalisations.
//
// STRUCTURE (posée dans Webflow, page /realisations) :
//   [data-cases]                         section
//     [data-cases-filter="all"]          bouton « Tous »
//       [data-cases-count]               compteur « (n) »
//     Collection List « Secteurs Réalisations » :
//       [data-cases-filter]              bouton d'un secteur
//         [data-cases-filter-name]       nom du secteur (CMS)
//         [data-cases-count]             compteur
//     Collection List « Réalisations » :
//       [data-cases-card]                carte
//         [data-cases-sector]            secteur(s) de la carte (liste cachée, CMS)
//
// Le module compte les cartes par secteur, masque les secteurs vides et
// filtre la grille au clic. Les secteurs sont comparés par leur nom.

import { requestScrollRefresh } from "../utils/scroll-refresh.js";
import { prefersReducedMotion } from "../utils/motion.js";

const ACTIVE_CLASS = "is-active";
const ALL = "all";

const clean = (text) => (text || "").replace(/\s+/g, " ").trim();

function getCardSectors(card) {
  return [...card.querySelectorAll("[data-cases-sector]")].map((el) => clean(el.textContent)).filter(Boolean);
}

// Élément à masquer : l'item de la Collection List (sinon la carte elle-même).
const itemOf = (el) => el.closest(".w-dyn-item") || el;

// display: none en ligne : l'attribut hidden perd face aux classes Webflow
// qui posent un display (ex. .cases_filter-item en flex).
function setShown(el, shown) {
  el.style.display = shown ? "" : "none";
}

function animateIn(items) {
  if (prefersReducedMotion() || typeof window.gsap === "undefined") return;
  window.gsap.fromTo(
    items,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power3.out", clearProps: "opacity,transform" },
  );
}

export function initCasesFilter(root = document) {
  root.querySelectorAll("[data-cases]:not([data-cases-ready])").forEach((section) => {
    section.setAttribute("data-cases-ready", "");

    const cards = [...section.querySelectorAll("[data-cases-card]")].map((card) => ({
      item: itemOf(card),
      sectors: getCardSectors(card),
    }));
    const buttons = [...section.querySelectorAll("[data-cases-filter]")];
    if (!cards.length || !buttons.length) return;

    // Valeur de chaque bouton : « all » ou le nom du secteur.
    buttons.forEach((btn) => {
      if (btn.dataset.casesFilter !== ALL) {
        const name = btn.querySelector("[data-cases-filter-name]");
        btn.dataset.casesFilter = clean(name ? name.textContent : btn.textContent);
      }
    });

    // Compteurs ; un secteur sans cas client est masqué.
    buttons.forEach((btn) => {
      const value = btn.dataset.casesFilter;
      const count = value === ALL ? cards.length : cards.filter((c) => c.sectors.includes(value)).length;
      const countEl = btn.querySelector("[data-cases-count]");
      if (countEl) countEl.textContent = `(${count})`;
      if (value !== ALL && count === 0) setShown(itemOf(btn), false);

      btn.setAttribute("role", "button");
      btn.setAttribute("aria-pressed", String(btn.classList.contains(ACTIVE_CLASS)));
    });

    function apply(value) {
      buttons.forEach((btn) => {
        const active = btn.dataset.casesFilter === value;
        btn.classList.toggle(ACTIVE_CLASS, active);
        btn.setAttribute("aria-pressed", String(active));
      });

      const shown = [];
      cards.forEach((card) => {
        const visible = value === ALL || card.sectors.includes(value);
        setShown(card.item, visible);
        if (visible) shown.push(card.item);
      });

      animateIn(shown);
      requestScrollRefresh();
    }

    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        apply(btn.dataset.casesFilter);
      });
      // Les liens Webflow ne réagissent pas à Espace : on l'ajoute (rôle bouton).
      btn.addEventListener("keydown", (e) => {
        if (e.key === " ") {
          e.preventDefault();
          apply(btn.dataset.casesFilter);
        }
      });
    });
  });
}
