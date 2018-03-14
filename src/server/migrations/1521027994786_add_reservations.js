const reservations = [
    ["Максим", "Днепр", "max@example.com", 'маленькие', dateToString(new Date(Date.now()))],
    ["Данил", "Ужгород", "dan@example.com", 'средние', dateToString(new Date(Date.now()))]
];

function dateToString(date) {
    function pad(number) {
        if (number < 10) {
            return '0' + number;
        }
        return number;
    }

    return date.getUTCFullYear() +
        '-' + pad(date.getUTCMonth() + 1) +
        '-' + pad(date.getUTCDate()) +
        ' ' + pad(date.getUTCHours()) +
        ':00:00';
}

const queryUp = "INSERT INTO reservations (name, city, email, clock_size, date) VALUES ?";
const queryDown = "TRUNCATE reservations";

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
        connection.query(queryDown, function (error) {
            if (error)
                throw error;
            console.log('Reservations table cleared');
            cb();
        });
    },
};