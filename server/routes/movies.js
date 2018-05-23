const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/moviesCount', async function (req, res) {
    const movieCount = await db.get().collection('movies').find({published: true}, {fields: {slugName: true}}).count();
    if (movieCount) res.send(movieCount.toString());
    else res.status(404);
});

router.get('/unpublished-slugs', async function (req, res) {
    const movies = await db.get().collection('movies')
        .find({published: false}, {fields: {slugName: true}})
        .toArray();
    if (movies) res.send(movies.map(el => el.slugName));
    else res.status(404);
});

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
    if (movies) res.send(movies.map(el => el.slugName));
    else res.status(404);
});

router.get('/bySlugName/:slug', async (req, res) => {
    const slugName = req.params.slug;
    const movie = await db.get().collection('movies').findOne({slugName});
    if (movie) res.send(movie);
    else res.status(404);
});


router.get('/autocomplete/:query', async function (req, res) {
    let query = req.params.query;
    let params = {};
    if (query) {
        params.name = {'$regex': '^' + query, '$options': 'i'};
    }
    const movies = await db.get().collection('movies')
        .find(params, {fields: {id: true, name: true, slugName: true, cast: true}}).toArray();
    if (movies) res.send(movies);
    else res.status(404);
});

router.post('/', async (req, res) => {
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
    if (savedMovie) res.send(savedMovie.ops[0]);
    else res.status(404);
});

router.patch('/:slugName', async (req, res) => {
    req.body.published = true;
    const movie = await db.get().collection('movies').findOneAndUpdate({slugName: req.params.slugName}, {$set: req.body}, {returnOriginal: false});
    if (movie) res.send(movie.value);
    else res.status(404);
});

router.delete('/:slugName', async (req, res) => {
    const movie = await db.get().collection('movies').findOneAndDelete({slugName: req.params.slugName});
    if (movie) res.send(movie.value);
    else res.status(404);
});

module.exports = router;
