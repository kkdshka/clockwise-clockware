const queryUp = "CREATE TABLE reservations(" +
    "id int NOT NULL AUTO_INCREMENT, " +
    "name varchar(255) NOT NULL, " +
    "email varchar(255) NOT NULL UNIQUE, " +
    "city varchar(255) NOT NULL, " +
    "clock_size varchar(255) NOT NULL, " +
    "date DATE NOT NULL, " + //Format: YYYY-MM-DD
    "time TIME NOT NULL, " +// HH:MI:SS
    "watchmaker_id INT NOT NULL, " +
    "PRIMARY KEY (id))";

const queryDown = "DROP TABLE reservations";

module.exports = {
    'up': function (connection, cb) {
        connection.query(queryUp, function (error) {
            if (error)
                throw error;
            console.log('Reservations table created');
            cb();
        });
    },
    'down': function (connection, cb) {
        connection.query(queryDown, function (error) {
            if (error)
                throw error;
            console.log('Reservations table deleted');
            cb();
        });
    }
};