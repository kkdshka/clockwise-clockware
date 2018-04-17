const user = {login: "admin@example.com", password: 'passwordsecret'};

const queryUp = "INSERT INTO users SET ?";
const queryDown = "DELETE FROM users WHERE login = ?";

module.exports = {
    'up': function (connection, cb) {
        connection.query(queryUp, user, function (error, results) {
            if (error)
                throw error;
            console.log('User added');
            cb();
        });
    },
    'down': function (connection, cb) {
        connection.query(queryDown, user.login, function (error) {
            if (error)
                throw error;
            console.log("User deleted");
            cb();
        });
    },
};