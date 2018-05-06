var models = require('../models');
var Movie = models.Movie;
var express = require('express');
var router = express.Router();

router.get('/byId/:id', function(req, res) {
  const id = req.params.id;

  Movie.findById(id, function (err, movie) {
      res.send(movie);
  });
});


router.get('/ids', function(req, res) {
  let params = {};
  let query = req.query;
  let dbQuery;
  if (query['label']) {
    params.label = query['label'];
  }
  if (query['Schedule']) {
    params.Schedule = { "$regex": query.Schedule, "$options": "i" }
  }
  console.log(params)
  dbQuery = Movie.find(params).select('id');

  if (query['_limit']) {
    let page = +query['_page'] || 1;
    let limit = +query['_limit'];
    dbQuery = dbQuery.limit(limit).skip((page - 1) * limit);
  }

  dbQuery.exec(function(err, movies){
    console.log(err);
    movies = movies || [];
    res.send(movies.map(el => el['_id']));
  })
});

router.post('/', function(req, res) {
  new Movie(req.body).save().then(function(movie) {
    res.send(movie)
  });
})

router.patch('/:id', async (req, res) =>  {
  const movie = await Movie.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body})
  res.send(movie)
})

module.exports = router;
