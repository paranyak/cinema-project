const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/bySlugName/:slugName', async (req, res) => {
    const slugName = req.params.slugName;
    const actor = await db.get().collection('actors').findOne({slugName});
    res.send(actor);
    if (actor) {
        res.send(actor);
    }
    else {
        res.status(404).send('Sorry, no such data in DB')
    }

});

router.get('/unpublished-slugs', async (req, res) => {
    const actors = await db.get().collection('actors')
        .find({published: false}, {fields: {slugName: true}})
        .toArray();
    if (actors) res.send(actors.map(el => el.slugName));
    else res.status(404).send('Sorry, no such data in DB');

});

router.get('/name_like=:name', async (req, res) => {
    let name = req.params.name;
    const actor = await db.get().collection('actors').findOne({"name": name});
    if (actor) res.send(actor);
    else res.status(404).send({actor});
});

router.get('/slugs', async (req, res) => {
    let params = {published: true};
    let query = req.query;
    let dbQuery;
    dbQuery = db.get().collection('actors').find(params, {fields: {slugName: true}});
    if (query['_limit']) {
        let page = +query['_page'] || 1;
        let limit = +query['_limit'];
        dbQuery = dbQuery.limit(limit).skip((page - 1) * limit);
    }
    const actors = await dbQuery.toArray();
    if (actors) res.send(actors.map(el => el.slugName));
    else res.status(404);
});

router.get('/autocomplete/:query', async (req, res) => {
    let query = req.params.query;
    let params = {};
    if (query) {
        params.name = {'$regex': '^' + query, '$options': 'i'};
    }
    const actors = await db.get().collection('actors')
        .find(params, {fields: {id: true, name: true, movies: true, slugName: true}}).toArray();
    if (actors) res.send(actors);
    else res.status(404);
});


router.post('/', async (req, res) => {
    let actor = req.body;
    actor.published = true;

    actor.movies = await Promise.all(actor.movies.map(async (movie) => {
        if (!movie._id) {
            movie.published = false;
            let member = await db.get().collection('movies').save(movie);
            return member.ops[0].slugName;
        }
        return movie.slugName;
    }));

    const savedActor = await db.get().collection('actors').save(actor);

    actor.movies.forEach(async (movie) => {
        await db.get().collection('movies').findOneAndUpdate({slugName: movie}, {$push: {cast: actor.slugName}})
    });
    if (savedActor) res.send(savedActor.ops[0]);
    else res.status(404);
});

router.patch('/:slugName', async (req, res) => {
    req.body.published = true;
    const actor = await db.get().collection('actors').findOneAndUpdate({slugName: req.params.slugName}, {$set: req.body}, {returnOriginal: false});
    if (actor) res.send(actor.value);
    else res.status(404);
});

router.delete('/:slugName', async (req, res) => {
    const actor = await db.get().collection('actors').findOneAndDelete({slugName: req.params.slugName});
    if (actor) res.send(actor.value);
    else res.status(404);

});


module.exports = router;
