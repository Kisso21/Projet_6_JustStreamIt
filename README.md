# JustStreamIt

## Description

**JustStreamIt** est une application web inspirée de Netflix, développée dans le cadre du Projet 6 de la formation OpenClassrooms : Développeur Python. Le projet consiste à créer un site web utilisant HTML, CSS et JavaScript, intégré avec une API. L'application comprend une barre de navigation, un carrousel d'images et des fenêtres modales pour afficher des détails récupérés depuis l'API.

## Fonctionnalités

- **Barre de Navigation :** Comprend un logo et des liens vers différentes catégories.
- **Meilleur Film Noté :** Affiche le film le mieux noté récupéré depuis l'API.
- **Top Films :** Affiche les sept films les mieux notés.
- **Sections de Catégories :** Affiche sept films de catégories sélectionnées.
- **Fenêtres Modales :** Affiche des informations détaillées sur chaque film lorsqu'on clique dessus.

## Configuration du Projet

### 1. Créer le Dossier du Projet

mkdir project_folder
cd project_folder

### 2. Installation de l'API :

Ouvrez le terminal et naviguez jusqu'au dossier du projet

git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git  
cd OCMovies-API-EN-FR  
python -m venv venv  
. venv/bin/activate (sur MacOS/Linux)  
venv\Scripts\activate (sur Windows)  
pip install -r requirements.txt  
python manage.py create_db  
python3 manage.py runserver  

Accédez à l'API avec http://localhost:8000/api/v1/titles/  

### 3. Installation du Projet :

Ouvrez le terminal et naviguez jusqu'au dossier du projet

git clone https://github.com/Kisso21/Projet_6_JustStreamIt.git
cd JustStreamIt

Ouvrez le fichier index.html pour afficher le site web
