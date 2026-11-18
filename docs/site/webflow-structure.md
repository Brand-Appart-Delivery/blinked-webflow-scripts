# Structure Webflow — Blinked

> Audit Designer **en lecture seule** réalisé le 17/11/2026 via le connecteur MCP Webflow.
> Site `6979ce915767387cd0f9aa37` · prod `www.blinked.fr` · page Home `6979ce915767387cd0f9aa26`.
> Hors périmètre (déjà traité) : refonte du composant **Footer** et migration du custom code **global** (head/footer site) vers le chargeur GitHub/jsDelivr.
> Aucun script n'est enregistré (« registered scripts ») et aucun script n'est appliqué au niveau du site via l'API scripts.

---

## 1. Arborescence des pages

33 pages au total (API `list_pages`), plus un dossier `Legal` (id `698cab924aa1d727dfdf66ca`, slug `legal`) qui n'apparaît pas dans la liste mais qui sert de parent aux pages légales.

Légende des statuts : **Publiée** = `draft:false` et publiable · **Brouillon** = `draft:true` · 🌐 = template CMS publié (les items ont une URL) · 🔒 = template CMS non publié (`shouldPublish:false`, collection utilisée seulement pour des références ou des listes).

### 1.1 Pages statiques

| Page | Slug / chemin | ID | Statut | Rôle |
|---|---|---|---|---|
| Home | `/` | `6979ce915767387cd0f9aa26` | Publiée (modifiée le 17/11/2026) | Page d'accueil |
| Services | `/services` | `697b459098e7daa6c0ee89bc` | Publiée (modifiée le 17/11/2026) | Vue d'ensemble des services (SEA, SMA, Display) |
| Qui sommes-nous | `/qui-sommes-nous` | `6989c7d23794657899686d94` | Publiée | Page agence : équipe, processus, groupe Jaws |
| Réalisations | `/realisations` | `697b7e86362eefc32b389ab9` | Publiée | Liste des cas clients |
| Blog | `/blog` | `6979ce915767387cd0f9aa27` | Publiée | Liste des articles (recherche Finsweet List) |
| Lexique | `/lexique` | `6979ce915767387cd0f9aa31` | Publiée | Glossaire filtrable par lettre |
| Contact | `/contact` | `6979ce915767387cd0f9aa35` | Publiée | Formulaire de contact |
| 404 | `/404` | `6979ce915767387cd0f9aa29` | Publiée (page utilitaire) | Page « non trouvée » |
| Password | `/401` | `6979ce915767387cd0f9aa28` | Publiée (page utilitaire) | Page protégée par mot de passe (par défaut) |
| Waiting Screen | `/old-home` | `69973fe39e28fcdca6d2a7eb` | **Publiée** | Ancienne page d'attente/ancienne home. Elle est encore en ligne (voir §8) |
| Legal / Mentions légales | `/legal/mentions-legales` | `698ddc495ec8eaaad45d6622` | Publiée | Page légale |
| Legal / Politique de confidentialité | `/legal/politique-de-confidentialite` | `698ddbe344f1e3a7c9e02a88` | Publiée | Page légale |
| Legal / CGV | `/legal/conditions-generales-de-vente` | `698ddabb5f6f07203997da89` | Publiée | Page légale |
| Style Guide | `/style-guide` | `6979ce915767387cd0f9aa2a` | Brouillon | Style guide Client-First (`fs-styleguide_*`) |
| Static page | `/static-template-slug-1769686349586` | `697b4553b0798c9972c15fba` | Brouillon | Gabarit de page vierge |
| Page juridique | `/static-template-slug-1749804729172` | `6979ce915767387cd0f9aa30` | Brouillon | Gabarit de page légale |
| Marquee CSS | `/marquee-css` | `6979ce915767387cd0f9aa33` | Brouillon | Bac à sable pour le marquee CSS (`👌-marquee-*`) |

### 1.2 Templates CMS

