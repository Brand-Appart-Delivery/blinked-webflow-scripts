// src/components/video-player.js — vidéo YouTube / Vimeo / MP4 lue avec Plyr.
//
// Deux sources possibles :
//   1. un élément Vidéo Webflow (iframe embedly, lié au CMS) — template Services ;
//   2. le lien du bouton lecture (href YouTube, Vimeo ou fichier .mp4) — blocs
//      « cas d'étude » du rich text, où seul un lien est disponible.
// Devant : un poster et un bouton lecture (visibles dans le Designer). Au clic,
// Plyr est chargé (une seule fois, depuis jsDelivr), remplace l'iframe (ou se
// place par-dessus le poster) et lance la lecture.
//
// STRUCTURE (Webflow) :
//   [data-video-player]
//     .w-video                          (optionnel) élément Vidéo lié au CMS
//     img[data-video-poster]            poster
//     [data-video-play]                 bouton ou lien lecture (href = vidéo)
// Sans vidéo (lien vide ou « # ») : bouton masqué, classe .is-static.
// États : .is-loading pendant le chargement, .is-playing ensuite,
// .is-story si le cadre est vertical (barre de contrôle simplifiée).
// Styles : _services.scss, _case-study.scss.

import { loadScript, loadStyle } from "../utils/load-asset.js";
import { t, getLang } from "../utils/i18n.js";

const PLYR_VERSION = "3.8.4";
const PLYR_JS = `https://cdn.jsdelivr.net/npm/plyr@${PLYR_VERSION}/dist/plyr.min.js`;
const PLYR_CSS = `https://cdn.jsdelivr.net/npm/plyr@${PLYR_VERSION}/dist/plyr.css`;
// Cadre vertical (format story) : lecture, progression, son, plein écran
const STORY_CONTROLS = ["play", "progress", "mute", "fullscreen"];

// Retrouve la plateforme et l'identifiant dans l'URL de l'iframe Webflow
// (embedly encode l'URL d'origine).
function parseVideo(src) {
  const url = decodeURIComponent(src || "");
  const youtube = url.match(/(?:youtube(?:-nocookie)?\.com\/(?:embed\/|watch\?v=|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (youtube) return { provider: "youtube", id: youtube[1] };
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return { provider: "vimeo", id: vimeo[1] };
  if (/\.(mp4|webm|mov)(\?|#|$)/i.test(url)) return { provider: "html5", src: url };
  return null;
}

// Source : iframe Webflow en priorité, sinon le lien du bouton lecture.
function findVideo(player, button) {
  const iframe = player.querySelector(".w-video iframe");
  if (iframe) {
    const video = parseVideo(iframe.getAttribute("src"));
    if (video) return { ...video, iframe };
  }
  const href = button.getAttribute("href") || "";
  if (!href || href === "#") return null;
  return parseVideo(href);
}

// Élément que Plyr transforme en lecteur
function createTarget(video) {
  if (video.provider === "html5") {
    const el = document.createElement("video");
    el.setAttribute("playsinline", "");
    el.setAttribute("src", video.src);
    return el;
  }
  const el = document.createElement("div");
  el.setAttribute("data-plyr-provider", video.provider);
  el.setAttribute("data-plyr-embed-id", video.id);
  return el;
}

// Proportions du cadre (cartes portrait, carrées…) au format Plyr « L:H »
function frameRatio(player) {
  const { width, height } = player.getBoundingClientRect();
  if (!width || !height) return "16:9";
  return `${Math.round(width)}:${Math.round(height)}`;
}

// Libellés du lecteur (Plyr est en anglais par défaut)
function plyrLabels() {
  if (getLang() === "en") return {};
  return {
    play: t("video.play"),
    pause: t("video.pause"),
    played: t("video.played"),
    buffered: t("video.buffered"),
    currentTime: t("video.currentTime"),
    duration: t("video.duration"),
    volume: t("video.volume"),
    mute: t("video.mute"),
    unmute: t("video.unmute"),
    enterFullscreen: t("video.enterFullscreen"),
    exitFullscreen: t("video.exitFullscreen"),
    settings: t("video.settings"),
    speed: t("video.speed"),
    normal: t("video.normal"),
    quality: t("video.quality"),
  };
}

function setupPlayer(player) {
  player.setAttribute("data-video-player-ready", "");
  const button = player.querySelector("[data-video-play]");
  if (!button) return;
  const video = findVideo(player, button);

  // Pas de vidéo : simple image, sans bouton lecture
  if (!video) {
    player.classList.add("is-static");
    button.setAttribute("hidden", "");
    return;
  }
  if (!button.hasAttribute("aria-label")) button.setAttribute("aria-label", t("video.play"));

  button.addEventListener(
    "click",
    async (e) => {
      e.preventDefault(); // lien : on lit sur place au lieu d'ouvrir la vidéo
      player.classList.add("is-loading");
      try {
        await Promise.all([loadStyle(PLYR_CSS), loadScript(PLYR_JS)]);
      } catch (error) {
        console.warn("[Blinked] Plyr :", error);
        player.classList.remove("is-loading");
        if (video.iframe) {
          // On garde la vidéo Webflow telle quelle
          player.classList.add("is-playing");
        } else {
          // Dernier recours : ouvrir la vidéo
          window.open(button.href, "_blank", "noopener");
        }
        return;
      }

      const target = createTarget(video);
      let ratio = "16:9";
      if (video.iframe) {
        // L'iframe Webflow est remplacée par le conteneur Plyr
        video.iframe.closest(".w-video")?.replaceChildren(target);
      } else {
        // Lecteur posé par-dessus le poster, aux proportions du cadre
        ratio = frameRatio(player);
        const frame = document.createElement("div");
        frame.className = "video_frame";
        frame.append(target);
        player.append(frame);
      }

      // Format story (cadre vertical) : barre réduite à l'essentiel
      const { width, height } = player.getBoundingClientRect();
      const story = height > width;
      if (story) player.classList.add("is-story");

      const plyr = new window.Plyr(target, {
        autoplay: true,
        ratio,
        hideControls: true,
        ...(story && { controls: STORY_CONTROLS }),
        i18n: plyrLabels(),
        youtube: { noCookie: true, rel: 0, modestbranding: 1 },
        vimeo: { dnt: true },
      });

      plyr.on("ready", () => {
        player.classList.remove("is-loading");
        player.classList.add("is-playing");
        plyr.play();
      });
    },
    { once: true },
  );
}

export function initVideoPlayer(root = document) {
  root.querySelectorAll("[data-video-player]:not([data-video-player-ready])").forEach(setupPlayer);
}
