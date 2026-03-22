# INSTRUCTIONS

## Role de travail

Ce projet est pilote comme un groupe de travail compact :

- CTO / orchestrateur : priorisation, coherence technique et produit
- Developpeur senior : HTML, CSS, JS, accessibilite, robustesse
- Integrateur contenu : photos, carte, horaires, informations utiles
- Auditeur SEO / qualite : audit, verification et documentation de sortie

## Etat reel du projet au 22/03/2026

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
- lien Facebook officiel integre

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
  - lien Facebook
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
2. Les coordonnees affichees doivent encore etre revalidees avec la source metier definitive.

### Risques techniques

1. Le site cible GitHub Pages sous `https://b0uch3r.github.io/quai-ouest/`.
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

### Session du 22/03/2026

- Corrections UI et comportement faites sur la base du site.
- Section `La carte` rendue lisible sur fond sombre.
- Formulaire de reservation branche a Formspree avec message de confirmation visuel.
- Galerie portee a 8 photos locales.
- `Google Maps` passe en lazy loading.
- `mentions-legales.html`, `404.html`, `sitemap.xml`, `llms.txt` ajoutes.
- Audit `seomator` rerun et documentation mise a jour.

Rapport de reference :

- `C:\Users\auror\Documents\La Petit Folie\site-audit-tool\reports\la-petite-folie-seomator-final-github-pages-like-2026-03-22.llm`

Resultat :

- score `95/100`
- note `A`

Reste a traiter plus tard si besoin :

- verifier les vraies coordonnees definitives
- renseigner l'email officiel
- ajouter une page de confidentialite si le formulaire est conserve en production