| Template | Chemin des items | ID page | Collection | Statut | Rôle |
|---|---|---|---|---|---|
| 🌐 Blog Posts Template | `/blog/<slug>` | `6979ce915767387cd0f9aa2c` | `6979ce915767387cd0f9aa5a` | Publié | Article de blog |
| 🌐 Services Template | `/services/<slug>` | `697b2af92401518c369002e6` | `697b2af92401518c369002df` | Publié | Fiche d'un service (SEA, SMA…) |
| 🌐 Réalisations Template | `/case-studie/<slug>` | `697a20f08df42c6ad431db12` | `697a20ee8df42c6ad431dab2` | Publié | Fiche d'un cas client (slug « case-studie », faute d'orthographe) |
| 🌐 Lexiques Template | `/lexiques/<slug>` | `6979ce915767387cd0f9aa32` | `6979ce915767387cd0f9aaae` | Publié | Définition d'un terme du lexique |
| 🌐 Secteurs Template | `/secteurs/<slug>` | `6a1e28ff7ae5651ba4263e12` | `6a1e28ff7ae5651ba4263e0c` | Publié (créé le 02/06/2026) | Landing SEO par secteur |
| 🌐 Agences locales Template | `/agences-locales/<slug>` | `6a1e28ff7b3bf440c957cc7d` | `6a1e28ff7b3bf440c957cc77` | Publié (créé le 02/06/2026) | Landing SEO locale (ville) |
| 🔒 Pages Template | `/pages/<slug>` | `698decf1a1e41f7694d489fb` | `698decf1a1e41f7694d489ef` | Non publié | Collection de référence |
| 🔒 Leviers Réalisations Template | `/leviers-realisations/<slug>` | `698b094a4395ec816c392c20` | `698b094a4395ec816c392c18` | Non publié | Taxonomie : leviers des cas clients |
| 🔒 Secteurs Réalisations Template | `/tag-case-studies/<slug>` | `697a20fdc2bcd3ad6fbc08d5` | `697a20fdc2bcd3ad6fbc0895` | Non publié | Taxonomie : secteurs des cas clients |
| 🔒 Equipes Template | `/equipe/<slug>` | `6989e8b1465b61765c730ec3` | `6989e8b1465b61765c730ebb` | Non publié | Membres de l'équipe |
| 🔒 Témoignages clients Template | `/temoignages-clients/<slug>` | `6989c18baf40ba26075f24f9` | `6989c18baf40ba26075f24f3` | Non publié | Avis clients |
| 🔒 Expertises Services Template | `/expertises-services/<slug>` | `6989a7ec270eaaabebeccb41` | `6989a7ec270eaaabebeccb3a` | Non publié | Expertises liées aux services |
| 🔒 Plateformes Services Template | `/plateformes-services/<slug>` | `697b340231c56641c73f07f1` | `697b340231c56641c73f07eb` | Non publié | Plateformes publicitaires (Google, Meta…) |
| 🔒 FAQs Template | `/faq/<slug>` | `6979ce915767387cd0f9aa2f` | `6979ce915767387cd0f9aaab` | Non publié | Questions de la FAQ |
| 🔒 Auteurs Template | `/auteurs/<slug>` | `6979ce915767387cd0f9aa2e` | `6979ce915767387cd0f9aa8d` | Non publié | Auteurs des articles |
| 🔒 Catégories Blogs Template | `/categories/<slug>` | `6979ce915767387cd0f9aa2d` | `6979ce915767387cd0f9aa77` | Non publié | Catégories des articles |

Les templates publiés tirent leur SEO de champs CMS (`seo-meta-title` / `seo-meta-desc` ; pour le Lexique : `name` + `seo-metatitle` / `seo-metadescription`). L'image OG vient de `overlay` (Réalisations) et de `image-vignette` (Blog).

---

## 2. Sections des pages statiques principales

Squelette commun à presque toutes les pages (Client-First) : `body > .page-wrapper > [Global Styles] + .nav_fixed + main.main-wrapper > sections…`. Chaque section suit le schéma `section_* > .padding-global > .container-large`.

### Home (`6979ce915767387cd0f9aa26`)
1. Composant **Global Styles**
2. `.nav_fixed` : contient seulement un HtmlEmbed `.hide`
3. `main.main-wrapper`
   1. `.bg_gradient_hero` (wrapper du hero)
      - composant **Nav** (variant `base`, override de texte « Case studies »)
      - `section.section_hero` : `.padding-global` + `.mobile-cta-circular`
      - composant **Logos**
      - Image `.bg_gradient_traits_abs` + 2 HtmlEmbed `.bg_gradient_round-left` / `-right`
   2. `section.section_a-propos`
   3. `section.section_services`
   4. `section.section_chiffres-cles`. C'est une instance **détachée** de « Section - Chiffres clés » (même id d'élément `a542b311-…`) : la section contient aussi l'image `.chiffres_cle_bg_abs` et l'embed `.chiffres-cle_bg_bottom`.
   5. `section.section_case-study`
   6. `section.section_avis`
   7. `section.section_blog`
   8. composant **Section - Groupe**
   9. composant **Footer + CTA** (Title et Text surchargés)

### Services (`697b459098e7daa6c0ee89bc`)
1. Global Styles · `.nav_fixed` (vide)
2. `main.main-wrapper`
   1. `.bg_gradient_hero.n-svh` → **Nav** (variant `base`) · `section.section_hero` · **Logos** · 2 embeds de gradient
   2. `section.section_service`
   3. `section.section_chiffres-cles` (copie détachée elle aussi)
   4. composant **Section - Confiance** (variant `base`)
   5. composant **FAQ**
   6. composant **Footer + CTA**

### Qui sommes-nous (`6989c7d23794657899686d94`)
1. Global Styles · `.nav_fixed` (vide)
2. `main.main-wrapper`
   1. **Nav** (variant `1d1b6dd0…`, version claire)
   2. `section.section_hero_a_propos`
   3. `section.section_logo3` (logos écrits en dur, pas le composant Logos)
   4. `section.section_a-propos`
   5. `section.section_processus` (+ embed `.procesus_bg_top`)
   6. `section.section_processus` (deuxième bloc, + embed `.processus_bottom_bg`)
   7. `section.section_equipe.hide` (**masquée** par la classe combo `hide`)
   8. **Section - Confiance** (variant `7e13f39d…`, tagline « NOS PARTENAIRES »)
   9. **Section - Groupe**
   10. **Footer + CTA**

### Réalisations (`697b7e86362eefc32b389ab9`)
1. Global Styles · `.nav_fixed` (vide)
2. `main.main-wrapper`
   1. **Nav** (variant clair)
   2. `section.section_hero`
   3. `section.section_case-study` (liste et filtres ; contient un form « Email Form » sans champ)
   4. **Section - Confiance** (variant `7e13f39d…`)
   5. **Footer + CTA**

