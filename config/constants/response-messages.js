module.exports = {
    STATUS_MSG: {
        SUCCESS: {
            DEFAULT: {
                statusCode: 200,
                message: {
                    en: 'Success'
                },
                type: 'DEFAULT'
            },
            SUCCESS: {
                statusCode: 200,
                message: {
                    en: 'Success.'
                },
                type: 'SUCCESS'
            },
            CREATED: {
                statusCode: 201,
                message: {
                    en: 'Successfully created.'
                },
                type: 'CREATED'
            }
        },
        ERROR: {
            INVALID_TOKEN_TYPE: {
                statusCode: 400,
                message: {
                    en: 'Token type must be of Bearer type.'
                },
                type: 'INVALID_TOKEN_TYPE'
            },
            INVALID_TOKEN: {
                statusCode: 401,
                message: {
                    en: 'Invalid token.'
                },
                type: 'UNAUTHORIZED'
            },
            UNAUTHORIZED: {
                statusCode: 401,
                message: {
                    en: 'You are not authorized to perform this action.'
                },
                type: 'UNAUTHORIZED'
            },
            ONELOGIN_TOKEN_NOT_COMES: {
                statusCode: 500,
                message: {
                    en: 'Sorry token is not given by one login.'
                },
                type: 'ONELOGIN_TOKEN_NOT_COMES'
            },
            SOMETHING_WENT_WRONG_ONELOGIN: {
                statusCode: 500,
                message: {
                    en: 'Something went wrong on onelogin side.'
                },
                type: 'SOMETHING_WENT_WRONG_ONELOGIN'
            },
            SOMETHING_WENT_WRONG: {
                statusCode: 500,
                message: {
                    en: 'Something went wrong on server.'
                },
                type: 'SOMETHING_WENT_WRONG'
            },
            DB_ERROR: {
                statusCode: 400,
                message: {
                    en: 'DB Error : '
                },
                type: 'DB_ERROR'
            },
            DUPLICATE: {
                statusCode: 400,
                message: {
                    en: 'Duplicate Entry'
                },
                type: 'DUPLICATE'
            },
            INVALID_EMAIL: {
                statusCode: 400,
                message: {
                    en: 'Sorry this email does not exist.'
                },
                type: 'INVALID_EMAIL'
            },
            EMAIL_ALREADY_EXIST: {
                statusCode: 400,
                message: {
                    en: 'Email address you have entered is already registered with us.'
                },
                type: 'EMAIL_ALREADY_EXIST'
            },
            PHONE_ALREADY_EXIST: {
                statusCode: 400,
                message: {
                    en: 'Contact No you have entered is already registered with us.'
                },
                type: 'PHONE_ALREADY_EXIST'
            },
            INVALID_PASSWORD: {
                statusCode: 400,
                message: {
                    en: 'Invalid password.'
                },
                type: 'INVALID_PASSWORD'
            },
            INVALID_ID: {
                statusCode: 400,
                message: {
                    en: 'Invalid id provided.'
                },
                type: 'APP_ERROR'
            },
            DRIVER_NOT_FOUND: {
                statusCode: 400,
                message: {
                    en: 'Sorry! there is no driver available near by. Please try again in a while.'
                },
                type: 'DRIVER_NOT_FOUND'
            },
            APP_ERROR: {
                statusCode: 400,
                message: {
                    en: 'Application Error.'
                },
                type: 'APP_ERROR'
            }
        }
    }
};
