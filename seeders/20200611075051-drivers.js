'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('drivers', [{
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
      on_duty: false,
      created_at: Date.now(),
      location: Sequelize.fn('ST_GeomFromText', 'POINT(-76.984722 39.807222)'),
    },
    {
      id: 1235,
      first_name: "Vikrant",
      last_name: "Rao",
      email: "vro@yopmail.com",
      phoneNo: "1234567809",
      countryCode: "+91",
      isoCode: "IN",
      image_original: "",
      image_thumbnail: "",
      access_Token: "",
      on_duty: true,
      created_at: Date.now(),
      location: Sequelize.fn('ST_GeomFromText', 'POINT(-76.984722 39.807222)'),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('drivers', null, {});
  }
};
