"use strict";

// npm modules
const joi = require("joi");

// local modules
const {
    failActionFunction,
    authorizationHeaderObj,
  } = require("../../utils/universal-functions"),
  { ROUTE, DATABASE } = require("../../config/constants/app-defaults");

const BOOKINGS = ROUTE.BOOKINGS,
  PAYMENT_METHOD = DATABASE.PAYMENT_METHOD;

let validator = {};

validator.login = {
  payload: {
    email: joi
      .string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required()
      .lowercase(),
    password: joi.string().optional().min(4).alphanum(),
  },
  failAction: failActionFunction,
};

validator.bookings = {
  query: {
    skip: joi
      .number()
      .min(0)
      .description("records count to skip in output from beginning"),
    limit: joi.number().min(20).description("records count to get in output"),
    bookings: joi
      .string()
      .valid([BOOKINGS.PAST, BOOKINGS.ONGOING, BOOKINGS.UPCOMING])
      .required()
      .description("bookings to view like past, upcoming, ongoing"),
  },
  failAction: failActionFunction,
  headers: authorizationHeaderObj,
};

validator.drivers = {
  query: {
    lat: joi
      .number()
      .min(-90)
      .max(90)
      // .required()
      .description("user current location latitude"),
    long: joi
      .number()
      .min(-180)
      .max(180)
      // .required()
      .description("user current location longitude"),
    distance: joi
      .number()
      .description(
        "distance in which from lat long you want to get drivers in miles"
      ),
  },
  failAction: failActionFunction,
  headers: authorizationHeaderObj,
};

validator.bookingRequest = {
  payload: {
    pickUp: joi
      .array()
      .ordered(joi.number().min(-90).max(90), joi.number().min(-180).max(180))
      .description("lat long here in array like [lat, long]"),
    dropOff: joi
      .array()
      .ordered(joi.number().min(-90).max(90), joi.number().min(-180).max(180))
      .description("lat long here in array like [lat,long]"),
    baseCharges: joi.number().required().min(0).description("base fair of selected ride type"),
    scheduleTime: joi.number().required().description("order time in milliseconds"),
    paymentMethod: joi
      .string()
      .valid([PAYMENT_METHOD.CARD, PAYMENT_METHOD.CASH])
      .required(),
    pickUpAddress: joi.string().required().description("pick up address in string"),
    orderDistance: joi.number().required().min(1).description("travel distance as per pickup and dropoff"),
    dropOffAddress: joi.string().required().description("drop off address in string"),
    perDistanceChanges: joi.number().required().min(0).description('per distance charge as per the ride type'),
  },
  failAction: failActionFunction,
  headers: authorizationHeaderObj,
};

module.exports = validator;
