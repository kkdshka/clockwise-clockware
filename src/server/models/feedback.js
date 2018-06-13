'use strict';

module.exports = (sequelize, DataTypes) => {
    const Feedback = sequelize.define('feedback', {
        feedback: {
            type: DataTypes.STRING,
        },
        rating: {
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
    Feedback.associate = function(models) {
        Feedback.belongsTo(models.reservation, {foreignKey: 'reservation_id', foreignKeyConstraint: true});
        Feedback.belongsTo(models.watchmaker, {foreignKey: 'watchmaker_id', foreignKeyConstraint: true});
    };
    return Feedback;
};