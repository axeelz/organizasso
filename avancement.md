# Avancement du projet au 29/04/2024

[![logo d'Organiz'Asso](https://i.postimg.cc/qBCk5yGJ/logo.png)](https://postimg.cc/WtTLDDKC)

## Cahier des charges

- [x] Forum ouvert et forum fermé, accessibles selon le statut de l'utilisateur
- [x] Hors connexion, un utilisateur peut créer un compte, qui doit être validé par un admin avant de pouvoir se connecter
- [x] Après connexion, l'utilisateur peut consulter le forum ouvert (et le forum fermé s'il est admin) depuis la page principale

- [x] Un membre connecté peut créer des messages
- [ ] Un membre connecté peut répondre à un message existant
- [x] Un membre connecté peut visualiser son profil, contenant la liste de ses messages
- [x] Un membre connecté peut supprimer ses propres messages depuis son profil
- [x] Un membre connecté peut visualiser le profil d'autres membres
- [x] Un membre connecté peut rechercher des messages par mots-clés
- [x] Un membre connecté peut rechercher des messages par intervalle de temps de publication
- [x] Un membre connecté peut rechercher des messages par auteur

- [x] Un admin peut accéder au forum fermé
- [x] Un admin peut donner ou retirer le statut admin à un autre utilisateur, sauf à lui-même
- [x] Un admin peut valider ou non le statut de membre à un utilisateur inscrit

- [x] Un utilisateur peut se déconnecter

### Additionnel

- [x] Un admin peut supprimer les messages des autres utilisateurs depuis la liste des messages
- [x] Un admin peut supprimer (bannir) un utilisateur

## Details de l'implémentation

### Librairies utilisées en plus de celles demandées

**Front-end**

- `date-fns` pour formater les dates (ex: "il y a 5 minutes")
- `react-icons` pour les icônes
- `react-router-dom` pour la navigation entre les pages
- `sonner` pour afficher des "toasts" (messages d'alerte) en bas de l'écran (ex: "Inscription réussie")

**API**

- `bcrypt` pour hasher les mots de passe
- `cors` pour autoriser les requêtes cross-origin
- `nodemon` pour redémarrer le serveur automatiquement à chaque modification
- `mongodb` pour interagir avec la base de données, et manipuler des objets `ObjectId`

### Front-end

- [x] Page d'accueil, qui demande de se connecter ou affiche les forums accessibles
- [x] Page de connexion, affichant les éventuelles erreurs de connexion
- [x] Page d'inscription, affichant les éventuelles erreurs d'inscription
- [x] Page de forum, qui affiche les messages du forum sélectionné, et permet de poster un message (et supprimer ses propres messages, ou ceux des autres si on est admin)
- [x] Page de recherche, qui affiche les messages correspondant aux critères de recherche et permet de les filtrer **(n'affiche pas les messages du forum fermé si l'utilisateur n'est pas admin)**
- [x] Page admin, accessible uniquement aux admins, qui permet de valider les inscriptions
- [x] Page de profil, qui affiche les messages de l'utilisateur connecté (et permet de se déconnecter), ou bien d'un autre utilisateur après clic sur son nom depuis un message, liste ses messages (permet de supprimer les siens) et infos sur lui (est admin ?, date d'inscription, etc.)

- [x] Contexte React qui vérifie si l'utilisateur est connecté, et donne accès à ses informations depuis n'importe quel composant. **Le statut de connexion de l'utilisateur est donc toujours à jour et préservé entre les rechargements de page**

- [x] Les pages Login et SignUp sont accessibles **uniquement si l'utilisateur n'est pas connecté**
- [x] Les pages Profil, Recherche, Forum et Admin sont accessibles **uniquement si l'utilisateur est connecté**
- [x] Le forum ouvert est accesible à tous mais le forum fermé est accessible **uniquement si l'utilisateur est admin**
- [x] La page Admin est accessible **uniquement si l'utilisateur est admin**, elle permet de valider les inscriptions, passer un utilisateur au statut admin, retirer le statut admin à un utilisateur, et supprimer un utilisateur
- [x] Une page inexistante ou accéder à la page profil d'un utilisateur inexistant affichent une page 404

### Back-end

- [x] Connexion à la base de données MongoDB
- [x] Connexion d'un utilisateur et création de session **(après validation de l'inscription par un admin)**
- [x] Inscription d'un utilisateur **(avec hashage du mot de passe)**
- [x] Récupérer les informations d'un utilisateur
- [x] Récupérer la liste de tous les utilisateurs
- [x] Récupérer les informations sur l'utilisateur dont la session est active (connecté)
- [x] Déconnexion de l'utilisateur
- [x] Passer un utilisateur au statut vérifié **(seul un admin peut le faire)**
- [x] Passer un utilisateur au statut admin **(seul un admin peut le faire)**
- [x] Retirer le statut admin à un utilisateur **(seul un admin peut le faire)**
- [x] Supprimer un utilisateur **(seul un admin peut le faire)**

- [x] Création d'un message, **seulement si l'utilisateur est connecté, vérifié (et admin s'il veut poster sur le forum fermé)**
- [x] Récupérer la liste de tous les messages **(du forum ouvert et fermé si l'utilisateur est admin)**
- [x] Récupérer la liste des messages d'un forum en particulier

### Autres

Nous avons également choisi d’utiliser les CSS modules pour le style de nos composants et de nos pages. Chaque composant à son `Composant.module.css` associé qui contient que les styles de ce composant.

Cette approche permet de savoir exactement où se trouve le style associé à un élément et le modifier facilement, tout en évitant les conflits entre classes ayant le même nom, car le système leur attribue un identifiant unique lors du build. C’est plus maintenable que d’avoir un seul gros fichier `styles.css`, malgré le plus gros nombre de fichiers que cela génère.

## Améliorations possibles

- Permettre la création de plus de forums, au lieu d'avoir hardcodé un forum ouvert et un forum fermé
