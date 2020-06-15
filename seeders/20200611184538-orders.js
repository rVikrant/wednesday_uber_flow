"use strict";

const {PAYMENT_METHOD, BOOKINGSTATUS} = require("../config/constants/app-defaults").DATABASE

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "orders",
      [
        {
          id: 1234,
          order_no: "WED1234",
          user_id: 1234,
          driver_id: 1234,
          pickUp: Sequelize.fn(
            "ST_GeomFromText",
            "POINT(-76.984722 39.807222)"
          ),
          dropOff: Sequelize.fn(
            "ST_GeomFromText",
            "POINT(-76.984722 39.807222)"
          ),
          pickup_address: "Mani majra, NAC Market",
          dropoff_address: "Elante Mall",
          payment_method: PAYMENT_METHOD.CASH,
          order_total: 200,
          currency: "INR",
          card_details: "",
          reviews: "It was great ride",
          driver_rating: 4,
          user_rating: 4.5,
          promo_voucher_id: "",
          created_at: Date.now(),
          schedule_time: Date.now(),
          booking_status: BOOKINGSTATUS.COMPLETED
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("orders", null, {});
  },
};
