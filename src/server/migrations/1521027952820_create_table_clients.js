const queryUp = "CREATE TABLE clients(" +
    "id int NOT NULL AUTO_INCREMENT, " +
    "name varchar(255) NOT NULL, " +
    "email varchar(255) NOT NULL UNIQUE, " +
    "city varchar(255) NOT NULL, " +
    "PRIMARY KEY (id))";

const queryDown = "DROP TABLE clients";

module.exports = {
    'up': function (connection, cb) {
        connection.query(queryUp, function (error) {
            if (error)
                throw error;
            console.log('Clients table created');
            cb();
        });
    },
    'down': function (connection, cb) {
        connection.query(queryDown, function (error) {
            if (error)
                throw error;
            console.log('Clients table deleted');
            cb();
        });
    }
};