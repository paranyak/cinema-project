import * as actorsReducers from '../src/reducers/actors';
import * as actorsActions from '../src/actions/actors'
import {FETCH_ACTOR_SLUG_FAIL} from "../src/helpers/actionTypes";

describe('Actors Reducers', () => {
    it('get default state in bySlug with undefined state', () => {
        expect(actorsReducers.bySlug(undefined, {})).toEqual({});
    });
    it('handle FETCH_ACTOR_SLUG_SUCCESS in bySlug with undefined state', () => {
        expect(actorsReducers.bySlug(undefined, actorsActions.fetchActorsSlugSuccess(
            'actor_1', ['actor_1'], [{'name': 'Actor 1', 'role': 'Superhero'}])
        )).toEqual({"0": {"name": "Actor 1", "role": "Superhero"}});
    });

    // --
    it('handle POST_ACTOR_SUCCESS in bySlug with undefined state', () => {
        expect(actorsReducers.bySlug(undefined, actorsActions.postActorSuccess(
            'actor_1', [{'name': 'Actor 1', 'role': 'Superhero'}])
        )).toEqual({"0": {"name": "Actor 1", "role": "Superhero"}});
    });
    // --
    it('handle EDITING_ACTOR_SUCCESS in bySlug with undefined state', () => {
        expect(actorsReducers.bySlug(undefined, actorsActions.editingActorSuccess(
            [{'name': 'Actor 1', 'role': 'Superhero'}], 'actor_1')
        )).toEqual({"actor_1": [{"name": "Actor 1", "role": "Superhero"}]});
    });
    // --
    it('handle FETCH_ACTOR_DELETE_SUCCESS in bySlug with undefined state', () => {
        expect(actorsReducers.bySlug(undefined, actorsActions.fetchActorsDeleteSuccess(
            'actor_1')
        )).toEqual({});
    });

    it('handle FETCH_ACTOR_SLUG_FAIL in bySlug with undefined state', () => {
        expect(actorsReducers.bySlug(undefined, actorsActions.fetchActorSlugFail(
            'actor_1', ['actor_1'], [{'name': 'Actor 1', 'role': 'Superhero'}])
        )).toEqual({
            type: FETCH_ACTOR_SLUG_FAIL,
            error: true,
            slugName: 'actor_1',
            slugs: ['actor_1'],
            actors: [{"name": "Actor 1", "role": "Superhero"}]
        });
    });
    it('get default state in bySlug with defined state', () => {
        expect(actorsReducers.bySlug({
            '0': {"name": "Actor 1", "role": "Superhero"},
            '3': {"name": "Actor 3", "role": "Superhero3"}
        }, {}))
            .toEqual({
                '0': {"name": "Actor 1", "role": "Superhero"},
                '3': {"name": "Actor 3", "role": "Superhero3"}
            });
    });
    it('handle FETCH_ACTOR_SLUG_SUCCESS in bySlug with defined state', () => {
        expect(actorsReducers.bySlug({
                '0': {"name": "Actor 1", "role": "Superhero"},
                '3': {"name": "Actor 3", "role": "Superhero3"}
            }, actorsActions.fetchActorsSlugSuccess(
            'actor_1', ['actor_1'], [{'name': 'Actor 2', 'role': 'Superhero2'}])
        )).toEqual({
            "0": {"name": "Actor 2", "role": "Superhero2"},
            "3": {"name": "Actor 3", "role": "Superhero3"}
        });
    });

    // --
    it('handle POST_ACTOR_SUCCESS in bySlug with defined state', () => {
        expect(actorsReducers.bySlug({
                '0': [{"name": "Actor 1", "role": "Superhero"}],
                '3': [{"name": "Actor 3", "role": "Superhero3"}]
            }, actorsActions.postActorSuccess(
            'actor_1', [{'name': 'Actor 2', 'role': 'Superhero2'}])
        )).toEqual({"0": {"name": "Actor 2", "role": "Superhero2"}, "3": [{"name": "Actor 3", "role": "Superhero3"}]});
    });
    // --
    it('handle EDITING_ACTOR_SUCCESS in bySlug with defined state', () => {
        expect(actorsReducers.bySlug({
                'actor_0': [{"name": "Actor 1", "role": "Superhero"}],
                'actor_1': [{"name": "Actor 3", "role": "Superhero3"}]
            }, actorsActions.editingActorSuccess(
            [{'name': 'Actor 1', 'role': 'Superhero3'}], 'actor_1')
        )).toEqual({
            'actor_0': [{"name": "Actor 1", "role": "Superhero"}],
            'actor_1': [{"name": "Actor 1", "role": "Superhero3"}]
        });
    });
    // --
    it('handle FETCH_ACTOR_DELETE_SUCCESS in bySlug with defined state', () => {
        expect(actorsReducers.bySlug({
                'actor_0': [{"name": "Actor 1", "role": "Superhero"}],
                'actor_1': [{"name": "Actor 3", "role": "Superhero3"}]
            }, actorsActions.fetchActorsDeleteSuccess(
            'actor_1')
        )).toEqual({'actor_0': [{"name": "Actor 1", "role": "Superhero"}]});
    });

    it('handle FETCH_ACTOR_SLUG_FAIL in bySlug with defined state', () => {
        expect(actorsReducers.bySlug({'0': 'actor0', '3': 'actor3'}, actorsActions.fetchActorSlugFail(
            'actor_1', ['actor_1'], [{'name': 'Actor 1', 'role': 'Superhero'}])
        )).toEqual({
            type: FETCH_ACTOR_SLUG_FAIL,
            error: true,
            slugName: 'actor_1',
            slugs: ['actor_1'],
            actors: [{"name": "Actor 1", "role": "Superhero"}]
        });
    });
    // -----------------------------------------

    it('get default state in allSlugs with undefined state', () => {
        expect(actorsReducers.allSlugs(undefined, {})).toEqual([]);
    });

    it('handle FETCH_ACTOR_SLUG_SUCCESS in allSlugs with undefined state', () => {
        expect(actorsReducers.allSlugs(undefined, actorsActions.fetchActorsSlugSuccess(
            'actor_1', ['actor_1', 'actor_2', 'actor_3'], [{'name': 'Actor 2', 'role': 'Superhero2'}])
        )).toEqual(['actor_1', 'actor_2', 'actor_3']);
    });

    // --
    it('handle POST_ACTOR_SUCCESS in allSlugs with undefined state', () => {
        expect(actorsReducers.allSlugs(undefined, actorsActions.postActorSuccess(
            'actor_1', [{'name': 'Actor 1', 'role': 'Superhero'}])
        )).toEqual([{"name": "Actor 1", "role": "Superhero"}]);
    });
    // --
    it('handle FETCH_ACTOR_DELETE_SUCCESS in allSlugs with undefined state', () => {
        expect(actorsReducers.allSlugs(undefined, actorsActions.fetchActorsDeleteSuccess(
            'actor_1')
        )).toEqual([]);
    });


    it('handle FETCH_ACTOR_SLUG_FAIL in allSlugs with undefined state', () => {
        expect(actorsReducers.allSlugs(undefined, actorsActions.fetchActorSlugFail(
            'actor_1', ['actor_1', 'actor_2', 'actor_3'], [{'name': 'Actor 2', 'role': 'Superhero2'}])
        )).toEqual({
            type: FETCH_ACTOR_SLUG_FAIL,
            error: true,
            slugName: 'actor_1',
            slugs: ["actor_1", "actor_2", "actor_3"],
            actors: [{"name": "Actor 2", "role": "Superhero2"}]
        });
    });
    it('get default state in allSlugs with defined state', () => {
        expect(actorsReducers.allSlugs(['actor_0', 'actor_10'], {})).toEqual(['actor_0', 'actor_10']);
    });
    it('handle FETCH_ACTOR_SLUG_SUCCESS in allSlugs with defined state', () => {
        expect(actorsReducers.allSlugs(['actor_0', 'actor_10'], actorsActions.fetchActorsSlugSuccess(
            'actor_1', ['actor_1', 'actor_2', 'actor_3'], [{'name': 'Actor 2', 'role': 'Superhero2'}])
        )).toEqual(["actor_0", "actor_10", "actor_1", "actor_2", "actor_3"]);
    });

    // --
    it('handle POST_ACTOR_SUCCESS in allSlugs with defined state', () => {
        expect(actorsReducers.allSlugs({
                '0': [{"name": "Actor 1", "role": "Superhero"}],
                '3': [{"name": "Actor 3", "role": "Superhero3"}]
            }, actorsActions.postActorSuccess(
            'actor_1', [{'name': 'Actor 2', 'role': 'Superhero2'}])
        )).toEqual([{"name": "Actor 2", "role": "Superhero2"}]);
    });
    // --
    it('handle FETCH_ACTOR_DELETE_SUCCESS in allSlugs with defined state', () => {
        expect(actorsReducers.allSlugs({
                'actor_0': [{"name": "Actor 1", "role": "Superhero"}],
                'actor_1': [{"name": "Actor 3", "role": "Superhero3"}]
            }, actorsActions.fetchActorsDeleteSuccess(
            'actor_1')
        )).toEqual([]);
    });

    it('handle FETCH_ACTOR_SLUG_FAIL in allSlugs with defined state', () => {
        expect(actorsReducers.allSlugs(['actor_0', 'actor_10'], actorsActions.fetchActorSlugFail(
            'actor_1', ['actor_1', 'actor_2', 'actor_3'], [{'name': 'Actor 2', 'role': 'Superhero2'}])
        )).toEqual({
            type: FETCH_ACTOR_SLUG_FAIL,
            error: true,
            slugName: 'actor_1',
            slugs: ["actor_1", "actor_2", "actor_3"],
            actors: [{"name": "Actor 2", "role": "Superhero2"}]
        });
    });


    // -------------------------------------------

    it('get default state in fetching with undefined state', () => {
        expect(actorsReducers.fetching(undefined, {})).toEqual({});
    });
    it('handle FETCH_ACTOR_SLUG in fetching with undefined state', () => {
        expect(actorsReducers.fetching(undefined, actorsActions.fetchActorsSlugStart('actor'))).toEqual({
            'actor': true
        });
    });
    it('handle FETCH_ACTOR_SLUG_SUCCESS in fetching with undefined state', () => {
        expect(actorsReducers.fetching(undefined, actorsActions.fetchActorsSlugSuccess('actor', []))).toEqual({
            'actor': false
        });
    });

    it('handle FETCH_ACTOR_SLUG_FAIL in fetching with undefined state', () => {
        expect(actorsReducers.fetching(undefined, actorsActions.fetchActorSlugFail('actor', []))).toEqual({
            'actor': false
        });
    });
    it('get default state in fetching with defined state', () => {
        expect(actorsReducers.fetching({'0': true, '3': false}, {})).toEqual({'0': true, '3': false});
    });
    it('handle FETCH_ACTOR in fetching with defined state', () => {
        expect(actorsReducers.fetching({'0': true, '3': false}, actorsActions.fetchActorsSlugStart('actor')))
            .toEqual({'0': true, '3': false, 'actor': true});
    });
    it('handle FETCH_ACTOR_SLUG_SUCCESS in fetching with defined state', () => {
        expect(actorsReducers.fetching({'0': true, '3': false}, actorsActions.fetchActorsSlugSuccess('actor', [])))
            .toEqual({'0': true, '3': false, 'actor': false});
    });

    it('handle FETCH_ACTOR_SLUG_FAIL in fetching with defined state', () => {
        expect(actorsReducers.fetching({'0': true, '3': false}, actorsActions.fetchActorSlugFail('actor', [])))
            .toEqual({'0': true, '3': false, 'actor': false});
    });
});