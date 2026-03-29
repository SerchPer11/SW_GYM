# Usamos PHP 8.4 (el que pide Spatie)
FROM php:8.4-fpm-alpine

# Instalamos dependencias y extensiones (incluyendo bcmath e intl)
RUN apk add --no-cache nginx libpng-dev libxml2-dev zip unzip git oniguruma-dev libzip-dev bash icu-dev
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip intl

# Traemos Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY . .

# Instalamos librerías ignorando scripts que toquen la BD
RUN composer install --no-dev --no-interaction --no-scripts --optimize-autoloader

# Permisos para storage
RUN chmod -R 775 storage bootstrap/cache && chown -R www-data:www-data /app

# Exponemos el puerto de Railway
EXPOSE 8080

# COMANDO FINAL:
# 1. Intenta migrar (si ya está hecho, no pasa nada).
# 2. Inicia el servidor nativo de PHP en el puerto 8080.
CMD php artisan migrate --force; php -S 0.0.0.0:8080 -t public