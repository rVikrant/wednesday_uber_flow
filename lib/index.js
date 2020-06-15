/**
 * Makes all libraries available through a single require.
 */

module.exports = {
	tokenManager	: require('./token-manager'),
	loggerManager	: require('./log-manager'),
	responseManager : require('./response-manager')
};
