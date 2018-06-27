'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('watchmakers', 'avatar',
            {
                type: Sequelize.STRING,
                defaultValue: "https://res.cloudinary.com/kkdshka/image/upload/v1530086808/watchmaker.png"
            });
    },
    down: (queryInterface) => {
        return queryInterface.removeColumn('watchmakers', 'avatar');
    }
};