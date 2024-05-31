# Projet final - Assignments  (API)

## Description du projet
Un projet Node.js qui sert les APIS pour les `assignments`.

### Installation
1. Clonez the dépôt:
   ```bash
   git clone https://github.com/FelanaRasata/AngularBackMBDS.git
   ```
2. Naviguez vers le dossier du projet:
   ```bash 
   cd AngularBackMBDS
   ```
3. Installez les dépendances:
   ```bash
   npm run start:setup
   ```

### Usage
Pour lancer l' application localement, suivez ces étapes:
1. Soyez sûre que MongoDB est installé est est lançé dans votre systeme.
2. Créer un fichier `.env` dans le répertoire racine et définir les variables d'environnement suivantes :
   ```dotenv
    API_HOST=
    API_PORT=
    API_ENV=
    API_SECRET_KEY=
    API_TOKEN_EXPIRATION=
    MONGODB_URI=
    MONGODB_USER=
    MONGODB_PASSWORD=
    MONGODB_DBNAME=
   ```
3. Lancez l' application:
   ```bash
   npm run start:dev
   ```
4. Accédez à l'application sur `http://localhost:<API_PORT>`

### Librairies de base
- Express.js
- MongoDB with mongoose
- bcrypt

### Informations sur le projet

### **Initialisation**

Au démarrage, les données de test sont chargées depuis le fichier `src/init.js` si elles ne figurent pas déjà dans la base de données.

### **Détails des APIs**

#### **Utilisateurs**

**Connexion d’un utilisateur**

`POST api/users/login`

**Paramètres :**
- `username` (string) : Nom d'utilisateur
- `password` (string) : Mot de passe
- `role` (string) : Rôle de l'utilisateur

**Réponses :**
- `201` : 🟢 Token créé
- `400` : 🔴 Mauvaise requête
- `402` : 🔴 Identifiants incorrects

**Récupérer l’utilisateur en cours**

`GET api/users/current`

**Réponses :**
- `200` : 🟢 OK
- `401` : 🔴 Non autorisé

#### **Matières**

**Obtenir la liste des matières**

`GET api/subjects`

**Réponses :**
- `200` : 🟢 OK
- `400` : 🔴 Mauvaise requête

#### **Devoirs**

**Pour tous les utilisateurs**

**Obtenir la liste des devoirs avec pagination et recherche simple**

`GET api/assignments`

**Paramètres :**
- `size` (number) : Taille de la page
- `limit` (number) : Nombre maximum d'éléments par page
- `search` (string) : Terme de recherche

**Réponses :**
- `200` : 🟢 OK
- `400` : 🔴 Mauvaise requête

**Obtenir un devoir par son ID**

`GET api/assignments/:id`

**Paramètres :**
- `id` (string) : Identifiant du devoir

**Réponses :**
- `200` : 🟢 OK
- `400` : 🔴 Mauvaise requête

**Pour les étudiants**

**Créer un devoir**

`POST api/assignments`

**Corps de la requête :**
- `assignment` (Assignment) : Détails du devoir

**Réponses :**
- `201` : 🟢 Créé
- `400` : 🔴 Mauvaise requête
- `404` : 🔴 Non trouvé

**Pour les enseignants**

**Modifier un devoir**

`PUT api/assignments/:id`

**Paramètres :**
- `id` (string) : Identifiant du devoir

**Corps de la requête :**
- `assignment` (Assignment) : Détails du devoir à mettre à jour

**Réponses :**
- `204` : 🟢 Pas de contenu (modification réussie)
- `400` : 🔴 Mauvaise requête
- `404` : 🔴 Non trouvé

**Supprimer un devoir**

`DELETE api/assignments/:id`

**Paramètres :**
- `id` (string) : Identifiant du devoir

**Réponses :**
- `204` : 🟢 Pas de contenu (suppression réussie)
- `400` : 🔴 Mauvaise requête
- `404` : 🔴 Non trouvé

---

Ce fichier README.md sert de guide pour installer, exécuter et comprendre le projet. Pour des informations plus détaillées, veuillez vous référer à la base de code et aux ressources supplémentaires fournies.

---

### Authors
- [Rasatarivony Andriamalala Sitraka](mailto:rasatasitraka2@gmail.com)
- [Rasatarivony Andriharimanga Felana](mailto:rasatadiamondra@gmail.com)

---

&copy; ITU - MBDS - 2023-2024
