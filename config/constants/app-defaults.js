module.exports = {
    APP: {
        NAME: 'Booking Flow Wednesday'
    },
    SERVER: {
        HOST: 'localhost',
        PORT: 7000
    },
    API: {
        VERSIONS: {
            v1: 'v1'
        }
    },
    JWT_SECRET: {
        USER: process.env.JWT_SECRET_USER,
        DRIVER: process.env.JWT_SECRET_DRIVER,
    },
    AUTH_STRATEGIES: {
        USER: 'USER',
        DRIVER: 'DRIVER',
    },
    ROUTE: {
        BOOKINGS: {
            PAST: "PAST",
            ONGOING: "ONGOING",
            UPCOMING: "UPCOMING"
        }
    },
    DATABASE: {
        DOC_STATUSES: {                // DB DOCUMENTS
            ACTIVE: 'ACTIVE',
            BLOCKED: 'BLOCKED',
            DELETED: 'DELETED',
        },
        DEVICE_TYPES: {
            WEB: 'WEB',
            IOS: 'IOS',
            ANDROID: 'ANDROID',
        },
        LANGUAGES: {
            EN: 'en',
        },
        PAYMENT_METHOD: {
            CARD: "CARD",
            CASH: "CASH"
        },
        BOOKINGSTATUS: {
            START: "DRIVER_START",
            ACCEPT: "REQUEST_ACCEPTED",
            PENDING: "REQUEST_PENDING",
            REACHED: "DRIVER_REACHED",
            CANCELLED: "REQUEST_CANCELLED",
            COMPLETED: "ORDER_COMPLETED",
            SERVICE_START: "DRIVER_START_SERVICE",
        }
    },
    DB_LOGGER_TYPES: {
        ERROR: {
            CLIENT: 'CLIENT',
            SERVER: 'SERVER',
            THIRD_PARTY: 'THIRD PARTY'
        },
        LOGGER: {
            REQUEST: 'REQUEST',
            RESPONSE: 'RESPONSE',
            CRON: 'CRON',
            BACKEND_PROCESS: 'BACEKND PROCESS'
        }
    }
};
