'use strict';

// constants imported
const {API, AUTH_STRATEGIES} = require('../../config/constants/app-defaults'),
    {SUCCESS} = require('../../config/constants/response-messages').STATUS_MSG.SUCCESS;

// local modules
const responseManager = require('../../lib').responseManager,
    ErrorResponse = responseManager.wrapError('UserRoute'),
    SuccessResponse = responseManager.sendSuccess;

const routeValidator = require('./validators'),
    Controller = require('./controller')
;

let routesWithoutAuth = [

        // user login
        {
            method: 'POST',
            path: `/user/${API.VERSIONS.v1}/login`,
            config: {
                description: 'user login route',
                auth: false,
                tags: ['api', 'user', 'login', 'signin'],
                handler: async (request, h) => {
                    try {
                        let responseData = await Controller.login(request.payload);
                        return SuccessResponse('en', SUCCESS, responseData);
                    } catch (err) {
                        return ErrorResponse('en', 'UserController.login', err, request.payload);
                    }
                },
                validate: routeValidator.login,
                plugins: formDataPlugin
            }
        },
    ]
;

let routesWithAuth = [
    // user route to get past bookings
    {
        method: 'GET',
        path: `/user/${API.VERSIONS.v1}/bookings`,
        config: {
            description: 'user login route',
            auth: AUTH_STRATEGIES.USER,
            tags: ['api', 'user', 'bookings', 'orders'],
            handler: async (request, h) => {
                try {
                    let responseData = await Controller.bookings(request.query, request.auth.credentials);
                    return SuccessResponse('en', SUCCESS, responseData);
                } catch (err) {
                    return ErrorResponse('en', 'UserController.bookings', err, request.query);
                }
            },
            validate: routeValidator.bookings,
            plugins: formDataPlugin
        }
    },

    // user route to get near by cabs/drivers
    {
        method: 'GET',
        path: `/user/${API.VERSIONS.v1}/drivers`,
        config: {
            description: 'user api to search near by drivers/cab',
            auth: AUTH_STRATEGIES.USER,
            tags: ['api', 'user', 'drivers', 'cabs'],
            handler: async (request, h) => {
                try {
                    let responseData = await Controller.driversNearBy(request.query, request.auth.credentials);
                    return SuccessResponse('en', SUCCESS, responseData);
                } catch (err) {
                    return ErrorResponse('en', 'UserController.driversNearBy', err, request.query);
                }
            },
            validate: routeValidator.drivers,
            plugins: formDataPlugin
        }
    },

    // user route to request for booking
    {
        method: 'POST',
        path: `/user/${API.VERSIONS.v1}/booking`,
        config: {
            description: 'user api to request for the booking',
            auth: AUTH_STRATEGIES.USER,
            tags: ['api', 'user', 'drivers', 'cabs', 'booking', 'request'],
            handler: async (request, h) => {
                try {
                    let responseData = await Controller.bookingRequest(request.payload, request.auth.credentials);
                    return SuccessResponse('en', SUCCESS, responseData);
                } catch (err) {
                    return ErrorResponse('en', 'UserController.bookingRequest', err, request.query);
                }
            },
            validate: routeValidator.bookingRequest,
            plugins: formDataPlugin
        }
    },
];

module.exports = [...routesWithoutAuth, ...routesWithAuth];
