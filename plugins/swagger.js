'use strict';

// npm modules
const   inert       = require('inert');
const   vision      = require('vision');
const   hapiSwagger = require('hapi-swagger');

// local modules
const  Logger   =   require('../lib/log-manager').logger;

// constants imported
const APP_CONSTANTS = require('../config/constants/app-defaults');

let docForRoutes = [];

if(process.env.ADD_DRIVER_ROUTES === 'True'){
    docForRoutes.push('Driver');
}

if(process.env.ADD_USER_ROUTES === 'True'){
    docForRoutes.push('User');
}



exports.plugin = {
    name: 'swagger-plugin',

    register: async (server) => {
        const swaggerOptions = {
            info: {
                title: `${process.env.NODE_ENV} APi Doc of '${APP_CONSTANTS.APP.NAME}' project, includes route types ${docForRoutes.join(' ,')}`
            }
        };
        await server.register([
            inert,
            vision,
            {
                plugin: hapiSwagger,
                options: swaggerOptions
            }
        ]);
        Logger.info( `Swagger Loaded....`);
    }
};
