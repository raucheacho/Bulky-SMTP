# Bulky - Système de gestion d’emails en masse

**Bulky** est une application web moderne conçue pour la gestion efficace des emails en masse. Elle propose une interface conviviale pour créer, gérer et envoyer des emails groupés avec prise en charge des modèles.

## 🚀 Fonctionnalités

- Interface web intuitive pour la gestion des emails
- Rédaction d’emails basée sur des modèles
- Envoi d’emails en masse
- Suivi du statut en temps réel
- Déploiement via Docker

## 🛠️ Technologies utilisées

### Frontend

- React
- Vite (outil de build)
- Node.js v18
- NGINX (serveur de production)

### Backend

- Node.js v18
- Express.js
- Docker

### Base de données

- PostgreSQL

## 🗂 Structure du projet

```bash
bulky/
├── .env                 # Fichier .env principal (centralisé)
├── frontend/            # Application frontend React
│   ├── .env -> ../.env  # Lien symbolique vers bulky/.env
│   ├── src/             # Code source
│   ├── public/          # Fichiers statiques
│   └── Dockerfile       # Configuration du conteneur frontend
│
├── backend/             # Application backend Node.js
│   ├── .env -> ../.env  # Lien symbolique vers bulky/.env
│   ├── src/             # Code source
│   └── Dockerfile       # Configuration du conteneur backend
│
└── docker-compose.yml   # Orchestration des conteneurs
```

> 🔗 Utilise la commande suivante pour créer les liens symboliques en fonction de votre dossier :

```bash
ln -s ../.env .env
```

## ⚙️ Installation

### Prérequis

- Docker Desktop
- Docker Compose
- Git

### Configuration

1. Clone le dépôt :

```bash
git clone https://github.com/yourusername/bulky.git
cd bulky
```

2. Crée un fichier `.env` à la racine du projet avec les variables suivantes :

```env
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
POSTGRES_DB=bulky_db
DB_HOST=db
voir plus dans le fichier .env.example
```

3. Lance l’application :

```bash
docker compose up -d
```

L’application sera disponible aux adresses suivantes :

- 🖥 Frontend : http://localhost:3000
- 🛠 API Backend : http://localhost:5000

## ✨ Utilisation

1. Accède à l’interface web via http://localhost:3000
2. Connecte-toi avec tes identifiants
3. Crée des modèles d’emails
4. Téléverse des listes de destinataires
5. Programme ou envoie des emails en masse
6. Surveille les envois via le tableau de bord

## 🧑‍💻 Développement

Pour exécuter l’application en mode développement :

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

## 🤝 Contribution

1. Fork du dépôt
2. Crée une branche pour ta fonctionnalité
3. Commit tes modifications
4. Pousse ta branche
5. Crée une Pull Request

## 📄 Licence

Ce projet est sous licence **MIT**.
