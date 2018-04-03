const reservations = [
    ["Максим", "Днепр", "max@example.com", 'маленькие', '2018.03.14', '15:00:00', '1'],
    ["Данил", "Ужгород", "dan@example.com", 'средние', '2018.03.14', '15:00:00', '2']
];

const queryUp = "INSERT INTO reservations (name, city, email, clock_size, date, time, watchmaker_id) VALUES ?";
const queryDown = "DELETE FROM reservations WHERE date = ?";

module.exports = {
    'up': function (connection, cb) {
        connection.query(queryUp, [reservations], function (error, results) {
            if (error)
                throw error;
            console.log('Reservations added');
            cb();
        });
    },
    'down': function (connection, cb) {
        connection.query(queryDown, reservations[0][4], function (error) {
            if (error)
                throw error;
            console.log('Reservations table cleared');
            cb();
        });
    },
};