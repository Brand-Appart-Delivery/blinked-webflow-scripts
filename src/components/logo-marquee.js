// src/components/logo-marquee.js — défilement infini des logos clients.
//
// Remplace l'interaction Webflow « Logo 3 [Loop] », qui démarrait dès le
// chargement (pendant l'intro de la home) et déplaçait le bandeau d'une
// valeur fixe (-112rem), d'où un translate bizarre et un saut à chaque boucle.
//
// Ici le défilement ne démarre qu'une fois la section visible ET son
// apparition terminée (intro GSAP de la home), puis accélère en douceur.
// Il se met en pause quand la section sort de l'écran.
//
// STRUCTURE (classes Relume existantes, rien à poser dans Webflow) :
//   .section_logo3
//     .logo3_component      ← bandeau (bloqué par le CSS, voir _logo-marquee.scss)
//       .logo3_list × 2     ← deux listes identiques, déplacées ensemble
//
// Le CSS neutralise le transform de l'IX Webflow sur .logo3_component : on
// peut donc supprimer l'interaction dans le Designer quand on veut.

import { hasGsap } from "../utils/env.js";
import { prefersReducedMotion } from "../utils/motion.js";

const SECTION = ".section_logo3";
const LIST = ".logo3_list";
const SPEED = 60; // px par seconde (≈ vitesse de l'ancienne IX)
const RAMP = 1.2; // s : durée de l'accélération au démarrage
const MAX_WAIT = 4000; // ms : on démarre quoi qu'il arrive après ce délai

export function initLogoMarquee(root = document) {
  if (!hasGsap() || prefersReducedMotion()) return;

  root.querySelectorAll(`${SECTION}:not([data-marquee-ready])`).forEach((section) => {
    const lists = [...section.querySelectorAll(LIST)];
    if (!lists.length) return;
    section.setAttribute("data-marquee-ready", "");
    setupMarquee(section, lists);
  });
}

function setupMarquee(section, lists) {
  const { gsap } = window;
  let tween = null;
  let started = false;
  let waiting = false;
  let visible = false;

  // Distance d'une boucle : écart entre la 1re et la 2e liste (marges
  // comprises). Après ce décalage, la 2e liste est pile à la place de la 1re.
  const measure = () => {
    if (lists[1]) return lists[1].offsetLeft - lists[0].offsetLeft;
    const style = getComputedStyle(lists[0]);
    return lists[0].offsetWidth + parseFloat(style.marginRight || 0);
  };

  // (Re)crée la boucle en gardant la progression (au redimensionnement).
  const build = () => {
    const distance = measure();
    if (distance <= 0) return;
    const progress = tween ? tween.progress() : 0;
    const paused = tween ? tween.paused() : true;
    const speed = tween ? tween.timeScale() : 0;
    tween?.kill();
    tween = gsap.fromTo(
      lists,
      { x: 0 },
      { x: -distance, duration: distance / SPEED, ease: "none", repeat: -1, paused },
    );
    tween.progress(progress).timeScale(speed);
  };

  const start = () => {
    started = true;
    build();
    if (!tween) return;
    tween.timeScale(0).play();
    gsap.to(tween, { timeScale: 1, duration: RAMP, ease: "power1.in" });
    if (!visible) tween.pause();
  };

  // Section visible ? On lance (une fois l'apparition finie) ou on reprend.
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (!visible) {
      tween?.pause();
      return;
    }
    if (started) tween?.play();
    else if (!waiting) {
      waiting = true;
      waitUntilShown(section, start);
    }
  });
  io.observe(section);

  // Les logos (images) changent la largeur en chargeant : on remesure.
  let resizeTimer = null;
  const ro = new ResizeObserver(() => {
    if (!started) return;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(build, 150);
  });
  ro.observe(lists[0]);
}

// Attend que la section soit entièrement apparue : plus aucune animation
// GSAP en cours sur elle et opacité à 1 (intro de la home).
function waitUntilShown(section, callback) {
  const { gsap } = window;
  const begin = performance.now();
  let done = false;

  const check = () => {
    const elapsed = performance.now() - begin;
    const shown =
      !gsap.isTweening(section) && parseFloat(getComputedStyle(section).opacity) >= 0.99;
    // Petit délai mini : laisse le temps à une intro de poser son état de départ.
    if ((elapsed > 150 && shown) || elapsed > MAX_WAIT) {
      gsap.ticker.remove(check);
      if (!done) {
        done = true;
        callback();
      }
    }
  };
  gsap.ticker.add(check);
}
