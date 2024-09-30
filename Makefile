all: composer-install up npm-install npm-build migrate seed

composer-install:
	docker run --rm \
        -u "$(shell id -u):$(shell id -g)" \
        -v "$(shell pwd):/var/www/html" \
        -w /var/www/html \
        laravelsail/php83-composer:latest \
        composer install --ignore-platform-reqs

up:
	vendor/bin/sail up -d

npm-install:
	vendor/bin/sail npm i

npm-build:
	vendor/bin/sail npm run build

npm-node:
	vendor/bin/sail npm run node

migrate:
	vendor/bin/sail artisan migrate

seed:
	vendor/bin/sail artisan db:seed

start:
	vendor/bin/sail start

down:
	vendor/bin/sail down
