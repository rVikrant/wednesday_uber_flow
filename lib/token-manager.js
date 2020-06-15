'use strict';
// npm modules
const jwt = require('jsonwebtoken');

// constants imported
const CONSTANTS = require('../config/constants');
const RESPONSE_MESSAGES = CONSTANTS.responseMessages;

// local modules imported
const {findOne} = require('../services').queries;
const {users} = require('../models');
const UniversalFunctions = require('../utils').universalFunctions;
const Logger = require('./log-manager').logger;


let generateToken = (tokenData, userType) => {
    try {
        let secretKey;
        switch (userType) {
            case CONSTANTS.appDefaults.AUTH_STRATEGIES.USER:
                secretKey = CONSTANTS.appDefaults.JWT_SECRET.USER;
                break;
            case CONSTANTS.appDefaults.AUTH_STRATEGIES.DRIVER:
                secretKey = CONSTANTS.appDefaults.JWT_SECRET.DRIVER;
                break;
            default:
                secretKey = CONSTANTS.appDefaults.JWT_SECRET.USER;
        }
        return jwt.sign(tokenData, secretKey, { algorithm: 'HS256', expiresIn: '1h' });
    } catch (err) {
        throw err;
    }
};


let verifyToken = async (tokenData) => {
    console.log("token data---", tokenData);
    let user, options = {
        where: {
            id: tokenData.id,
        }
    };;
    try {
        if (tokenData.scope === CONSTANTS.appDefaults.AUTH_STRATEGIES.USER) {
            user = await findOne(users, options);
        } else if (tokenData.scope === CONSTANTS.appDefaults.AUTH_STRATEGIES.DRIVER) {
            user = await findOne(users, options);
        }

        if (!!user && !!user.id) {
            user.scope = tokenData.scope;
            return {
                isValid: true,
                credentials: user
            };
        } else {
            return {
                isValid: false,
                errorMessage: RESPONSE_MESSAGES.STATUS_MSG.ERROR.UNAUTHORIZED.message.en
            }
        }
    } catch (err) {
        Logger.error(err);
    }

};

module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken
};
