# Code inline du site Webflow (relevé du 2026-11-17, staging blinkedxmekaa.webflow.io)

## JS — 105 page(s) : toutes les pages (105)

```js
document.addEventListener("DOMContentLoaded", function() {function loadblinked(e){let t=document.createElement("script");t.setAttribute("src",e),t.setAttribute("type","module"),document.body.appendChild(t),t.addEventListener("load",()=>{console.log("Slater loaded Blinked.js: https://slater.app/18716.js 🤙")}),t.addEventListener("error",e=>{console.log("Error loading file",e)})}let src=window.location.host.includes("webflow.io")?"https://slater.app/18716.js":"https://assets.slater.app/slater/18716.js?v=1.0";loadblinked(src);})
```

## JS — 105 page(s) : toutes les pages (105)

```js
window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-3HKFGT9CSQ');
```

## JS — 18 page(s) : https://www.blinked.fr, https://www.blinked.fr/blog, https://www.blinked.fr/case-studie/gomoworld, https://www.blinked.fr/case-studie/k-way, https://www.blinked.fr/case-studie/lazartigue, https://www.blinked.fr/case-studie/theatre-du-chatelet, https://www.blinked.fr/contact, https://www.blinked.fr/legal/conditions-generales-de-vente …

```js
document.addEventListener('DOMContentLoaded', () => {
  // On sélectionne tous les liens de la navbar
  const navLinks = document.querySelectorAll('.navbar9_link');

  // On récupère le chemin de la page actuelle (ex: /contact)
  const currentPath = window.location.pathname;

  navLinks.forEach(link => {
    // On récupère la valeur du href du lien
    const linkPath = link.getAttribute('href');

    // Si le chemin du lien correspond au chemin actuel
    if (linkPath === currentPath || (currentPath === '/' && linkPath === 'index.html')) {
      // On cherche l'enfant avec la classe .dropdown-chevron
      const chevron = link.querySelector('.dropdown-chevron');

      // Si l'enfant existe, on le passe en display: flex
      if (chevron) {
        chevron.style.display = 'flex';
      }
    }
  });
});
```

## JS — 18 page(s) : https://www.blinked.fr, https://www.blinked.fr/blog, https://www.blinked.fr/case-studie/gomoworld, https://www.blinked.fr/case-studie/k-way, https://www.blinked.fr/case-studie/lazartigue, https://www.blinked.fr/case-studie/theatre-du-chatelet, https://www.blinked.fr/contact, https://www.blinked.fr/legal/conditions-generales-de-vente …

```js
document.addEventListener('DOMContentLoaded', () => {
  // On vérifie si GSAP et ScrollTrigger sont disponibles
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    
    // --- APPARITION AUTOMATIQUE DES TITRES (ScrollTrigger) ---
    const titles = document.querySelectorAll("h1, h2");

    titles.forEach((title) => {
      gsap.from(title, {
        scrollTrigger: {
          trigger: title,
          start: "top 92%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 2,
        ease: "expo.out",
        clearProps: "all" // Nettoie les styles inline après l'anim
      });
    });

  } else {
    console.warn("GSAP ou ScrollTrigger n'est pas chargé.");
  }
});
```

## JS — 18 page(s) : https://www.blinked.fr, https://www.blinked.fr/blog, https://www.blinked.fr/case-studie/gomoworld, https://www.blinked.fr/case-studie/k-way, https://www.blinked.fr/case-studie/lazartigue, https://www.blinked.fr/case-studie/theatre-du-chatelet, https://www.blinked.fr/contact, https://www.blinked.fr/legal/conditions-generales-de-vente …

```js
document.addEventListener("DOMContentLoaded", function() {
  const toggle = document.querySelector('.navbar9_dropdown-toggle');
  const links = document.querySelectorAll('.navbar9_dropdown-link');

  if (!toggle) return;

  toggle.addEventListener('click', function() {
    // On attend un tout petit peu (10ms) que Webflow ajoute la classe .w--open
    setTimeout(() => {
      const isOpen = toggle.classList.contains("w--open");
      
      if (isOpen) {
        // Animation d'apparition en cascade
        gsap.to(links, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          overwrite: true
        });
      } else {
        // Animation de disparition
        gsap.to(links, {
          opacity: 0,
          y: 15,
          duration: 0.3,
          ease: "power2.in",
          overwrite: true
        });
      }
    }, 10);
  });

  // Fermeture si on clique en dehors du menu
  window.addEventListener('click', function(e) {
    if (!toggle.contains(e.target)) {
      gsap.to(links, {
        opacity: 0,
        y: 15,
        duration: 0.3,
        overwrite: true
      });
    }
  });
});
```

## JS — 105 page(s) : toutes les pages (105)

```js
gsap.registerPlugin(ScrollTrigger,InertiaPlugin,SplitText);
```

## JS — 105 page(s) : toutes les pages (105)

```js
window.axeptioSettings = {
  clientId: "699dc27599e73ff3dd00fa27",
  cookiesVersion: "59dc1998-5af7-4a16-8776-5d90e80892d3",
  googleConsentMode: {
    default: {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      wait_for_update: 500
    }
  }
};
 
(function(d, s) {
  var t = d.getElementsByTagName(s)[0], e = d.createElement(s);
  e.async = true; e.src = "//static.axept.io/sdk.js";
  t.parentNode.insertBefore(e, t);
})(document, "script");
```

## JS — 1 page(s) : https://www.blinked.fr

