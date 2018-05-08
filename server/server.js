var express = require('express');
var mongoose = require('mongoose');
var movies = require('./routes/movies');
var actors = require('./routes/actors');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

mongoose.connect('mongodb://localhost/cinema-project');
var db = mongoose.connection;

db.on('error', function (err) {
  console.error('connection error:', err.message);
});
db.once('open', function callback () {
  console.log("Connected to DB!");
});


app.use(cors({origin: 'http://localhost:5000'}));
// use it before all route definitions
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/movies', movies);
app.use('/actors', actors);

app.listen(3000, () => {
  console.log('Our Server is running')
})
