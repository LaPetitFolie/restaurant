# INSTRUCTIONS

## Role de travail

Ce projet est pilote comme un trio de travail :

- Architecte Systemes : structure du projet, lisibilite, documentation, hygiene des fichiers
- Developpeur Senior / Auditeur : qualite du HTML/CSS/JS, accessibilite, performance, robustesse
- Stratege Produit : coherence du message, priorisation, utilite metier, prevention du hors-sujet

## Etat du projet au 22/03/2026

Le site est aujourd'hui un site vitrine statique :

- `index.html`
- `assets/css/styles.css`
- `assets/js/main.js`
- ressources statiques et PWA minimales (`manifest.json`, favicons, `robots.txt`)

Points positifs constates :

- base simple, rapide a comprendre et facile a deployer
- direction visuelle deja marquee et exploitable
- sections coeur deja presentes : hero, restaurant, carte, contact
- images locales, peu de dependances, JS leger
- premiers elements SEO deja ajoutes

## Audit Technique Initial

### Priorite 1

1. Compatibilite de deploiement GitHub Pages fragile.
   Le projet cible un depot GitHub nomme `restaurant`. Si le site est publie en GitHub Pages de type "project site", les URL absolues en racine casseront les assets et metadonnees.
   Concerne notamment :
   - `index.html` : canonical en `/`
   - `index.html` : `og:image`, `twitter:image`, favicon, manifest en `/...`
   - `manifest.json` : `start_url` et icones en `/...`
   Regle : ne plus utiliser de chemins racine absolus tant que le mode de deploiement final n'est pas confirme.

2. Donnees metier a verifier avant toute mise en production.
   Le numero `02 38 53 39 87` est repete dans la page et le schema `Restaurant`, alors que l'adresse affichee est `29250 Saint-Pol-de-Leon`.
   Ce n'est pas un bug de code pur, mais un risque produit/SEO fort : si la fiche contact est fausse, le site devient moins credible et peut generer des appels errones.
   Regle : aucune donnee business sensible ne doit etre dupliquee sans source verifiee.

### Priorite 2

1. Accessibilite et comportement du menu mobile incomplets.
   Le menu mobile repose sur des `onclick` inline et n'implemente pas les usages clavier attendus comme `Escape`, gestion du focus, ou fermeture plus robuste.

2. Contenu temporel fragile.
   La mention `A partir d'avril` deviendra vite ambigue ou obsolete. Toute phrase dependante du calendrier doit etre datee ou reliee a une source editable.

3. SEO incomplet.
   Le canonical est placeholder, le type Open Graph est discutable, et aucune strategie de sitemap/URL finale n'est encore fixee.

### Priorite 3

1. CSS avec dette de structure.
   Des blocs CSS existent pour `#galerie` et `#horaires` alors que ces sections ne sont pas presentes comme telles dans le HTML actuel.

2. Styles inline dans le HTML.
   Plusieurs `style="margin-top: ..."` sont presents. Ils doivent etre remplaces par des classes de presentation.

3. Documentation encore tres legere.
   Le depot ne documente pas encore la verite produit, les sources des contenus, ni la methode de mise a jour.

## Regles Techniques a Respecter

### Structure

- Garder une architecture simple de site statique tant qu'un besoin clair ne justifie pas un framework.
- Eviter toute duplication de contenu metier si une seule source peut suffire.
- Centraliser a terme les donnees variables du restaurant :
  - telephone
  - adresse
  - horaires
  - liens sociaux
  - textes SEO courts

### HTML

- Conserver un HTML semantique et lisible.
- Eviter les handlers inline comme `onclick`.
- Toute nouvelle section doit repondre a un objectif utilisateur clair.
- Ne jamais ajouter une section purement decorative sans utilite metier ou SEO.

### CSS

- Utiliser les variables de `:root` comme systeme de design.
- Preferer des classes reutilisables plutot que des styles inline.
- Supprimer les regles mortes quand une direction est abandonnee.
- Verifier mobile avant de considerer un travail termine.

### JavaScript

- Garder le JS minimal, progressif et sans dependance inutile.
- Priorite aux comportements utiles : navigation, accessibilite, interactions simples.
- Toute interaction doit rester acceptable sans animation.

### SEO / Decouverte

- Toujours definir les URL selon le mode de deploiement reel.
- Tant que le site peut vivre sous un sous-chemin, utiliser des chemins relatifs ou une strategie de base claire.
- Ne jamais publier de canonical, image sociale, ou manifeste non coherents avec l'URL finale.
- Les donnees structurees doivent rester strictement alignees sur les informations reelles du restaurant.

### Accessibilite

- Respecter clavier, focus visible, ordre logique, textes alternatifs, contrastes.
- Les composants ouvrables/fermables doivent etre utilisables sans souris.

## Methode de Resolution des Problemes

Quand une solution ne fonctionne pas :

1. Admettre l'echec explicitement et nommer le symptome reel.
2. Isoler si le probleme vient de :
   - la technique
   - les donnees metier
   - une mauvaise hypothese de deploiement
   - une mauvaise priorisation produit
3. Corriger la trajectoire avec la modification minimale qui retablit la coherence.
4. Mettre a jour ce fichier si la regle de travail change.

## Protocole de Session

A chaque session :

1. Relire `INSTRUCTIONS.md` et `LIGNE_DIRECTRICE.md`.
2. Verifier l'etat courant du depot avant toute modification.
3. Prioriser les corrections qui augmentent la fiabilite metier avant les embellissements.
4. A la fin de l'echange, produire un mini-audit de sortie et mettre a jour ces fichiers si necessaire.

## Mini-Audit de Sortie

### Session du 22/03/2026

- Audit initial formalise.
- Depot Git initialise localement et connecte a la remote GitHub, mais push bloque par droits GitHub.
- Risque principal identifie : incompatibilite probable avec un deploiement GitHub Pages sous sous-chemin.
- Risque metier majeur identifie : coherence du numero de telephone a verifier.
- Dette immediate a traiter lors d'une prochaine session :
  - corriger la strategie d'URL pour le deploiement
  - verifier les coordonnees officielles
  - nettoyer les handlers inline et les styles inline
