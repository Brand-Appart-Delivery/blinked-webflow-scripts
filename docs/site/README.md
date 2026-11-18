# Site Blinked — vue d'ensemble

Audit complet du 2026-11-17 (lecture seule : MCP Webflow + crawl des 105 URL du sitemap).
Détails dans les trois rapports :

| Rapport | Contenu |
|---|---|
| [cms.md](cms.md) | 16 collections, champs, relations (erDiagram), items exemples, collections mortes |
| [webflow-structure.md](webflow-structure.md) | Pages, sections, 17 composants, styles et variables, interactions, formulaires, **custom code par page (copie exacte)** |
| [front.md](front.md) | Types d'URL, librairies, interactions publiées, modules JS par page, SEO technique, poids |

## Identité

- Webflow site `Blinked` — id `6979ce915767387cd0f9aa37`, workspace `6480c924ffabaf57cdbc86c4`
- Prod : `www.blinked.fr` (dernière publication 2026-09-09) · staging : `blinkedxmekaa.webflow.io`
- Une seule langue (FR), localisation désactivée. Site construit par l'agence Mekaa.
- Scripts custom : ce repo → jsDelivr (chargeur dans Site settings, voir `webflow/`). Slater retiré.

## Architecture en bref

```
Pages statiques (13)          Templates CMS publiés (6)            Données seules (10 collections 🔒)
Home · Services · Qui sommes- Blog Posts (95 items, 86 URL)        FAQs (498) · Expertises (19)
nous · Réalisations · Blog ·  Services (3 : SEA, SMA, Programm.)   Plateformes (14) · Catégories (13)
Lexique · Contact · Legal ×3  Réalisations /case-studie/ (1 publié) Témoignages · Auteurs · Equipes
· 404 · /old-home (!)         Lexiques /lexiques/ (1 item « test »)  Leviers · Secteurs réalisations
                              Secteurs · Agences locales (0 item)
```

- **Services** est la collection pivot (référencée par Réalisations, Secteurs, Agences).
- **Blog** = 82 % des URL ; articles → Catégorie, Auteur, FAQs (multi-réf).
- **Composants clés** : Navbar (Relume navbar9), Footer / Footer + CTA (refondu le 2026-11-17),
  FAQ (porte l'ancre `#faq`), CTA Circular (`data-magnetic`), Button arrow (`button_7`).
- **Styles** : Client-First + composants Relume (`navbar9_`, `faq6_`, `blog34_`, `footer13_`…),
  944 styles dont 174 vides ; variables Typography / Screen mode jamais utilisées.
- **Animations** : quasi tout en GSAP custom (Webflow natif seulement pour burger, logos défilants,
  accordéons). GSAP 3.15 + ScrollTrigger via l'intégration Webflow.

## Ce que fait notre JS (src/) et où

| Module | Cible | Pages concernées |
|---|---|---|
| core (ancres, Lenis désactivé) | toute page | toutes |
| content/svg-inline | `img.icon-svg` | home, services, articles |
| components/sliders | `.swiper.is-equipe`, `.swiper.is-cs` | qui-sommes-nous, home |
| components/magnetic | `[data-magnetic]` | toutes (CTA) |
| animations/cards-reveal | cartes services, chiffres, case studies… | home, services, réalisations, blog |
| animations/image-reveal | `.image-mask .image-reveal` | home |
| animations/footer-logo | `.footer_logo_img` | toutes |
| sections/testimonials-sticky | `.section_avis` | home |

## Reste à migrer (code inline Webflow → repo)

Copie exacte dans `webflow-structure.md` §7 et `backups/webflow-inline-code-2026-11-17.md`. Priorités :

1. **Navbar** — 3 scripts dupliqués (page active, dropdown GSAP, fond au scroll sur 6 pages) +
   CSS au commentaire cassé (`* --- 1.`) : un seul module `components/navbar.js`. Piège : la
   `transition: all !important` sur `.navbar9_component` entre en conflit avec l'intro GSAP.
2. **Apparition h1/h2** — opacité 0 pendant 2 s → retarde le LCP ; absente des articles.
3. **Intro home** (nav + logos) — `.logo3_item` n'existe pas comme style, la cible est vide.
4. **Lexique** — lettres Finsweet (regex qui range les accents sous « # »), course avec fs-list.
5. **CSS global** — taille de police fluide, font-smoothing (seulement sur 18 pages), boutons
   `button_7`, couleurs témoignages, blog, select → partiels SCSS.
6. Supprimer `gsap.registerPlugin(ScrollTrigger, InertiaPlugin, SplitText)` inline (fait par core).

## Problèmes repérés (hors code)

- **SEO** : 4 case studies sans title ni description ; 14 pages sans meta description ; JSON-LD
  invalide sur `/services/sea-google-ads` ; `AggregateRating` avec 1 avis sur la home ;
  `/old-home` dans le sitemap (→ 301 → `/home` en 404) ; `/lexiques/test` publié.
- **Liens** : 157 liens d'articles vers d'anciennes URL, dont 35 en 404
  (`/expertises/sea-googleads-microsoft-advertising` sur 27 articles).
- **CMS** : Secteurs et Agences locales vides avec templates publiés ; Equipes = 7 fiches
  « Prénom nom » publiées ; Réalisations K-Way / Châtelet / Gomoworld repassées en brouillon.
- **Chargé pour rien** : Lenis (bloquant), Swiper sur 105 pages pour 2, InertiaPlugin, SplitText,
  Finsweet v1 socialshare ; `fs-scrolldisable-element` orphelin.
- **Consentement** : GA4 part dans le head avant qu'Axeptio pose le consentement par défaut ;
  possible double comptage avec le tag GTM de Webflow.
- **Poids** : icône Snapchat PNG de 891 Ko affichée en 31 px, captures de ~1 Mo ; graisse 800
  utilisée mais non chargée.
- **Formulaire contact** : champs Nom et Prénom en double.
