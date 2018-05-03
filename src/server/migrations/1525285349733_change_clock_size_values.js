module.exports = {
    'up': function (connection, cb) {
        connection.query("UPDATE reservations SET clock_size = 'small' WHERE clock_size = 'Маленькие'", function (error, results) {
            if (error)
                throw error;
            console.log('clock_size value "Маленькие" changed to "small"');
            changeMediumSizeSpelling();
        });

        function changeMediumSizeSpelling() {
            connection.query("UPDATE reservations SET clock_size = 'medium' WHERE clock_size = 'Средние'", function (error, results) {
                if (error)
                    throw error;
                console.log('clock_size value "Средние" changed to "medium"');
                changeSmallSizeSpelling();
            });
        }

        function changeSmallSizeSpelling() {
            connection.query("UPDATE reservations SET clock_size = 'large' WHERE clock_size = 'Большие'", function (error, results) {
                if (error)
                    throw error;
                console.log('clock_size value "Большие" changed to "large"');
                cb();
            });
        }
    },
    'down': function (connection, cb) {
        connection.query("UPDATE reservations SET clock_size = 'Маленькие' WHERE clock_size = 'small'", function (error, results) {
            if (error)
                throw error;
            console.log('clock_size value "small" changed to "Маленькие"');
            changeMediumSizeSpelling();
        });

        function changeMediumSizeSpelling() {
            connection.query("UPDATE reservations SET clock_size = 'Средние' WHERE clock_size = 'medium'", function (error, results) {
                if (error)
                    throw error;
                console.log('clock_size value "medium" changed to "Средние"');
                changeSmallSizeSpelling();
            });
        }

        function changeSmallSizeSpelling() {
            connection.query("UPDATE reservations SET clock_size = 'Большие' WHERE clock_size = 'large'", function (error, results) {
                if (error)
                    throw error;
                console.log('clock_size value "large" changed to "Большие"');
                cb();
            });
        }
    },
};