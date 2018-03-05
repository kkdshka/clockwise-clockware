var express = require('express');
var app = express();

var index = require('./routes/index');
var watchmakers = require('./routes/watchmakers.js');

app.use(express.static(__dirname +'./../../')); //serves the index.html
app.listen(3000); //listens on port 3000 -> http://localhost:3000/

app.use('/', index);
app.use('/watchmakers', watchmakers);

//var migrations = require('./migrations');
//migrations.createTable();