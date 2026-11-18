// src/content/case-study.js — fiche cas client (template Réalisations).
//
// 1. Chiffres : unité d’un chiffre clé (« % », « k€ », « pts », préfixe « x »)
//    passe dans un span plus petit, comme sur la maquette (« +35 % »).
// 2. Blocs du rich text « Récit » (composants « CS · … ») : les champs laissés
//    vides par la fiche (photo, crédit, plateforme, vidéo de la galerie…) sont
//    masqués, pour qu'un même composant serve avec plus ou moins de contenu.
// 3. Section témoignage masquée si la fiche n'a pas d'avis.
//
// STRUCTURE (Webflow) :
//   [data-cs-figure]                 valeur chiffrée (« +35% »)
//   [data-cs-block="…"]              racine de chaque composant du rich text
//   section[data-cs-temoignage]      section « Le mot du client »
// Classe posée : .is-empty (masqué, voir _case-study.scss).

const UNIT_MAX = 4; // longueur max d'une unité (« %, k€, pts, ans »)

// Image vide : pas de source, ou image de remplacement Webflow
function isEmptyImage(img) {
  if (!img) return true;
  const src = img.getAttribute("src") || "";
  return !src || src.includes("placeholder") || img.classList.contains("w-dyn-bind-empty");
}

function isEmptyText(el) {
  return !el || el.textContent.trim() === "";
}

// Lien vidéo renseigné (le lien par défaut du composant est « # »)
function hasVideo(media) {
  const href = media.querySelector("[data-video-play]")?.getAttribute("href") || "";
  return href !== "" && href !== "#";
}

function hide(el) {
  el?.classList.add("is-empty");
}

function splitFigures(root) {
  root.querySelectorAll("[data-cs-figure]:not([data-cs-figure-ready])").forEach((el) => {
    el.setAttribute("data-cs-figure-ready", "");
    const text = el.textContent.trim();
    // Préfixe « x » (« x3,4 ») et/ou suffixe (« % », « k€ »…) en petit
    const match = text.match(/^([x×]\s*)?([^x×]*\d)\s*([^\d\s][^\d]*)?$/i);
    if (!match || (!match[1] && !match[3]) || (match[3] || "").length > UNIT_MAX) return;

    const unit = (value) => {
      const span = document.createElement("span");
      span.className = "cs_figure_unit";
      span.textContent = value.trim();
      return span;
    };
    const parts = [document.createTextNode(match[2])];
    if (match[1]) parts.unshift(unit(match[1]), document.createTextNode(" "));
    if (match[3]) parts.push(unit(match[3]));
    el.replaceChildren(...parts);
  });
}

function cleanBlock(block) {
  // Textes vides (label, titre, paragraphes, infos plateforme, citation)
  block
    .querySelectorAll(
      ".svc_label, h2, h3, p, .cs_platform_tag, .cs_platform_role, .cs_credit_handle, .cs_manifesto_part",
    )
    .forEach((el) => isEmptyText(el) && hide(el));

  // Médias : sans image ni vidéo, l'emplacement disparaît
  block.querySelectorAll(".cs_media").forEach((media) => {
    if (!isEmptyImage(media.querySelector(".cs_media_img")) || hasVideo(media)) return;
    hide(media.closest(".cs_media_item") || media);
  });

  // Crédit (avatar + nom + pseudo)
  block.querySelectorAll(".cs_credit").forEach((credit) => {
    if (isEmptyText(credit.querySelector(".cs_credit_name"))) hide(credit);
    if (isEmptyImage(credit.querySelector(".cs_credit_img"))) hide(credit.querySelector(".cs_credit_img"));
  });

  // Plateformes : une ligne sans nom est retirée
  block.querySelectorAll(".cs_platform").forEach((row) => {
    if (isEmptyText(row.querySelector(".cs_platform_name"))) hide(row);
    if (isEmptyImage(row.querySelector(".cs_platform_icon"))) hide(row.querySelector(".cs_platform_icon"));
  });
}

export function initCaseStudy(root = document) {
  splitFigures(root);

  root.querySelectorAll("[data-cs-block]:not([data-cs-block-ready])").forEach((block) => {
    block.setAttribute("data-cs-block-ready", "");
    cleanBlock(block);
  });

  root.querySelectorAll("[data-cs-temoignage]").forEach((section) => {
    const quote = section.querySelector(".cs_quote");
    if (quote && isEmptyText(quote)) hide(section);
  });
}
