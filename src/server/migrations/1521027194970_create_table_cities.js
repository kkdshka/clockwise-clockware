const queryUp = "CREATE TABLE IF NOT EXISTS cities(" +
    "id int NOT NULL AUTO_INCREMENT, " +
    "name varchar(255) NOT NULL, " +
    "PRIMARY KEY (id)," +
    "UNIQUE KEY(name))";

const queryDown = "DROP TABLE cities";

module.exports = {
    'up': function (connection, cb) {
        connection.query(queryUp, function (error) {
            if (error)
                throw error;
            console.log('Cities table created');
            cb();
        });
    },
    'down': function (connection, cb) {
        connection.query(queryDown, function (error) {
            if (error)
                throw error;
            console.log('Cities table deleted');
            cb();
        });
    }
};