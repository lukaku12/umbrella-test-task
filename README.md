<h1>Umbrella Test Task</h1>

---

#
### Table of Contents
* [Prerequisites](#prerequisites)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
* [Migrations](#migration)
* [Development](#development)

#
### Prerequisites

* <img src="readme/assets/php.svg" width="35" style="position: relative; top: 4px" /> *PHP@8.2.16 and up*
* <img src="readme/assets/mysql.png" width="35" style="position: relative; top: 4px" /> *MYSQL@8.1.0 and up*
* <img src="readme/assets/npm.png" width="35" style="position: relative; top: 4px" /> *npm@10.2.4 and up*
* <img src="readme/assets/composer.png" width="35" style="position: relative; top: 6px" /> *composer@2.7.1 and up*


#
### Tech Stack

* <img src="readme/assets/laravel.png" height="20" style="position: relative; top: 4px" /> [Laravel@11.x](https://laravel.com/docs/11.x) - back-end framework
* <img src="readme/assets/react.webp" height="20" style="position: relative; top: 4px" /> [React@18.2.0](https://react.dev/learn) - front-end framework
* <img src="readme/assets/ant-design.jpeg" height="20" style="position: relative; top: 4px" /> [Ant Design@5.17.3](https://ant.design/components/overview/) - component library
* <img src="readme/assets/inertia.png" height="20" style="position: relative; top: 4px" /> [Inertia@0.11.1](https://inertiajs.com/) - JavaScript apps the monolith way

#
### Getting Started
1\. First of all you need to clone Project from github:
```sh
git clone https://github.com/lukaku12/umbrella-test-task.git
```

2\. Next step requires you to run *composer install* in order to install all the dependencies.
```sh
composer install
```

3\. after you have installed all the PHP dependencies, it's time to install all the JS dependencies:
```sh
npm install
```

and also:
```sh
npm run dev
```
in order to build your JS/SaaS resources.

4\. Now we need to set our env file. Go to the root of your project and execute this command.
```sh
cp .env.example .env
```
And now you should provide **.env** file all the necessary environment variables:

#
**MYSQL:**
>DB_CONNECTION=mysql

>DB_HOST=127.0.0.1

>DB_PORT=3306

>DB_DATABASE=*****

>DB_USERNAME=*****

>DB_PASSWORD=*****

#
4\. Now execute in the root of you project following:
```sh
  php artisan key:generate
```
Which generates application key.


### Storage Link
in order to see uploaded images we need to run:
```sh
php artisan storage:link
```

### Migration
if you've completed getting started section, then migrating database if fairly simple process, just execute:
```sh
php artisan migrate
```
### Get Data In Database
You need to run command in terminal to seed database
```sh
php artisan migrate --seed
```

##### Now, you should be good to go!

### Development

You can run Laravel's built-in development server by executing:

```sh
  php artisan serve
```
#
