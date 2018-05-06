var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: String,
  image: String,
  description: String,
  screenshots: [String],
  trailer: String,
  genre: String,
  Schedule: [String],
  format: String,
  technology: String,
  duration: {
    hour: Number,
    minute: Number
  },
  label: String,
  startDate: {
    year: Number,
    month: Number,
    day: Number
  },
  cast: [ {type : Schema.Types.ObjectId, ref : 'Actor'} ]
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
