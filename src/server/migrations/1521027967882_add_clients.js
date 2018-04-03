const clients = [
    ["Максим", "Днепр", "max@example.com"],
    ["Данил", "Ужгород", "dan@example.com"]
];

const queryUp = "INSERT INTO clients (name, city, email) VALUES ?";
const queryDown = "DELETE FROM clients WHERE email = ?";

module.exports = {
    'up': function (connection, cb) {
        connection.query(queryUp, [clients], function (error, results) {
            if (error)
                throw error;
            console.log('Clients added');
            cb();
        });
    },
    'down': function (connection, cb) {
        connection.query(queryDown, clients[0][2], function (error) {
            if (error)
                throw error;
            console.log("Client " + clients[0][0] + " deleted");
            connection.query(queryDown, clients[1][2], function (error) {
                if (error)
                    throw error;
                console.log("Client " + clients[1][0] + " deleted");
                cb();
            });
        });
    },
};