const pool = require('./src/server/database');
const migration = require('mysql-migrations');
migration.init(pool, __dirname + '/src/server/migrations');
