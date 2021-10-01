# Projet7 - Groupomania 
Projet 7 de la formation Develeoppeur Web d'OpenClassrooms, il consiste à développer un réseau socila d'entreprise qui soit calqué sur 9gag ou reddit.
Donc soit un réseau de partage d'images et gif soit un réseau de threads textuels.
## Objectifs
1. Réaliser entièrement le réseau social (Front et Back) en reliant le tout par une API
2. Le Front devra être développé en utilisant un Framework Front-End de notre choix (React, Vue, Angular, Ember, Meteor, Aurelia...)
3. Le back devra utiliser une base de données relationnelle SQL (SQLite, MySQL, PostGreSQL...)
4. Le projet devra être codé en JavaScript, aucun framework tel que Symfony n'est donc autorisé
## Livrables
Un fichier contenant le lien vers le repository Github
## Choix
Les choix que j'ai effectués sont les suivants :
    + Création d'un réseau type 9gag avec un feed donnant les dernières publications multimédias de la communauté
    + Utilisation du VueJS pour développer le front et plus particulièrement du framework Quasar
    + Le back est implémenté avec le framework Express
    + La base de données choisie est SQLite
    + Utilisation de l'ORM Sequelize
    + Implémentation d'une RESTful API
## Installation
1. Cloner le repository avec ``git clone https://github.com/Valxer/KevinLeVanPhung_7_06092021.git``
2. Ouvrez le dossier avec VSCode
3. Dans VSCode ouvrez un terminal :  
	* Tapez ``cd Back-end/ && npm install`` pour installer les dépendances du Back-end du site
    * Tapez ensuite ``npm run build`` pour créer le dossier images qui servira à stocker les images des sauces créées
    * Tapez ``npm start`` pour lancer le serveur et vérifiez que celui ci est bien lancée sur le port 8081.
Vous êtes désormais connecté au back-end
4. Ouvrez un nouveau terminal sans fermer l'ancien :
    * Tapez ``cd Front-end/ && npm install`` pour installer les dépendances du Front-end du site
    * Tapez ensuite ``npm start`` pour lancer le front
    * Cliquez sur le lien dans le terminal pour accéder au site ou tapez ``http://localhost:8080/`` dans votre navigateur
