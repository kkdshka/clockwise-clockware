'use strict';

module.exports = (sequelize, DataTypes) => {
    const City =  sequelize.define('city', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        timezone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
    }, {timestamps: false});

    City.associate = models => {
        City.hasMany(models.city_translation, {foreignKey: 'city_id', hooks: true, onDelete: 'cascade'});
    };
    return City;
};