```js
document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    const introTl = gsap.timeline({
      delay: 0.5, 
      defaults: {
        duration: 1.2,
        ease: "expo.out"
      }
    });

    // 1. ON FORCE L'ÉTAT INITIAL (Pour éviter qu'ils s'affichent avant)
    gsap.set(".logo3_item", { opacity: 0, y: 20 });

    introTl
      // 2. La Nav descend
      .from(".navbar9_component", { 
        y: -40, 
        opacity: 0 
      })
      // 3. La Section remonte
      .from(".section_logo3", { 
        y: 40, 
        opacity: 0
      }, "<") // Commencer en même temps que la nav
      
      // 4. LES LOGOS (On utilise .to car on a fait un .set juste avant)
      .to(".logo3_item", { 
        opacity: 1,
        y: 0,
        stagger: {
          each: 0.1, // Délai entre chaque logo
          from: "start" // Commence par le premier
        },
        duration: 1,
        ease: "power2.out"
      }, "-=0.8"); // Commence un peu avant que la section n'ait fini de remonter
  }
});
```

## JS — 6 page(s) : https://www.blinked.fr, https://www.blinked.fr/case-studie/gomoworld, https://www.blinked.fr/case-studie/k-way, https://www.blinked.fr/case-studie/lazartigue, https://www.blinked.fr/case-studie/theatre-du-chatelet, https://www.blinked.fr/services

```js
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar9_component');
  
  // Définit le nombre de pixels après lesquels la couleur change
  // 10px = quasiment instantané
  const scrollThreshold = 20; 

  if (window.scrollY > scrollThreshold) {
    if (!navbar.classList.contains('nav-is-light')) {
      navbar.classList.add('nav-is-light');
    }
  } else {
    if (navbar.classList.contains('nav-is-light')) {
      navbar.classList.remove('nav-is-light');
    }
  }
});
```

## CSS — 18 page(s) : https://www.blinked.fr, https://www.blinked.fr/blog, https://www.blinked.fr/case-studie/gomoworld, https://www.blinked.fr/case-studie/k-way, https://www.blinked.fr/case-studie/lazartigue, https://www.blinked.fr/case-studie/theatre-du-chatelet, https://www.blinked.fr/contact, https://www.blinked.fr/legal/conditions-generales-de-vente …

