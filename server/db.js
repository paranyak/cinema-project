const MongoClient = require("mongodb").MongoClient

let db = null
exports.connect = (url, done) => {
  if (db) return done()

  const DB_NAME = url === "mongodb://localhost:27017/cinema-project" ? "cinema-project" : "heroku_t7gvckhq"
  console.log(DB_NAME)

  MongoClient.connect(url, (err, client) => {
    if (err) return console.error(err)

    db = client.db(DB_NAME)
    done()
  })
}

exports.get = () => db
