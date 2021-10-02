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
    * Si le site web ne s'ouvre pas de lui-même, cliquez sur le lien dans le terminal pour accéder au site ou tapez ``http://localhost:8080/`` dans votre navigateur
## BDD
La base de données est vierge à l'exception d'un utilisateur avec les pouvoirs d'administrateur qui ne peut être créer vie le formulaire du site.
Pour accéder à ce compte il vous faut vous connecter avec les informations suivantes :
+ Mail : admin@admin.com
+ Mot de Passe : aA!123456

Il n'y a aucun autre utilisateur, post ou commentaire créé !

## .ENV
Créez un fichier .env et ajouter les infos suivantes (remplacez vos infos comme vous voulez)
DB_NAME = "groupomania"
DB_USER = "groupomania"
DB_PASS = "groupomania"
DIALECT = "sqlite"
HOST = "localhost"
JWT_SECRET = "secret"
KEY = "000102030405060708090a0b0c0d0e0f"
IV = "101112131415161718191a1b1c1d1e1f"