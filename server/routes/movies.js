var express = require('express');
var router = express.Router();
var db = require('../db')
var ObjectID = require('mongodb').ObjectID;

router.get('/moviesCount', async function (req, res) {
    const movieCount = await db.get().collection('movies').find({published: true}, {fields: {slugName: true}}).count();
    res.send(movieCount.toString());
});


router.get('/byId/:id', async function (req, res) {
    const id = req.params.id;
    const movie = await db.get().collection('movies').findOne({_id: ObjectID(id)});
    console.log("By id", movie);
    res.send(movie);
});

// router.get('/ids', async function (req, res) {
//     let dbQuery;
//     let params = {};
//     let query = req.query;
//     if (query['label']) {
//         params.label = query['label'];
//     }
//     if (query['Schedule']) {
//         params.Schedule = {"$regex": query.Schedule, "$options": "i"}
//     }
//
//     dbQuery = db.get().collection('movies').find(params, {fields: {id: true}});
//
//     if (query['_limit']) {
//         let page = +query['_page'] || 1;
//         let limit = +query['_limit'];
//         dbQuery = dbQuery.limit(limit).skip((page - 1) * limit);
//     }
//     const movies = await dbQuery.toArray();
//     res.send(movies.map(el => el._id));
// });
router.get('/unpublished-slugs', async function (req, res) {
  const movies = await db.get().collection('movies')
                              .find({published: false}, {fields: {slugName: true}})
                              .toArray();
  res.send(movies.map(el => el.slugName));
})

router.get('/slugs', async function (req, res) {
    let dbQuery;
    let params = {published: true};
    let query = req.query;
    if (query['label']) {
        params.label = query['label'];
    }
    if (query['Schedule']) {
        params.Schedule = {"$regex": query.Schedule, "$options": "i"}
    }

    dbQuery = db.get().collection('movies').find(params, {fields: {slugName: true}});

    if (query['_limit']) {
        let page = +query['_page'] || 1;
        let limit = +query['_limit'];
        dbQuery = dbQuery.limit(limit).skip((page - 1) * limit);
    }
    const movies = await dbQuery.toArray();
    res.send(movies.map(el => el.slugName));
});

router.get('/bySlugName/:slug', async (req, res) => {
    const slugName = req.params.slug;
    const movie = await db.get().collection('movies').findOne({slugName});
    res.send(movie);
});


router.get('/autocomplete/:query', async function (req, res) {
    let query = req.params.query;
    let params = {};
    if (query) {
        params.name = {'$regex': '^' + query, '$options': 'i'};
    }
    const movies = await db.get().collection('movies')
        .find(params, {fields: {id: true, name: true, slugName: true, cast: true}}).toArray();
    res.send(movies);
});

router.post('/', async (req, res) => {
    const movie = await db.get().collection('movies').save(req.body);
    res.send({movie: movie.ops, response: movie.result});
});

router.patch('/:slugName', async (req, res) => {
    const movie = await db.get().collection('movies').findOneAndUpdate({slugName: req.params.slugName}, {$set: req.body}, {returnOriginal: false});
    res.send(movie.value);
});

router.delete('/:slugName', async (req, res) => {
    console.log("In delete");
    const movie = await db.get().collection('movies').findOneAndDelete({slugName: req.params.slugName});
    console.log("Movie in del router", movie);
    res.send(movie.value)
});

module.exports = router;
