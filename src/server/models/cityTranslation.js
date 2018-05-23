'use strict';

module.exports = (sequelize, DataTypes) => {
    const CityTranslation = sequelize.define('city_translation', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        language: {
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
    CityTranslation.associate = function (models) {
        CityTranslation.belongsTo(models.city, {foreignKey: 'city_id', foreignKeyConstraint: true})
    };
    return CityTranslation;
};