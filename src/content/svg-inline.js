// src/content/svg-inline.js — remplace les <img> SVG du CMS par le SVG inline,
// pour pouvoir le colorer en CSS (currentColor). Repris de Slater « SVG CMS ».
//
// STRUCTURE (classe du site existant) :
//   img.icon-svg             image SVG (CMS) ; le SVG garde id + classes,
//                            plus la classe .replaced-svg

export function initSvgInline(root = document) {
  root.querySelectorAll("img.icon-svg:not([data-svg-ready])").forEach((img) => {
    img.setAttribute("data-svg-ready", "");
    if (!img.src) return;

    fetch(img.src)
      .then((res) => (res.ok ? res.text() : Promise.reject(res.status)))
      .then((data) => {
        const svg = new DOMParser().parseFromString(data, "image/svg+xml").querySelector("svg");
        if (!svg || !img.parentNode) return;

        if (img.id) svg.id = img.id;
        svg.setAttribute("class", `${img.className} replaced-svg`.trim());
        svg.removeAttribute("xmlns:a");
        // L'image avait un alt : on le garde pour les lecteurs d'écran.
        if (img.alt) {
          svg.setAttribute("role", "img");
          svg.setAttribute("aria-label", img.alt);
        } else {
          svg.setAttribute("aria-hidden", "true");
        }
        img.parentNode.replaceChild(svg, img);
      })
      .catch(() => {
        // En cas d'échec, l'<img> d'origine reste affichée.
      });
  });
}
