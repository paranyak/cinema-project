
var express = require('express');
var router = express.Router();
var db = require('../db')
var ObjectID = require('mongodb').ObjectID;

router.get('/moviesCount', async function(req, res) {
    const movieCount = await db.get().collection('movies').count();
    res.send(movieCount.toString());
});


router.get('/byId/:id', async function (req, res) {
    const id = req.params.id;
    const movie = await db.get().collection('movies').findOne({_id: ObjectID(id)});
    res.send(movie);
});

router.get('/ids', async function (req, res) {
    let dbQuery;
    let params = {};
    let query = req.query;
    if (query['label']) {
        params.label = query['label'];
    }
    if (query['Schedule']) {
        params.Schedule = {"$regex": query.Schedule, "$options": "i"}
    }

    dbQuery = db.get().collection('movies').find(params, {fields: {id: true}});

    if (query['_limit']) {
        let page = +query['_page'] || 1;
        let limit = +query['_limit'];
        dbQuery = dbQuery.limit(limit).skip((page - 1) * limit);
    }
    const movies = await dbQuery.toArray();
    res.send(movies.map(el => el._id));
});

router.get('/bySlugName/:slug', async (req, res) => {
    const slugName = req.params.slug;
    const movie = await db.get().collection('movies').findOne({slugName})
    res.send(movie);
});


router.get('/autocomplete/:query', async function (req, res) {
    let query = req.params.query;
    let params = {};
    if (query) {
        params.name = {'$regex': '^' + query, '$options': 'i'};
    }
    const movies = await db.get().collection('movies')
        .find(params, {fields: {id: true, name: true, cast: true}}).toArray();
    res.send(movies);
})

router.post('/', async (req, res) => {
    const movie = await db.get().collection('movies').save(req.body)
    res.send(movie)
})

router.patch('/:id', async (req, res) => {
    const movie = await db.get().collection('movies').findOneAndUpdate({_id: ObjectID(req.params.id)}, {$set: req.body}, {returnOriginal: false});
    res.send(movie.value);
})

module.exports = router;