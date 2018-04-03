const queryDown = "ALTER TABLE reservations DROP COLUMN end_time";

module.exports = {
    'up': function (connection, cb) {
        connection.query("ALTER TABLE reservations ADD end_time TIME", function (error, results) {
            if (error)
                throw error;
            console.log('Column end_time added in reservations table');
            changeSmallSizeSpelling();
        });

        function changeSmallSizeSpelling() {
            connection.query("UPDATE reservations SET clock_size = 'Маленькие' WHERE clock_size = 'маленькие'", function (error, results) {
                if (error)
                    throw error;
                console.log('clock_size value "маленькие" changed to "Маленькие"');
                changeMediumSizeSpelling();
            });
        }

        function changeMediumSizeSpelling() {
            connection.query("UPDATE reservations SET clock_size = 'Средние' WHERE clock_size = 'средние'", function (error, results) {
                if (error)
                    throw error;
                console.log('clock_size value "средние" changed to "Средние"');
                addValuesForSmallWatch();
            });
        }

        function addValuesForSmallWatch() {
            connection.query("UPDATE reservations SET end_time = ADDTIME(time, '01:00:00') WHERE clock_size = 'Маленькие'", function (error, results) {
                if (error)
                    throw error;
                console.log('Added values into column end_time where clock_size "Маленькие"');
                addValuesForMediumWatch();
            });
        }

        function addValuesForMediumWatch() {
            connection.query("UPDATE reservations SET end_time = ADDTIME(time, '02:00:00') WHERE clock_size = 'Средние'", function (error, results) {
                if (error)
                    throw error;
                console.log('Added values into column end_time where clock_size "Средние"');
                addValuesForBigWatch();
            });
        }

        function addValuesForBigWatch() {
            connection.query("UPDATE reservations SET end_time = ADDTIME(time, '03:00:00') WHERE clock_size = 'Большие'", function (error, results) {
                if (error)
                    throw error;
                console.log('Added values into column end_time where clock_size "Большие"');
                cb();
            });
        }
    },
    'down': function (connection, cb) {
        connection.query(queryDown, function (error) {
            if (error)
                throw error;
            console.log('Column end_time deleted from reservations table');
            cb();
        });
    },
};