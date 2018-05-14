## Clockwise-clockware

This project contains a web application for receiving orders online.

### Getting started

To start the project you will need npm.

You will find instructions for installing npm here: https://www.npmjs.com/get-npm

Also you will need MySQL CLI. Open it and create database _test_ and give permissions to user 'admin':
```sh
create database test;
grant all on test.* to 'admin'@'localhost' identified by 'passwordsecret';
```
Open project folder and find the file example.env rename it to .env and enter all required parameters.

Then run your CLI, _cd_ to your projects folder and use commands:
 
```sh
$ git clone git@github.com:kkdshka/clockwise-clockware.git
$ cd clockwise-clockware/
$ npm install
$ npm run migration_up
$ npm run seeds_up
$ npm start
```
Run another CLI, _cd_ to project folder and use commands:

```sh
$ npm run webpack
```
Then open your browser and go to http://localhost:3000.

To enter as an admin go to http://localhost:3000/admin and log in.

### Build with

* React
* Express
* MySQL

### Tested with

Project tested using Opera browser, Windows 8.1, display size - 1920 x 1080.