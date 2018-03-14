const cities = [
    ["Днепр"],
    ["Ужгород"]
];

const queryUp = "INSERT INTO cities (name) VALUES ?";
const queryDown = "TRUNCATE cities";

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
        connection.query(queryDown, function (error) {
            if (error)
                throw error;
            console.log('Cities table cleared');
            cb();
        });
    },
};