```css
:root {
  --font-from: 14;
  --font-to: 14;
  --vw-from: calc(1920 / 100);
  --vw-to: calc(2400 / 100);
  --coefficient: calc((var(--font-to) - var(--font-from)) / (var(--vw-to) - var(--vw-from)));
  --base: calc((var(--font-from) - var(--vw-from) * var(--coefficient)) / 16);
}

html {
  font-size: calc(var(--base) * 1rem + var(--coefficient) * 1vw);
}

@media screen and (max-width: 1920px) {
  :root {
    --font-from: 15;
    --font-to: 13.5;
    --vw-from: calc(1440 / 100);
    --vw-to: calc(1920 / 100);
  }
}

@media screen and (max-width: 1440px) {
  :root {
    --font-from: 13;
    --font-to: 13.5;
    --vw-from: calc(479 / 100);
    --vw-to: calc(1440 / 100);
  }
}

@media screen and (max-width: 479px) {
  :root {
    --font-from: 12;
    --font-to: 11.5;
    --vw-from: calc(1 / 100);
    --vw-to: calc(479 / 100);
  }
}

/* Make text look crisper and more legible in all browsers */
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

/* Focus state style for keyboard navigation for the focusable elements */
*[tabindex]:focus-visible,
  input[type="file"]:focus-visible {
   outline: 0.125rem solid #4d65ff;
   outline-offset: 0.125rem;
}


/* Set color style to inherit */
.inherit-color * {
    color: inherit;
}

/* Get rid of top margin on first element in any rich text element */
.w-richtext > :not(div):first-child, .w-richtext > div:first-child > :first-child {
  margin-top: 0 !important;
}

/* Get rid of bottom margin on last element in any rich text element */
.w-richtext>:last-child, .w-richtext ol li:last-child, .w-richtext ul li:last-child {
	margin-bottom: 0 !important;
}


/* Make sure containers never lose their center alignment */
.container-medium,.container-small, .container-large {
	margin-right: auto !important;
  margin-left: auto !important;
}

/* 
Make the following elements inherit typography styles from the parent and not have hardcoded values. 
Important: You will not be able to style for example "All Links" in Designer with this CSS applied.
Uncomment this CSS to use it in the project. Leave this message for future hand-off.
*/
/*
a,
.w-input,
.w-select,
.w-tab-link,
.w-nav-link,
.w-dropdown-btn,
.w-dropdown-toggle,
.w-dropdown-link {
  color: inherit;
  text-decoration: inherit;
  font-size: inherit;
}
*/

/* Apply "..." after 3 lines of text */
.text-style-3lines {
	display: -webkit-box;
	overflow: hidden;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
}

/* Apply "..." after 2 lines of text */
.text-style-2lines {
	display: -webkit-box;
	overflow: hidden;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
}

/* These classes are never overwritten */
.hide {
  display: none !important;
}

@media screen and (max-width: 991px) {
    .hide, .hide-tablet {
        display: none !important;
    }
}
  @media screen and (max-width: 767px) {
    .hide-mobile-landscape{
      display: none !important;
    }
}
  @media screen and (max-width: 479px) {
    .hide-mobile{
      display: none !important;
    }
}
 
.margin-0 {
  margin: 0rem !important;
}
  
.padding-0 {
  padding: 0rem !important;
}

.spacing-clean {
padding: 0rem !important;
margin: 0rem !important;
}

.margin-top {
  margin-right: 0rem !important;
  margin-bottom: 0rem !important;
  margin-left: 0rem !important;
}

.padding-top {
  padding-right: 0rem !important;
  padding-bottom: 0rem !important;
  padding-left: 0rem !important;
}
  
.margin-right {
  margin-top: 0rem !important;
  margin-bottom: 0rem !important;
  margin-left: 0rem !important;
}

.padding-right {
  padding-top: 0rem !important;
  padding-bottom: 0rem !important;
  padding-left: 0rem !important;
}

.margin-bottom {
  margin-top: 0rem !important;
  margin-right: 0rem !important;
  margin-left: 0rem !important;
}

.padding-bottom {
  padding-top: 0rem !important;
  padding-right: 0rem !important;
  padding-left: 0rem !important;
}

.margin-left {
  margin-top: 0rem !important;
  margin-right: 0rem !important;
  margin-bottom: 0rem !important;
}
  
.padding-left {
  padding-top: 0rem !important;
  padding-right: 0rem !important;
  padding-bottom: 0rem !important;
}
  
.margin-horizontal {
  margin-top: 0rem !important;
  margin-bottom: 0rem !important;
}

.padding-horizontal {
  padding-top: 0rem !important;
  padding-bottom: 0rem !important;
}

.margin-vertical {
  margin-right: 0rem !important;
  margin-left: 0rem !important;
}
  
.padding-vertical {
  padding-right: 0rem !important;
  padding-left: 0rem !important;
}

.padding-global { pointer-events: none; }

.padding-global > * {    pointer-events: auto; }
img {
  user-select: none;         /* Empêche la sélection /
  -webkit-user-drag: none;   / Empêche le drag sur Safari/Chrome /
  -moz-user-select: none;    / Pour compatibilité Firefox /
  -ms-user-select: none;     / Pour compatibilité IE/Edge */
}

.gap-0.25 { gap: 0.25rem; }
.gap-0.5 { gap: 0.5rem; }
.gap-0.75 { gap: 0.75rem; }
.gap-1 { gap: 1rem; }
.gap-1.25 { gap: 1.25rem; }
.gap-1.5 { gap: 1.5rem; }
.gap-1.75 { gap: 1.75rem; }
.gap-2 { gap: 2rem; }
.gap-2.5 { gap: 2.5rem; }
.gap-3 { gap: 3rem; }
.gap-3.5 { gap: 3.5rem; }
.gap-4 { gap: 4rem; }

/* 1. Le bouton parent */
.cta_circular_button {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  /* On définit la transition ici pour qu'elle s'applique à l'aller ET au retour */
  transition: scale 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  scale: 1;
}

/* Hover sur le parent : il grossit */
.cta_circular_button:hover {
  scale: 1.08;
}

/* 2. L'image circulaire (le texte) */
.cta_circular_img {
  width: 100%;
  height: 100%;
  display: block;
  /* Transition spécifique pour le scale interne */
  transition: scale 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  scale: 1;
  /* Animation de rotation infinie (on utilise rotate pour ne pas entrer en conflit) */
  animation: rotate-continuous 12s linear infinite;
}

/* 3. L'icône SVG au centre */
.cta_circular_svg {
  position: absolute;
  width: 30%;
  pointer-events: none;
  /* Transition spécifique pour le scale interne */
  transition: scale 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  scale: 1;
}

/* 4. Effet de Scale "Cumulé" au Hover */
/* Quand on survole le bouton, les enfants grossissent AUSSI par rapport à lui */
.cta_circular_button:hover .cta_circular_img {
  scale: 1.1; /* L'image grossit de 10% à l'intérieur du parent qui grossit déjà */
}

.cta_circular_button:hover .cta_circular_svg {
  scale: 1.15; /* La flèche grossit encore un peu plus pour l'effet de profondeur */
}

/* Animation propre */
@keyframes rotate-continuous {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Force n'importe quel élément avec cette classe à devenir blanc pur */
.logo3_logo {
  /* Etape 1 : Grayscale(100%) supprime toute information de couleur (devient gris/noir) */
  /* Etape 2 : Brightness(1000%) sature la luminosité pour transformer le gris/noir en blanc pur */
  filter: grayscale(100%) brightness(1000%);

  /* Optionnel : assure que les transitions de couleur sont fluides si jamais tu changes cet état */
  transition: filter 0.3s ease;
}

/* Si jamais c'est un SVG en inline (directement dans le code HTML)
   et qu'il utilise 'fill="currentColor"', il faut parfois forcer la couleur */
svg.logo3_logo,
.logo3_logo svg {
    fill: white !important;
    color: white !important;
}

/* --- Cas 1 : Si ton logo est une image (ex: .png, .jpg) --- */
.logo3_logo.is-dark {
  /* On applique le filtre spécifique pour atteindre #6C8184 */
  /* Si ton logo de base est blanc, on ajoute "brightness(0)" au début */
  filter: brightness(0) invert(53%) sepia(8%) saturate(1096%) hue-rotate(141deg) brightness(92%) contrast(85%);
  
  transition: filter 0.3s ease;
}

/* --- Cas 2 : Si ton logo est un SVG inline --- */
.logo3_logo.is-dark svg,
svg.logo3_logo.is-dark {
    fill: #6C8184 !important;
    color: #6C8184 !important;
    
    transition: fill 0.3s ease;
}

/* État initial / Transitions */
.services_card {
  transition: background-color 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.6s cubic-bezier(0.23, 1, 0.32, 1), color 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.services_card .services_card_icon,
.services_card .services_logo,
.services_card h3,
.services_card h5,
.services_card .text-color-tertiary {
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}
/* État Hover */

/* 1. La carte devient rouge, texte blanc, et ajoute l'ombre */
.services_card:hover {
  background-color: #f14624;
  color: #FFFFFF;
  box-shadow: 0 0 20px 0 rgba(241, 70, 36, 0.60);
}

/* 2. Forcer tous les textes en blanc au hover */
.services_card:hover h3, 
.services_card:hover h5, 
.services_card:hover .text-color-tertiary {
  color: #FFFFFF;
}

/* 3. L'icône devient fond blanc et texte rouge */
.services_card:hover .services_card_icon {
  background-color: #FFFFFF;
  color: #f14624;
}

/* Si l'icône utilise "currentColor" dans le SVG, cela fonctionnera directement */
.services_card:hover .services_card_icon svg {
  fill: #f14624;
}

/* 4. Les logos prennent un fond et une bordure blanche */
.services_card:hover .services_logo {
  background-color: #FFFFFF;
  border-color: #FFFFFF;
}


/* --- 1. CONFIGURATION DE BASE ET FIXES SAFARI --- */

.case-studies_block {
  /* On force Safari à créer un calque de rendu séparé (Hardware Acceleration) */
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  
  /* On remplace "all" par les propriétés précises */
  transition: 
    background-color 0.6s cubic-bezier(0.23, 1, 0.32, 1), 
    box-shadow 0.6s cubic-bezier(0.23, 1, 0.32, 1), 
    color 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

/* Sécurité contre l'expansion infinie dans Safari */
.case-studies_text,
.case-studies_infos {
  min-width: 0; 
  flex-shrink: 1;
}

/* Transition ciblée pour les enfants (plus de sélecteur *) */
.case-studies_block h3,
.case-studies_block div,
.case-studies_block .case-studies_tag,
.case-studies_block .case-studies_infos_block,
.case-studies_block .en_savoir_plus_btn {
  transition: 
    background-color 0.5s cubic-bezier(0.23, 1, 0.32, 1), 
    color 0.5s cubic-bezier(0.23, 1, 0.32, 1), 
    border-color 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

/* --- 2. CONFIGURATION DES BLOCS PAIRS (EVEN) --- */

.w-dyn-item:nth-child(even) .case-studies_block {
  background-color: #0D1226;
  color: #FFFFFF;
}

.w-dyn-item:nth-child(even) .case-studies_block .case-studies_text div:not(.case-studies_tag),
.w-dyn-item:nth-child(even) .case-studies_block .text-size-small {
  color: #DFE6E7;
}

.w-dyn-item:nth-child(even) .case-studies_block h3,
.w-dyn-item:nth-child(even) .case-studies_block .en_savoir_plus_btn {
  color: #FFFFFF;
}

.w-dyn-item:nth-child(even) .case-studies_block .case-studies_tag,
.w-dyn-item:nth-child(even) .case-studies_block .case-studies_infos_block {
  background-color: #1D2854;
  color: #FFFFFF;
  border-color: #1D2854;
}

/* Correction de l'alignement des infos pour les pairs */
.w-dyn-item:nth-child(even) .case-studies_infos { 
  flex-direction: row-reverse; 
}

/* --- 3. GESTION DU HOVER UNIVERSEL --- */

/* Hover carte grise (odd) */
.w-dyn-item:nth-child(odd) .case-studies_block:hover {
  background-color: rgba(150, 150, 150, 0.2) !important;
  box-shadow: none !important;
  color: inherit !important;
}

.w-dyn-item:nth-child(odd) .case-studies_block:hover h3,
.w-dyn-item:nth-child(odd) .case-studies_block:hover div,
.w-dyn-item:nth-child(odd) .case-studies_block:hover .en_savoir_plus_btn {
  color: inherit !important;
}

/* Hover carte bleue (even) */
.w-dyn-item:nth-child(even) .case-studies_block:hover {
  background-color: rgba(13, 18, 38, 0.4) !important;
  box-shadow: none !important;
  color: #FFFFFF !important;
}

.w-dyn-item:nth-child(even) .case-studies_block:hover h3,
.w-dyn-item:nth-child(even) .case-studies_block:hover div,
.w-dyn-item:nth-child(even) .case-studies_block:hover .en_savoir_plus_btn {
  color: #FFFFFF !important;
}

/* --- 4. LAYOUT DESKTOP (992px+) --- */

@media screen and (min-width: 992px) {
	.case-studies_block:hover {
    /* On désactive l'ombre sur mobile pour plus de fluidité */
    box-shadow: none !important;
  }
  /* Inversion de la grille */
  .w-dyn-item:nth-child(even) .case-studies_block {
    display: grid; 
    grid-template-columns: 1.25fr 1fr;
  }

  .w-dyn-item:nth-child(even) .case-studies_text {
    order: 2; /* Droite */
  }

  .w-dyn-item:nth-child(even) .case-studies_infos {
    order: 1; /* Gauche */
  }
}

.blog34_item-link .heading-style-h4 {
  /* Activation du mode boîte flexible pour le clamp */
  display: -webkit-box;
  
  /* Nombre maximum de lignes visibles */
  -webkit-line-clamp: 3;
  
  /* Direction de la boîte (obligatoire pour le clamp) */
  -webkit-box-orient: vertical;
  
  /* Cache le texte qui dépasse et active les points de suspension (...) */
  overflow: hidden;
  
  /* Optionnel : assure une bonne gestion des mots longs */
  overflow-wrap: break-word;
}

/* État initial / Transitions */
.navbar9_dropdown-link {
  transition: background-color 0.6s cubic-bezier(0.23, 1, 0.32, 1), color 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.navbar9_dropdown-link .services_card_icon,
.navbar9_dropdown-link .navbar9_dropdown_title,
.navbar9_dropdown-link .text-color-secondary-bg-white,
.navbar9_dropdown-link .navbar9_arrow {
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

/* État Hover */

/* 1. Le lien devient orange et le texte global passe en blanc */
.navbar9_dropdown-link:hover {
  background-color: #f14624; /* Orange */
  color: #FFFFFF;
}

/* 2. Forcer la description et les titres en blanc au hover */
.navbar9_dropdown-link:hover .navbar9_dropdown_title,
.navbar9_dropdown-link:hover .text-color-secondary-bg-white {
  color: #FFFFFF;
}

/* 3. L'icône (carré) devient fond blanc et le SVG devient orange */
.navbar9_dropdown-link:hover .services_card_icon {
  background-color: #FFFFFF;
  color: #f14624;
}

/* Si l'icône ou la flèche utilise "currentColor", ceci assure le changement de couleur */
.navbar9_dropdown-link:hover .services_card_icon svg,
.navbar9_dropdown-link:hover .navbar9_arrow {
  fill: #FFFFFF; /* La flèche reste blanche */
}

/* Cas spécifique pour le SVG à l'intérieur du carré blanc */
.navbar9_dropdown-link:hover .services_card_icon svg {
  fill: #f14624; /* L'icône devient orange pour trancher sur le carré blanc */
}

/* 4. Ajustement de l'opacité ou couleur de la flèche de droite si nécessaire */
.navbar9_dropdown-link:hover .navbar9_arrow {
  color: #FFFFFF;
  transform: translateX(5px); /* Petit effet bonus de glissement pour la flèche */
}

/* 1. Transitions initiales */
.services_card_page {
  transition: background-color 0.6s cubic-bezier(0.23, 1, 0.32, 1), 
              box-shadow 0.6s cubic-bezier(0.23, 1, 0.32, 1), 
              color 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}


@media screen and (min-width: 991px) {
  .services_cards .service_item:nth-child(2) {
    position: relative;
    top: 2rem;
  }
}


.services_card_page .services_card_icon,
.services_card_page h3,
.services_card_page h5,
.services_card_page .text-color-tertiary,
.services_card_page .services_card_page_img_wrapper {
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

/* 2. État Hover sur la carte */
.services_card_page:hover {
  background-color: #f14624;
  color: #FFFFFF;
  box-shadow: 0 0 20px 0 rgba(241, 70, 36, 0.60);
}

/* 3. Textes et Bouton en blanc au hover */
.services_card_page:hover h3, 
.services_card_page:hover h5, 
.services_card_page:hover .text-color-tertiary,
.services_card_page:hover .button_7 {
  color: #FFFFFF !important;
}

/* 4. L'icône (fond blanc et icône rouge) */
.services_card_page:hover .services_card_icon {
  background-color: #FFFFFF;
  color: #f14624;
}

.services_card_page:hover .services_card_icon svg {
  fill: #f14624;
}

/* 5. Changement du fond de l'image au hover */
.services_card_page:hover .services_card_page_img_wrapper {
  background-color: #F46B50;
}

/* Optionnel : Assurer que les flèches du bouton passent aussi en blanc */
.services_card_page:hover .button_7 svg {
  fill: #FFFFFF;
}

/* 1. État initial : l'élément est invisible */
.groupe_grid_hover {
  opacity: 0;
  /* Désactive les interactions tant qu'il est invisible */
  pointer-events: none; 
  /* Application de ta transition spécifique */
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

/* 2. État au survol du parent (.groupe_grid_block) */
.groupe_grid_block:hover .groupe_grid_hover {
  opacity: 1;
  /* Réactive les interactions (clics sur le bouton, etc.) */
  pointer-events: auto; 
}

.navbar9_link.w--current {
  color: inherit !important;
}

.is-avis-title-sticky {
  will-change: top, transform;
  /* On prévient le navigateur pour les deux types de mouvements */
}

.navbar9_component.w-variant-1d1b6dd0-a955-60f7-fd65-fc21db96aec4.w-nav .navbar9_link.w--current,
.navbar9_component.w-variant-1d1b6dd0-a955-60f7-fd65-fc21db96aec4.w-nav .navbar9_link.w--current:hover {
  color: #0F1415 !important;
}
```

