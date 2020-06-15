'use strict';

// validate enviorment file &&  bootstrap   ----> please don't change order for below 2 lines
require('./env-validation');
require('./utils/bootstrap');

// npm modules
const Hapi = require('hapi');

// local modules
const Routes = require('./api');
const Plugins = require('./plugins');
const {logger} = require('./lib/log-manager');
const {APP, SERVER} = require('./config/constants/app-defaults');

// Create Server
let server = new Hapi.Server({
	app: {
		name: APP.NAME
	},
	port: process.env.PORT || SERVER.PORT,
	routes: {
		cors: true
	}
});

(async initServer => {
	try {

		// Register All Plugins
		await server.register(Plugins);

		// API Routes
		await server.route(Routes);

		server.events.on('response', request => {
			logger.info( `[${request.method.toUpperCase()} ${request.url.path} ](${request.response.statusCode}) : ${request.info.responded - request.info.received} ms`);
		});

		// Default Routes
		server.route([{
			method: 'GET',
			path: '/',
			handler: (request, h) => {
				return `WELCOME To ${APP.NAME}`;
			},
			config: {
				auth: false
			}
		},{
        method: 'GET',
        path: '/{file*}',
        handler:  {
            directory: {
                path: 'Uploads/'
            }
        },
        config: {
            auth: false
        }
    }]);

		// hapi swagger workaround(but a ugly hack for version 9.0.1)
		server.ext('onRequest', async (request, h) => {
			request.headers['x-forwarded-host'] = (request.headers['x-forwarded-host'] || request.info.host);
			return h.continue;
		});


		server.ext('onPreAuth', (request, h) => {
			logger.info( `onPreAuth`);
			return h.continue;
		});

		server.ext('onCredentials', (request, h) => {
			logger.info( `onCredentials`);
			return h.continue;
		});

		server.ext('onPostAuth', (request, h) => {
			logger.info( `onPostAuth`);
			return h.continue;
		});

		// Start Server

		await server.start();

		logger.info( `Server running at ${server.info.uri}`);
	} catch (e) {
		logger.info(`error in server start --- \t ${e}`);
		logger.error(e);
	}
})();

// check and catch for unhandled rejection errors
process.on('unhandledRejection', err => {
    console.log(err, "un handles error");
    process.exit(1);
});

module.exports = server;
