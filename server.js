const express = require('express');
const db = require('./server/db');
const movies = require('./server/routes/movies');
const actors = require('./server/routes/actors');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/heroku_t7gvckhq';

const port = process.env.PORT || 3000;

app.use(cors({origin: 'https://csucu-cinema-project.herokuapp.com'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/movies', movies);
app.use('/actors', actors);

app.use(express.static(path.resolve("build")))

app.use("/*", (req, res) => res.sendFile(path.join(__dirname, "build", "index.html")))

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
