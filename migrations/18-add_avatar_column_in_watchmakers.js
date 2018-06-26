'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('watchmakers', 'avatar',
            {
                type: Sequelize.STRING,
                defaultValue: "http://res.cloudinary.com/kkdshka/image/upload/v1530018330/f0g06nmi8pw9cam6mp9s.jpg"
            });
    },
    down: (queryInterface) => {
        return queryInterface.removeColumn('watchmakers', 'avatar');
    }
};