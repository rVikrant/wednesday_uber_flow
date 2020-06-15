// npm modules
require('dotenv').config({path: './.env'});
const joi = require('joi');

const envVarsSchema = joi.object({
	NODE_ENV: joi.string()
		.allow(['dev', 'prod', 'test'])
		.required(),
	PORT: joi.number()
		.required(),

    // db variables
    DB_URI: joi.string()
		.required()
  }).unknown()
.required();


const { error, value: envVars } = joi.validate(process.env, envVarsSchema)
if (error) {
	throw new Error(`Enviorment validation error: ${error.message}`);
};
