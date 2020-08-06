## Pointerest
A web app to mark points of interest on a map

## Install

## Client

`npm install  `
`ng serve`



## Server
* create virtualenv
* create postgis db
     ```
     CREATE USER puser PASSWORD 'my_passwd';
     CREATE DATABASE pointerest OWNER puser;
     CREATE EXTENSION postgis;
     ```
    * add credentials to settings.py under `DATABASES`
* `pip install -r requirements.txt`
* `python manage.py migrate`
* `python manage.py runserver`
