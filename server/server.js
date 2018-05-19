const express = require('express');
const db = require('./db');
const movies = require('./routes/movies');
const actors = require('./routes/actors');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const url = 'mongodb://olya:1@ds227740.mlab.com:27740/cinema-project';

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/movies', movies);
app.use('/actors', actors);

app.use(express.static(path.join(__dirname + "/public")));

app.use("/*", (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));


db.connect(url, (err) => {
    if (err) {
        console.log('Unable to connect to Mongo.', err);
        process.exit(1)
    } else {
        console.log("Connected successfully to server");
        app.listen(port, () => {
            console.log('Our Server is running')
        })
    }
});
