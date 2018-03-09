var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var migrations = require('./migrations');
// migrations.createWatchmakersTable();
// migrations.createCitiesTable();

var index = require('./routes/index');
var watchmakers = require('./routes/watchmakers.js');
var cities = require('./routes/cities.js');

app.use(express.static(__dirname +'./../../')); //serves the index.html
app.listen(3000); //listens on port 3000 -> http://localhost:3000/

app.use('/admin/watchmakers', watchmakers);
app.use('/admin/cities', cities);
app.use('/', index);
