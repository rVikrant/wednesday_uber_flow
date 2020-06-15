"use strict";

// local modules
const  models = require("../models");

module.exports = () => {
    return new Promise((resolve, reject) => {
        models.sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
            resolve();
        })
        .catch(err => {
            reject(err);
        });
    });
};