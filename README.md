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

### 5. `migrate`

Exécute les migrations de base de données Laravel.

```bash
make migrate
```

### 6. `seed`

Remplit la base de données avec les données de test en utilisant les seeder de Laravel.

```bash
make seed
```

### 7. `start`

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

### 8. `all` (default)

Exécute les commandes suivantes dans cet ordre : `composer-install`, `up`, `npm-install`, `npm-build`, `migrate`, et `seed`.

```bash
make all
```
