// constructor
const Boom = require('boom');

// constants imported
const CONSTANTS = require('../config/constants');
const RESPONSE_MESSAGES = CONSTANTS.responseMessages;

// local modules
const LogManager = require('./log-manager');

const sendError = function (language, data) {
	if (typeof data == 'object' && data.hasOwnProperty('statusCode') && data.hasOwnProperty('message')) {
		console.log('attaching resposnetype', data);
		let msg = data.message[language || 'en'];
		msg = msg.replace(msg.charAt(0), msg.charAt(0).toUpperCase());
		let errorToSend =  Boom.create(data.statusCode, msg);
		console.log('after resposnetype', errorToSend);
		errorToSend.output.payload.responseType = data.type;
		return errorToSend;
	} else {
		let errorToSend = '';
		if (typeof data == 'object') {
			if (data.name == 'MongoError') {
				errorToSend += RESPONSE_MESSAGES.STATUS_MSG.ERROR.DB_ERROR.message[language || 'en'];
				if (data.code = 11000) {
					let duplicateValue = data.errmsg && data.errmsg.substr(data.errmsg.lastIndexOf('{ : "') + 5);
					duplicateValue = duplicateValue.replace('}', '');
					errorToSend += RESPONSE_MESSAGES.STATUS_MSG.ERROR.DUPLICATE.message[language || 'en'] + " : " + duplicateValue;
					if (data.message.indexOf('customer_1_streetAddress_1_city_1_state_1_country_1_zip_1') > -1) {
						errorToSend = RESPONSE_MESSAGES.STATUS_MSG.ERROR.DUPLICATE.message[language || 'en'];
					}
				}
			} else if (data.name == 'ApplicationError') {
				errorToSend += RESPONSE_MESSAGES.STATUS_MSG.ERROR.APP_ERROR.message[language || 'en'] + ' : ';
			} else if (data.name == 'ValidationError') {
				errorToSend += RESPONSE_MESSAGES.STATUS_MSG.ERROR.APP_ERROR.message[language || 'en'] + data.message;
			} else if (data.name == 'CastError') {
				errorToSend += RESPONSE_MESSAGES.STATUS_MSG.ERROR.DB_ERROR.message[language || 'en'] + RESPONSE_MESSAGES.STATUS_MSG.ERROR.INVALID_ID.message[language || 'en'] + data.value;
			} else if(data.code === 'ENOENT') {
				errorToSend += RESPONSE_MESSAGES.STATUS_MSG.ERROR.APP_ERROR.message[language || 'en'] + `no such file or directory at path {data.path}`;
			}
		} else {
			errorToSend = data;
		}
		let customErrorMessage = errorToSend;
		if (typeof customErrorMessage == 'string') {
			if (errorToSend.indexOf("[") > -1) {
				customErrorMessage = errorToSend.substr(errorToSend.indexOf("["));
			}
			customErrorMessage = customErrorMessage && customErrorMessage.replace(/"/g, '');
			customErrorMessage = customErrorMessage && customErrorMessage.replace('[', '');
			customErrorMessage = customErrorMessage && customErrorMessage.replace(']', '');

			customErrorMessage = customErrorMessage.replace(customErrorMessage.charAt(0), customErrorMessage.charAt(0).toUpperCase());
		}

		return   Boom.create(400, customErrorMessage);
	}
};

const sendSuccess = function (language,successMsg, data) {
	successMsg = successMsg || RESPONSE_MESSAGES.STATUS_MSG.SUCCESS.DEFAULT.message;
	if (typeof successMsg == 'object' && successMsg.hasOwnProperty('statusCode') && successMsg.hasOwnProperty('message')) {
		return {
			meta : {
				type	: 'success',
				statusCode	: successMsg.statusCode,
				message : successMsg.message[language || 'en']
			},
			data : data || {}
		};

	} else {
		return {
			meta : {
				type	: 'success',
				statusCode	: 200,
				message : successMsg
			},
			data : {
				data : data || {}
			}
		};
	}
};

const wrapError = (sourceFile) => {
	return (language,sourceMethod, error, userPostedData) => {
		try {
			LogManager.logResponeError(sourceFile, sourceMethod, error, userPostedData);
			return sendError(language, error);
		} catch (err) {
			LogManager.logger.error(err);
			console.error(err);
		}
	};
};

module.exports = {
	sendError: sendError,
	sendSuccess: sendSuccess,
	wrapError: wrapError
};
