var mongoose = require('mongoose');
var data = require('./db.json');

mongoose.connect('mongodb://localhost/cinema-project');
var db = mongoose.connection;

db.on('error', function (err) {
    console.error('connection error:', err.message);
});

db.once('open', function () {
    console.log('Connected to DB!');
    mongoose.connection.db.dropDatabase().then(() => {
        var Schema = mongoose.Schema;
        var ObjectId = Schema.Types.ObjectId;

        var movieSchema = new Schema({
            name: String,
            slugName: String,
            image: String,
            rating: String,
            description: String,
            screenshots: [String],
            trailer: String,
            genre: String,
            Schedule: [String],
            format: String,
            technology: String,
            duration: {
                hour: Number,
                minute: Number
            },
            label: String,
            startDate: {
                year: Number,
                month: Number,
                day: Number
            },
            cast: [{type: Schema.Types.ObjectId, ref: 'Actor'}]
        });

        var actorSchema = new Schema({
            oldId: String,
            name: String,
            slugName: String,
            movies: [{type: Schema.Types.ObjectId, ref: 'Movie'}],
            // movies: {
            //   String: [String]
            // },
            info: String,
            date: String,
            city: String,
            nominations: [String],
            image: String
        });


        var Movie = mongoose.model('Movie', movieSchema);
        var Actor = mongoose.model('Actor', actorSchema);

        var promises = [];
        var movieCastMap = {};
        var moviesData = data.movies;

        for (var i = 0; i < moviesData.length; i++) {
            movieCastMap[moviesData[i].name] = moviesData[i].cast;
            let movie = Object.assign({}, moviesData[i], {cast: []});
            promises.push(new Movie(movie).save());
        }

        var actorsData = data.actors;
        for (var i = 0; i < actorsData.length; i++) {
            let actor = Object.assign({}, actorsData[i], {movies: [], oldId: actorsData[i].id});
            promises.push(new Actor(actor).save());
        }

        Promise.all(promises).then(() => {
            const updatePromises = [];
            Movie.find().exec((err, movies) => {
                movies.forEach((movie) => {
                    let cast = movieCastMap[movie.name] || [];

                    cast.forEach(castMember => {
                        let findPromise = Actor.findOne({oldId: castMember}).exec();
                        findPromise.then((actor) => {
                            if (actor) {
                                console.log('movie:' + movie.name + ' actor: ' + actor.name);
                                movie.cast.addToSet(actor);
                                actor.movies.addToSet(movie);

                                updatePromises.push(movie.save());
                                updatePromises.push(actor.save());
                                // console.log(updatePromises.length);
                            }
                        });

                        updatePromises.push(findPromise);
                    });
                });
                console.log(updatePromises.length);
                Promise.all(updatePromises).then(() => {
                    // console.log(updatePromises.length);
                    // process.exit(0);
                })
            })

        });

    });
    // process.exit(0);
});
