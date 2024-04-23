# Organiz'Asso

## 👉 Pour lancer le front-end

`$ cd client`

`$ npm install`

`$ npm run dev`

## 👉 Pour lancer le back-end

`$ cd server`

`$ npm install`

`$ npm start`

## Technologies devant être utilisées

- **Front-end :** React.js en JavaScript, pure CSS, pas de librairies / frameworks CSS, pas de Redux
- **Back-end :** Node.js, Express.js
- **Base de données :** MongoDB, pas de Mongoose

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
