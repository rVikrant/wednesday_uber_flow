"use strict";

// constants imported
const { DATABASE } = require("../config/constants/app-defaults");

// globals for app
global.dbDocStatusEnum = [
  DATABASE.DOC_STATUSES.ACTIVE,
  DATABASE.DOC_STATUSES.BLOCKED,
  DATABASE.DOC_STATUSES.DELETED,
];

global.formDataPlugin = {
  "hapi-swagger": {
    payloadType: "form",
  },
};

global.defaultPlugin = {
  "hapi-swagger": {
    // payloadType: 'form'
  },
};


// db connection
(() => {
  require("../services/db-connection")().catch((e) => {
    console.log("error in db---", e);

    // if db not connected exit the process
    process.exit(1);
  });
})();