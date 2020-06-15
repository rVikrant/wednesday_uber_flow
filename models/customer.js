"use strict";

module.exports = function(sequelize, DataTypes) {
    const user = sequelize.define(
        'users',
        {
            // feature keys
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true
            },
            firstName: {
                field: 'first_name',
                type: DataTypes.STRING(32),
                allowNull: false
            },
            lastName: {
                field: 'last_name',
                type: DataTypes.STRING(32),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(32),
                allowNull: false
            },
            phoneNo: {
                type: DataTypes.STRING(32),
                allowNull: false
            },
            countryCode: {
                type: DataTypes.STRING(5),
                allowNull: false
            },
            isoCode: {
                type: DataTypes.STRING(3),
                allowNull: false
            }, 
            image_original: {
                type: DataTypes.STRING(50),
                allowNull: true
            },
            image_thumbnail: {
                type: DataTypes.STRING(50),
                allowNull: true
            }, 
            location: {
                type: DataTypes.GEOMETRY('POINT'),
                allowNull: false
            },          
            accessToken: {
                field: 'access_token',
                type: DataTypes.STRING(64),
                allowNull: false,
                unique: true
            },

            // status key
            status: {
                type: DataTypes.ENUM,
                values: dbDocStatusEnum,
                allowNull: false,
                defaultValue: dbDocStatusEnum[0]
            },

            // time log key
            createdAt: {
                field: 'created_at',
                type: DataTypes.BIGINT,
                allowNull: false,
                defaultValue: sequelize.NOW
            },
        },
        {
            tableName: 'users',
            timestamps: false
        }
    );

    user.associate = (models) => {}

    return user;
};