## CSS — 18 page(s) : https://www.blinked.fr, https://www.blinked.fr/blog, https://www.blinked.fr/case-studie/gomoworld, https://www.blinked.fr/case-studie/k-way, https://www.blinked.fr/case-studie/lazartigue, https://www.blinked.fr/case-studie/theatre-du-chatelet, https://www.blinked.fr/contact, https://www.blinked.fr/legal/conditions-generales-de-vente …

```css
/* Le conteneur du menu */
.navbar9_dropdown {
  /* On laisse Webflow gérer le display, on s'occupe du reste */
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.4s ease, transform 0.4s ease;
  pointer-events: none; /* Empêche de cliquer quand c'est invisible */
}

/* Quand le menu est ouvert par Webflow */
.navbar9_dropdown.w--open {
  opacity: 1;
  transform: translateY(0px);
  pointer-events: auto;
}

/* État initial des liens (enfants) */
/* On les met à 0 ici, le JS les fera apparaître */
.navbar9_dropdown-link {
  opacity: 0;
  transform: translateY(15px);
}

/* Optionnel : Ajustement pour que le chevron tourne doucement */
.navbar9_dropdown-toggle.w--open .icon-chevron {
  transform: rotate(180deg);
}
.icon-chevron {
  transition: transform 0.3s ease;
}

img {
  user-select: none;           /* Empêche la sélection */
  -webkit-user-drag: none;     /* Empêche le drag sur Safari/Chrome */
  -moz-user-select: none;      /* Pour compatibilité Firefox */
  -ms-user-select: none;       /* Pour compatibilité IE/Edge */
}

/* Effet de couleur au hover */
.button.hover-effect {
  position: relative;
  overflow: hidden;
}

.button.hover-effect::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  transition: all 0.6s ease;
  opacity: 0;
}

.button.hover-effect:hover::before {
  opacity: 1;
}

/* Effet de radius au hover */
.button.hover-effect-radius {
  transition: border-radius 0.2s cubic-bezier(0.23, 1, 0.32, 1) !important;
}

.button.hover-effect-radius:hover {
  border-radius: 0.2rem;
}

/* Icônes SVG - Section services */
.services_card_icon path {
    fill: white;
    transition: fill 0.3s ease;
}
.services_card:hover .services_card_icon path {
    fill: #F14624;
}

/* Icônes SVG - Dropdown navbar */
.navbar9_dropdown_title path {
    fill: white;
    transition: fill 0.3s ease;
}
.navbar9_dropdown-link:hover .navbar9_dropdown_title path {
    fill: #F14624;
}
```

