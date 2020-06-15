"use strict";

// constants imported
const {
  AUTH_STRATEGIES,
  DATABASE,
  ROUTE,
} = require("../../config/constants/app-defaults");
const {
  INVALID_EMAIL,
  DRIVER_NOT_FOUND,
  INVALID_PASSWORD,
  EMAIL_ALREADY_EXIST,
  PHONE_ALREADY_EXIST,
} = require("../../config/constants/response-messages").STATUS_MSG.ERROR;

// local modules
const { logger } = require("../../lib/log-manager");
const { users, orders, drivers } = require("../../models");
const { checkUser } = require("./helper");
const { generateToken } = require("../../lib/token-manager");
const {
  compareHashPassword,
  generateRandomNumber,
} = require("../../utils/universal-functions");
const {
  update,
  saveData,
  findAndCountAllWithReferences,
  findAndCountAll,
} = require("../../services/queries");

// npm modules required
const sequelize = require("sequelize");

const login = async (payload) => {
  try {
    logger.info(`\n user controller login fn: ......\n`);

    let userData = await checkUser(users, payload.email);

    if (!!userData && userData.id) {
      // generating token
      let tokenData = {
        id: userData.id,
        scope: AUTH_STRATEGIES.USER, //  that this token belongs to user
      };

      return {
        userData,
        accessToken: await generateToken(tokenData, AUTH_STRATEGIES.USER),
      };
    } else {
      throw INVALID_EMAIL;
    }

    // if (!!userData && userData.id) {                  // user exist -> check password else throw error for same
    //     if (compareHashPassword(payload.password, userData.password)) {
    //         // generating token
    //         let tokenData = {
    //             _id: userData._id,
    //             scope: AUTH_STRATEGIES.USER
    //         };

    //         userData.accessToken = generateToken(tokenData, AUTH_STRATEGIES.USER);

    //         if (process.env.NODE_ENV !== "LIVE") {
    //             userData = await update(users, {accessToken: userData.accessToken},{where:{id: userData.id}})
    //         }

    //             // removing unwanted fields
    //             delete userData.password;
    //

    //     return userData;
    // } else {
    //     throw INVALID_PASSWORD;
    // }
    // } else {
    //     throw INVALID_EMAIL;
    // }
  } catch (e) {
    logger.log("error", `error in user controller login fn: .... \n :${e}`);
    throw e;
  }
};

////////////////////////////////// user controller fn Bookings: to get bookings as for the user

// bookingStatus: upcoming, past, ongoings -> check for each status type -> if exist return bookings. else -> return []
const bookings = async (query, user) => {
  try {
    let criteria = {
      status: dbDocStatusEnum[0],
    };

    // set criteria as per the booking request(query)
    switch (query.bookings) {
      case ROUTE.BOOKINGS.PAST: {
        criteria.booking_status = {
          $in: [
            DATABASE.BOOKINGSTATUS.COMPLETED,
            DATABASE.BOOKINGSTATUS.CANCELLED,
          ],
        };

        break;
      }
      case ROUTE.BOOKINGS.ONGOING: {
        criteria.booking_status = {
          $in: [
            DATABASE.BOOKINGSTATUS.START,
            DATABASE.BOOKINGSTATUS.REACHED,
            DATABASE.BOOKINGSTATUS.SERVICE_START,
          ],
        };

        break;
      }
      default: {
        criteria.booking_status = {
          $in: [DATABASE.BOOKINGSTATUS.ACCEPT, DATABASE.BOOKINGSTATUS.PENDING],
        };
      }
    }

    let { count, rows } = await findAndCountAllWithReferences(
      orders,
      {
        where: criteria,
        order: [["scheduleTime", "DESC"]],
        offset: query.skip || 0,
        limit: query.limit || 20,
      },
      [
        {
          model: drivers,
          as: "driver",
          required: true,
          attributes: ["firstName", "lastName"],
        },
      ]
    );

    return {
      count,
      data: rows,
    };
  } catch (e) {
    logger.log("error", `error in user controller bookings fn: .... \n :${e}`);
    throw e;
  }
};

//////////////////////////////////////////// user controller fn drivers:

// get lat long -> query database and get driver nearby this lat long
const driversNearBy = async (query, user) => {
  try {
    // if lat long not exist in query then get nearby drivers of user location
    const lat = parseFloat(query.lat) || user.location.coordinates[0],
      long = parseFloat(query.long) || user.location.coordinates[1],
      distance = sequelize.literal(
        "6371 * acos(cos(radians(" +
          lat +
          `)) * cos(radians(ST_X(location))) * cos(radians(` +
          long +
          `) - radians(ST_Y(location))) + sin(radians(` +
          lat +
          `)) * sin(radians(ST_X(location))))`
      );

    let options = {
      where: {
        $and: [{ status: dbDocStatusEnum[0] }, { onDuty: true }],
      },
      attributes: {
        exclude: ["accessToken", "createdAt"],
        include: [[distance, "distance"]],
      },
      order: distance,
      limit: 20,
    };

    if ("distance" in query) {
      options.where.$and.push(sequelize.where(distance, {
        $lte: parseInt(query.distance),
      }));
    }

    if ("newRide" in query) {
      options.where.$and.push({newRide: false});
    }

    let { count, rows } = await findAndCountAll(drivers, options);

    return {
      count,
      data: rows,
    };
  } catch (e) {
    logger.log(
      "error",
      `error in user controller driversNearBy fn: .... \n :${e}`
    );
    throw e;
  }
};

///////////////////////////////////////// user request booking

//  user controller fn: bookingRequest
const bookingRequest = async (payload, user) => {
  try {
    // first find nearest drivers -> get the ETA as per the driver location -> if on ride then check
    // with droff off coordinates to i.e. [driverloc, dropoff, user location] else [driverloc, userloc]
    // assign driver with least ETA from google distance matrix api

    // in lack ETA -> get nearest driver and if available -> assign booking to that

    let dataToSave = {
        orderNo: "WED" + generateRandomNumber(),
        userId: user.id,
        scheduleTime: payload.scheduleTime,
        pickUp: { type: "Point", coordinates: payload.pickUp },
        dropOff: { type: "Point", coordinates: payload.dropOff },
        paymentMethod: payload.paymentMethod,
        pickUpAddress: payload.pickUpAddress,
        dropOffAddress: payload.dropOffAddress,
        createdAt: Date.now(),
      },
      { data } = await driversNearBy({ distance: 5, newRide: false }, user); // 5 kms

    if (data && !data.length) {
      throw DRIVER_NOT_FOUND;
    }

    dataToSave.driverId = data[0].id;

    // order total depends on the parameters as per the requirement, now considering per distance charges
    dataToSave.orderTotal =
      payload.baseCharges + payload.perDistanceChanges * payload.orderDistance;

    console.log("data to save---", dataToSave);

    // save/create order and return it and send notification to near by drivers

    return await saveData(orders, dataToSave);
  } catch (e) {
    logger.log(
      "error",
      `error in user controller bookingRequest fn: .... \n :${e}`
    );
    throw e;
  }
};

module.exports = {
  login: login,
  bookings: bookings,
  driversNearBy: driversNearBy,
  bookingRequest: bookingRequest,
};
