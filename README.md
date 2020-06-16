# wednesday_uber_flow_task

### Pre-requisites
    * node - v13.12.0

### Set up
    * Clone repo from "https://github.com/rVikrant/wednesday_uber_flow.git"
    * run npm install to install dependencies

## ENV file
    * update required keys in .env file -> if not exist then please create
    * update db credentials in config/config.json file

### migrate database 
    * run npx sequelize-cli db:migrate 

### seed data
    * run npx sequelize-cli db:seed:all

### run server
    * node server.js
