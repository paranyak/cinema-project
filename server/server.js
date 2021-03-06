const express = require("express")
const db = require("./db")
const movies = require("./routes/movies")
const actors = require("./routes/actors")
const app = express()
const bodyParser = require("body-parser")
const path = require("path")
const cors = require("cors")

const dotenv = require("dotenv")
const config = {
  ...dotenv.config().parsed,
  ...process.env,
}

const MONGODB_URI = config.MONGODB_URI || "mongodb://localhost:27017/heroku_t7gvckhq"

const port = process.env.PORT || 3001

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/movies", movies)
app.use("/actors", actors)

app.use(express.static(path.join(__dirname + "/build")))

app.use("/*", (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")))
const testFunc = async () => {
  return await db
    .get()
    .collection("movies")
    .find({ published: false }, { fields: { slugName: true } })
    .toArray()
}

db.connect(MONGODB_URI, err => {
  if (err) {
    console.log("Unable to connect to Mongo.", err)
    process.exit(1)
  } else {
    console.log("Connected successfully to server")
    testFunc().then(movies => console.log(movies))
    app.listen(port, () => {
      console.log(`Our Server is running on http://localhost:${port}`)
    })
  }
})