## CSS — 305 page(s) : https://www.blinked.fr, https://www.blinked.fr, https://www.blinked.fr, https://www.blinked.fr, https://www.blinked.fr, https://www.blinked.fr, https://www.blinked.fr, https://www.blinked.fr …

```css
.button_7 {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  /* On définit un padding de base équilibré */
  padding: 16px 24px; 
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  overflow: hidden;
  cursor: pointer;
  border: none; /* Optionnel selon ton bouton */
  background: #212121; /* Optionnel */
  color: #fff;
}

.button_7 .button-text {
  position: relative;
  z-index: 1;
  transform: translateX(0);
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}

/* --- LE FIX EST ICI --- */

.button_7:hover {
  /* On augmente le padding à droite pour compenser le mouvement du texte */
  padding-right: 40px; 
  /* Optionnel : on peut aussi réduire un peu le padding-left si on veut que le bouton garde la même taille, 
     mais augmenter le padding global est souvent plus fluide visuellement. */
}

.button_7:hover .button-text {
  /* Le texte bouge de 12px, donc le padding-right de 40px (soit +16px) 
     laisse respirer l'ensemble. */
  transform: translateX(0px); 
}

/* ---------------------- */

.button_7 svg {
  position: absolute;
  z-index: 9;
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  fill: currentColor;
}

/* Gestion des flèches */
.button_7 .arr-1 { right: 1.5rem; opacity: 1; } /* Position repos si besoin */
.button_7 .arr-2 { left: -25%; opacity: 0; }

.button_7:hover .arr-1 {
  right: -25%;
  opacity: 0;
}

.button_7:hover .arr-2 {
  left: 1rem;
  opacity: 1;
}
```

