import * as moviesReducers from '../src/reducers/movies';
import * as moviesActions from '../src/actions/movies'
import {FETCH_MOVIE_SLUG_FAIL} from "../src/helpers/actionTypes";

describe('Movies Reducers', () => {
    it('get default state in bySlug with undefined state', () => {
        expect(moviesReducers.bySlug(undefined, {})).toEqual({});
    });
    it('handle FETCH_MOVIE_SLUG_SUCCESS in bySlug with undefined state', () => {
        expect(moviesReducers.bySlug(undefined, moviesActions.fetchMoviesSlugSuccess(
            'movie_1', ['movie_1'], [{'name': 'Movie 1', 'description': 'Superhero'}])
        )).toEqual({"0": {"name": "Movie 1", "description": "Superhero"}});
    });

    // --
    it('handle POST_MOVIE_SUCCESS in bySlug with undefined state', () => {
        expect(moviesReducers.bySlug(undefined, moviesActions.postMovieSuccess(
            'movie_1', {'name': 'Movie 1', 'description': 'Superhero'})
        )).toEqual({"description": "Superhero", "name": "Movie 1"});
    });
    // --
    it('handle EDITING_MOVIE_SUCCESS in bySlug with undefined state', () => {
        expect(moviesReducers.bySlug(undefined, moviesActions.editingMovieSuccess(
            [{'name': 'Movie 1', 'description': 'Superhero'}], 'movie_1')
        )).toEqual({"movie_1": [{"name": "Movie 1", "description": "Superhero"}]});
    });
    // --
    it('handle FETCH_MOVIE_DELETE_SUCCESS in bySlug with undefined state', () => {
        expect(moviesReducers.bySlug(undefined, moviesActions.fetchMoviesDeleteSuccess(
            'movie_1')
        )).toEqual({});
    });

    it('handle FETCH_MOVIE_SLUG_FAIL in bySlug with undefined state', () => {
        expect(moviesReducers.bySlug(undefined, moviesActions.fetchMovieSlugFail(
            'movie_1', ['movie_1'], [{'name': 'Movie 1', 'description': 'Superhero'}])
        )).toEqual({
            type: FETCH_MOVIE_SLUG_FAIL,
            error: true,
            slugName: 'movie_1',
            slugs: ['movie_1'],
            movies: [{"name": "Movie 1", "description": "Superhero"}]
        });
    });
    it('get default state in bySlug with defined state', () => {
        expect(moviesReducers.bySlug({
            '0': {"name": "Movie 1", "description": "Superhero"},
            '3': {"name": "Movie 3", "description": "Superhero3"}
        }, {}))
            .toEqual({
                '0': {"name": "Movie 1", "description": "Superhero"},
                '3': {"name": "Movie 3", "description": "Superhero3"}
            });
    });
    it('handle FETCH_MOVIE_SLUG_SUCCESS in bySlug with defined state', () => {
        expect(moviesReducers.bySlug({
                '0': {"name": "Movie 1", "description": "Superhero"},
                '3': {"name": "Movie 3", "description": "Superhero3"}
            }, moviesActions.fetchMoviesSlugSuccess(
            'movie_1', ['movie_1'], [{'name': 'Movie 2', 'description': 'Superhero2'}])
        )).toEqual({
            "0": {"name": "Movie 2", "description": "Superhero2"},
            "3": {"name": "Movie 3", "description": "Superhero3"}
        });
    });

    // --
    it('handle POST_MOVIE_SUCCESS in bySlug with defined state', () => {
        expect(moviesReducers.bySlug({
                '0': {"name": "Movie 1", "description": "Superhero"},
                '3': {"name": "Movie 3", "description": "Superhero3"}
            }, moviesActions.postMovieSuccess(
            'movie_1', [{'name': 'Movie 2', 'description': 'Superhero2'}])
        )).toEqual({
            "0": {"name": "Movie 2", "description": "Superhero2"},
            "3": {"name": "Movie 3", "description": "Superhero3"}
        });
    });
    // --
    it('handle EDITING_MOVIE_SUCCESS in bySlug with defined state', () => {
        expect(moviesReducers.bySlug({
                'movie_0': [{"name": "Movie 1", "description": "Superhero"}],
                'movie_1': [{"name": "Movie 3", "description": "Superhero3"}]
            }, moviesActions.editingMovieSuccess(
            [{'name': 'Movie 1', 'description': 'Superhero3'}], 'movie_1')
        )).toEqual({
            'movie_0': [{"name": "Movie 1", "description": "Superhero"}],
            'movie_1': [{"name": "Movie 1", "description": "Superhero3"}]
        });
    });
    // --
    it('handle FETCH_MOVIE_DELETE_SUCCESS in bySlug with defined state', () => {
        expect(moviesReducers.bySlug({
                'movie_0': [{"name": "Movie 1", "description": "Superhero"}],
                'movie_1': [{"name": "Movie 3", "description": "Superhero3"}]
            }, moviesActions.fetchMoviesDeleteSuccess(
            'movie_1')
        )).toEqual({'movie_0': [{"name": "Movie 1", "description": "Superhero"}]});
    });

    it('handle FETCH_MOVIE_SLUG_FAIL in bySlug with defined state', () => {
        expect(moviesReducers.bySlug({'0': 'movie0', '3': 'movie3'}, moviesActions.fetchMovieSlugFail(
            'movie_1', ['movie_1'], [{'name': 'Movie 1', 'description': 'Superhero'}])
        )).toEqual({
            type: FETCH_MOVIE_SLUG_FAIL,
            error: true,
            slugName: 'movie_1',
            slugs: ['movie_1'],
            movies: [{"name": "Movie 1", "description": "Superhero"}]
        });
    });
    // -----------------------------------------

    it('get default state in allSlugs with undefined state', () => {
        expect(moviesReducers.allSlugs(undefined, {})).toEqual([]);
    });

    it('handle FETCH_MOVIE_SLUG_SUCCESS in allSlugs with undefined state', () => {
        expect(moviesReducers.allSlugs(undefined, moviesActions.fetchMoviesSlugSuccess(
            'movie_1', ['movie_1', 'movie_2', 'movie_3'], [{'name': 'Movie 2', 'description': 'Superhero2'}])
        )).toEqual(['movie_1', 'movie_2', 'movie_3']);
    });

    // --
    it('handle FETCH_MOVIE_DELETE_SUCCESS in allSlugs with undefined state', () => {
        expect(moviesReducers.allSlugs(undefined, moviesActions.fetchMoviesDeleteSuccess(
            'movie_1')
        )).toEqual([]);
    });

// ++
    it('handle FETCH_SCHEDULE_MOVIES_SUCCESS in allSlugs with undefined state', () => {
        expect(moviesReducers.allSlugs(undefined, moviesActions.fetchMoviesByScheduleSuccess(
            ['m1', 'm2', 'm3'], 'movie_1')
        )).toEqual(['m1', 'm2', 'm3']);
    });

// ++
    it('handle FETCH_MOVIES_LABEL_SUCCESS in allSlugs with undefined state', () => {
        expect(moviesReducers.allSlugs(undefined, moviesActions.fetchMoviesByLabelSuccess(
            ['m1', 'm2', 'm3'], 'movie_1', 'label')
        )).toEqual(['m1', 'm2', 'm3']);
    });

    it('handle FETCH_MOVIE_SLUG_FAIL in allSlugs with undefined state', () => {
        expect(moviesReducers.allSlugs(undefined, moviesActions.fetchMovieSlugFail(
            'movie_1', ['movie_1', 'movie_2', 'movie_3'], [{'name': 'Movie 2', 'description': 'Superhero2'}])
        )).toEqual({
            type: FETCH_MOVIE_SLUG_FAIL,
            error: true,
            slugName: 'movie_1',
            slugs: ["movie_1", "movie_2", "movie_3"],
            movies: [{"name": "Movie 2", "description": "Superhero2"}]
        });
    });
    it('get default state in allSlugs with defined state', () => {
        expect(moviesReducers.allSlugs(['movie_0', 'movie_10'], {})).toEqual(['movie_0', 'movie_10']);
    });
    it('handle FETCH_MOVIE_SLUG_SUCCESS in allSlugs with defined state', () => {
        expect(moviesReducers.allSlugs(['movie_0', 'movie_10'], moviesActions.fetchMoviesSlugSuccess(
            'movie_1', ['movie_1', 'movie_2', 'movie_3'], [{'name': 'Movie 2', 'description': 'Superhero2'}])
        )).toEqual(["movie_0", "movie_10", "movie_1", "movie_2", "movie_3"]);
    });

    // --
    it('handle FETCH_MOVIE_DELETE_SUCCESS in allSlugs with defined state', () => {
        expect(moviesReducers.allSlugs({
                'movie_0': [{"name": "Movie 1", "description": "Superhero"}],
                'movie_1': [{"name": "Movie 3", "description": "Superhero3"}]
            }, moviesActions.fetchMoviesDeleteSuccess(
            'movie_1')
        )).toEqual([]);
    });

    it('handle FETCH_MOVIE_SLUG_FAIL in allSlugs with defined state', () => {
        expect(moviesReducers.allSlugs(['movie_0', 'movie_10'], moviesActions.fetchMovieSlugFail(
            'movie_1', ['movie_1', 'movie_2', 'movie_3'], [{'name': 'Movie 2', 'description': 'Superhero2'}])
        )).toEqual({
            type: FETCH_MOVIE_SLUG_FAIL,
            error: true,
            slugName: 'movie_1',
            slugs: ["movie_1", "movie_2", "movie_3"],
            movies: [{"name": "Movie 2", "description": "Superhero2"}]
        });
    });


    // -------------------------------------------

    it('get default state in fetching with undefined state', () => {
        expect(moviesReducers.fetching(undefined, {})).toEqual({});
    });
    it('handle FETCH_MOVIE_SLUG in fetching with undefined state', () => {
        expect(moviesReducers.fetching(undefined, moviesActions.fetchMoviesSlugStart('movie'))).toEqual({
            'movie': true
        });
    });
    it('handle FETCH_MOVIE_SLUG_SUCCESS in fetching with undefined state', () => {
        expect(moviesReducers.fetching(undefined, moviesActions.fetchMoviesSlugSuccess('movie', []))).toEqual({
            'movie': false
        });
    });

    it('handle FETCH_MOVIE_SLUG_FAIL in fetching with undefined state', () => {
        expect(moviesReducers.fetching(undefined, moviesActions.fetchMovieSlugFail('movie', []))).toEqual({
            'movie': false
        });
    });


    // ++
    it('handle FETCH_SCHEDULE_MOVIES_SUCCESS in fetching with undefined state', () => {
        expect(moviesReducers.fetching(undefined, moviesActions.fetchMoviesByScheduleSuccess([], 'movie'))).toEqual({
            'schedule': false
        });
    });
    // ++
    it('handle EDITING_MOVIE_START in fetching with undefined state', () => {
        expect(moviesReducers.fetching(undefined, moviesActions.editingMovieStart('movie'))).toEqual({
            'movie': true
        });
    });
    // ++
    it('handle FETCH_MOVIES_LABEL_SUCCESS in fetching with undefined state', () => {
        expect(moviesReducers.fetching(undefined, moviesActions.fetchMoviesByLabelSuccess([], 'movie', 'soon'))).toEqual({
            'carousel': false
        });
    });
    // ++
    it('handle POST_MOVIE_SUCCESS in fetching with undefined state', () => {
        expect(moviesReducers.fetching(undefined, moviesActions.postMovieSuccess('slug', 'movie'))).toEqual({
            'movie': false
        });
    });
    // ++
    it('handle EDITING_MOVIE_SUCCESS in fetching with undefined state', () => {
        expect(moviesReducers.fetching(undefined, moviesActions.editingMovieSuccess('movie', 'slug'))).toEqual({
            'movie': false
        });
    });


    it('get default state in fetching with defined state', () => {
        expect(moviesReducers.fetching({'0': true, '3': false}, {})).toEqual({'0': true, '3': false});
    });
    it('handle FETCH_MOVIE in fetching with defined state', () => {
        expect(moviesReducers.fetching({'0': true, '3': false}, moviesActions.fetchMoviesSlugStart('movie')))
            .toEqual({'0': true, '3': false, 'movie': true});
    });
    it('handle FETCH_MOVIE_SLUG_SUCCESS in fetching with defined state', () => {
        expect(moviesReducers.fetching({'0': true, '3': false}, moviesActions.fetchMoviesSlugSuccess('movie', [])))
            .toEqual({'0': true, '3': false, 'movie': false});
    });

    it('handle FETCH_MOVIE_SLUG_FAIL in fetching with defined state', () => {
        expect(moviesReducers.fetching({'0': true, '3': false}, moviesActions.fetchMovieSlugFail('movie', [])))
            .toEqual({'0': true, '3': false, 'movie': false});
    });

    // -------------------------------------------

    it('get default state in moviesAutocomplete with undefined state', () => {
        expect(moviesReducers.moviesAutocomplete(undefined, {})).toEqual([]);
    });
    it('handle FETCH_AUTOCOMPLETE_MOVIES_SUCCESS in moviesAutocomplete with undefined state', () => {
        expect(moviesReducers.moviesAutocomplete(undefined, moviesActions.fetchAutocompleteMoviesSuccess(
            [{"name": "Movie 1", "description": "Superhero"}, {"name": "Movie 2", "description": "Superhero2"}])
        )).toEqual([{"description": "Superhero", "name": "Movie 1"}, {"description": "Superhero2", "name": "Movie 2"}]);
    });

    // --
    it('handle CLEAR_MOVIES_AUTOCOMPLETE in moviesAutocomplete with undefined state', () => {
        expect(moviesReducers.moviesAutocomplete(undefined, moviesActions.clearMoviesAutocomplete()
        )).toEqual([]);
    });
    it('get default state in moviesAutocomplete with defined state', () => {
        expect(moviesReducers.moviesAutocomplete({
            '0': {"name": "Movie 1", "description": "Superhero"},
            '3': {"name": "Movie 3", "description": "Superhero3"}
        }, {}))
            .toEqual({
                '0': {"name": "Movie 1", "description": "Superhero"},
                '3': {"name": "Movie 3", "description": "Superhero3"}
            });
    });
    it('handle FETCH_AUTOCOMPLETE_MOVIES_SUCCESS in moviesAutocomplete with defined state', () => {
        expect(moviesReducers.moviesAutocomplete({
                '0': {"name": "Movie 1", "description": "Superhero"},
                '3': {"name": "Movie 3", "description": "Superhero3"}
            }, moviesActions.fetchAutocompleteMoviesSuccess(
            [{'name': 'Movie 2', 'description': 'Superhero2'}])
        )).toEqual([{'name': 'Movie 2', 'description': 'Superhero2'}]);
    });

    // --
    it('handle CLEAR_MOVIES_AUTOCOMPLETE in moviesAutocomplete with defined state', () => {
        expect(moviesReducers.moviesAutocomplete({
                '0': {"name": "Movie 1", "description": "Superhero"},
                '3': {"name": "Movie 3", "description": "Superhero3"}
            }, moviesActions.clearMoviesAutocomplete()
        )).toEqual([]);
    });

    // -------------------------------------------

    it('get default state in scheduleMoviesSlugs with undefined state', () => {
        expect(moviesReducers.scheduleMoviesSlugs(undefined, {})).toEqual([]);
    });
    it('handle FETCH_SCHEDULE_MOVIES_SUCCESS in scheduleMoviesSlugs with undefined state', () => {
        expect(moviesReducers.scheduleMoviesSlugs(undefined, moviesActions.fetchMoviesByScheduleSuccess(
            ['m1', 'm2', 'm3'], [{"name": "Movie 1", "description": "Superhero"}, {
                "name": "Movie 2",
                "description": "Superhero2"
            }])
        )).toEqual(['m1', 'm2', 'm3']);
    });

    // --
    it('handle FETCH_MOVIE_DELETE_SUCCESS in scheduleMoviesSlugs with undefined state', () => {
        expect(moviesReducers.scheduleMoviesSlugs(undefined, moviesActions.fetchMoviesDeleteSuccess('slug')
        )).toEqual([]);
    });
    it('get default state in scheduleMoviesSlugs with defined state', () => {
        expect(moviesReducers.scheduleMoviesSlugs({
            '0': {"name": "Movie 1", "description": "Superhero"},
            '3': {"name": "Movie 3", "description": "Superhero3"}
        }, {}))
            .toEqual({
                '0': {"name": "Movie 1", "description": "Superhero"},
                '3': {"name": "Movie 3", "description": "Superhero3"}
            });
    });
    it('handle FETCH_SCHEDULE_MOVIES_SUCCESS in scheduleMoviesSlugs with defined state', () => {
        expect(moviesReducers.scheduleMoviesSlugs({
                '0': {"name": "Movie 1", "description": "Superhero"},
                '3': {"name": "Movie 3", "description": "Superhero3"}
            }, moviesActions.fetchMoviesByScheduleSuccess(
            ['m1', 'm2', 'm3'],
            [{'name': 'Movie 2', 'description': 'Superhero2'}])
        )).toEqual(['m1', 'm2', 'm3']);
    });

    // --
    it('handle FETCH_MOVIE_DELETE_SUCCESS in scheduleMoviesSlugs with defined state', () => {
        expect(moviesReducers.scheduleMoviesSlugs(['m1', 'm2', 'm3'],
            moviesActions.fetchMoviesDeleteSuccess('m2')
        )).toEqual(['m1', 'm3']);
    });


// -------------------------------------------

    it('get default state in labeledMovies with undefined state', () => {
        expect(moviesReducers.labeledMovies(undefined, {})).toEqual({popular: [], soon: []});
    });
    it('handle FETCH_MOVIES_LABEL_SUCCESS in labeledMovies with undefined state', () => {
        expect(moviesReducers.labeledMovies(undefined, moviesActions.fetchMoviesByLabelSuccess(
            ['m1', 'm2', 'm3'],
            [
                {"name": "Movie 1", "description": "Superhero"},
                {"name": "Movie 2", "description": "Superhero2"}
            ],
            'soon')
        )).toEqual({popular: [], soon: ['m1', 'm2', 'm3']});
    });

    // --
    it('handle FETCH_MOVIE_DELETE_SUCCESS in labeledMovies with undefined state', () => {
        expect(moviesReducers.labeledMovies(undefined, moviesActions.fetchMoviesDeleteSuccess('slug')
        )).toEqual([]);
    });
    it('get default state in labeledMovies with defined state', () => {
        expect(moviesReducers.labeledMovies({popular: ['mo', 'm3'], soon: ['m1', 'm4']}, {}))
            .toEqual({popular: ['mo', 'm3'], soon: ['m1', 'm4']});
    });
    it('handle FETCH_MOVIES_LABEL_SUCCESS in labeledMovies with defined state', () => {
        expect(moviesReducers.labeledMovies({popular: ['mo', 'm3'], soon: ['m1', 'm4']},
            moviesActions.fetchMoviesByLabelSuccess(
            ['m11', 'm12', 'm13'],
            [
                {"name": "Movie 1", "description": "Superhero"},
                {"name": "Movie 2", "description": "Superhero2"}
            ],
            'soon')
        )).toEqual({popular: ['mo', 'm3'], soon: ['m11', 'm12', 'm13']});
    });

    // --
    it('handle FETCH_MOVIE_DELETE_SUCCESS in labeledMovies with defined state', () => {
        expect(moviesReducers.labeledMovies(['m1', 'm2', 'm3'],
            moviesActions.fetchMoviesDeleteSuccess('m2')
        )).toEqual(['m1', 'm3']);
    });

// -------------------------------------------

    it('get default state in movieCount with undefined state', () => {
        expect(moviesReducers.movieCount(undefined, {})).toEqual({});
    });
    it('handle FETCH_MOVIES_COUNT_SUCCESS in movieCount with undefined state', () => {
        expect(moviesReducers.movieCount(undefined, moviesActions.fetchMoviesCountSuccess(34)
        )).toEqual(34);
    });
    it('get default state in movieCount with defined state', () => {
        expect(moviesReducers.movieCount({popular: ['mo', 'm3'], soon: ['m1', 'm4']}, {}))
            .toEqual({popular: ['mo', 'm3'], soon: ['m1', 'm4']});
    });
    it('handle FETCH_MOVIES_COUNT_SUCCESS in movieCount with defined state', () => {
        expect(moviesReducers.movieCount({popular: ['mo', 'm3'], soon: ['m1', 'm4']},
            moviesActions.fetchMoviesCountSuccess(45)
        )).toEqual(45);
    });


});