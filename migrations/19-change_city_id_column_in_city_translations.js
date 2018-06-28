'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.showConstraint('city_translations').then((constraints) => {
            if (constraints) {
                return Promise.all(constraints.map((constraint) => {
                    if (constraint.constraintType === 'FOREIGN KEY') {
                        return queryInterface.removeConstraint("city_translations", constraint.constraintName);
                    }
                })).then(() => {
                    return queryInterface.changeColumn('city_translations', 'city_id', {
                            onDelete: "cascade",
                            type: Sequelize.INTEGER,
                            references: {
                                model: 'cities',
                                key: 'id'
                            },
                        }
                    );
                })
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.showConstraint('city_translations').then((constraints) => {
            if (constraints) {
                return Promise.all(constraints.map((constraint) => {
                    if (constraint.constraintType === 'FOREIGN KEY') {
                        return queryInterface.removeConstraint("city_translations", constraint.constraintName);
                    }
                })).then(() => {
                    return queryInterface.changeColumn('city_translations', 'city_id', {
                            type: Sequelize.INTEGER,
                            references: {
                                model: 'cities',
                                key: 'id'
                            },
                        }
                    );
                })
            }
        });
    }
};