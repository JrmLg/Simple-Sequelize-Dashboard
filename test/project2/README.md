# S05 - Atelier O'quiz

## Prep work 

On installe et on lance le projet en autonomie !

<details><summary>
Tips en cas de difficulté
</summary>

Au hasard :
- `npm install`
- `.env` avec les bonnes valeurs 😉
- `npm run db:reset` pour remettre la BDD à plat !
- créer l'user et la BDD `oquiz` si ça n'a pas été fait
- checker les `scripts npm` si besoin

</details>

## Etape 1 - Home page

La `page d'accueil` doit à présent afficher **dynamiquement** les `quiz` avec leur description, ainsi que le nom/prénom de leurs `auteurs` et les `thèmes` associés au quiz.

## Etape 2 - Page d'un quiz

Une page pour visualiser un `quiz`, avec :
- ses `thèmes`
- ses `questions`
  - la `difficulté` de chaque question
  - et les `réponses possibles` à chaque question

On vous fournit une intégration dans le dossier `integration`.

## Etape 3 - Page des thèmes/catégories (tags)

Et pourquoi pas une page qui liste les `thèmes`, et sous chaque thème, un lien vers les `quiz` qui comportent ces thèmes ? 

On vous fournit une intégration dans le dossier `integration`.

## Etape 4 - Les bonus d'échauffement

Les liens : 
- ajouter tous les liens qui pourraient manquer ! Il y a surement des endroits de l'application où il serait intéressant pour l'utilisateur de pouvoir cliquer, afin de rendre la navigation plus fluide ! 

Home page :
- les `quiz` doivent être affichés par ordre alphabétique de leur titre. [CF DOC](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#ordering).

Controllers : 
- Pensez aux `try/catch` autour des requêtes en base de données, et renvoyer une page d'erreur en cas de problème.

Page non trouvée : 
- Et la `404` dans tout ça ?

## Etape 5 - Bonus de la mort qui tue

Rajouter les pages des formulaires d'**inscription** et de **connexion**. 

Avec tout ce qui est nécessaire 💪 (par ordre de difficulté): 
- les vues
- création de l'utilisateur dans la base de données après soumission du formulaire.
- conserver le fait que l'utilisateur soit loggé dans la session de l'utilisateur (`express-session`)

Et on commence à réfléchir à la journée de demain : 
- hashage du mot de passe à l'inscription en utilisant un module npm ! (`bcrypt`)
- empêcher les utilisateurs non loggés de pouvoir éditer/supprimer les `Levels`
