# Présentation du projet LabyMaker

Ce projet consiste en une application de bureau développée avec le framework Electron. Elle a pour objectif principal de générer des labyrinthes et de proposer une solution de résolution automatique.


## Fonctionnalités principales de l'application

L'application propose un système d'authentification complet qui permet aux utilisateurs de créer un compte et de se connecter de manière sécurisée. Les mots de passe sont protégés par un algorithme de hachage afin de garantir la confidentialité des données stockées dans la base de données SQLite3.

Le moteur de génération utilise un algorithme de parcours pour créer des labyrinthes parfaits, ce qui signifie qu'il existe toujours un chemin unique entre l'entrée et la sortie. Un outil de résolution est également intégré pour tracer le chemin le plus court entre deux points de la grille.


## Instructions pour l'installation et l'utilisation

Pour installer le projet sur votre ordinateur, vous devez d'abord cloner le dépôt distant puis vous rendre dans le dossier principal. Il est ensuite nécessaire d'installer les dépendances logicielles en utilisant la commande npm install dans votre terminal.

Une fois l'installation terminée, vous pouvez lancer l'interface utilisateur en saisissant la commande npm start. L'application s'ouvrira dans une nouvelle fenêtre et vous pourrez commencer à utiliser les outils de génération.


## Structure du projet et utilité des fichiers

Le code est organisé de façon modulaire pour séparer la logique du système, les algorithmes de calcul et l'interface visuelle. Voici le détail des fichiers composant cette application.

Le fichier main.js est le point d'entrée de l'application. Il gère la création de la fenêtre principale et assure la communication entre l'interface visuelle et les processus en arrière-plan.

Le fichier database.js s'occupe de la configuration de la base de données locale. Il prépare l'espace de stockage sécurisé pour les informations des utilisateurs.

Le fichier auth.js centralise toutes les fonctions liées à la sécurité. Il gère la logique d'inscription, la vérification des identifiants lors de la connexion et le chiffrement des mots de passe.

Le fichier labyrinth.js contient l'intelligence mathématique du projet. Il regroupe l'algorithme de création aléatoire du labyrinthe et le système de recherche du chemin le plus court pour la résolution.

Le dossier renderer contient la partie directement visible par l'utilisateur. Le fichier index.html y définit la structure de la page, tandis que le fichier style.css applique l'apparence visuelle et les couleurs.

Le fichier app.js, situé également dans le dossier renderer, est le moteur interactif de l'interface. Il écoute les clics sur les boutons, transmet les requêtes au système et se charge de dessiner la grille colorée sur l'écran.

Le fichier package.json sert de carte d'identité au projet. Il liste toutes les bibliothèques externes nécessaires au bon fonctionnement du code et définit les commandes de lancement.

Le fichier .gitignore est une consigne stricte pour le gestionnaire de versions. Il empêche l'envoi des dossiers trop lourds ou des bases de données locales vers le dépôt distant.