'use strict';
module.exports = (sequelize, DataTypes) => {
    const Reservation = sequelize.define('reservation', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        clock_size: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        start_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        finish_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
    }, {timestamps: false});
    Reservation.associate = function (models) {
        Reservation.belongsTo(models.city, {foreignKey: 'city_id', foreignKeyConstraint: true});
        Reservation.belongsTo(models.watchmaker, {foreignKey: 'watchmaker_id', foreignKeyConstraint: true})
    };
    return Reservation;
};