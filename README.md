# Projet E-Commerce - Lancement et Installation

Ce projet est un site e-commerce pour la vente de livres, avec des réductions spéciales dédiées à la saga Harry Potter. Ce guide vous aidera à configurer et à lancer le projet en utilisant Docker, Laravel Sail et npm.

## Prérequis

- [Docker et Docker Compose](https://www.docker.com/) doivent être installés.

## Installation et démarrage

Le `Makefile` fourni permet de simplifier les commandes d'installation et de gestion du projet.

La commande suivante permet de lancer le projet:

```bash
make
```
Vous pouvez ensuite lancer la commande suivante pour accéder au projet:

```bash
vendor/bin/sail open
```
ou bien accéder à l'url [http://localhost](http://localhost)

## Back-end

Il y a 2 backend différents que vous pouvez tester comme bon vous semble: **Laravel** et **Node.js**

### Laravel

Afin d'utiliser Laravel, il suffit de ne pas set les variables d'env `VITE_API_URL` et `VITE_NODE_PORT` (ligne à commenter dans le `.env`)
```dotenv
#VITE_NODE_PORT=3000
#VITE_API_URL="http://localhost:${VITE_NODE_PORT}"
```
Une fois la variable enregistrée, il sera necessaire de rebuild le front :

```bash
make npm-build
```

### Node JS

Afin d'utiliser NodeJS, il faut set la variable `VITE_API_URL` dans le `.env` comme ceci:
```dotenv
VITE_NODE_PORT=3000
VITE_API_URL="http://localhost:${VITE_NODE_PORT}"
```
Une fois la variable enregistrée, il sera necessaire de rebuild le front :

```bash
make npm-build
```

Il faudra également démarrer le serveur `NodeJS` via la commande `node` du makefile

```bash
make node
```

L'intégralité du code du server NodeJS se trouve dans le dossier `node-api` à la racine du répo.

## Commandes disponibles

### 1. `composer-install`

Installe les dépendances PHP via Composer en utilisant une image Docker.

```bash
make composer-install
```

### 2. `up`

Lance l'environnement Docker Sail en arrière-plan.

```bash
make up
```

### 3. `npm-install`

Installe les dépendances NPM dans l'environnement Docker Sail.

```bash
make npm-install
```

### 4. `npm-build`

Construit les fichiers front-end (généralement les assets comme CSS et JavaScript) en utilisant NPM dans Docker Sail.

```bash
make npm-build
```

### 5. `node`

Lance le serveur NodeJS

```bash
make node
```

### 6. `migrate`

Exécute les migrations de base de données Laravel.

```bash
make migrate
```

### 7. `seed`

Remplit la base de données avec les données de test en utilisant les seeder de Laravel.

```bash
make seed
```

### 8. `start`

Démarre l'environnement Sail s'il est arrêté.

```bash
make start
```

C'est la commande idéale pour démarrer complètement le projet.

### 9. `down`

Arrête et détruit les conteneurs Docker de Sail.

```bash
make down
```

### 10. `all` (default)

Exécute les commandes suivantes dans cet ordre : `composer-install`, `up`, `npm-install`, `npm-build`, `migrate`, et `seed`.

```bash
make all
```
