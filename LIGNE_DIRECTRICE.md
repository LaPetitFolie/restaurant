# LIGNE DIRECTRICE

## Vision

Faire de `La Petite Folie` un site vitrine direct, vivant et credible, avec un ton urbain et franc.

En moins de 30 secondes, un visiteur doit pouvoir :

- comprendre l'esprit du lieu
- voir une carte claire
- verifier les horaires
- appeler ou reserver
- retrouver l'adresse et l'Instagram officiel

## Ligne editoriale

Le ton doit rester :

- simple
- concret
- lisible
- humain
- sans discours abstrait

Phrase repere :

`Cuisine maison, produits frais, un grain de folie au coeur de la ville.`

## Experience attendue

La navigation doit rester aerienne et structuree :

- `Accueil`
- `Le restaurant`
- `La carte`
- `Contact`

La page peut contenir d'autres blocs utiles tant qu'ils servent cette lecture, comme :

- galerie
- reservation
- mentions legales

## Principes produit

1. Le geste culinaire et le lieu passent avant les effets.
2. Les informations pratiques comptent plus qu'une couche visuelle supplementaire.
3. Les photos reelles du restaurant sont prioritaires sur tout visuel generique.
4. Chaque section doit aider un visiteur a agir vite.
5. La clarte de la carte est un enjeu produit, pas un detail de design.

## Principes techniques

1. Garder une base statique simple tant qu'un CMS ou un framework n'apporte pas un vrai gain.
2. Soigner le HTML semantique, les metas et les performances de chargement.
3. Utiliser les audits comme garde-fou, sans confondre faux negatifs locaux et vrais problemes de production.
4. Documenter l'etat reel du site a la fin de chaque session importante.

## Perimetre actuel

Le projet couvre maintenant :

- hero
- presentation du restaurant
- carte et formules
- galerie
- reservation Formspree
- informations pratiques
- carte Google Maps
- mentions legales
- 404 dediee
- base SEO / social / schema

Le projet ne couvre pas encore :

- back-office ou edition de contenu
- CMS
- analytics
- politique de confidentialite complete
- systeme de reservation avec disponibilites en temps reel

## Definition d'une bonne decision

Une decision est bonne si elle :

- augmente la clarte
- renforce la credibilite
- garde le site facile a maintenir
- respecte le ton du lieu
- evite une dette technique disproportionnee

## Mini-audit de sortie

### Session du 23/03/2026

- Le site reste centre sur l'information utile, mais avec une execution visuelle plus premium.
- La priorite produit a ete respectee : fiabiliser d'abord les informations critiques et la navigation.
- Les faiblesses restantes sont maintenant surtout metier :
  - adresse finale a verrouiller par source proprietaire
  - email officiel a confirmer
  - confidentialite a formaliser si le formulaire reste en production
- Une page de confidentialite minimale a ete ajoutee pour que le formulaire ne repose plus sur un vide legal complet.
- La prochaine marche n'est plus de creer cette page, mais de l'enrichir si les usages de donnees evoluent.

Rappel important :

- Les warnings lies au serveur HTTP local, au domaine `127.0.0.1` et au sous-chemin GitHub Pages ne doivent pas etre interpretes comme des regressions produit immediates.
