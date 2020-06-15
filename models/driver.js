"use strict";

module.exports = function (sequelize, DataTypes) {
  const driver = sequelize.define(
    "drivers",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
      },
      firstName: {
        field: "first_name",
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      lastName: {
        field: "last_name",
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      phoneNo: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      countryCode: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      isoCode: {
        type: DataTypes.STRING(3),
        allowNull: false,
      },
      imageOriginal: {
        field: "image_original",
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      imageThumbnail: {
        field: "image_thumbnail",
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      vehicleImageOriginalFront: {
        field: "vehicle_image_original_front",
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      vehicleImageThumbnailFront: {
        field: "vehicle_image_thumbnail_front",
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      vehicleImageOriginalBack: {
        field: "vehicle_image_original_back",
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      vehicleImageThumbnailBack: {
        field: "vehicle_image_thumbnail_back",
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      vehiclePlateNo: {
        field: "vehicle_plateNo",
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      vehicle: {
        // vehicle name or company like Honda city
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      location: {
        type: DataTypes.GEOMETRY("POINT"),
        allowNull: false,
      },
      onDuty: {
        field: "on_duty",
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      dropOff: {                    // if driver is on ride then need to save dropoff location
        field: "drop_off",
        type: DataTypes.GEOMETRY("POINT"),
        allowNull: true,
      },
      newRide: {                  // to check driver canbe on 1 ride and can accept 1 more
        field: "new_ride",
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
    //   latitude: {
    //     type: DataTypes.FLOAT(7, 4),
    //     allowNull: false,
    //     validate: { min: -90, max: 90 },
    //     defaultValue: 0.0,
    //   },
    //   longitude: {
    //     type: DataTypes.FLOAT(7, 4),
    //     allowNull: false,
    //     validate: { min: -180, max: 180 },
    //     defaultValue: 0.0,
    //   },
      accessToken: {
        field: "access_token",
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
      },

      // status key
      status: {
        type: DataTypes.ENUM,
        values: dbDocStatusEnum,
        allowNull: false,
        defaultValue: dbDocStatusEnum[0],
      },

      // time log key
      createdAt: {
        field: "created_at",
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      tableName: "drivers",
      timestamps: false,
    }
  );

  driver.associate = (models) => {};

  return driver;
};
