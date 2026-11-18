// src/core/overscroll.js — couleur du rebond élastique (Mac / iOS).
//
// Quand on tire la page au-delà de ses bords, le navigateur montre le fond
// de <html>. Par défaut blanc : un flash blanc sous le footer noir.
// Ici, <html> prend la couleur du bord le plus proche :
//   - moitié haute de la page → couleur du haut (1re section, ou fond du body) ;
//   - moitié basse → couleur du footer (.footer13_component, noir).
// <body> reçoit un fond explicite pour que le contenu ne change pas.
// Le rebond reste actif partout (la home le coupait via un CSS inline :
// voir _base.scss).

const FOOTER = ".footer13_component";
const FALLBACK = "#ffffff";

const isTransparent = (color) => !color || color === "transparent" || /rgba\(.*,\s*0\)$/.test(color);

function bgOf(el) {
  if (!el) return null;
  const color = getComputedStyle(el).backgroundColor;
  return isTransparent(color) ? null : color;
}

// Couleur du haut : fond réellement visible en haut de page, sous la nav
// fixe (on remonte les parents jusqu'au premier fond opaque), sinon body.
function topColor(bodyColor) {
  const nav = document.querySelector(".navbar9_component");
  const y = Math.min((nav ? nav.getBoundingClientRect().bottom : 0) + 2, window.innerHeight - 1);
  const x = window.innerWidth / 2;
  let el = document.elementsFromPoint(x, y).find((node) => !nav || !nav.contains(node));
  while (el && el !== document.body) {
    const color = bgOf(el);
    if (color) return color;
    el = el.parentElement;
  }
  return bodyColor;
}

export function initOverscroll() {
  const html = document.documentElement;
  const body = document.body;
  if (body.hasAttribute("data-overscroll-ready")) return;
  body.setAttribute("data-overscroll-ready", "");

  // Le body garde le fond qu'il avait (ou blanc) : seule la zone de rebond change.
  const bodyColor = bgOf(body) || FALLBACK;
  body.style.backgroundColor = bodyColor;

  const top = topColor(bodyColor);
  const bottom = bgOf(document.querySelector(FOOTER)) || top;
  if (top === bottom) {
    html.style.backgroundColor = top;
    return;
  }

  let current = null;
  let ticking = false;

  function update() {
    ticking = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const next = window.scrollY > max / 2 ? bottom : top;
    if (next !== current) {
      current = next;
      html.style.backgroundColor = next;
    }
  }

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
  window.addEventListener("resize", update, { passive: true });
  update();
}
