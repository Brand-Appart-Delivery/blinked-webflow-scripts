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
// celle par défaut (.hero_title-accent, style Webflow de la home).

const ACCENT_CLASS = "hero_title-accent";

export function initTitleAccent(root = document) {
  root.querySelectorAll("[data-title-accent]:not([data-title-accent-ready])").forEach((title) => {
    title.setAttribute("data-title-accent-ready", "");
    const accent = title.getAttribute("data-title-accent").trim();
    const text = title.textContent;
    if (!accent) return;

    // Dernière occurrence : l'accent est en général la fin du titre
    const index = text.lastIndexOf(accent);
    if (index === -1) return;

    const span = document.createElement("span");
    span.className = title.getAttribute("data-title-accent-class") || ACCENT_CLASS;
    span.textContent = accent;
    title.replaceChildren(
      document.createTextNode(text.slice(0, index)),
      span,
      document.createTextNode(text.slice(index + accent.length)),
    );
  });
}
