"use strict";

const {PAYMENT_METHOD, BOOKINGSTATUS} = require("../config/constants/app-defaults").DATABASE;

const bookingStatus = [
    BOOKINGSTATUS.PENDING,
    BOOKINGSTATUS.ACCEPT,
    BOOKINGSTATUS.START,
    BOOKINGSTATUS.REACHED,
    BOOKINGSTATUS.CANCELLED,
    BOOKINGSTATUS.COMPLETED,
    BOOKINGSTATUS.SERVICE_START,
];

module.exports = function(sequelize, DataTypes) {
    let order = sequelize.define(
        'orders',
        {
            // order feature keys
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            orderNo: {
                field: "order_no",
                type: DataTypes.STRING(32),
                allowNull: false
            }, 
            userId: {
                field: "user_id",
                type: DataTypes.INTEGER(11),
                allowNull: false
            }, 
            driverId: {
                field: "driver_id",
                type: DataTypes.INTEGER(11),
                allowNull: false
            },          
            pickUp: {
                type: DataTypes.GEOMETRY('POINT'),
                allowNull: false
            },
            dropOff: {
                type: DataTypes.GEOMETRY('POINT'),
                allowNull: false
            },
            pickUpAddress: {
                field: "pickup_address",
                type: DataTypes.STRING(100),
                allowNull: false
            },
            dropOffAddress: {
                field: "dropoff_address",
                type: DataTypes.STRING(100),
                allowNull: false
            },
            paymentMethod: {
                field: "payment_method",
                type: DataTypes.ENUM,
                values: [PAYMENT_METHOD.CASH, PAYMENT_METHOD.CARD],
                allowNull: false
            },
            orderTotal: {
                field: "order_total",
                type: DataTypes.INTEGER,
                allowNull: false 
            },
            cardsDetails: {                      // in case of card payment need to maintain card details
                field: "card_details",
                type: DataTypes.STRING(100),
                allowNull: true 
            },
            reviews: {
                type: DataTypes.STRING(100),
                allowNull: true
            },
            driverRating: {                                 // driver rated 
                field: "driver_rating",
                type: DataTypes.INTEGER,
                validate: {min: 1, max: 5}
            },
            userRating: {                                    // user rated
                field: "user_rating",
                type: DataTypes.INTEGER,
                validate: {min: 1, max: 5}
            },
            promoVoucherId: {
                field: "promo_voucher_id",
                type: DataTypes.STRING(20),
                allowNull: true
            },
            currency: {
                type: DataTypes.STRING(10),
                allowNull: true,
                defaultValue: "INR"
            },
            scheduleTime: {                               // for the time booking/order scheduled
                field: 'schedule_time',
                type: DataTypes.BIGINT,
                allowNull: false,
                defaultValue: sequelize.NOW
            },

                    
            // status key
            status: {
                type: DataTypes.ENUM,
                values: dbDocStatusEnum,
                allowNull: false,
                defaultValue: dbDocStatusEnum[0]
            },
            bookingStatus: {
                field: 'booking_status',
                type: DataTypes.ENUM,
                values: bookingStatus,
                allowNull: false,
                defaultValue: bookingStatus[0]
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
            tableName: 'orders',
            timestamps: false
        }
    );

    // order associates with other models
    order.associate = (models) => {
        // user and driver associates
        order.belongsTo(models.users, {as: "user", foreignKey: "user_id", sourceKey: "id", onDelete: "cascade"})
        order.belongsTo(models.drivers, {as: "driver", foreignKey: "driver_id", sourceKey: "id", onDelete: "cascade"})

        // order associate to promo voucher but as we don't have that model so comment it
        // order.belongsTo(models.promo_vouchers, {as: "promoVoucher", foreignKey: "promo_voucher_id", sourceKey: "id", onDelete: "cascade"})
    }

    // return order model
    return order;
};
