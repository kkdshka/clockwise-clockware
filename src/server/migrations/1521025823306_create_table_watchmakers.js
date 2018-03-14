const queryUp = "CREATE TABLE watchmakers(" +
    "id int NOT NULL AUTO_INCREMENT, " +
    "name varchar(255) NOT NULL, " +
    "city varchar(255) NOT NULL, " +
    "rating int NOT NULL, " +
    "PRIMARY KEY (id))";

const queryDown = "DROP TABLE watchmakers";

module.exports = {
    'up': function (connection, cb) {
        connection.query(queryUp, function (error) {
            if (error)
                throw error;
            console.log('Watchmakers table created');
            cb();
        });
    },
    'down': function (connection, cb) {
        connection.query(queryDown, function (error) {
            if (error)
                throw error;
            console.log('Watchmakers table deleted');
            cb();
        });
    }
};