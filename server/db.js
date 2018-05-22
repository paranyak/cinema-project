const MongoClient = require('mongodb').MongoClient;
const DB_NAME = 'heroku_t7gvckhq';

let db = null;
exports.connect = (url, done) => {
    if (db) return done();
    MongoClient.connect(url, (err, client) => {
        if (err) return console.error(err);
        db = client.db(DB_NAME);
        done()
    })
};

exports.get = () => {
    return db;
};
