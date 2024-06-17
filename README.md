## System Requirements

## The following are required to function properly.

-PHP Version：PHP 8.2.x
-Laravel Version：10.42.x
-Node Version：20.x
-Enabled sqlite3 php extension

## Installation

cd backend directory
copy .env.example .env
change .env DB_CONNECTION to sqlite
composer install
php artisan key:generate
php artisan migrate:fresh –seed
php artisan serve

cd frontend directory
npm install
npm run dev