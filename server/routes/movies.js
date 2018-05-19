var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/moviesCount', async function (req, res) {
    try {
        const movieCount = await db.get().collection('movies').count();
        res.send(movieCount.toString());
    }
    catch (e) {
        console.error(e);
        res.error(e);
    }
});

router.get('/slugs', async function (req, res) {
    try {
        let dbQuery;

        let params = {};
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
    }
    catch (e) {
        console.error(e);
        res.error(e);
    }
});

router.get('/bySlugName/:slug', async (req, res) => {
    try {
        const slugName = req.params.slug;
        const movie = await db.get().collection('movies').findOne({slugName});
        res.send(movie);
    }
    catch (e) {
        console.error(e);
        res.error(e);
    }
});


router.get('/autocomplete/:query', async function (req, res) {
    try {
        let query = req.params.query;
        let params = {};
        if (query) {
            params.name = {'$regex': '^' + query, '$options': 'i'};
        }
        const movies = await db.get().collection('movies')
            .find(params, {fields: {id: true, name: true, slugName: true, cast: true}}).toArray();
        res.send(movies);
    }
    catch (e) {
        console.error(e);
        res.error(e);
    }
});

router.post('/', async (req, res) => {
    try {
        const movie = await db.get().collection('movies').save(req.body);
        console.log('-->', movie.ops[0]);
        res.send(movie.ops[0]);
    }
    catch (e) {
        console.error(e);
        res.error(e);
    }
});

router.patch('/:slugName', async (req, res) => {
    try {
        const movie = await db.get().collection('movies').findOneAndUpdate({slugName: req.params.slugName}, {$set: req.body}, {returnOriginal: false});
        res.send(movie.value);
    }
    catch (e) {
        console.error(e);
        res.error(e);
    }
});

router.delete('/:slugName', async (req, res) => {
    try {
        const movie = await db.get().collection('movies').findOneAndDelete({slugName: req.params.slugName});
        res.send(movie.value)
    }
    catch (e) {
        console.error(e);
        res.error(e);
    }
});

module.exports = router;