### Blog (`6979ce915767387cd0f9aa27`)
1. Global Styles · `.nav_fixed` (vide)
2. `main.main-wrapper`
   1. **Nav** (variant clair)
   2. `header.section_head-title`
   3. `section.section_blog-list` (recherche « Rechercher un article » + liste Finsweet `fs-list`)
   4. **Footer + CTA**

### Lexique (`6979ce915767387cd0f9aa31`)
1. Global Styles · `.nav_fixed` (vide)
2. `main.main-wrapper`
   1. **Nav** (variant clair)
   2. `header.section_head-title`
   3. `section.section_lexique_list` (recherche « Rechercher un mot » + filtres par lettre, 28 checkboxes)
   4. **Footer + CTA**

### Contact (`6979ce915767387cd0f9aa35`)
1. Global Styles (pas de `.nav_fixed`)
2. `main.main-wrapper`
   1. **Nav** (variant clair)
   2. `section.section_contact` (« Formulaire de contact »)
   3. **Footer + CTA**

### 404 (`6979ce915767387cd0f9aa29`)
Structure différente des autres pages : pas de Global Styles, pas de page-wrapper, pas de Nav.
1. `.utility-page_component > .utility-page_wrapper` : HtmlEmbed `.navbar9_logo`, H3 « Page non trouvée », texte « Vous vous êtes égaré. », composant **Button Arrow** (« Revenir à l'accueil » → Home)
2. **Footer + CTA**, placé directement dans le body

---

## 3. Composants

17 composants, aucun ne provient d'une librairie partagée. Les nombres d'instances sont ceux renvoyés par l'API ; ils comptent aussi les instances imbriquées dans d'autres composants.

| Composant | Groupe | Instances | Props principales | Contient |
|---|---|---|---|---|
| Global Styles | — | 19 | aucune | — (styles et embed globaux) |
| Nav | Component | 17 | Variant (`base` = transparente sur le hero, `1d1b6dd0…` = claire), Text…Text 6 (libellés du menu : L'agence, Nos services, Cases studies, Blog, Lexique, FAQ) | — |
| Footer | Component | 18 | Link, Title, Link 2…Link 10 (Qui sommes-nous, Réalisations, Blog, Lexique, `#`, jaws.group, CGV, Mentions, Services), Image, Image 2, CTA Circular/(Variant, Link, Image) | **CTA Circular**, formulaire **Newsletter** |
| Footer + CTA | Section | 15 | Section CTA/(Title, Text, Visibility, Button/Variant, Link, Text) · Footer/(Title, Link…Link 10, Image, Image 2, CTA Circular/…) | **Section CTA** + **Footer** |
| Section CTA | Section | 15 | Title, Text, Visibility (bool), Button/(Variant, Link, Text) | **Button** |
| Button | Buttons | 17 | Variant, Link (Contact par défaut), Text, Classes (string) | — |
| Button Arrow | Buttons | 37 | Variant, Link, Text | — |
| CTA Circular | Buttons | 1 (+ celle du Footer) | Variant, Link, Image | — |
| Tagline | Widget | 24 | Variant, Text (« 4.9 sur Google » par défaut) | — |
| Logos | Component | 2 | aucune | — (logos en dur, utilisé sur Home et Services) |
| FAQ | Section | 2 | Title, Text, Tagline/(Variant, Text) | **Tagline** |
| Section - Confiance | Section | 4 | Variant, Image…Image 9 (logos), Title, Tagline/…, Button Arrow/… | **Tagline**, **Button Arrow** |
| Section - Groupe | — | 2 | Title, Text, Image, Groupe block 1…5 (Image, Text, Link) | **Groupe block** ×5 |
| Groupe block | — | 10 | Link, Image, Text | — |
| Section - CTA Bloc | Section | 1 | Title, Text, Button/(Variant, Text, Link) | **Button** |
| **Section - Chiffres clés** | Section | **0 (mort)** | Image, Image 2, Title…Title 4, Text…Text 4, Tagline/…, Button Arrow/… (contenu obsolète : « 18M € de budget géré en 2023 ») | **Tagline**, **Button Arrow** |
| **Section_vierge** | — | **0 (mort)** | aucune | — |

**Imbrications (à retenir)**
- `Footer + CTA` = `Section CTA` + `Footer`. `Footer` contient lui-même `CTA Circular`, et `Section CTA` contient `Button`.
- `Section - Groupe` contient 5 `Groupe block`. `FAQ`, `Section - Confiance` et `Section - Chiffres clés` contiennent `Tagline`, et les deux dernières contiennent aussi `Button Arrow`.
- Le Footer est utilisé 3 fois en direct (18 − 15) et 15 fois via `Footer + CTA`.

**Câblage des props de `Footer + CTA` vers `Footer` : à vérifier en priorité**
Dans la définition de `Footer + CTA`, les props `Link 2`…`Link 9` du Footer interne sont liées à des props du parent dont la **valeur par défaut est `#`**. Aucune des pages auditées ne surcharge ces props. Si le Footer refondu lit encore ces props, les liens du footer (Qui sommes-nous, Réalisations, Blog, Lexique, Jaws, CGV, Mentions…) pointent vers `#` sur les 15 pages qui utilisent `Footer + CTA`. Dans le même esprit, la prop `Footer/Title` (« Avez-vous des questions ? ») n'est plus câblée : le Title du Footer interne est écrit en dur, « Besoin d'un audit ? ».

**Composants morts** : `Section - Chiffres clés` (Home et Services utilisent une copie détachée de la section) et `Section_vierge`.

---

## 4. Système de styles

### 4.1 Volumétrie
- **944 styles** : 672 classes globales, 229 combos et 43 sélecteurs de balises ou de descendants (`body`, `h1`…`h6`, `.text-rich-text p`, `.rich-text_blog h2`, `.rich-text-juridique a`…). Aucun style ne vient d'une librairie.
- **174 styles sans aucune propriété.** Une partie est normale en Client-First (wrappers `section_*`, `page-wrapper`, `main-wrapper`) ; le reste est mort ou vide (`fs-styleguide_*`, `secteurs-re`, `icon-chevron`, `hover-effect`, `image-mask`…).
- **Police unique** : Golos Text (variables `font-primary`, `font-seconday` et `font-tertiary`, toutes égales à Golos Text).

### 4.2 Convention de nommage
Le système est **hybride Client-First (Finsweet) + composants Relume** :
- **Client-First** pour la structure et les utilitaires : `page-wrapper`, `main-wrapper`, `padding-global`, `container-large|medium|small|xlarge`, `padding-section-small|medium|large|xlarge`, `margin-*` et `padding-*` (`tiny`…`xxhuge` + directions `margin-top`, `margin-bottom`…), `spacer-*`, `max-width-*`, `text-size-tiny|small|regular|medium|xmedium|large`, `heading-style-h1…h6|display`, `text-weight-*`, `text-style-*`, `text-color-*`, `text-align-*`, `background-color-*`, `hide`, `hide-tablet`, `hide-mobile-landscape`, `hide-mobile-portrait`, `z-index-1…5`, `overflow-*`, `aspect-ratio-*`, `icon-1x1-*`, `icon-embed-*`, `fs-styleguide_*`.
- **Composants Relume numérotés** (copiés depuis la librairie Relume, puis renommés pour certains) : `navbar9_*`, `faq6_*`, `blog34_*`, `content27_*`, `layout1_*`, `header50_*`, `logo3_*`, `footer13_*`, `footer16_*`, `contact6_*`, `accordion2_*`, `timeline5_circle`.
- **Classes « maison »** au format `bloc_element` : `chiffre-cle_*`, `processus_*`, `case-studies_*`, `avis_*`, `services_card*`, `confiance_*`, `groupe_*`, `lexique_*`, `blog-list_*`, `footer_*`, `form_*`…
- **Utilitaires flex ajoutés** (hors Client-First) : `flex-h` / `flex-v` combinés avec `gap-0-25|0-375|0-5|1|1-5|2|3|4`, `left-center`, `center-top`, `space-between`, `md-flex-v`, `md-flex-wrap`, `md-gap-2`…
- **Deux familles concurrentes pour les landings SEO** (juin 2026) : d'un côté `blk-*` (`blk-hero-section`, `blk-cta-*`, `blk-contact-*`, `blk-services-grid`…), de l'autre `locations-*` et `secteurs-*` (`locations-hero`, `locations-cta`, `secteurs-hero`, `secteurs-ref_card`…). Les deux familles couvrent le même besoin.

### 4.3 Classes suspectes, doublons et fautes
- **Fautes de frappe** : `procesus_bg_top`, `porucent_grid` (à côté de `pourcent_grid_block`), `chiffte-cle_content`, `secton_faq`, `juridique-item_coontent`, `section_caracteristiques_servicer`, `secteurs-re` (classe tronquée), `chiffre-cle_block_bloc.is-thirst`. Côté variables : `font-seconday` et `quarternary-invert`.
- **Noms par défaut de Webflow** : `Link`, `Link Block`, `Text Block`, `form_checkbox 2`, `form_checkbox-label 2`, `form_message-success 2`, `form_message-error 2`, `ICON-CHEVRON` (en majuscules).
- **Combos trop profondes** (jusqu'à 6 niveaux) : `.flex-h.gap-0-25.left-center.text-color-secondary-bg-white.text-weight-medium.text-size-small`, `.flex-v.gap-1.left-center.max-width-full.hide-mobile-landscape`, `.flex-v.gap-4.padding-top-bottom-1-5rem.md-gap-2`. Elles sont fragiles et difficiles à maintenir.
- **Combo en double** : `.flex-h.gap-0-5` apparaît deux fois dans la liste des combos.
- **Redondances** : `text-color-secondary-bg-white` et `text-color-tertiary-bg-blue` (couleur et contexte dans le même nom) ; `padding-section-*` décliné en variantes ad hoc (`-blog`, `-custom-hero`, `-custom-hero-2`, `-heading-56`, `-hero_blog`, `-hero_custom`, `-service-hero`, `-xmedium`, `-xxmedium`) ; `margin-custom1|2|3`, `padding-custom1|2|3` et `padding-custom-footer`.
- **Classes ajoutées par des outils tiers ou des tests** : `fa-social-share-*` (hash en suffixe, ancien widget de partage), `👌-marquee-horizontal-css` et `👌-marquee-horizontal-alt-css` (page Marquee CSS), `fs-cmsprevnext_*`, `fs-cms_*`, `fs-card_list`, `swiper*` (Swiper.js).
- **Combos qui servent probablement de hooks JS ou CSS** : `.layout1_image.image-reveal`, `.layout1_image.scroll-zoom`, `hover-effect`, `hover-effect-radius`, `.hide.active`, `.is-checkbox.active`. Il faut vérifier leur usage dans le JS global du repo.
- **Couleurs écrites en dur au lieu de variables** : `#f4f6f6` (20 occurrences), `#dfe6e7` (16), `#d4d4d4` (16), `#f9fbfb` (10), `#ffffff`, `#344346`, `#0d1226`, `#f14624`, `#6c8184`, `#feece9`, `#0f1415` (couleur du `body`). Ce sont des doublons exacts de primitives (`neutral-100`, `neutral-200`, `secondary-900`, `primary-500`…). On trouve aussi `#2d40ea`, `#c9bfad`, `#475569`, `#f1f5f9`, `#ababab`, qui ne correspondent à aucune variable, ainsi que les couleurs de marque des réseaux sociaux (`#E1306C`, `#1877F2`, `#0077B5`).
- **Typographie en dur** : `heading-style-h1` = `4rem` (2.5rem en mobile), `heading-style-h2` = `3rem` (2rem en mobile), etc. Les variables de la collection *Typography* (Heading 1 = 64px, 40px en mobile…) existent mais **ne sont référencées par aucun style**.

### 4.4 Collections de variables

5 collections au total. D'après les références trouvées dans les styles, environ 165 liens pointent vers *Tokens*, environ 61 vers *default* et environ 28 vers *Primitives*. *Screen mode* et *Typography* ne reçoivent **aucune** référence.

**`default`** (41 variables, 1 mode). C'est l'héritage du template Client-First/Relume. Sa palette bleu/rose ne correspond pas à la marque, mais une trentaine de styles l'utilisent encore.
- Base Color - Brand : blue light `#d9e5ff`, blue `#2d62ff`, blue dark `#080331`, pink light `#ffaefe`, pink `#dd23bb`, pink dark `#3c043b`
- Base Color - Neutral : black, white, lightest `#eee`, lighter `#ccc`, light `#aaa`, neutral `#666`, dark `#444`, darker `#222`, darkest `#111`
- Base Color - System : success green `#cef5ca` / dark `#114e0b`, warning yellow `#fcf8d8` / dark `#5e5515`, error red `#f8e4e4` / dark `#3b0b0b`, focus state `#2d62ff`
- Variables sémantiques (alias vers les précédentes) : Background Color (primary, secondary, tertiary, alternate, success, warning, error), Border Color (primary, secondary, alternate), Link Color (primary, secondary, alternate), Text Color (primary, secondary, alternate, success, warning, error)

**`Primitives`** (158 variables, 1 mode)
- color/primary (orange Blinked) : 50 `#feece9` · 100 `#fcdad3` · 200 `#f9b5a7` · 300 `#f7907c` · 400 `#f46b50` · **500 `#f14624`** · 600 `#c1381d` · 700 `#912a16` · 800 `#601c0e` · 900 `#300e07` · 950 `#180704`
- color/secondary (bleu nuit) : 50 `#eceef8` · 100 `#dde1f3` · 200 `#bbc4e8` · 300 `#98a6dc` · 400 `#7285cf` · 500 `#5067c3` · 600 `#384da3` · 700 `#2b3b7d` · 800 `#1d2854` · **900 `#0d1226`** · 950 `#060913`
- color/neutral : 50 `#f9fbfb` · 100 `#f4f6f6` · 200 `#dfe6e7` · 300 `#c6d0d2` · 400 `#a8b6b8` · 500 `#8b9ea1` · 600 `#6c8184` · 700 `#4e6164` · 800 `#344346` · 900 `#212a2b` · 950 `#0f1415` · Black `#090b0c` · White `#ffffff`
- color/success : 100 `#dcfce7`, 400 `#4ade80`, 500 `#22c55e`, 900 `#14532d` · color/error : 100 `#fee2e2`, 400 `#f87171`, 500 `#ef4444`, 900 `#7f1d1d` · color/alert : 100 `#ffedd5`, 400 `#fb923c`, 500 `#f97316`, 900 `#7c2d12`
- color/light (blanc avec alpha) de 0 à 100 % ; color/dark (noir avec alpha) de 2 à 100 %. **Bug** : `dark/60`, `dark/70`, `dark/80` et `dark/90` valent tous `#00000099`.
- font size : 50=12px · 100=14 · 200=16 · 300=18 · 400=20 · 500=24 · 600=32 · 700=40 · 800=48 · 900=64 · 950=80 · 1000=96 · 1050=128px
- line height : lh-100=12px … lh-900=80px
- font weight : `normal/weight-100…900` sont typées **Size avec des valeurs en px** (« 400px »), ce qui est inutilisable comme graisse ; `italic/weight-*-italic` sont typées FontFamily (« Regular Italic »…)
- border radius : none 0 · xs 4 · s 6 · m 8 · l 12 · xl 16 · 2xl 24 · 3xl 32 · full 9999px
- spacing (échelle Tailwind) : de 0 à 96 (384px). **Bug de nommage** : la variable « spacing/1 - 2,75rem, 44px » porte le même préfixe que « spacing/1 - 0,25rem, 4px ».

**`Tokens`** (80 variables sémantiques, modes **Base** et **Dark**). Exemples en mode Base :
- background : primary = white · secondary = neutral-50 · tertiary = neutral-100 · quaternary = neutral-200 · quinary = neutral-300 · black = neutral-950 · brand-primary = primary-500 `#f14624` · brand-primary-alt-1…5 = primary-50…400 · brand-secondary = secondary-900 `#0d1226` · brand-secondary-alt-1…5 = secondary-50…400 · success, error, alert et leurs variantes `-weak` · variantes `*-invert`
- border : primary = neutral-100 · secondary = neutral-200 (**le token le plus utilisé**) · tertiary = neutral-300 · quaternary = neutral-400 · quinary = neutral-500 · brand-* · `*-invert`
- text : primary = neutral-950 · secondary = neutral-800 · tertiary = neutral-600 · white · black · brand-primary = primary-500 · p/s/t-brand-primary (950/900/800) · brand-secondary = secondary-900 · `*-invert`
- Le mode Dark inverse les neutres (par exemple background/primary = neutral-950). Aucun usage n'a été constaté dans les styles.

**`Screen mode`** (33 variables, modes **Base** et **Mobile**). **Non référencée.**
- container : large 1280px · medium 1024px · small 768px
- max-width : xxsmall 320 · xsmall 400 · small 480 · medium 560 · large 768 · xlarge 1024 · xxlarge 1280px
- padding-global : 64px. En pratique, la classe `padding-global` utilise `2.5rem` (40px) en desktop et `1.25rem` en mobile, en dur.
- section padding : large 128 → 80px en mobile · medium 80 → 64 · small 48 → 32
- radius : None → Full (alias des primitives) · spacing : 4XS 2px → 3XL 64px

**`Typography`** (17 variables, modes **Base** et **Mobile**). **Non référencée.**
- Fonts : font-primary, font-seconday, font-tertiary = Golos Text
- Display 1 128px → 80 (mobile) · Display 2 96 → 64 · Display 3 80 → 48 · Heading 1 64 → 40 · H2 48 → 32 · H3 40 → 24 · H4 32 → 20 · H5 24 → 16 · H6 20 → 14 · Text Large 20 → 18 · Medium 18 → 16 · Regular 16 · Small 14 · Tiny 12

### 4.5 Breakpoints
Les styles ne surchargent que **4 breakpoints** : `main` (desktop, base), `medium` (tablette ≤ 991px : 154 styles), `small` (mobile paysage ≤ 767px : 137 styles), `tiny` (mobile portrait ≤ 478px : 101 styles). Aucun style n'utilise `large`, `xl` ou `xxl` (≥ 1280px).

---

## 5. Interactions Webflow (IX3 / GSAP natif)

L'outil expose uniquement les interactions **IX3** ; les anciennes interactions IX2 ne sont pas lisibles par l'API. Deux interactions existent, toutes deux limitées à la Home :

| ID | Nom | Trigger | Timelines | Constat |
|---|---|---|---|---|
| `i-8f0be456` | Page load interaction | `wf:load` | `t-be222e15` **sans aucune action** | Vide, aucun effet |
| `i-2b5086f8` | Custom event interaction | `wf:custom` sur `wf:body`, `eventName` **vide** | aucune | Vide, aucun effet |

Ce sont deux coquilles vides, sans doute laissées par un test, qui peuvent être supprimées. Toutes les animations réelles passent par du **JS custom** : GSAP sur la Home (§7) et le JS global du chargeur jsDelivr. La présence de classes comme `image-reveal`, `scroll-zoom`, `hover-effect` ou `swiper*` laisse penser que d'autres animations vivent dans ce JS global ; c'est à confirmer dans le repo.

---

## 6. Formulaires

L'API renvoie 37 entrées, car chaque formulaire est dupliqué pour chacun des 3 domaines du site (staging `webflow.io` et domaines de prod : `siteDomainId` `6979ce91…`, `6997406d…`, `6997406e…`). Les entrées « Newsletter », elles, sont dupliquées une fois par page qui contient le Footer. Une fois dédoublonnés, il reste 7 formulaires :

| Formulaire | Page(s) | Élément | Champs |
|---|---|---|---|
| **Newsletter** (créé le 17/11/2026 avec la refonte du Footer) | Toutes les pages avec Footer : Home, Services, Qui sommes-nous, Réalisations, Blog, Lexique, Contact, 404, pages légales (et le dossier Legal), Static page, templates Blog, Services, Réalisations, Lexiques, Secteurs et Agences locales | composant Footer, form `fd9b17b2-…-264164a526bf` | Email (`Email`, placeholder « Votre adresse e-mail ») |
| **Formulaire de contact** | Contact | `2f3beb1c-dfed-19d6-2dae-0bce19e8b0a5` | Nom · Prénom · **Nom** (entreprise) · **Prénom** (lien du site) · Email · Telephone (Phone) · Message · Checkbox (consentement) |
| Email Form (recherche blog) | Blog | `61a3cf6b-…-7740d6d0ec19` | Name (« Rechercher un article ») : champ de recherche Finsweet |
| Email Form (recherche lexique) | Lexique | `4e6d89b4-…-c5c6f078ee19` | Name (« Rechercher un mot ») |
| Email Form 2 (filtre par lettre) | Lexique | `4e6d89b4-…-c5c6f078ee39` | 28 checkboxes : « Checkbox » ×2 et « Checkbox 2 » ×26 (même `fieldElementId`, donc des éléments générés par une liste CMS) |
| Email Form (filtres réalisations) | Réalisations | `7998b201-4034-4236-9c4c-b0a8332abcd3` | aucun champ déclaré : les filtres sont sans doute des liens ou des checkboxes CMS |
| Form | Style Guide (brouillon) | `32eadc24-…-fb5b6627cdca` | First Name, Message, Select, Checkbox, Radio (démo) |

Aucun formulaire ne configure de redirection (`redirectUrl: null`) ni d'email de confirmation.

---

## 7. Custom code au niveau des pages

Le code est recopié **à l'identique** depuis `get_page_freeform_code`. Les pages qui ne sont pas listées ont un head et un footer vides : Qui sommes-nous, Réalisations, Contact, 404, Password, Style Guide, Waiting Screen, Mentions légales, Politique de confidentialité, CGV, Static page, Page juridique, Marquee CSS, et les templates Secteurs, Agences locales, Pages, Leviers, Equipes, Témoignages, Expertises, Plateformes, Services, Secteurs Réalisations, FAQs, Auteurs et Catégories.

| Page | Head | Footer |
|---|---|---|
| Home | — | GSAP intro + CSS logos + script/CSS nav au scroll |
| Services | — | script/CSS nav au scroll |
| 🌐 Réalisations Template | — | script/CSS nav au scroll (identique à Services) |
| Blog | Finsweet Attributes v2 (`fs-list`) | — |
| Lexique | Finsweet Attributes v2 (`fs-list`) | script de construction des lettres et du bouton « clear » |
| 🌐 Lexiques Template | Finsweet Attributes v2 (`fs-list`) | CSS des boutons précédent/suivant |
| 🌐 Blog Posts Template | Finsweet Attributes v1 : toc, socialshare, richtext | — |

### 7.1 Home (`6979ce915767387cd0f9aa26`) — Footer

```html
<script>
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
</script>

<style>
  /* On cible les éléments individuels (souvent .logo3_item ou les images) */
  .logo3_item {
    opacity: 0;
    transform: translateY(20px);
  }
  
  html, body {
  overscroll-behavior: none;
}
}
</style>

<script>
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
</script>

<style>
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
</style>

```

### 7.2 Services (`697b459098e7daa6c0ee89bc`) — Footer

```html
<script>
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
</script>

<style>
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
</style>
```

### 7.3 🌐 Réalisations Template (`697a20f08df42c6ad431db12`) — Footer

Identique, caractère pour caractère, au footer de Services :

```html
<script>
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
</script>

<style>
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
</style>
```

### 7.4 Blog (`6979ce915767387cd0f9aa27`) — Head

```html
<!-- Finsweet Attributes -->
<script async type="module"
src="https://cdn.jsdelivr.net/npm/@finsweet/attributes@2/attributes.js"
fs-list
></script>
```

### 7.5 Lexique (`6979ce915767387cd0f9aa31`) — Head

```html
<!-- Finsweet Attributes -->
<script async type="module"
src="https://cdn.jsdelivr.net/npm/@finsweet/attributes@2/attributes.js"
fs-list
></script>
```

### 7.6 Lexique (`6979ce915767387cd0f9aa31`) — Footer

```html
<script>
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
</script>
```

### 7.7 🌐 Lexiques Template (`6979ce915767387cd0f9aa32`) — Head

```html
<!-- Finsweet Attributes -->
<script async type="module"
src="https://cdn.jsdelivr.net/npm/@finsweet/attributes@2/attributes.js"
fs-list
></script>
```

### 7.8 🌐 Lexiques Template (`6979ce915767387cd0f9aa32`) — Footer

```html
<style>
.next-btn .icon-embed-arrow-lexique.is-previous {
    display: none;
}

.prev-btn .icon-embed-arrow-lexique.is-next {
    display: none;
}
</style>
```

### 7.9 🌐 Blog Posts Template (`6979ce915767387cd0f9aa2c`) — Head

```html
<!-- [Attributes by Finsweet] Table of Contents -->
<script defer src="https://cdn.jsdelivr.net/npm/@finsweet/attributes-toc@1/toc.js"></script>

<!-- [Attributes by Finsweet] Social Share -->
<script defer src="https://cdn.jsdelivr.net/npm/@finsweet/attributes-socialshare@1/socialshare.js"></script>

<!-- [Attributes by Finsweet] Powerful Rich Text -->
<script defer src="https://cdn.jsdelivr.net/npm/@finsweet/attributes-richtext@1/richtext.js"></script>
```

---

## 8. Observations : dette technique, incohérences, risques

### 8.1 Custom code de page (à traiter pendant la migration vers le repo)
1. **CSS nav cassé** (Home, Services, Réalisations Template). Le bloc commence par `* --- 1. Transition globale --- */` au lieu de `/* --- …`. Le navigateur lit `* --- 1. …` comme un sélecteur invalide et **ignore toute la première règle**, si bien que la transition `all 0.5s` sur `.navbar9_component`, `.navbar9_link` et `.navbar9_logo` ne s'applique jamais. La section « 2 » de la numérotation n'existe pas non plus.
2. **Accolade orpheline** dans le `<style>` de la Home (`html, body {…}` suivi de `}`).
3. **La cible `.logo3_item` n'existe pas** : aucune classe de ce nom parmi les 944 styles (seulement `logo3_component`, `_list`, `_logo` et `_wrapper`). Le `gsap.set` et le `.to(".logo3_item")` ne visent donc rien, et la règle CSS `.logo3_item { opacity:0 }` est morte. Si la classe est un jour ajoutée, les logos seront invisibles quand GSAP ne se charge pas.
4. **JS et CSS se disputent la nav.** Sur la Home, GSAP anime `.navbar9_component` (`y`, `opacity`) alors que le CSS de la même page voulait lui appliquer `transition: all … !important`. Cette règle est aujourd'hui neutralisée par le bug n° 1. **Si on corrige le commentaire sans réfléchir, GSAP et la transition CSS vont se battre** : saccades et animation d'intro ralentie. Il faut retirer `transition: all` sur l'élément animé par GSAP, ou limiter la transition à `background-color` et `color`.
5. **Script nav au scroll copié sur 3 pages** (Home, Services, Réalisations Template) alors que les autres pages utilisent la variante claire du composant Nav. Le listener `scroll` n'est pas `passive`, n'est pas throttlé et ne vérifie pas que `navbar` existe. Il vaut mieux en faire un module unique du repo, activé par un attribut (par exemple `data-nav="transparent"`) sur les pages concernées.
6. `gsap.registerPlugin(ScrollTrigger)` est appelé sur la Home alors qu'aucun ScrollTrigger n'y est utilisé. Le code dépend aussi de GSAP chargé globalement (réglage GSAP de Webflow ou chargeur jsDelivr) : il faut vérifier l'ordre de chargement après la migration.
7. **Lexique** : la regex `/^[a-zA-Z]$/` envoie les termes qui commencent par une lettre accentuée (É, À…) dans le groupe « # ». Le script réécrit aussi `innerHTML`, ce qui est fragile si le contenu CMS contient du HTML.
8. **Finsweet en deux versions** : Attributes **v2** (`@finsweet/attributes@2`, `fs-list`) sur Blog, Lexique et Lexiques Template, et anciens packages **v1** (`attributes-toc@1`, `attributes-socialshare@1`, `attributes-richtext@1`) sur le template Blog. Il faut converger vers la v2 (qui contient aussi toc, socialshare et richtext) et charger le script une seule fois depuis le chargeur global, de façon conditionnelle.
9. Le CSS du Lexiques Template vise `.next-btn` et `.prev-btn` ainsi que la combo `.icon-embed-arrow-lexique.is-next`, qui n'existent pas comme styles Webflow (seule `.is-previous` existe). Ce sont peut-être des classes posées en attribut ; à vérifier, sinon c'est du code mort.

### 8.2 Composants
10. **Liens du footer à `#`** probables sur les 15 pages qui utilisent `Footer + CTA` (voir §3) : à contrôler en prod tout de suite.
11. **Composants morts** : `Section - Chiffres clés` (contenu de 2023 périmé, copiée détachée sur Home et Services, donc à maintenir à 2 endroits) et `Section_vierge`.
12. Les logos sont dupliqués : composant `Logos` sur Home et Services, `section_logo3` en dur sur Qui sommes-nous.
13. Les libellés de la Nav sont des props texte : « Cases studies » (faute) par défaut, surchargé en « Case studies » sur la Home seulement.
14. `section_equipe` est masquée par une combo `.hide` sur Qui sommes-nous, mais reste dans le DOM (CMS Equipes chargé pour rien).
15. La 404 n'a ni Global Styles ni Nav, et son `Footer + CTA` est placé hors de `page-wrapper` : les styles globaux injectés par le composant Global Styles y manquent peut-être.
16. Contact n'a pas de `.nav_fixed`, contrairement aux autres pages ; sur la Home, `.nav_fixed` ne contient qu'un embed caché. Le rôle de ce wrapper est à clarifier.

### 8.3 Styles et variables
17. Le système de variables est complet (Primitives, Tokens avec Dark, Screen mode et Typography avec Mobile) mais **peu branché** : Typography et Screen mode ne sont référencées par aucun style, les titres et paddings sont en dur, et une trentaine de styles pointent encore vers la collection `default` héritée du template (palette bleu/rose qui n'est pas celle de Blinked).
18. Une dizaine de couleurs en dur doublonnent des primitives (§4.3).
19. Bugs dans les variables : `dark/60` à `dark/90` ont la même valeur ; `font-weight/normal/*` sont typées Size en px ; `spacing/1 - 2,75rem, 44px` est mal nommée ; `font-seconday` contient une faute.
20. 174 styles vides, plusieurs fautes de frappe dans les classes, des noms par défaut (`Text Block`, `form_checkbox 2`…), des combos sur 5 à 6 niveaux, et deux familles de classes concurrentes pour les landings SEO (`blk-*` contre `locations-*` / `secteurs-*`). Un nettoyage s'impose (« Clean up » des styles inutilisés dans le Designer).

### 8.4 Pages et SEO
21. **`/old-home` (« Waiting Screen ») est publiée** et indexable, avec un title et une meta description proches de la Home (« +120M€ de CA »), ce qui crée un risque de contenu dupliqué. Il faut la passer en brouillon ou la rediriger en 301.
22. Le slug du template Réalisations est `/case-studie/` (faute, et mélange anglais/français), alors que la page de liste est `/realisations`.
23. L'**alt text de l'image du hero de la Home** décrit un graphique de parts de marché Apple/Samsung/Xiaomi : texte généré automatiquement, faux et nuisible pour l'accessibilité et le SEO.
24. Les chiffres clés ne concordent pas : la meta de la Home annonce « +200M€ de CA », celle de Waiting Screen « +120M€ », le composant mort « 120M€ / 18M€ en 2023 ».
25. Le Formulaire de contact a deux champs nommés « Nom » et deux nommés « Prénom » (le nom d'entreprise et le lien du site portent les mêmes noms que le nom et le prénom), si bien que les soumissions sont ambiguës, voire écrasées. La checkbox de consentement n'a pas de nom explicite.
26. Les interactions IX3 de la Home sont vides (§5) : du bruit dans le panneau Interactions, à supprimer.
27. Les pages en brouillon (Static page, Page juridique, Marquee CSS, Style Guide) et la page Password sont des restes du template. Le Style Guide et ses ~45 classes `fs-styleguide_*` alourdissent le CSS publié.