## CSS — 3 page(s) : https://www.blinked.fr, https://www.blinked.fr, https://www.blinked.fr

```css
/* Sélecteur spécifique pour ton bouton */
.button.button_7.line.is-plus {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 3rem;
  position: relative;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  overflow: hidden;
  cursor: pointer;
  border: none;
  text-decoration: none;
}

/* Conteneur de texte */
.button.button_7.line.is-plus .button-text {
  position: relative;
  z-index: 1;
  display: inline-block;
  transform: translateX(0);
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}

/* --- LOGIQUE DE TRANSITION AU SURVOL --- */

.button.button_7.line.is-plus:hover {
  /* On inverse l'espace : plus de place à gauche pour l'icône arr-2 */
  padding-left: 2rem;
  padding-right: 24px;
}

/* Gestion universelle des icônes SVG dans tes embeds */
.button.button_7.line.is-plus .icon-embed-xsmall {
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  z-index: 9;
  transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.button.button_7.line.is-plus svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}

/* Icône de droite (arr-1) : présente au repos, s'en va à droite */
.button.button_7.line.is-plus .arr-1 {
  right: 1rem;
  opacity: 1;
}

.button.button_7.line.is-plus:hover .arr-1 {
  right: -25%;
  opacity: 0;
}

/* Icône de gauche (arr-2) : cachée à gauche, arrive au survol */
.button.button_7.line.is-plus .arr-2 {
  left: -25%;
  opacity: 0;
}

.button.button_7.line.is-plus:hover .arr-2 {
  left: 0rem;
  opacity: 1;
}

/* Fix pour assurer que le texte ne bouge pas de façon erratique */
.button.button_7.line.is-plus:hover .button-text {
  transform: translateX(0px);
}
```

## CSS — 1 page(s) : https://www.blinked.fr

