"use strict";

// constants imported
const { DATABASE } = require("../config/constants/app-defaults");

// globals for app
let dbDocStatusEnum = [
  DATABASE.DOC_STATUSES.ACTIVE,
  DATABASE.DOC_STATUSES.BLOCKED,
  DATABASE.DOC_STATUSES.DELETED,
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable(
        "drivers",
        {
          id: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            primaryKey: true,
          },
          firstName: {
            field: "first_name",
            type: Sequelize.STRING(32),
            allowNull: false,
          },
          lastName: {
            field: "last_name",
            type: Sequelize.STRING(32),
            allowNull: false,
          },
          email: {
            type: Sequelize.STRING(32),
            allowNull: false,
          },
          phoneNo: {
            type: Sequelize.STRING(32),
            allowNull: false,
          },
          countryCode: {
            type: Sequelize.STRING(5),
            allowNull: false,
          },
          isoCode: {
            type: Sequelize.STRING(3),
            allowNull: false,
          },
          imageOriginal: {
            field: "image_original",
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          imageThumbnail: {
            field: "image_thumbnail",
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          vehicleImageOriginalFront: {
            field: "vehicle_image_original_front",
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          vehicleImageThumbnailFront: {
            field: "vehicle_image_thumbnail_front",
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          vehicleImageOriginalBack: {
            field: "vehicle_image_original_back",
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          vehicleImageThumbnailBack: {
            field: "vehicle_image_thumbnail_back",
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          vehiclePlateNo: {
            field: "vehicle_plateNo",
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          vehicle: {
            // vehicle name or company like Honda city
            type: Sequelize.STRING(50),
            allowNull: true,
          },
          location: {
            type: Sequelize.GEOMETRY("POINT"),
            allowNull: false,
          },
          onDuty: {
            field: "on_duty",
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          accessToken: {
            field: "access_token",
            type: Sequelize.STRING(64),
            allowNull: false,
            unique: true,
          },
          newRide: {                  // to check driver canbe on 1 ride and can accept 1 more
            field: "new_ride",
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
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
          tableName: "drivers",
          timestamps: false,
        }
      )
      // .then(() => {
      //   return [
      //     queryInterface.addColumn("drivers", "new_ride",
      //       {type: Sequelize.BOOLEAN,
      //       allowNull: false,
      //       defaultValue: false
      //     }),
      //   ];
      // });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("drivers");
  },
};
