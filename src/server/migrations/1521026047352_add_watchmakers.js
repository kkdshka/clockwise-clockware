const watchmakers = [
    ["Михаил", "Днепр", "5"],
    ["Иван", "Ужгород", "4"]
];

const queryUp = "INSERT INTO watchmakers (name, city, rating) VALUES ?";
const queryDown = "DELETE FROM watchmakers WHERE name = ? AND city = ? AND rating = ?";

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
        connection.query(queryDown, watchmakers[0], function (error) {
            if (error)
                throw error;
            console.log("Watchmaker " + watchmakers[0][0] + " deleted");
            connection.query(queryDown, watchmakers[1], function (error) {
                if (error)
                    throw error;
                console.log("Watchmaker " + watchmakers[1][0] + " deleted");
                cb();
            });
        });
    }
};