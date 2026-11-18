// src/utils/i18n.js
// Langue de la page et textes d'interface générés par le code (aria-label,
// messages, boutons). Le contenu Webflow / CMS est déjà traduit par Webflow.
//
// La langue vient de <html lang>, rempli par Webflow Localization sur chaque
// version. Ajouter une langue : une entrée dans LOCALES + son dictionnaire.

const DEFAULT_LANG = "fr";

const LOCALES = {
  fr: { tag: "fr-FR", prefix: "" },
  en: { tag: "en-GB", prefix: "/en" },
};

const DICT = {
  fr: {
    "menu.open": "Menu",
    "menu.close": "Fermer",
    "cases.slide": "Cas client {index} sur {total}",
    "gallery.prev": "Vidéo précédente",
    "gallery.next": "Vidéo suivante",
    "video.play": "Lire",
    "video.pause": "Pause",
    "video.played": "Lu",
    "video.buffered": "Chargé",
    "video.currentTime": "Temps écoulé",
    "video.duration": "Durée",
    "video.volume": "Volume",
    "video.mute": "Couper le son",
    "video.unmute": "Activer le son",
    "video.enterFullscreen": "Plein écran",
    "video.exitFullscreen": "Quitter le plein écran",
    "video.settings": "Réglages",
    "video.speed": "Vitesse",
    "video.normal": "Normale",
    "video.quality": "Qualité",
  },
  en: {
    "menu.open": "Menu",
    "menu.close": "Close",
    "cases.slide": "Case study {index} of {total}",
    "gallery.prev": "Previous video",
    "gallery.next": "Next video",
    "video.play": "Play",
    "video.pause": "Pause",
    "video.played": "Played",
    "video.buffered": "Buffered",
    "video.currentTime": "Current time",
    "video.duration": "Duration",
    "video.volume": "Volume",
    "video.mute": "Mute",
    "video.unmute": "Unmute",
    "video.enterFullscreen": "Enter fullscreen",
    "video.exitFullscreen": "Exit fullscreen",
    "video.settings": "Settings",
    "video.speed": "Speed",
    "video.normal": "Normal",
    "video.quality": "Quality",
  },
};

export function getLang() {
  const lang = (document.documentElement.lang || DEFAULT_LANG).slice(0, 2).toLowerCase();
  return LOCALES[lang] ? lang : DEFAULT_LANG;
}

export function getLocale() {
  return LOCALES[getLang()];
}

// t("slider.position", { index: 1, total: 4 }) -> "1 sur 4"
export function t(key, vars = {}) {
  const str = DICT[getLang()][key] ?? DICT[DEFAULT_LANG][key] ?? key;
  return str.replace(/\{(\w+)\}/g, (_, name) => (name in vars ? vars[name] : `{${name}}`));
}
