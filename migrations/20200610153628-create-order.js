"use strict";

// constants imported
const { DATABASE } = require("../config/constants/app-defaults");

// globals for app
let dbDocStatusEnum = [
    DATABASE.DOC_STATUSES.ACTIVE,
    DATABASE.DOC_STATUSES.BLOCKED,
    DATABASE.DOC_STATUSES.DELETED,
  ],
  PAYMENT_METHOD = [DATABASE.PAYMENT_METHOD.CARD, DATABASE.PAYMENT_METHOD.CASH],
  bookingStatus = [
    DATABASE.BOOKINGSTATUS.PENDING,
    DATABASE.BOOKINGSTATUS.ACCEPT,
    DATABASE.BOOKINGSTATUS.START,
    DATABASE.BOOKINGSTATUS.REACHED,
    DATABASE.BOOKINGSTATUS.CANCELLED,
    DATABASE.BOOKINGSTATUS.COMPLETED,
    DATABASE.BOOKINGSTATUS.SERVICE_START,
];
  ;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable(
        "orders",
        {
          // order feature keys
          id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          orderNo: {
            field: "order_no",
            type: Sequelize.STRING(32),
            allowNull: false,
          },
          userId: {
            field: "user_id",
            type: Sequelize.INTEGER(11),
            allowNull: false,
            references: {
              model: "users",
              key: "id",
            },
            onDelete: "CASCADE",
          },
          driverId: {
            field: "driver_id",
            type: Sequelize.INTEGER(11),
            allowNull: false,
            references: {
              model: "drivers",
              key: "id",
            },
            onDelete: "CASCADE",
          },
          pickUp: {
            type: Sequelize.GEOMETRY("POINT"),
            allowNull: false,
          },
          dropOff: {
            type: Sequelize.GEOMETRY("POINT"),
            allowNull: false,
          },
          pickUpAddress: {
            field: "pickup_address",
            type: Sequelize.STRING(100),
            allowNull: false,
          },
          dropOffAddress: {
            field: "dropoff_address",
            type: Sequelize.STRING(100),
            allowNull: false,
          },
          paymentMethod: {
            field: "payment_method",
            type: Sequelize.ENUM,
            values: PAYMENT_METHOD,
            allowNull: false,
          },
          orderTotal: {
            field: "order_total",
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          cardsDetails: {
            // in case of card payment need to maintain card details
            field: "card_details",
            type: Sequelize.STRING(100),
            allowNull: true,
          },
          reviews: {
            type: Sequelize.STRING(100),
            allowNull: true,
          },
          driverRating: {
            // driver rated
            field: "driver_rating",
            type: Sequelize.INTEGER,
            validate: { min: 1, max: 5 },
          },
          userRating: {
            // user rated
            field: "user_rating",
            type: Sequelize.INTEGER,
            validate: { min: 1, max: 5 },
          },
          promoVoucherId: {
            field: "promo_voucher_id",
            type: Sequelize.STRING(20),
            allowNull: true,
          },
          currency: {
            type: Sequelize.STRING(10),
            allowNull: true,
            defaultValue: "INR",
          },
          scheduleTime: {
            field: "schedule_time",
            type: Sequelize.BIGINT,
            allowNull: false,
            defaultValue: Sequelize.NOW,
          },
          bookingStatus: {
            field: "booking_status",
            type: Sequelize.ENUM,
            values: bookingStatus,
            allowNull: false,
            defaultValue: bookingStatus[0]
          },

          // status key
          status: {
            type: Sequelize.ENUM,
            values: dbDocStatusEnum,
            allowNull: false,
            defaultValue: dbDocStatusEnum[0],
          },

          // time log key
          createdAt: {
            field: "created_at",
            type: Sequelize.BIGINT,
            allowNull: false,
            defaultValue: Sequelize.NOW,
          },
        },
        {
          tableName: "orders",
          timestamps: false,
        }
      )
      .then(() => {return queryInterface.addIndex('orders', {unique: false, fields: ['booking_status']})})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("orders");
  },
};
