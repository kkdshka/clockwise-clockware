const queryUp = "CREATE TABLE IF NOT EXISTS users(" +
    "id int NOT NULL AUTO_INCREMENT, " +
    "login varchar(255) NOT NULL, " +
    "password varchar(255) NOT NULL, " +
    "PRIMARY KEY (id))";

const queryDown = "DROP TABLE users";

module.exports = {
    'up': function (connection, cb) {
        connection.query(queryUp, function (error) {
            if (error)
                throw error;
            console.log('Users table created');
            cb();
        });
    },
    'down': function (connection, cb) {
        connection.query(queryDown, function (error) {
            if (error)
                throw error;
            console.log('Users table deleted');
            cb();
        });
    }
};