```css
.w-dyn-item .case-studies_block {
  pointer-events: none;
}

.w-dyn-item:first-child .case-studies_block {
  pointer-events: auto;
}
```

## CSS — 1 page(s) : https://www.blinked.fr

```css
/* --- 1. BASE COMMUNE (Toutes résolutions) --- */
.avis_wrapper_cards .w-dyn-item {
  width: 100%;
}

.temoignages_block {
  padding: 2.5rem;
  border-radius: 1.25rem;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* --- 2. LOGIQUE DES COULEURS (Actives partout) --- */

/* STYLE CARTE BLANCHE (Par défaut) */
.avis_wrapper_collection_grid .w-dyn-item .temoignages_block {
  background-color: #ffffff;
  color: #0f1415;
}
.avis_wrapper_collection_grid .w-dyn-item .icon_embed_stars { color: #F14624; }
.avis_wrapper_collection_grid .w-dyn-item .temoignages_icon { color: #FCDAD3; }

/* STYLE CARTE ORANGE (Sélecteurs ciblés) */
/* On regroupe tous les items qui doivent être orange pour éviter la répétition */
.avis_wrapper_collection_grid.is-1 .w-dyn-item:nth-child(2) .temoignages_block,
.avis_wrapper_collection_grid.is-2 .w-dyn-item:nth-child(1) .temoignages_block,
.avis_wrapper_collection_grid.is-3 .w-dyn-item:nth-child(2) .temoignages_block,
.is-orange-item .temoignages_block {
  background-color: #F14624 !important;
  color: #ffffff !important;
  border: none !important;
}

.avis_wrapper_collection_grid.is-1 .w-dyn-item:nth-child(2) .icon_embed_stars,
.avis_wrapper_collection_grid.is-2 .w-dyn-item:nth-child(1) .icon_embed_stars,
.avis_wrapper_collection_grid.is-3 .w-dyn-item:nth-child(2) .icon_embed_stars,
.is-orange-item .icon_embed_stars { color: #ffffff !important; }

.avis_wrapper_collection_grid.is-1 .w-dyn-item:nth-child(2) .temoignages_icon,
.avis_wrapper_collection_grid.is-2 .w-dyn-item:nth-child(1) .temoignages_icon,
.avis_wrapper_collection_grid.is-3 .w-dyn-item:nth-child(2) .temoignages_icon,
.is-orange-item .temoignages_icon { color: #F46B50 !important; }


/* --- 3. DESKTOP ONLY (Positionnement et Tailles fixes) --- */
@media screen and (min-width: 992px) {
  .avis_wrapper_cards .w-dyn-item {
    max-width: 25.6875rem; /* 411px */
  }

  /* COLONNE 1 */
  .avis_wrapper_collection_grid.is-1 .w-dyn-item:nth-child(2) { margin-top: 6.353rem; }

  /* COLONNE 2 */
  .avis_wrapper_collection_grid.is-2 .w-dyn-item:nth-child(1) { margin-left: 6.812rem; }
  .avis_wrapper_collection_grid.is-2 .w-dyn-item:nth-child(2) { 
    margin-top: 10.75rem; 
    max-width: 39.25rem; /* 628px */
  }

  /* COLONNE 3 */
  .avis_wrapper_collection_grid.is-3 .w-dyn-item:nth-child(1) { margin-top: 1rem; }
  .avis_wrapper_collection_grid.is-3 .w-dyn-item:nth-child(2) { margin-top: 12.875rem; }
}

/* --- 4. RESPONSIVE MOBILE --- */
@media screen and (max-width: 991px) {
  .avis_wrapper_cards { 
    grid-template-columns: 1fr; 
    gap: 1.5rem; /* Ajoute un espace entre les cartes sur mobile */
  }
}
```

## CSS — 2 page(s) : https://www.blinked.fr, https://www.blinked.fr

```css
/* Sélecteur spécifique pour la version icône seule */
.button.button_7.is-only-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  /* On définit une taille fixe pour un rendu carré parfait */
  width: 5rem; 
  height: 3.5rem;
  padding: 0; /* Pas de padding nécessaire ici car on centre l'icône */
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  overflow: hidden;
  cursor: pointer;
  border: none;
  background: #F14624);
  color: #fff;
  border-radius: 999px; /* Optionnel */
}

/* Style commun des SVGs */
.button.button_7.is-only-arrow svg {
  position: absolute;
  width: 1.5rem; /* Ta taille de référence */
  height: 1.5rem;
  z-index: 9;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  fill: currentColor;
  /* Centrage parfait par défaut */
  top: 50%;
  left: 50%;
}

/* --- LOGIQUE DE MOUVEMENT --- */

/* Icône 1 : Au centre au repos, sort par la droite au hover */
.button.button_7.is-only-arrow .arr-1 {
  transform: translate(-50%, -50%);
  opacity: 1;
}

.button.button_7.is-only-arrow:hover .arr-1 {
  transform: translate(150%, -50%); /* Se déplace vers la droite */
  opacity: 0;
}

/* Icône 2 : Cachée à gauche au repos, arrive au centre au hover */
.button.button_7.is-only-arrow .arr-2 {
  transform: translate(-250%, -50%); /* Cachée loin à gauche */
  opacity: 0;
}

.button.button_7.is-only-arrow:hover .arr-2 {
  transform: translate(-50%, -50%); /* Arrive au centre exact */
  opacity: 1;
}

.button.button_7.is-only-arrow:active {
  transform: scale(0.92);
}
```

