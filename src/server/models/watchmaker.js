'use strict';
module.exports = (sequelize, DataTypes) => {
    const Watchmaker = sequelize.define('watchmaker', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: DataTypes.INTEGER,
        avatar:DataTypes.STRING,
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
    }, {timestamps: false});
    Watchmaker.associate = function (models) {
        Watchmaker.belongsTo(models.city, {foreignKey: 'city_id', foreignKeyConstraint: true})
    };
    return Watchmaker;
};