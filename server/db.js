var MongoClient = require('mongodb').MongoClient;
const DB_NAME = 'cinema-project';

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
