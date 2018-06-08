'use strict';

module.exports = (sequelize, DataTypes) => {
    const Feedback =  sequelize.define('feedback', {
        feedback: {
            type: DataTypes.STRING,
        },
        rating: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        reservation_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        watchmaker_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
    }, {timestamps: false});
    Feedback.associate = (models) => {
        Feedback.belongsTo(models.reservation, {foreignKey: 'reservation_id', foreignKeyConstraint: true})
    };
    return Feedback;
};