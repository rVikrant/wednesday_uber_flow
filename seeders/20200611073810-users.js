"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      id: 1234,
      first_name: "Vikrant",
      last_name: "Rao",
      email: "vr@yopmail.com",
      phoneNo: "1234567890",
      countryCode: "+91",
      isoCode: "IN",
      image_original: "",
      image_thumbnail: "",
      access_Token: "",
      created_at: Date.now(),
      location: Sequelize.fn('ST_GeomFromText', 'POINT(-76.984722 39.807222)')
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
