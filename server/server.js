var express = require('express');
var db = require('./db')
var movies = require('./routes/movies');
var actors = require('./routes/actors');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
const url = 'mongodb://localhost/cinema-project';

app.use(cors({origin: 'http://localhost:5000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/movies', movies);
app.use('/actors', actors);

db.connect(url, function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    console.log("Connected successfully to server");
    app.listen(3000, () => {
      console.log('Our Server is running')
    })
  }
});
