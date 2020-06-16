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
    return queryInterface.createTable(
      "users",
      {
        id: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
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
          unique: true,
          // index: true
        },
        phoneNo: {
          type: Sequelize.STRING(16),
          allowNull: false
        },
        countryCode: {
          type: Sequelize.STRING(5),
          allowNull: false,
        },
        isoCode: {
          type: Sequelize.STRING(3),
          allowNull: false,
        },
        image_original: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        image_thumbnail: {
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        location: {
          type: Sequelize.GEOMETRY("POINT"),
          allowNull: false,
        },
        accessToken: {
          field: "access_token",
          type: Sequelize.STRING(64),
          allowNull: true,
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
        tableName: "users",
        timestamps: false,
      }
    )
    .then(() => {return queryInterface.addIndex('users', {unique: false, fields: ['status']})})
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("users");
  },
};
