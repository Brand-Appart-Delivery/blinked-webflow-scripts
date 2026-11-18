# Audit du front publié — Blinked

Relevé du 2026-11-17, en lecture seule. Sources :

- crawl des 105 URL du sitemap de **prod** (`www.blinked.fr`, encore sur l'ancien chargeur Slater) ;
- 2 pages **staging** re-téléchargées (`blinkedxmekaa.webflow.io` : home + un article), qui ont déjà le nouveau chargeur ;
- les fichiers publics téléchargés pour mesure : bundles Webflow (dont les données IX2), CSS Webflow, librairies CDN, robots.txt, sitemap.xml.

Scripts d'analyse (réutilisables) : `/private/tmp/claude-501/-Users-axelmichel-Documents-Projets-Blinked/0b9bf2fb-307b-4f10-bb4c-520b32c1c11a/scratchpad/audit-front/`
(`analyse.py` → `pages.jsonl`, `rapport.py <section>`, `ix.py`, `internal-links.txt`, `imgsizes.txt`).

Ce document complète `backups/webflow-inline-code-2026-11-17.md` (inventaire du code inline) sans le refaire.

---

## 1. Types de pages

105 URL dans le sitemap, 14 templates Webflow (`data-wf-page`) distincts.

| Type | Nb | Exemples | Template / collection |
|---|---|---|---|
| Home | 1 | `/` | page statique |
| Services (index) | 1 | `/services` | statique |
| Service (détail) | 3 | `/services/sea-google-ads`, `/services/sma-social-media-advertising`, `/services/expertise-programmatique` | collection CMS Services |
| Réalisations (index) | 1 | `/realisations` | statique (liste filtrable Finsweet) |
| Case studies | 4 | `/case-studie/k-way`, `/case-studie/lazartigue`, `/case-studie/gomoworld`, `/case-studie/theatre-du-chatelet` | collection CMS (slug `case-studie`, sans « s ») |
| Blog (index) | 1 | `/blog` | statique (liste filtrable Finsweet) |
| Articles de blog | 86 | `/blog/guide-quality-score-google-ads`, `/blog/sea-google-ads` | collection CMS Blog |
| Lexique (index) | 1 | `/lexique` | statique (filtre A-Z Finsweet) |
| Lexique (fiche) | 1 | `/lexiques/test` | collection CMS Lexique — **une seule fiche, nommée « test »** |
| Qui sommes-nous | 1 | `/qui-sommes-nous` | statique |
| Contact | 1 | `/contact` | statique |
| Légales | 3 | `/legal/mentions-legales`, `/legal/politique-de-confidentialite`, `/legal/conditions-generales-de-vente` | statiques |
| « old-home » | 1 | `/old-home` | **301 → `/home` → 404** (le crawl a récupéré la page 404) |

**Secteurs et agences locales : pas de template dédié publié.**

- Les contenus « secteurs » sont des **articles de blog** : environ 25 slugs sectoriels, repérés d'après le slug (approximatif), par exemple `agence-marketing-digital-automobile|b2b|immobilier`, `publicite-banque-performance`, `publicite-cosmetique-performance`, `publicite-hotel-direct`, `guide-publicite-avocat-reglementation`, `guide-publicite-digital-restaurant`, `strategie-google-ads-saas-performance`.
- Agences locales : aucune URL. Le CSS Webflow contient pourtant tout un jeu de classes `blk-page-agence`, `blk-hero-agence`, `blk-map-embed`, `blk-services-grid`… utilisées sur **aucune** page publiée. Un template « agence » semble prêt mais non publié (ou en brouillon).
- Pas de version EN publiée : `/en` répond 404 en prod comme en staging, et il n'y a aucun hreflang.

---

## 2. Librairies et scripts externes

### 2.1 Chargés sur la prod (toutes pages sauf mention)

| Script | Version | Où | async/defer | Pages | Poids gz | Usage réel détecté |
|---|---|---|---|---|---|---|
| WebFont loader (`ajax.googleapis.com/.../webfont/1.6.26`) | 1.6.26 | head | bloquant | 105 | 5,4 Ko | Golos Text 300/400/500/600/700 |
| Swiper `cdn.jsdelivr.net/npm/swiper@12` (JS + CSS) | **@12 flottant** (12.2.0 aujourd'hui) | head | **bloquant** | 105 | 43,6 + 3 Ko | 2 pages seulement : home (`.swiper.is-cs`) et qui-sommes-nous (`.swiper.is-equipe`) |
| Finsweet Attributes v2 `@finsweet/attributes@2` avec `fs-list` | 2.7.1 (flottant @2) | head | async module | 105 (en double sur `/blog`, `/lexique`, `/lexiques/test`) | 1,5 Ko + module list | `fs-list` : blog, lexique, réalisations, fiche lexique (voir 2.3) |
| Lenis `lenis@1.3.17` (JS + CSS) | 1.3.17 | head | bloquant | 105 | 4,9 Ko | **Inutilisé** : `SMOOTH_SCROLL_ENABLED = false` dans `src/core/core.js`, et l'ancien code Slater n'appelait pas Lenis |
| gtag.js `G-3HKFGT9CSQ` (GA4 direct) | — | head | async | 105 | — | GA4, `gtag('config')` posé dans le head |
| Google tag first-party `/avljl2rk…` (GTM-K46GTXWN via `google_tags_first_party`) | — | head | async | 104 (pas la 404) | — | Intégration Google tag de Webflow (proxy 1st party). La 404 en charge un autre (`/nvhc9u4…`) |
| Chargeur Slater (`slater.app/18716.js`) | — | head (inline, puis imports au DOMContentLoaded) | module | 105 | — | 8 modules + 1 CSS Slater. **Prod seulement**, absent du staging |
| jQuery 3.5.1 (cloudfront Webflow) | 3.5.1 | fin de body | bloquant | 105 | 31 Ko | requis par webflow.js |
| `webflow.schunk.*.js` ×2 + `webflow.<hash>.js` | — | fin de body | bloquant | 105 | 13 + 42 + 1 à 5 Ko | runtime Webflow + IX2. `/blog`, `/lexique`, `/contact`, `/realisations` ont un bundle à part (formulaires + Turnstile) |
| GSAP 3.15.0 (`cdn.prod.website-files.com/gsap/3.15.0/`) : gsap, ScrollTrigger, **InertiaPlugin**, **SplitText** | 3.15.0 | fin de body | bloquant | 105 | 28 + 18 + 3,3 + 3,7 Ko | gsap + ScrollTrigger : nos modules et le code inline. **InertiaPlugin et SplitText : seulement enregistrés** (`gsap.registerPlugin(ScrollTrigger,InertiaPlugin,SplitText)` inline sur toutes les pages), jamais utilisés |
| Flowappz social-share 1.0.5 (`social-share-cdn.pages.dev`) | 1.0.5 | fin de body | bloquant | 105 | 3,2 Ko | Utilisé sur les **86 articles** (`flowappz-socialshare-element="facebook|linkedin"`), chargé pour rien sur les 19 autres pages |
| Finsweet v1 `attributes-toc@1` | 1.x | head | defer | 86 articles | 8,5 Ko | Utilisé : sommaire (`fs-toc-element=contents|link|ix-trigger`, `fs-toc-offsettop=5rem`) |
| Finsweet v1 `attributes-richtext@1` | 1.x | head | defer | 86 articles | 3,8 Ko | Utilisé : `fs-richtext-element=rich-text`, composant `cta_blog` (la v2 n'a plus de module richtext) |
| Finsweet v1 `attributes-socialshare@1` | 1.x | head | defer | 86 articles | 3,3 Ko | **Inutilisé** : aucun attribut `fs-socialshare-*` dans le HTML (c'est Flowappz qui fait le partage) |
| Axeptio `static.axept.io/sdk.js` | — | injecté en footer | async | 105 | — | consentement cookies + Google Consent Mode |

Ordre de grandeur JS d'un article (hors GTM, GA, Axeptio, Slater) : environ 18 balises `<script src>`, à peu près 215 Ko gzip. Une page hors article en a 15 ou 16.

### 2.2 Staging (nouveau chargeur)

- Slater a disparu. Le chargeur `window.__blinked` est en head (CSS) et en footer (`main.js`), et il est bien placé **après** GSAP/ScrollTrigger dans le body.
- Le reste ne change pas : Swiper, Lenis, Finsweet v2, gtag, Axeptio, social-share et les 3 Finsweet v1 sur les articles. Il y a un seul bundle Webflow (`webflow.9980c7b8…`).
- `robots.txt` du staging : `Disallow: /`. C'est correct.

### 2.3 Attributs Finsweet `fs-*` présents

| Attribut | Où | Statut |
|---|---|---|
| `fs-list-element=list`, `fs-list-field=categories|heading` (431 / 344 occurrences) | blog (index) + 86 articles (liste « articles liés ») | Sur `/blog` : filtres + `clear` + `empty` + `fs-list-field=*` (recherche). **Sur les articles, il n'y a aucun filtre, load ou sort** : la liste est initialisée pour rien |
| `fs-list-field=leviers|secteurs`, `filters`, `clear`, `empty` | `/realisations` | utilisé |
| `fs-list-field=letter|name`, `fs-list-value=A…Z,#`, `facet-count`, `items-count`, `fs-list-load=more`, `fs-list-activeclass=active` | `/lexique` | utilisé (les spans `letter` sont créés par le JS inline de la page) |
| `fs-list-fuzzy=THRESHOLD` | `/lexique` | **Bug** : valeur d'exemple de la doc recopiée telle quelle (il faut un nombre) |
| `fs-list-element=previous-item|next-item|previous-empty|next-empty` | `/lexiques/test` | utilisé (navigation entre fiches) |
| `fs-scrolldisable-element=smart-nav` | navbar, 104 pages | **Orphelin** : la v2 ne charge que les modules déclarés sur la balise (`fs-list` seulement, sans `fs-attributes-auto`). Le module scrolldisable n'est jamais chargé, donc le scroll n'est pas bloqué quand le menu mobile est ouvert |
| `fs-toc-*`, `fs-richtext-*` | 86 articles | utilisé (scripts v1) |

---

## 3. Interactions Webflow natives (IX2)

Le bundle prod contient **13 events IX2 / 13 action lists**. Éléments porteurs de `data-w-id` :

| Page | `data-w-id` / page | Éléments |
|---|---|---|
| Articles (86) | 4 à 12 (9 le plus souvent) | `.navbar9_component` (1), `.content27_h-trigger`, `.content27_sidebar-heading`, `.content27_link-content` (sommaire, 3), `.accordion2_top` (FAQ d'article, 413 au total sur 81 articles) |
| `/services` | 9 | navbar, `.section_logo3`, 7 × `.faq6_question` |
| Services détail (3) | 8 | navbar, 7 × `.faq6_question` |
| Home | 2 | navbar, `.section_logo3` |
| Qui sommes-nous | 2 | navbar, `.section_logo3` |
| Autres (blog, lexique, contact, réalisations, légales, case studies, fiche lexique) | 1 | navbar |

Animations IX2 publiées :

| Event | Déclencheur | Cible animée | Pages |
|---|---|---|---|
| Navbar 9 menu [Open]/[Close] | NAVBAR_OPEN/CLOSE | `.menu-icon1_line-*` (burger) | toutes |
| Logo 3 [Loop] (×2) | SCROLL_INTO_VIEW | `.logo3_component` (défilement des logos, transform) | home, services, qui-sommes-nous |
| FAQ 6 accordion | clic / 2e clic | `.faq6_answer` (hauteur), `.icon-embed-xxsmall` | services + services détail |
| Content 27 accordion / table of contents | clic | `.content27_link-content`, `.content27_link-wrapper` | articles (sommaire mobile, déclenché aussi par `fs-toc-element=ix-trigger`) |
| Accordion 2 | clic | `.accordion2_bottom`, `.accordion2_icon` | articles |
| Timeline Circle [Scroll] | SCROLLING_IN_VIEW | `.timeline5_circle` | **aucune** : la classe n'existe sur aucune page (event orphelin) |

Toutes les IX restantes sont de l'UI (accordéons, burger, marquee) : aucune animation d'apparition au scroll. Les apparitions viennent toutes de GSAP (nos modules + code inline).

### Recouvrements avec nos modules / le code inline

- `.faq6_question` reçoit l'IX FAQ (clic) et figure aussi dans `cards-reveal.js` (SELECTORS). Les propriétés diffèrent (hauteur de la réponse d'un côté, opacité/y de la question de l'autre), donc pas de conflit direct. En revanche `.faq6_question` et `.confiance_logo_block` **ne sont pas** dans la liste masquée de `_cards-reveal.scss`. Le `gsap.to({opacity:1, y:0})` part donc d'un état déjà visible et ne produit **aucune animation** : il faut soit les ajouter au SCSS, soit les retirer du JS.
- `.navbar9_component` est la cible de plusieurs choses : l'IX burger ; `core.js`, qui lit sa hauteur (`NAV_SELECTOR`) pour l'offset des ancres ; le code inline de la home (`gsap.from` y -40 / opacity 0) ; la classe `nav-is-light` au scroll (inline, 6 pages) ; l'animation du dropdown (inline, 18 pages).
- `.section_logo3` / `.logo3_component` : l'IX marquee (transform sur `.logo3_component`) et l'intro inline de la home (`from` sur `.section_logo3`, `.logo3_item`) touchent des éléments différents. Pas de conflit, mais trois sources d'animation dans la même section.
- `[data-collapse]` (`src/components/collapse.js`) **capte la navbar Webflow** (`.w-nav[data-collapse="medium"]`, attribut natif du composant Navbar) sur 104 pages. Le module ne fait rien (pas de trigger/content), mais le nom entre en collision avec Webflow : à renommer (ex. `data-accordion`) avant de s'en servir.

---

## 4. Attributs `data-*` custom (hors Webflow natif)

| Attribut | Élément | Pages | Code qui l'utilise |
|---|---|---|---|
| `data-magnetic` | `a.cta_circular_button` (composant CTA circulaire, variantes `static`/`absolute`) | 105 pages, 1 par page (2 sur la home) | `src/components/magnetic.js` |
| `data-parallax` | `.logo3_component` + 3 × `.services_card` | home, `/services` (8 éléments) | **aucun** (ni `src/`, ni inline, ni Slater) : attribut orphelin |
| `flowappz-socialshare-element`, `flowappz-socialshare-settings` | boutons de partage | 86 articles | Flowappz social-share |
| `data-collapse="medium"` | navbar | 104 | natif Webflow (voir collision ci-dessus) |
| `data-rt-type`, `data-rt-align`, `data-rt-max-width`, `data-rt-embed-type` | figures du rich text | 3 articles | natif Webflow |
| `data-turnstile-sitekey`, `data-wait` | formulaires | blog, lexique, contact, réalisations | natif Webflow (Cloudflare Turnstile) |
| `data-wf--cta-circular--variant` | CTA | partout | variantes de composant Webflow |

Aucun attribut `data-xxx` « maison » de la nouvelle convention (`data-collapse-trigger`, etc.) n'est encore posé dans Webflow. Seul `data-magnetic` existe.

---

## 5. Classes ciblées par nos modules → pages où elles apparaissent

| Module | Sélecteur | Pages où l'élément existe (prod) |
|---|---|---|
| `core/core.js` | `.navbar9_component` (offset ancres), `a[href*='#']` | 104 pages (toutes sauf 404) |
| `content/svg-inline.js` | `img.icon-svg` | 318 images sur 104 pages (≈3 par article). Une requête `fetch` par SVG |
| `components/collapse.js` | `[data-collapse]` | seulement la navbar Webflow (faux positif), aucune vraie cible |
| `components/sliders.js` | `.swiper.is-cs` + `.swiper_arrow.is-cs` | **home** uniquement |
| | `.swiper.is-equipe` | **qui-sommes-nous** uniquement |
| `components/magnetic.js` | `[data-magnetic]` | toutes |
| `animations/cards-reveal.js` | `.services_card` | home, services |
| | `.chiffre-cle_block_bloc` | home, services, qui-sommes-nous |
| | `.case-studies_block` | home, réalisations |
| | `.temoignages_block` | home |
| | `.blog34_item-link` | home |
| | `.groupe_grid_block` | home, qui-sommes-nous |
| | `.confiance_logo_block` | services, réalisations, qui-sommes-nous, 3 services détail (non masqué en SCSS, voir §3) |
| | `.faq6_question` | services, 3 services détail (non masqué en SCSS) |
| | `.processus_layout_card` | qui-sommes-nous |
| `animations/image-reveal.js` | `.image-mask` > `.image-reveal` | **home** uniquement (2) |
| `animations/footer-logo.js` | `.footer13_component`, `.footer_logo_img` | toutes (105) |
| `sections/testimonials-sticky.js` | `.section_avis`, `.is-avis-title-sticky` | **home** uniquement |

Bilan par page :

- La **home** utilise tous les modules.
- **Qui-sommes-nous** et **services** en utilisent une bonne partie.
- Les **86 articles**, les case studies, le blog, le lexique, le contact et les légales n'utilisent que core, svg-inline, magnetic et footer-logo.

---

## 6. SEO technique

| Point | Constat |
|---|---|
| `<title>` | **Vide sur les 4 case studies** (`<title></title>`, og:title et twitter:title vides aussi). Doublon : `/blog/google-ads-prix-guide-complet` et `/blog/tarifs-google-ads-cpc-secteurs` ont le même titre « Prix Google Ads 2026 \| Guide budget et CPC par secteur ». Titres trop longs : `/services` (75 car.), `/contact` (71), `/blog/les-cas-dor-…` (97). Titres faibles : « CGV », « test » (`/lexiques/test`) |
| Meta description | **Vide sur 14 pages** : 4 case studies, 3 légales, 5 articles (`inbound-marketing-et-outbound…`, `les-cas-dor…`, `loutbound-marketing…`, `maitriser-google-analytics-4…`, `theatre-du-chatelet-x-blinked`), `/lexiques/test`, la 404 |
| Canonical | Présent partout (1 par page, auto-référent). La 404 servie pour `/old-home` a un canonical `/404` |
| hreflang | Absent partout (pas de version EN publiée) |
| `<html lang>` | `fr` partout |
| meta robots | aucune (pas de noindex, même sur `/lexiques/test`) |
| JSON-LD (1 bloc par page) | Home `Organization` (avec `AggregateRating` 4.9 / **reviewCount 1**, risque de pénalité « auto-évaluation »). Blog et réalisations `CollectionPage`. Contact `ContactPage`. Qui-sommes-nous `AboutPage`. Services, lexique, fiche lexique et 2 services détail `WebPage`. Case studies `Article`. Articles `BlogPosting`. Légales et 404 : rien. **`/services/sea-google-ads` : JSON-LD invalide** (retour à la ligne brut dans `description`, venu d'un champ CMS multi-ligne, donc JSON non parsable). Aucun `BreadcrumbList` ; pas de `FAQPage` malgré les FAQ (accordion2 sur 81 articles, faq6 sur les services) |
| og:image | Présent sur la home, les 86 articles et 2 case studies (gomoworld, k-way). **Absent sur 16 pages** : blog, lexique, contact, services, réalisations, qui-sommes-nous, légales, 3 services détail, lazartigue, théâtre du Châtelet, fiche lexique |
| h1 | 1 h1 sur chaque page (aucun doublon) ; 0 sur la 404 |
| Images sans alt | Aucun `alt` absent, mais **beaucoup de `alt=""`** : 1 317 sur 1 789 `<img>` (à peu près 74 %). Une partie est décorative (icônes `icon-svg` 318, `footer_img`), mais il y a aussi des images de contenu : vignettes `blog-list_image` (344), `img-profil` auteurs (172), logos clients `confiance_image` (54) et `logo3_logo`, `case-studies_img`, logo footer `footer_logo_img` (105), 20 images de rich text sans classe |
| robots.txt (prod) | Une seule ligne `Sitemap: https://www.blinked.fr/sitemap.xml`, sans `User-agent`. Toléré mais non standard. `/llms.txt` : 404 |
| sitemap.xml | 105 URL, sans hreflang. Contient `/old-home` (301 → `/home` → **404**) et `/lexiques/test` (contenu de test) |
| Liens internes cassés | voir §8 |

---

## 7. Poids et performance (indicatif)

- **HTML** : home 238 Ko, blog 179 Ko, services détail ≈163 Ko, qui-sommes-nous 153 Ko, articles ≈81 Ko en moyenne. Le gros du poids vient du CSS inline (≈650 lignes répétées sur 18 pages, cf. inventaire inline) et des SVG inline.
- **Scripts** : 15 à 18 `<script src>` par page plus 8 à 13 scripts inline, sans compter Slater (prod), GTM, GA et Axeptio. Dans le head, **3 scripts bloquants** : WebFont, Swiper (155 Ko brut) et Lenis. Swiper et Lenis servent sur 2 pages et 0 page.
- **CSS Webflow** `blinkedxmekaa.webflow.shared.3ce57b4e9.min.css` : 154 Ko brut / 27,7 Ko gzip, environ 890 classes, dont **≈245 classes jamais utilisées** dans les pages publiées (styleguide Finsweet `fs-styleguide_*`, `blk-*` agence, `form_*`, classes utilitaires…). S'y ajoutent `swiper-bundle.min.css` (3 Ko gz) et `lenis.min.css` sur toutes les pages.
- **Images** (194 URL uniques en `src`, 11 Mo cumulés à l'original ; Webflow sert des variantes `srcset` plus légères sur une partie d'entre elles) :
  - `…Capture d'écran 2026-04-29….png` : **1,0 Mo** sur `/realisations`
  - icône Snapchat PNG : **891 Ko**, affichée en **31 px de large**, sur 5 pages dont la home
  - `gomoworld-1….png` : **820 Ko** (og:image et visuel de `/case-studie/gomoworld`)
  - GIF `Gif-presentez-vous.gif` : 334 Ko (article `loutbound-marketing…`)
  - PNG de 240 à 300 Ko : `Image-01_1x.png` (contact), `Image-02_2x.png` (home), `Header_2x.png` (k-way)
  - formats : 88 webp, 26 avif, 42 png, 11 jpg, 26 svg, 1 gif. Lazy-loading : 1 771 `loading="lazy"`, 2 `eager`.
- **Polices** : Golos Text via le WebFont loader (script bloquant + CSS Google Fonts), 5 graisses (300/400/500/600/700). Le CSS utilise aussi `font-weight: 800`, qui n'est pas chargé (gras synthétique), et une valeur invalide `font-weight: medium` (3 fois). Pistes : charger les polices en `<link>` avec `display=swap`, ou les héberger sur Webflow, et retirer le 300 s'il est rare.

---

## 8. Observations et risques

### Bugs / SEO à corriger en priorité

1. **Case studies sans title ni description** (4 pages, og/twitter vides aussi) : les champs SEO du template CMS ne sont pas liés.
2. **Liens internes cassés** dans le rich text des articles :
   - `/expertises/sea-googleads-microsoft-advertising` → 301 → `/services/sea` → **404** (27 articles) ;
   - `/expertises/rtb-real-time-bidding` → 301 → `/services/programmatique-display` → **404** (2 articles) ;
   - `/passer-mode-expert-google-ads` → **404** (4 articles ; il manque `/blog/`) ;
   - `/publicite-immobilier-performance` et `/agence-publicite-mode-performance` → **404** (1 article chacun ; il manque `/blog/`).
   Ces liens partent d'anciennes URL (`/blog/outils/…`, `/non-classe/…`, `/expertises/seo-…`, `/case-study-kway`, `/faq`, `/le-dico-des-acronymes`). Au total, 157 liens pointent vers d'anciennes URL : 35 aboutissent à une 404, les 122 autres redirigent, souvent vers un index générique (`/blog`, `/services`, `/contact`). Tous sont à réécrire vers la bonne cible.
3. **`/old-home` dans le sitemap**, qui finit en 404 ; **`/lexiques/test`** indexable et seule fiche du lexique.
4. **JSON-LD invalide** sur `/services/sea-google-ads` (saut de ligne dans la description).
5. **Consentement** : `gtag('config','G-3HKFGT9CSQ')` part dans le head **avant** qu'Axeptio (injecté en footer) n'ait posé le Consent Mode par défaut `denied`. Le premier hit GA4 part donc sans état de consentement. GA4 est en plus chargé deux fois potentiellement (gtag direct + Google tag GTM-K46GTXWN de Webflow) : vérifier dans GTM qu'aucune balise GA4 ne double, puis passer GA par GTM uniquement.
6. `fs-list-fuzzy="THRESHOLD"` sur le lexique (valeur invalide).

### Chargé mais inutilisé (gain direct)

- **Lenis** JS + CSS (105 pages, bloquant) : `SMOOTH_SCROLL_ENABLED = false`.
- **InertiaPlugin + SplitText** (105 pages) : seulement enregistrés.
- **Finsweet v1 socialshare** (86 articles) : aucun attribut.
- **Swiper** JS + CSS bloquants sur 105 pages pour 2 pages utiles : le charger en `defer`, ou seulement sur la home et qui-sommes-nous.
- **Flowappz social-share** sur 19 pages sans boutons de partage.
- **Finsweet v2 en double** sur `/blog`, `/lexique`, `/lexiques/test` (code de page plus code de site ; le navigateur ne l'exécute qu'une fois, mais c'est du bruit).
- `fs-list` initialisé sur les 86 articles sans filtre ; `fs-scrolldisable-element` orphelin (module non chargé) ; `data-parallax` orphelin ; IX `timeline5_circle` orpheline ; ≈245 classes CSS mortes.

### Cohérence de nos modules

- `cards-reveal` : `.confiance_logo_block` et `.faq6_question` sont dans le JS mais pas dans le SCSS, donc aucune animation visible. Il faut synchroniser les deux listes.
- `collapse.js` : collision de nom avec l'attribut natif `data-collapse` de la navbar Webflow.
- `svg-inline` : 318 `fetch` de SVG sur 104 pages (≈3 par article). C'est acceptable, mais à mettre en cache si le nombre d'icônes augmente.
- Versions flottantes : `swiper@12`, `@finsweet/attributes@2`, `attributes-*@1`. Une mise à jour en amont peut casser le site sans déploiement de notre part ; il faut épingler les versions exactes (ex. `swiper@12.2.0`, `@finsweet/attributes@2.7.1`).
- La balise Lenis a un `src` et un `href` avec des retours à la ligne autour de l'URL. Le navigateur les tolère, mais c'est à nettoyer (le problème disparaît si Lenis est retiré).

### Code inline à migrer en priorité (complément à l'inventaire)

1. **Révélation des h1/h2** (`gsap.from` opacity 0, durée 2 s, 18 pages hors articles). Elle retarde l'affichage du h1, donc le LCP. Elle n'a pas de `prefers-reduced-motion` et n'existe pas sur les 86 articles (incohérent). → `src/animations/titles-reveal.js`, avec un état initial en SCSS comme cards-reveal.
2. **Navbar** : trois blocs inline (dropdown GSAP sur 18 pages, chevron du lien actif sur 18 pages, `nav-is-light` au scroll sur 6 pages, ce dernier sans test `null` ni listener passif). Les articles n'en ont aucun, donc le comportement diffère d'un template à l'autre. → un seul `src/components/navbar.js` chargé partout, qui peut aussi remplacer `fs-scrolldisable`.
3. **Intro de la home** (timeline GSAP sur navbar, section logos, logos) : sans reduced-motion. Elle croise l'IX marquee et la navbar. → `src/animations/home-intro.js`.
4. **`gsap.registerPlugin(ScrollTrigger,InertiaPlugin,SplitText)`** sur toutes les pages : à supprimer, ScrollTrigger est déjà enregistré par nos modules.
5. **Lettres du lexique** (crée les spans `fs-list-field="letter"` au DOMContentLoaded). Risque de course avec Finsweet v2, qui démarre en module async. → `src/content/lexique-letters.js`, puis `window.FinsweetAttributes.load('list')` / `restart` une fois les spans posés.
6. **GA gtag + Axeptio** (site settings) : passer par GTM, avec le Consent Mode par défaut posé avant toute balise.
7. Le **CSS inline** (≈650 lignes sur 18 pages, plus les blocs blog et lexique) → partiels SCSS.

### Différences prod / staging à garder en tête

- La prod charge encore Slater (8 modules + CSS) **en plus** des mêmes librairies. Après publication du staging, les doublons Slater/`main.js` disparaissent.
- Le bundle Webflow du staging (`webflow.9980c7b8…`) diffère de celui de la prod : les IX ou réglages du staging ne sont pas encore publiés.
