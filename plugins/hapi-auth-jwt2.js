'use strict';

//  constants imported
const {AUTH_STRATEGIES} = require('../config/constants/app-defaults');

// local modules
const {verifyToken} = require('../lib/token-manager');

exports.plugin = {
    name: 'auth',
    register: async (server, options) => {
        try {
            await server.register(require('hapi-auth-jwt2'));
            server.auth.strategy(AUTH_STRATEGIES.USER,
                'jwt',
                {
                    key: process.env.JWT_SECRET_USER,          // Never Share your secret key
                    validate: verifyToken,                    // validate function defined above
                    verifyOptions: {algorithms: ['HS256']}  // pick a strong algorithm
                });
            server.auth.strategy(AUTH_STRATEGIES.DRIVER,
                'jwt',
                {
                    key: process.env.JWT_SECRET_DRIVER,          // Never Share your secret key
                    validate: verifyToken,                      // validate function defined above
                    verifyOptions: {algorithms: ['HS256']}   // pick a strong algorithm
                });
            server.auth.default(AUTH_STRATEGIES.USER);
        } catch (e) {
            console.log("error in auth---", e);
        }
    }
};
