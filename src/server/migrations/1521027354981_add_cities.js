const cities = [
    ["Днепр"],
    ["Ужгород"]
];

const queryUp = "INSERT INTO cities (name) VALUES ?";
const queryDown = "DELETE FROM cities WHERE name = ?";

module.exports = {
    'up': function (connection, cb) {
        connection.query(queryUp, [cities], function (error, results) {
            if (error)
                throw error;
            console.log('Cities added');
            cb();
        });
    },
    'down': function (connection, cb) {
        connection.query(queryDown, cities[0], function (error) {
            if (error)
                throw error;
            console.log("City " + cities[0][0] + " deleted");
            connection.query(queryDown, cities[1], function (error) {
                if (error)
                    throw error;
                console.log("City " + cities[1][0] + " deleted");
                cb();
            });
        });
    },
};