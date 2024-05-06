# Organiz'Asso

[![logo d'Organiz'Asso](https://i.postimg.cc/qBCk5yGJ/logo.png)](https://postimg.cc/WtTLDDKC)

## 👉 Pour lancer le front-end

`$ cd client`

`$ cp .env.example .env` (en modifiant éventuellement les variables d'environnement)

`$ npm install`

`$ npm run dev`

## 👉 Pour lancer le back-end

`$ cd server`

`$ cp .env.example .env` (en modifiant éventuellement les variables d'environnement)

`$ npm install`

`$ npm start`

## Prérequis

- Node.js >= v20.6.0
- MongoDB installé en local tournant sur localhost:27017
- Une base de données nommée `organizasso` créée dans MongoDB contenant les collections `users` et `messages`
- Un fichier `.env` dans le dossier `client` contenant les variables d'environnement définies dans le fichier `.env.example`

## Contraintes techniques

- **Front-end :** React.js en JavaScript avec **axios** pour les requêtes, pure CSS, pas de librairies / frameworks CSS, pas de Redux
- **Back-end :** Node.js, Express.js
- **Base de données :** MongoDB, pas de Mongoose
- **Outils :** Postman pour tester les requêtes

## Cahier des charges

Notre site Organiz’asso permet à des membres d’une association d’échanger des messages avec des forums. L’association est pilotée par un conseil d’administration, qui sont des membres élus appelés administrateurs.

**Il y a deux forums :**

— le forum ouvert, que chaque membre inscrit peut consulter et sur lequel il peut poster des messages ;

— le forum fermé, réservé aux membres du conseil d’administration.

Hors connexion, un utilisateur n’a que la possibilité de créer un compte. Son inscription doit être validée par un administrateur pour lui attribuer le statut de membre.

Lorsqu’un membre se connecte, cela permet d’ouvrir une page principale qui contient le forum ouvert.

**Une fois connecté, un membre peut :**

— créer des messages : soit en réponse à un message précédemment posté, soit pour démarrer une nouvelle discussion

— visualiser son profil contenant au moins la liste des messages qu’il a publiés. À partir de son profil, il peut supprimer ses propres messages.

— visualiser le profil d’autres membres.

— rechercher des messages en précisant des mots-clés, un intervalle de temps de publication ou leur auteur.

**Les administrateurs :**

— ont accès au forum fermé

— peut donner ou retirer le statut administrateur à un autre utilisateur, sauf à lui-même

— revoit les inscriptions sur le site, et valide ou non le statut de membre à un utilisateur inscrit.

À la fin de son activité, l’utilisateur a la possibilité de se déconnecter.
