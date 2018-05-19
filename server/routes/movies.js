const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/moviesCount', async function (req, res) {
    try {
        const movieCount = await db.get().collection('movies').find({published: true}, {fields: {slugName: true}}).count();
        res.send(movieCount.toString());
    }
    catch (e) {
        console.error(e);
        res.error(e);
    }
});

router.get('/unpublished-slugs', async function (req, res) {
    try {
        const movies = await db.get().collection('movies')
            .find({published: false}, {fields: {slugName: true}})
            .toArray();
        res.send(movies.map(el => el.slugName));
    }
    catch (e) {
        console.error(e);
        res.error(e);
    }
});

router.get('/slugs', async function (req, res) {
    try {
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
        let movie = req.body;
        movie.published = true;

        movie.cast = await Promise.all(movie.cast.map(async (cast) => {
            if (!cast._id) {
                cast.published = false;
                let member = await db.get().collection('actors').save(cast);
                return member.ops[0].slugName;
            }

            return cast.slugName;
        }));

        const savedMovie = await db.get().collection('movies').save(movie);

        movie.cast.forEach(async (cast) => {
            await db.get().collection('actors').findOneAndUpdate({slugName: cast}, {$push: {movies: movie.slugName}})
        });
        res.send(savedMovie.ops[0]);
    }
    catch (e) {
        console.error(e);
        res.error(e);
    }
});

router.patch('/:slugName', async (req, res) => {
    try {
        req.body.published = true;
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
