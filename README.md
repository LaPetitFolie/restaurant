# La Petite Folie

Base statique du site vitrine `La Petite Folie`, refaite a partir des contenus et photos locales du projet.

## Etat actuel

Le site couvre aujourd'hui :

- accueil / hero
- presentation du restaurant
- carte de saison
- galerie photo
- formulaire de reservation via Formspree
- informations pratiques
- mentions legales
- PWA minimale (`manifest.json`, favicons)
- bases SEO (`canonical`, Open Graph, Twitter, JSON-LD, `robots.txt`, `sitemap.xml`, `llms.txt`)

## Arborescence utile

- `index.html` : page principale
- `mentions-legales.html` : page legale
- `404.html` : page d'erreur dediee
- `assets/css/styles.css` : styles globaux
- `assets/js/main.js` : interactions, menu mobile, reveals, reservation Formspree
- `assets/images/` : photos locales du restaurant
- `robots.txt` : directives crawl
- `sitemap.xml` : URLs publiees
- `manifest.json` : manifeste web app
- `llms.txt` : resume AI-friendly du site
- `seomator.toml` : config locale d'audit SEO

## Lancer en local

Le site est statique. Une ouverture directe de `index.html` fonctionne pour la lecture simple, mais pour un audit il faut servir le dossier en HTTP.

Exemple avec le serveur d'audit local deja present dans le workspace :

```powershell
node "C:\Users\auror\Documents\La Petit Folie\site-audit-tool\serve-static.js" "C:\Users\auror\Documents\La Petit Folie\la-petite-folie-site" 4173
```

Puis ouvrir :

```text
http://127.0.0.1:4173
```

## Audit de reference

Audit final relance le `22/03/2026` avec `seomator`.

- score global : `95/100`
- note : `A`
- pages analysees : `3`
- rapport principal :
  `C:\Users\auror\Documents\La Petit Folie\site-audit-tool\reports\la-petite-folie-seomator-final-github-pages-like-2026-03-22.llm`

Les points encore remontes sont surtout lies au contexte local :

- audit en `http://127.0.0.1`, alors que le site cible `https://lapetitfolie.github.io/restaurant/`
- URLs `localhost` detectees car le crawl est fait sur le serveur local
- securite serveur et headers HTTP non representatifs d'un hebergement final
- doublon `/` et `/index.html` typique d'un site statique servi localement

Les points metier encore a verifier avant mise en production :

- coherences exactes adresse / telephone
- email officiel a renseigner dans les mentions legales
- besoin ou non d'une page confidentialite

## Notes produit

- Les vraies photos integrees proviennent du dossier local du projet.
- Le dossier `assets/images/image ajouter/` demande pendant l'audit initial n'a pas fourni d'images exploitables dans le repo de reference; la base actuelle utilise donc les photos locales deja integrees dans `assets/images/`.
- Le formulaire de reservation envoie vers `https://formspree.io/f/xovdpwla`.
- URL publique cible GitHub Pages : `https://lapetitfolie.github.io/restaurant/`
