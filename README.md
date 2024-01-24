# Simple-Sequelize-Dashboard

## Description

Simple-Sequelize-Dashboard est un middleware qui permet d'administrer la base de donnée d'un site rapidement et simplement avec un déploiement par NPM.

Depuis la vue d'administration, il est possible de gérer :

- Les rôles de manière simplifiés
- les utilisateurs
- les permissions

Il est capable de générer les trois tables de bases pour la gestion de droits d'accès (adminUser, adminRole, adminPermission), les différentes permissions sur vos tables respecterons les principes CRUD.

## Prérequis du projet

Le projet doit être écrit en :

- NodeJS
- Sequelize
- Express

## Les dépendances du projet

Afin de réaliser ce projet nous dépendons de :

- Bootstrap
- pug
- cookier-parser
- express-session et express-session-sequelize
- dotenv
- bcrypt
- path

## Installation

Pour installer le projet, il suffit de lancer la commande suivante :

```bash
npm install simple-sequelize-dashboard
```

## Utilisation

Pour utiliser le projet, il faudra ajouter la commande suivante :

```javascript
const options = {
    baseUrl: '/admin', // Url de base du panel admin
    sessionName: 'Dashboard_admin_session', // Nom de la session
    sessionSecret: 'Dashboard admin session secret', // Clé secréte de la session
    sessionCookieMaxAge: 20 * MINUTES, // Durée de vie de la session
    sessionCookieSecure: false, // Cookie sécurisé
  }

app.use(useSimpleDash(sequelize, options)
```

Cette commande doit se trouver impérativement avant la déclaration de express session et le routeur. Elle prend en paramètre l'instance de sequelize. Il est possible de passer un deuxième paramètre qui est un objet de configuration options.

### Options

Les options sont les suivantes :

- baseUrl : Url de base du panel admin (par défaut : '/admin')
- sessionName : Nom de la session (par défaut : 'Dashboard_admin_session')
- sessionSecret: Clé secréte de la session (par défaut : 'Dashboard admin session secret')
- sessionCookieMaxAge: Durée de vie de la session (par défaut : 20 \* MINUTES)
- sessionCookieSecure: Cookie sécurisé (par défaut : false)

## La vue d'administration

La vue du panel admin se veut simple est générer avec Bootstrap/pug.
Dans la sidebar, il est possible de voir les différentes tables de la base de donnée. Il est possible de cliquer sur une table pour voir ses entrées. Une fois sur l'affichage des entrées, il est possible de modifier ou supprimer une entrée selon les permissions de l'utilisateur.

## La Structure du middleware

La structure de fichier du middleware est la suivante :

```bash
.
├── lib
│   ├── controller
│   │   ├── authController.js
│   │   ├── dashboardController.js
│   │   └── superAdminController.js
│   ├── middlewares
│   │   ├── addAdminRenderMethod.js
│   │   ├── addModelsToLocals.js
│   │   ├── adminSession.js
│   │   ├── parseDatabaseModelsInLocals.js
│   │   ├── parseModelsInfoInLocals.js
│   │   └── prepareSidebarLocals.js
│   ├── migrations
|   |   └── 0000_create_tables_admin_role_permission.js
│   ├── models
│   │   ├── Admin.js
|   |   ├── initDashModels.js
|   |   ├── Permission.js
│   │   ├── Role.js
│   │   ├── Setting.js
│   ├── public
│   │   ├── css
│   │   |   └── dasboardStyle.css
│   │   ├── img
│   │   |   └── search.svg
│   │   └── integration
|   |       └── index.html
│   ├── routers
│   │   ├── authRouter.js
│   │   ├── dashboardRouter.js
│   │   └── superAdminRouter.js
│   ├── views
│   │   ├── layouts
│   │   |   └── main.pug
│   │   ├── mixins
│   │   |   ├── modalRecordEditor.pug
│   │   ├── partials
│   │   |   ├── modale.pug
│   │   |   ├── head.pug
│   │   |   ├── navbar.pug
│   │   |   ├── sidebar.pug
|   |   └── tableView.pug
│   ├── utils
│   │   └── updateDbSchema.js
│   └── useSimpleDash.js
└── README.md
```
