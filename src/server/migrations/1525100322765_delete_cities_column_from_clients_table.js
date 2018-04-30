const queryUp = "ALTER TABLE clients DROP COLUMN city";
const queryDown = "ALTER TABLE clients ADD city VARCHAR(255) AFTER name";

module.exports = {
    'up': function (connection, cb) {
        connection.query(queryUp, function (error) {
            if (error)
                throw error;
            console.log('Column deleted');
            cb();
        });
    },
    'down': function (connection, cb) {
        connection.query(queryDown, function (error) {
            if (error)
                throw error;
            console.log("Column added");
            cb();
        });
    },
};