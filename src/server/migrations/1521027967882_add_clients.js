const clients = [
    ["Максим", "Днепр", "max@example.com"],
    ["Данил", "Ужгород", "dan@example.com"]
];

const queryUp = "INSERT INTO clients (name, city, email) VALUES ?";
const queryDown = "TRUNCATE clients";

module.exports = {
    'up': function (connection, cb) {
        connection.query(queryUp, [clients], function (error, results) {
            if (error)
                throw error;
            console.log('Clients added');
            cb();
        });
    },
    'down': function (connection, cb) {
        connection.query(queryDown, function (error) {
            if (error)
                throw error;
            console.log('Clients table cleared');
            cb();
        });
    },
};