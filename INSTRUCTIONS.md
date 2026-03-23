# INSTRUCTIONS

## Role de travail

Ce projet est pilote comme un groupe de travail compact :

- CTO / orchestrateur : priorisation, coherence technique et produit
- Developpeur senior : HTML, CSS, JS, accessibilite, robustesse
- Integrateur contenu : photos, carte, horaires, informations utiles
- Auditeur SEO / qualite : audit, verification et documentation de sortie

## Etat reel du projet au 23/03/2026

Le site est une base statique propre, sans framework, composee de :

- `index.html`
- `mentions-legales.html`
- `404.html`
- `assets/css/styles.css`
- `assets/js/main.js`
- `assets/images/*`
- `robots.txt`
- `sitemap.xml`
- `manifest.json`
- `llms.txt`
- `seomator.toml`

## Ce qui est en place

### Front

- hero avec vraie photo locale
- navigation desktop + menu mobile
- sections : `Accueil`, `Le restaurant`, `La carte`, `Galerie`, `Reservation`, `Contact`
- page `mentions-legales.html`
- page `404.html`

### Contenu / photos

- integration des photos locales du restaurant
- carte structuree en blocs lisibles
- horaires et informations pratiques visibles
- lien Instagram officiel integre

### JS

- animation `reveal` corrigee sur navigation par ancres
- `IntersectionObserver` regle sur `threshold: 0.05`
- gestion menu mobile
- reservation avec envoi Formspree et retour visuel utilisateur

### SEO / technique

- `canonical`
- Open Graph + Twitter Card
- JSON-LD sur la home et sur la page mentions legales
- `robots.txt`
- `sitemap.xml`
- favicons + manifest
- `llms.txt`

## Regles a respecter sur les prochaines sessions

### Donnees metier

- Ne pas inventer d'informations business.
- Toute modification de :
  - adresse
  - telephone
  - email
  - horaires
  - lien Instagram
  doit etre verifiee avant publication.

### HTML

- Garder le HTML semantique, lisible et sobre.
- Eviter d'ajouter des sections purement decoratives.
- Avant de toucher `index.html`, lire le fichier entier.

### CSS

- Conserver la palette deja posee autour du bleu baie, du rose signature et du sable.
- Garder un bon contraste dans les sections sombres, surtout `#carte`.
- Toute nouvelle zone image doit avoir un fallback de fond.

### JavaScript

- Garder un JS leger et progressif.
- Toute animation doit rester acceptable si l'observer ou le scroll echoue.
- Ne pas reintroduire de `alert()` dans le formulaire.

### SEO / audit

- Auditer la version locale avant cloture de session si des changements structurels sont faits.
- Ne pas conclure a un vrai probleme de prod quand l'outil remonte un faux negatif local lie a :
  - `127.0.0.1`
  - HTTP au lieu de HTTPS
  - comportement du serveur de test

## Risques connus

### Risques metier

1. L'email officiel n'est pas encore renseigne dans `mentions-legales.html`.
2. L'adresse reste a confirmer par une source metier definitive, meme si le numero a ete revalide via le compte Instagram officiel.

### Risques techniques

1. Le site cible GitHub Pages sous `https://lapetitfolie.github.io/restaurant/`.
2. L'audit local remonte encore des ecarts attendus sur :
   - canonical HTTPS audite depuis un serveur HTTP
   - URLs `localhost`
   - headers de securite serveur
   - doublon `/` et `/index.html`

## Protocole de session

1. Relire `README.md`, `INSTRUCTIONS.md` et `LIGNE_DIRECTRICE.md`.
2. Verifier l'etat du depot avant modification.
3. Lire `index.html` en entier avant un lot important.
4. Si des edits touchent SEO, navigation, reservation ou structure, rerun un audit.
5. En fin de session, mettre a jour les fichiers `.md` si l'etat reel du projet a change.

## Mini-audit de sortie

### Session du 23/03/2026

- Verification externe effectuee sur le compte Instagram `@lapetitefolie29`.
- Numero mis a jour en `02 98 29 11 84` sur le site et dans le schema.
- Menu mobile corrige sans `onclick`, avec fermeture `Escape`, overlay et boucle de focus.
- Styles inline residuels remplaces par des classes utilitaires.
- Message horaire relatif retire au profit d'une formulation durable.
- Rendu global du site renforce avec une direction visuelle plus aboutie et plus coherente.
- Audit live GitHub Pages relance.
- Mise a jour du sitemap et ajout d'une page `politique-confidentialite.html`.
- Footer et mentions legales renforces pour mieux encadrer le formulaire.
- Optimisation de rendu ajoutee sur les sections lourdes avec `content-visibility`.
- Bloc des formules du midi retravaille pour supprimer la fausse affordance de bouton et adopter une lecture de type ardoise.
- Hero allegée pour clarifier la premiere vue : message raccourci, CTA principal recentre sur la reservation et densite visuelle reduite.
- Les longues sections sont maintenant repliees sur mobile via des accordéons natifs injectes au chargement, sans modifier le rendu desktop.
- Le systeme d'accordeons mobile a ete re-travaille pour supprimer les vides de layout, unifier les cartes et remplacer le comportement natif saccade par une animation JS/CSS plus stable.
- Les contenus internes de `La carte` et des informations pratiques doivent rester lisibles sur mobile en fond clair : pas de texte blanc herite des sections desktop, pas de sous-cartes sombres residuelles.
- Sur mobile, les medias ouverts dans un accordéon doivent arriver avec un chargement doux : placeholder discret, fondu court, et aucune apparition brutale d'image ou d'iframe.
- Le plan d'acces mobile doit rester leger : activation explicite de la carte interactive, jamais de gros bloc Google Maps charge d'emblee dans le flux.
- Les medias HTML principaux doivent servir un format moderne quand possible : `<picture>` avec `webp` en source et JPG en fallback, sans casser les dimensions ni le rendu.

Rapport de reference :

- `C:\Users\auror\Documents\La Petit Folie\site-audit-tool\reports\la-petite-folie-seomator-final-github-pages-like-2026-03-22.llm`

Resultat :

- score `95/100`
- note `A`

Reste a traiter plus tard si besoin :

- verifier l'adresse definitive par source proprietaire ou fiche Google officielle
- renseigner l'email officiel
- enrichir la page de confidentialite si le formulaire gagne en complexite ou en outils tiers
