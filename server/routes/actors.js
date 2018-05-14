var express = require('express');
var router = express.Router();
var db = require('../db')
var ObjectID = require('mongodb').ObjectID;

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id;
    console.log('--------------------', id);
    const actor = await db.get().collection('actors').findOne({_id: ObjectID(id)});
    try {
        res.send(actor);
    } catch (error) {
        console.log(error);
    }
});

router.get('/ids', async (req, res) => {
    let params = {};
    let query = req.query;
    let dbQuery;
    dbQuery = db.get().collection('actors').find(params, {fields: {id: true}});
    if (query['_limit']) {
        let page = +query['_page'] || 1;
        let limit = +query['_limit'];
        dbQuery = dbQuery.limit(limit).skip((page - 1) * limit);
    }
    const actors = await dbQuery.toArray();
    res.send(actors.map(el => el._id));
});


router.get('/autocomplete/:query', async (req, res) => {
    let query = req.params.query;
    let params = {};
    if (query) {
        params.name = {'$regex': '^' + query, '$options': 'i'};
    }
    const actors = await db.get().collection('actors')
        .find(params, {fields: {id: true, name: true, movies: true}}).toArray();
    res.send(actors);
})


router.post('/', async (req, res) => {
    const actor = await db.get().collection('actors').save(req.body)
    res.send(actor)
})

router.patch('/:id', async (req, res) => {
    const actor = await db.get().collection('actors').findOneAndUpdate({_id: ObjectID(req.params.id)}, {$set: req.body}, {returnOriginal: false})
    res.send(actor.value)

})

router.delete('/:id', async (req, res) => {
    const actor = await db.get().collection('actors').findOneAndDelete({_id: ObjectID(req.params.id)});
    res.send(actor.value)
})

router.get('/bySlugName/:slugName', async (req, res) => {
    const slugName = req.params.slugName;
    const actor = await db.get().collection('actors').findOne({slugName})
    res.send(actor);
})


module.exports = router;
