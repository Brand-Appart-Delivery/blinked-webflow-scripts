// src/content/title-accent.js — fin de titre en italique dégradé, depuis le CMS.
//
// Un titre CMS ne peut pas contenir de <span> : on pose le texte à mettre en
// valeur dans un attribut lié au CMS, et le JS l'entoure d'un span.
//
// STRUCTURE (Webflow) :
//   h1[data-title-accent="résultats business"]   texte lié au champ H1
// Le texte de l'attribut doit être présent tel quel dans le titre (de
// préférence à la fin). Absent ou introuvable : le titre reste tel quel.
//
// OPTION : data-title-accent-class="cs_accent" pour une autre classe que
// celle par défaut (.hero_title-accent, style de la home).
//
// Le titre est masqué jusqu'ici (head code + _base.scss) pour ne pas le voir
// sans style. L'apparition inline des h1/h2 (gsap.from opacity 0) partait
// donc d'un titre déjà à 0 et ne se voyait pas : on la rejoue ici.
// On attend aussi ses polices (Golos + Newsreader italique de l'accent) :
// sinon le titre se recompose sous les yeux quand elles arrivent.

import { hasGsap, hasScrollTrigger } from "../utils/env.js";
import { prefersReducedMotion } from "../utils/motion.js";

const ACCENT_CLASS = "hero_title-accent";
const FONT_TIMEOUT = 1500; // ms : on affiche quoi qu'il arrive après ce délai

// Charge les polices réellement utilisées par ces éléments (une police
// n'est demandée par le navigateur qu'au premier texte qui l'utilise).
function loadFonts(elements) {
  if (!document.fonts || !document.fonts.load) return Promise.resolve();
  const loads = elements.filter(Boolean).map((el) => {
    const s = getComputedStyle(el);
    return document.fonts.load(`${s.fontStyle} ${s.fontWeight} 1em ${s.fontFamily}`).catch(() => {});
  });
  const timeout = new Promise((resolve) => setTimeout(resolve, FONT_TIMEOUT));
  return Promise.race([Promise.all(loads), timeout]);
}

function wrapAccent(title) {
  const accent = (title.getAttribute("data-title-accent") || "").trim();
  if (!accent) return null;
  const text = title.textContent;

  // Dernière occurrence : l'accent est en général la fin du titre
  const index = text.lastIndexOf(accent);
  if (index === -1) return null;

  const span = document.createElement("span");
  span.className = title.getAttribute("data-title-accent-class") || ACCENT_CLASS;
  span.textContent = accent;
  title.replaceChildren(
    document.createTextNode(text.slice(0, index)),
    span,
    document.createTextNode(text.slice(index + accent.length)),
  );
  return span;
}

// Même apparition que le code inline Webflow des h1/h2 (y 40, 2 s, expo).
function reveal(title) {
  if (!hasGsap()) return;
  const { gsap } = window;
  gsap.killTweensOf(title); // l'animation inline, qui partait d'un titre masqué
  if (prefersReducedMotion()) {
    gsap.set(title, { clearProps: "opacity,transform" });
    return;
  }
  gsap.fromTo(
    title,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 2,
      ease: "expo.out",
      clearProps: "opacity,transform",
      scrollTrigger: hasScrollTrigger()
        ? { trigger: title, start: "top 92%", toggleActions: "play none none none" }
        : undefined,
    },
  );
}

export function initTitleAccent(root = document) {
  const selector = "[data-title-accent]:not([data-title-accent-ready]):not([data-title-accent-pending])";
  root.querySelectorAll(selector).forEach((title) => {
    title.setAttribute("data-title-accent-pending", ""); // évite un 2e passage pendant l'attente
    const span = wrapAccent(title);
    loadFonts([title, span]).then(() => {
      reveal(title); // pose l'état de départ (opacité 0) avant de lever le masquage
      title.setAttribute("data-title-accent-ready", "");
    });
  });
}
