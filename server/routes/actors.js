var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/bySlugName/:slugName', async (req, res) => {
    try {
        const slugName = req.params.slugName;
        const actor = await db.get().collection('actors').findOne({slugName});
        res.send(actor);
    }
    catch (e) {
        console.error(e);
        res.error(e);
    }
});

router.get('/name_like=:name', async function (req, res) {
    try {
        let name = req.params.name;
        const actor = await db.get().collection('actors').findOne({"name": name});
        if (actor) res.send(actor);
        else res.send({actor});
    }
    catch (e) {
        console.error(e);
        res.error(e);
    }
});

router.get('/slugs', async (req, res) => {
    try {
        let params = {};
        let query = req.query;
        let dbQuery;
        dbQuery = db.get().collection('actors').find(params, {fields: {slugName: true}});
        if (query['_limit']) {
            let page = +query['_page'] || 1;
            let limit = +query['_limit'];
            dbQuery = dbQuery.limit(limit).skip((page - 1) * limit);
        }
        const actors = await dbQuery.toArray();
        res.send(actors.map(el => el.slugName));
    }
    catch (e) {
        console.error(e);
        res.error(e);
    }
});

router.get('/autocomplete/:query', async (req, res) => {
    try {
        let query = req.params.query;
        let params = {};
        if (query) {
            params.name = {'$regex': '^' + query, '$options': 'i'};
        }
        const actors = await db.get().collection('actors')
            .find(params, {fields: {id: true, name: true, movies: true, slugName: true}}).toArray();
        res.send(actors);
    }
    catch (e) {
        console.error(e);
        res.error(e);
    }
});


router.post('/', async (req, res) => {
    try {
        const actor = await db.get().collection('actors').save(req.body);
        res.send(actor.ops[0])
    }
    catch (e) {
        console.error(e);
        res.error(e);
    }
});

router.patch('/:slugName', async (req, res) => {
    try {
        const actor = await db.get().collection('actors').findOneAndUpdate({slugName: req.params.slugName}, {$set: req.body}, {returnOriginal: false});
        res.send(actor.value)
    }
    catch (e) {
        console.error(e);
        res.error(e);
    }
});

router.delete('/:slugName', async (req, res) => {
    try {
        const actor = await db.get().collection('actors').findOneAndDelete({slugName: req.params.slugName});
        res.send(actor.value)
    }
    catch (e) {
        console.error(e);
        res.error(e);
    }
});


module.exports = router;
