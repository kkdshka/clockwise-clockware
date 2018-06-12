'use strict';
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('token_lifetime', {
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lifetime_end: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        is_used: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
    }, {timestamps: false});
};