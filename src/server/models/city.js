'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('city', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
    }, {timestamps: false});
};