## CSS — 1 page(s) : https://www.blinked.fr

```css
/* On cible les éléments individuels (souvent .logo3_item ou les images) */
  .logo3_item {
    opacity: 0;
    transform: translateY(20px);
  }
  
  html, body {
  overscroll-behavior: none;
}
}
```

## CSS — 6 page(s) : https://www.blinked.fr, https://www.blinked.fr/case-studie/gomoworld, https://www.blinked.fr/case-studie/k-way, https://www.blinked.fr/case-studie/lazartigue, https://www.blinked.fr/case-studie/theatre-du-chatelet, https://www.blinked.fr/services

```css
* --- 1. Transition globale --- */ .navbar9_component,
.navbar9_link,
.navbar9_logo {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.navbar9_logo {
  transition: opacity 0.5s ease, transform 0.5s ease !important;
  width: 100%;
}

/* --- 3. État PAR DÉFAUT (Haut de page) --- */
.navbar9_logo.is-dark {
  opacity: 1;
  display: flex;
}

.navbar9_logo.is-light {
  opacity: 0;
  display: none;
  transform: translateY(5px);
  /* Petit effet de montée */
}

/* --- 4. ÉTAT SCROLLÉ (.nav-is-light) --- */
.nav-is-light {
  background-color: #FFFFFF !important;
}

/* On tue la visibilité du logo blanc */
.nav-is-light .navbar9_logo.is-dark {
  opacity: 0 !important;
  display: none;
  transform: translateY(-5px);
  /* Il s'envole légèrement */
}

/* On force l'apparition du logo couleur */
.nav-is-light .navbar9_logo.is-light {
  opacity: 1 !important;
  display: flex;
  transform: translateY(0);
}

/* Couleurs des textes au scroll */
.nav-is-light .navbar9_link,
.nav-is-light .navbar9_dropdown-toggle {
  color: #0D1226 !important;
}

.nav-is-light .navbar9_link:hover {
  color: #F14624 !important;
}

.nav-is-light .navbar9_dropdown-toggle:hover {
    color: #F14624 !important;
}

.nav-is-light .navbar9_dropdown-toggle:hover .icon-chevron {
    color: #F14624 !important;
}
```

## CSS — 1 page(s) : https://www.blinked.fr/blog

```css
.blog-list_item:first-child {
  grid-column: span 2;
}

/* Responsive : à partir de 568px et moins, il reprend une seule colonne */
@media screen and (max-width: 568px) {
  .blog-list_item:first-child {
    grid-column: span 1;
  }
}
```

## CSS — 1 page(s) : https://www.blinked.fr/blog

```css
/* On enlève l’apparence native du select */
.form_input.is-select-input {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: white;
  padding-right: 2rem; /* Laisser de la place pour la flèche personnalisée */
  border: 1px solid #ccc; /* Par exemple, pour voir le select */
}

/* Le pseudo-élément sera appliqué sur le wrapper et non sur le select directement */
.select-wrapper {
  position: relative;
  display: inline-block;
}

/* Flèche personnalisée sur le wrapper */
.select-wrapper::after {
  content: '';
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  width: 0.6rem;
  height: 0.35rem;
 background-image: url("data:image/svg+xml;utf8,<svg width=%22100%%22 height=%22100%%22 viewBox=%220 0 10 6%22 fill=%22none%22 xmlns=%22http://www.w3.org/2000/svg%22><path d=%22M1 0.99991L5.00003 4.99988L9 0.999878%22 stroke=%22%23475669%22 stroke-width=%221.5%22 stroke-miterlimit=%2216%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/></svg>");
  background-size: contain;
  background-repeat: no-repeat;
  pointer-events: none;
}
```

## JS — 1 page(s) : https://www.blinked.fr/lexique

```js
document.addEventListener("DOMContentLoaded", function () {
  // --- Partie 1 : Construction des spans ---
  document.querySelectorAll('.is-item-lexique').forEach(el => {
    const text = el.textContent.trim();
    if (!text) return;

    const firstChar = text.charAt(0);
    const rest = text.slice(1);

    const isLetter = /^[a-zA-Z]$/.test(firstChar);

    if (isLetter) {
      el.innerHTML = `<span fs-list-field="letter">${firstChar}</span>${rest}`;
    } else {
      el.innerHTML = `<span>${firstChar}</span><span fs-list-field="letter" class="hide">#</span>${rest}`;
    }
  });

  // --- Partie 2 : Clique sur le bouton clear ---
  const clearInputs = document.querySelectorAll('input[fs-list-element="clear"]');

  clearInputs.forEach(clearInput => {
    clearInput.addEventListener('change', function () {
      if (this.checked) {
        const container = this.closest('label').parentElement;
        const allCheckboxLabels = container.querySelectorAll('label.w-checkbox.is-checkbox');

        allCheckboxLabels.forEach(checkboxLabel => {
          const input = checkboxLabel.querySelector('input[type="checkbox"]');

          if (!checkboxLabel.contains(this)) {
            checkboxLabel.classList.remove('active');
            if (input) input.checked = false;
          }
        });

        // IMPORTANT : on décoche le clear lui-même
        this.checked = false;
      }
    });
  });
});
```

## CSS — 1 page(s) : https://www.blinked.fr/lexiques/test

```css
.next-btn .icon-embed-arrow-lexique.is-previous {
    display: none;
}

.prev-btn .icon-embed-arrow-lexique.is-next {
    display: none;
}
```

