// src/components/nav-dropdown.js — méga-menu « Nos services » : ouverture au survol.
//
// Le dropdown Webflow du composant Nav est réglé « au clic ». Sur desktop
// (souris), ce module l'ouvre au survol et le ferme quand la souris quitte le
// bouton ET le panneau, avec un court délai (on peut traverser l'espace
// entre les deux). Le clic et le clavier Webflow restent actifs.
// On pilote le dropdown en « cliquant » son bouton : c'est Webflow qui gère
// les classes w--open, aria-expanded et la fermeture au clic extérieur.
//
// Classes du site existant : .w-dropdown contenant .navbar9_dropdown-toggle.

import { hasFinePointer } from "../utils/env.js";

const DESKTOP = "(min-width: 992px)";
const OPEN_DELAY = 60; // ms : évite d'ouvrir en passant juste par-dessus
const CLOSE_DELAY = 300; // ms : laisse le temps de traverser l’espace jusqu’au panneau

export function initNavDropdown(root = document) {
  if (!hasFinePointer()) return;
  const desktop = window.matchMedia(DESKTOP);

  root.querySelectorAll(".w-dropdown:not([data-nav-hover-ready])").forEach((dropdown) => {
    const toggle = dropdown.querySelector(".navbar9_dropdown-toggle");
    if (!toggle) return;
    dropdown.setAttribute("data-nav-hover-ready", "");

    let openTimer = null;
    let closeTimer = null;
    let openedByHover = false;
    let internalClick = false;

    const isOpen = () => toggle.classList.contains("w--open");

    // Clic « interne » : laissé passer jusqu'au gestionnaire Webflow.
    function press() {
      internalClick = true;
      toggle.click();
      internalClick = false;
    }

    function open() {
      if (!isOpen()) {
        press();
        openedByHover = true;
      }
    }

    function close() {
      if (isOpen()) press();
      openedByHover = false;
    }

    dropdown.addEventListener("mouseenter", () => {
      if (!desktop.matches) return;
      clearTimeout(closeTimer);
      openTimer = setTimeout(open, OPEN_DELAY);
    });

    dropdown.addEventListener("mouseleave", () => {
      if (!desktop.matches) return;
      clearTimeout(openTimer);
      closeTimer = setTimeout(close, CLOSE_DELAY);
    });

    // Clic utilisateur sur « Nos services » : Webflow ouvre / ferme comme
    // d'habitude. On annule seulement une ouverture au survol en attente,
    // pour qu'un clic de fermeture ne soit pas suivi d'une réouverture.
    toggle.addEventListener("click", () => {
      if (internalClick) return;
      clearTimeout(openTimer);
      openedByHover = false;
    });
  });
}
