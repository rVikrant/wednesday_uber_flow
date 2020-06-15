"use strict";

// import local dependencies
const { logger } = require("../../lib/log-manager"),
  { findOne } = require("../../services/queries");


// auth helper function here
const checkUser = async (users, email) => {
  try {
    logger.info(`in side user auth helper checkUser fn:`);

    // check User exist
    let criteria = {
      email: email,
      status: { $ne: dbDocStatusEnum[2] }, // user deleted by admin -> exclude that
    };

    return findOne(users, { where: criteria });
  } catch (e) {
    throw e;
  }
};

module.exports = {
  checkUser: checkUser,
};
