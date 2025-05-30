# Renowify : Vérification de l'accessibilité des sites AEM

## Installation de Renowify

Vous avez le choix entre installer Renowify sous forme de Bookmarklet ou sous forme d'extension Chrome

- **Le bookmarklet** est simple d'utilisation : à l'activation, est affichagé dans une fenêtre modale une liste des non-conformités au RGAA/RAWeb/WCAG et des bonnes pratiques à mettre en place pour une meilleure accessibilité.
- **L'extension chrome** : Permet de lancer le script du bookmarklet avec des filtres (uniquement les alertes, uniquement les recommandations pour le rédacteur, etc.) il possède également des scripts pour faciliter l'audit de site web.

### Installations manuelle du bookmarklet

Faire un clic droit sur votre barre de favoris et sélectionner "Ajouter un favori" puis copier-coller la ligne ci-dessous dans le champ URL

`javascript:(function(){document.body.appendChild(document.createElement('script')).src='https://[votre_url]/a11y_renowify/scripts/script_bookmarklet.js';})();`

### Installations de l'extension Chrome

Il est également possible d'utiliser le bookmarklet en tant qu'extension Chrome. Pour se faire, cloner les sources de ce projet en local, Puis ouvrir la page des [extensions chrome](chrome://extensions/) et cliquer sur "charger l'extension non empaquetée" (le mode developpeur doit être activé) et selectionner le répertoire suivant :

> [votre_url]/a11y_renowify/

## Utilisation

Pour utiliser la vérification sur une page de votre site, il suffit d'ouvir la page dans votre navigateur et de cliquer sur le lien dans votre barre de favoris ou sur l'extension Chrome.

## Liste des Checks

1. Couleur et contraste
2. Images
   - Alternative textuelle sur toutes les images informatives
   - Attributs des svg de décoration
   - Attribut Alt vide sur les images de search logique
   - Les images de décoration ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle
   - Alternative textuelle courte et concise
3. Liens
   - Suffixe "Nouvelle fenêtre" sur les liens externe
   - Attribut title vide
   - Attribut title reprend à minimum le contenu textuel
4. Formulaire et Autocomplete
   - Autocomplete sur les champs classique
   - Présence d'une étiquette (label)
5. Element Obligatoire
   - Balises vides
   - Doctype et page title
6. Structure de l'information
   - Liste
   - Landmark
   - Cadres
7. Configuration des composants AEM

   - Breadcrumb
   - Menu des langues
   - Menu de navigation
   - Tooltip

8. Tableau
   - Attribut de tableau de mise en forme
   - Attribut de tableau informatif
9. Navigation
   - Plan du site
   - Tabindex positif
   - Skiplinks
10. Balises/attributs obsolètes
11. Changement de langue
12. Boutons
13. Animation Lottie
14. Titres
    - Heading caché au outil d'assistance
    - Heading simulé
    - Hierarchie des titres
15. Securité

## Collaborer

N'hésitez pas à me remonter les problèmes, faux-positifs ou vos suggessions d'améliorations.

## Licence

Copyright : Nicolas AMBROISE - CTIE - Licence MIT
