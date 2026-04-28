# Présentation du projet LabyMaker

Ce projet est une application d'ordinateur créée avec Electron. Son but principal est de fabriquer des labyrinthes et de montrer comment les résoudre automatiquement.

## Ce que fait l'application

L'application possède un système pour s'inscrire et se connecter en toute sécurité. Les mots de passe sont cachés avec un code spécial pour protéger les informations des joueurs dans notre base de données.

Pour créer les labyrinthes, le jeu utilise un calcul mathématique qui fait des labyrinthes parfaits. Ça veut dire qu'il y a toujours un seul bon chemin entre le point de départ et l'arrivée. Il y a aussi un outil qui calcule et dessine le chemin le plus rapide pour gagner si on est bloqué.

## Comment installer et jouer

Pour mettre le projet sur votre ordinateur, il faut télécharger le dossier et ouvrir le terminal. Ensuite, il faut taper la commande npm install pour télécharger tous les petits outils nécessaires au fonctionnement.

Quand c'est fini, vous pouvez lancer le jeu en tapant npm start. Une fenêtre va s'ouvrir et vous pourrez commencer à jouer et à créer des niveaux.

## Comment le code est rangé

Le code est découpé en plusieurs parties pour que ce soit propre et bien organisé. Voici à quoi servent les différents fichiers et dossiers de mon projet.

Le fichier main.js est le point de départ. C'est lui qui ouvre la fenêtre du jeu et qui fait discuter l'affichage avec le système en arrière-plan.

Le fichier database.js prépare la base de données locale. Il crée l'espace de stockage où on va ranger les comptes des utilisateurs.

Le fichier auth.js gère toute la sécurité. Il s'occupe de créer les comptes, de vérifier les identifiants quand on se connecte et de crypter les mots de passe.

Le fichier labyrinth.js est le cerveau mathématique du jeu. C'est lui qui calcule comment placer les murs au hasard et comment trouver la sortie.

Le dossier renderer contient tout ce que l'utilisateur voit à l'écran. Dedans, le fichier index.html construit la structure de la page, et le fichier style.css met les couleurs et s'occupe de la décoration. Le fichier app.js fait l'animation : il réagit aux clics, écoute le clavier pour faire bouger le joueur et dessine le jeu.

Le fichier package.json est la carte d'identité du projet. Il fait la liste des outils externes qu'on utilise et donne les commandes pour lancer la compilation.

Le dossier node_modules se crée tout seul quand on installe le projet. Il contient toutes les bibliothèques téléchargées pour faire marcher le jeu, comme Electron par exemple. Il est très lourd et il ne faut pas y toucher.

Le dossier dist est le dossier final. Il apparaît seulement quand on fabrique la vraie version du jeu. C'est là-dedans qu'on trouve le vrai fichier exécutable pour lancer l'application d'un simple double-clic, comme un vrai jeu, sans avoir besoin d'ouvrir le code.