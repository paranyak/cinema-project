var models = require('../models');
var Actor = models.Actor;
var express = require('express');
var router = express.Router();

router.get('/byId/:id', function (req, res) {
    const id = req.params.id;
    Actor.findById(id, function (err, actor) {
        res.send(actor);
    });
});
router.get('/bySlugName/:slugName', (req, res) => {
    const slugName = req.params.slugName;
    Actor.findOne({slugName}, (err, actor) => res.send(actor));
});


router.get('/ids', function (req, res) {
    let params = {};
    let query = req.query;
    let dbQuery;
    // if (query['_label']) {
    //   params.label = query['_label'];
    // }
    dbQuery = Actor.find(params).select('id');
    if (query['_limit']) {
        let page = +query['_page'] || 1;
        let limit = +query['_limit'];
        dbQuery = dbQuery.limit(limit).skip((page - 1) * limit);
    }


    dbQuery.exec(function (err, actor) {
        console.log(err);
        actor = actor || [];
        res.send(actor.map(el => el['_id']));
    })
});

router.post('/', function (req, res) {
    console.log("++++++++++++++++++++++++");
    new Actor(req.body).save().then(function (actor) {
        res.send(actor)
    });
})

router.patch('/:id', function (req, res) {
    Actor.findByIdAndUpdate({_id: req.params.id}, {$set: req.body})
        .then(function (actor) {
            res.send(actor)
        });
})

module.exports = router;
