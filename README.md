# ESS Academy

Application de formation responsive réalisée à partir des dix vues de la maquette et du cahier des charges fournis.

## Démarrer

Prérequis : Node.js 18 ou version ultérieure. Aucune dépendance externe n’est nécessaire.

```sh
npm start
```

Ouvrir ensuite <http://localhost:4173>. Pour choisir un autre port, définir la variable d’environnement `PORT` avant de lancer le serveur.

Le serveur Node fourni sert les fichiers vidéo d’origine avec prise en charge des requêtes HTTP Range pour la lecture et la recherche dans la vidéo. Les fichiers restent à la racine du projet pour que leurs URL relatives fonctionnent aussi après publication de l’ensemble du dossier sur un hébergeur statique compatible.

## Fonctionnement des données

Le nom, l’adresse e-mail facultative, les réponses et la progression sont conservés dans le stockage local du navigateur. Aucun compte, serveur applicatif, service d’authentification ni base de données n’est configuré. Le certificat PDF est généré dans le navigateur et ne requiert pas de service externe.

Le cahier des charges rend l’authentification facultative, tandis que la maquette montre un formulaire avec mot de passe et création de compte. L’écran d’entrée conserve la présentation de la maquette mais utilise la saisie du nom prévue par le cahier des charges. Il n’y a pas de connexion Google ou de compte avec mot de passe faute de backend fourni.

## Contenu pédagogique

- Module 1 : `ESS Academy Module1 caption anime.mp4`
- Module 3 : `ESS Academy Module 3 caption anime.mp4`
- Les deux photographies du site sont des extraits recadrés de la maquette PDF fournie.
- L’évaluation finale se valide à partir de 70 %.

Les vidéos sont chargées depuis les fichiers locaux originaux avec le lecteur natif du navigateur. Le MP4 du module 3 ne contient pas de piste audio ; il est lu tel quel, sans ajout ou modification du média.

## Parcours de vérification Chrome

Avec le serveur lancé dans un premier terminal, exécuter `npm run verify:browser` dans un second. Chrome ou Edge doit être installé. Le parcours automatisé vérifie les routes, les quiz, l’atelier, la progression, la lecture des vidéos, le certificat PDF et l’affichage mobile.
