// src/utils/load-asset.js — charge un script ou une feuille de style à la demande.
// Chaque URL n'est chargée qu'une fois (les appels suivants réutilisent la promesse).

const cache = new Map();

export function loadScript(src) {
  if (!cache.has(src)) {
    cache.set(
      src,
      new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Script non chargé : ${src}`));
        document.head.appendChild(script);
      }),
    );
  }
  return cache.get(src);
}

export function loadStyle(href) {
  if (!cache.has(href)) {
    cache.set(
      href,
      new Promise((resolve, reject) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        link.onload = () => resolve();
        link.onerror = () => reject(new Error(`CSS non chargée : ${href}`));
        document.head.appendChild(link);
      }),
    );
  }
  return cache.get(href);
}
