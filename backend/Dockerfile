# Usamos PHP 8.4 que es el que tus librerías piden
FROM php:8.4-fpm-alpine

# Instalamos lo que Laravel necesita para no morir (incluyendo bcmath)
RUN apk add --no-cache nginx libpng-dev libxml2-dev zip unzip git oniguruma-dev libzip-dev bash icu-dev
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip intl

# Traemos Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY . .

# Instalamos dependencias SIN ejecutar scripts (para que no busque la BD todavía)
RUN composer install --no-dev --no-interaction --no-scripts --optimize-autoloader

# Permisos sagrados
RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache

# Exponemos el puerto
EXPOSE 8080

# EL TRUCO FINAL: Este comando corre las migraciones y LUEGO prende el servidor
CMD php artisan migrate:fresh --force --seed && php artisan serve --host=0.0.0.0 --port=8080