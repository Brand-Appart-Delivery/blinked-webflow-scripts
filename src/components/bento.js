// src/components/bento.js — grille « bento » de photos / vidéos (1 à 7 cases).
//
// Maquette Figma 3158-9396. Le composant Webflow « CS · Bento médias » a
// 7 cases ; les cases sans image ni vidéo sont retirées et la grille est
// recomposée selon le nombre restant :
//   ligne principale (haute) : grande case + case moyenne + case latérale
//     (7 cases : la latérale devient une colonne de 2 cases empilées) ;
//   lignes suivantes (basses) : le reste, par 3 (4 restantes : 2 + 2).
// Ex. : 3 = ligne principale seule ; 5 = 3 + 2 ; 6 = 3 + 3 ; 7 = 4 + 3.
//
// STRUCTURE (Webflow) :
//   [data-bento]                        conteneur
//     [data-bento-item]                 case (peu importe les lignes posées
//       .cs_media[data-video-player]      dans le Designer, elles sont refaites)
//         img.cs_media_img, a[data-video-play]
// Classes posées : .cs_bento_row(.is-main), .cs_bento_col, et sur les cases
// .is-big / .is-mid / .is-side. Styles : Webflow + _case-study.scss.
// Le nombre de cases est posé en data-bento-count.

const ROLES = ["is-big", "is-mid", "is-side"];

// Case vide : ni image ni lien vidéo
function isEmpty(item) {
  const img = item.querySelector(".cs_media_img, img");
  const src = img?.getAttribute("src") || "";
  const hasImage = src && !src.includes("placeholder") && !img.classList.contains("w-dyn-bind-empty");
  const href = item.querySelector("[data-video-play]")?.getAttribute("href") || "";
  return !hasImage && (href === "" || href === "#");
}

function row(main = false) {
  const el = document.createElement("div");
  el.className = main ? "cs_bento_row is-main" : "cs_bento_row";
  return el;
}

// Découpe le reste en lignes de 3 (4 → 2 + 2, pour éviter une case seule)
function chunks(items) {
  const rows = [];
  let rest = [...items];
  while (rest.length) {
    const size = rest.length === 4 ? 2 : Math.min(3, rest.length);
    rows.push(rest.slice(0, size));
    rest = rest.slice(size);
  }
  return rows;
}

function setupBento(bento) {
  bento.setAttribute("data-bento-ready", "");
  const all = [...bento.querySelectorAll("[data-bento-item]")];
  const items = all.filter((item) => !isEmpty(item));
  all.filter((item) => !items.includes(item)).forEach((item) => item.remove());

  const count = items.length;
  bento.setAttribute("data-bento-count", String(count));
  if (!count) {
    // Rien à montrer : tout le bloc disparaît
    (bento.closest("[data-cs-block]") || bento).classList.add("is-empty");
    return;
  }

  items.forEach((item) => item.classList.remove(...ROLES));
  const mainCount = count === 7 ? 4 : Math.min(3, count);
  const main = row(true);
  const [big, mid, ...side] = items.slice(0, mainCount);

  big.classList.add("is-big");
  main.append(big);
  if (mid) {
    mid.classList.add("is-mid");
    main.append(mid);
  }
  if (side.length === 1) {
    side[0].classList.add("is-side");
    main.append(side[0]);
  } else if (side.length === 2) {
    const col = document.createElement("div");
    col.className = "cs_bento_col";
    col.append(...side);
    main.append(col);
  }

  const rows = [main];
  chunks(items.slice(mainCount)).forEach((group) => {
    const line = row();
    line.append(...group);
    rows.push(line);
  });
  bento.replaceChildren(...rows);
}

export function initBento(root = document) {
  root.querySelectorAll("[data-bento]:not([data-bento-ready])").forEach(setupBento);
}
