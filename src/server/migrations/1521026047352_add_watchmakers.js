const watchmakers = [
    ["Михаил", "Днепр", "5"],
    ["Иван", "Ужгород", "4"]
];

const queryUp = "INSERT INTO watchmakers (name, city, rating) VALUES ?";
const queryDown = "TRUNCATE watchmakers";

module.exports = {
    'up': function (connection, cb) {
        connection.query(queryUp, [watchmakers], function (error, results) {
            if (error)
                throw error;
            console.log('Watchmakers added');
            cb();
        });
    },
    'down': function (connection, cb) {
        connection.query(queryDown, function (error) {
            if (error)
                throw error;
            console.log('Watchmakers table cleared');
            cb();
        });
    },
};