import * as actorsReducers from '../../src/reducers/actors';
import * as actorsActions from '../../src/actions'

describe('Actors Reducers', () => {
    it('get default state in byId with undefined state', () => {
        expect(actorsReducers.byId(undefined, {})).toEqual({});
    });
    it('handle FETCH_ACTOR__SUCCESS in byId with undefined state', () => {
        expect(actorsReducers.byId(undefined, actorsActions.fetchActorsSucess(
            'actor', 'ids', ['actor1', 'actor2', 'actor3'])
        )).toEqual({'0': 'actor1', '1': 'actor2', '2': 'actor3'});
    });
    it('handle FETCH_FAIL in byId with undefined state', () => {
        expect(actorsReducers.byId(undefined, actorsActions.fetchFail(
            'actor', 'ids', ['actor1', 'actor2', 'actor3'])
        )).toEqual({
            type: 'FETCH_FAIL',
            error: true,
            id: 'actor',
            ids: 'ids',
            actors: ['actor1', 'actor2', 'actor3']
        });
    });
    it('get default state in byId with defined state', () => {
        expect(actorsReducers.byId({'0': 'actor0', '3': 'actor3'}, {})).toEqual({'0': 'actor0', '3': 'actor3'});
    });
    it('handle FETCH_ACTOR__SUCCESS in byId with defined state', () => {
        expect(actorsReducers.byId({'0': 'actor0', '3': 'actor3'}, actorsActions.fetchActorsSucess(
            'actor', 'ids', ['actor1', 'actor2', 'actor3'])
        )).toEqual({"0": "actor1", "1": "actor2", "2": "actor3", "3": "actor3"});
    });
    it('handle FETCH_FAIL in byId with defined state', () => {
        expect(actorsReducers.byId({'0': 'actor0', '3': 'actor3'}, actorsActions.fetchFail(
            'actor', 'ids', ['actor1', 'actor2', 'actor3'])
        )).toEqual({
            type: 'FETCH_FAIL',
            error: true,
            id: 'actor',
            ids: 'ids',
            actors: ['actor1', 'actor2', 'actor3']
        });
    });
    // -----------------------------------------

    it('get default state in allIds with undefined state', () => {
        expect(actorsReducers.allIds(undefined, {})).toEqual([]);
    });

    it('handle FETCH_ACTOR__SUCCESS in allIds with undefined state', () => {
        expect(actorsReducers.allIds(undefined, actorsActions.fetchActorsSucess(
            'actor', ['1', '2', '3', '4'], ['actor1', 'actor2', 'actor3'])
        )).toEqual(["1", "2", "3", "4"]);
    });
    it('handle FETCH_FAIL in allIds with undefined state', () => {
        expect(actorsReducers.allIds(undefined, actorsActions.fetchFail(
            'actor', ['1', '2', '3', '4'], ['actor1', 'actor2', 'actor3'])
        )).toEqual({
            type: 'FETCH_FAIL',
            error: true,
            id: 'actor',
            ids: ['1', '2', '3', '4'],
            actors: ['actor1', 'actor2', 'actor3']
        });
    });
    it('get default state in allIds with defined state', () => {
        expect(actorsReducers.allIds(['0', '3'], {})).toEqual(['0', '3']);
    });
    it('handle FETCH_ACTOR__SUCCESS in allIds with defined state', () => {
        expect(actorsReducers.allIds(['0', '3'], actorsActions.fetchActorsSucess(
            'actor', ['1', '2', '3', '4'], ['actor1', 'actor2', 'actor3'])
        )).toEqual(['0', '3', '1', '2', '4']);
    });
    it('handle FETCH_FAIL in allIds with defined state', () => {
        expect(actorsReducers.allIds(['0', '3'], actorsActions.fetchFail(
            'actor', ['1', '2', '3', '4'], ['actor1', 'actor2', 'actor3'])
        )).toEqual({
            type: 'FETCH_FAIL',
            error: true,
            id: 'actor',
            ids: ['1', '2', '3', '4'],
            actors: ['actor1', 'actor2', 'actor3']
        });
    });



    // -------------------------------------------

    it('get default state in fetching with undefined state', () => {
        expect(actorsReducers.fetching(undefined, {})).toEqual({});
    });
    it('handle FETCH_ACTOR in fetching with undefined state', () => {
        expect(actorsReducers.fetching(undefined, actorsActions.fetchActorsStart('actor'))).toEqual({
            'actor': true
        });
    });
    it('handle FETCH_ACTOR__SUCCESS in fetching with undefined state', () => {
        expect(actorsReducers.fetching(undefined, actorsActions.fetchActorsSucess('actor', []))).toEqual({
            'actor': false
        });
    });

    it('handle FETCH_FAIL in fetching with undefined state', () => {
        expect(actorsReducers.fetching(undefined, actorsActions.fetchFail('actor', []))).toEqual({
            'actor': false
        });
    });
    it('get default state in fetching with defined state', () => {
        expect(actorsReducers.fetching({'0': true, '3': false}, {})).toEqual({'0': true, '3': false});
    });
    it('handle FETCH_ACTOR in fetching with defined state', () => {
        expect(actorsReducers.fetching({'0': true, '3': false}, actorsActions.fetchActorsStart('actor')))
            .toEqual({'0': true, '3': false, 'actor': true});
    });
    it('handle FETCH_ACTOR__SUCCESS in fetching with defined state', () => {
        expect(actorsReducers.fetching({'0': true, '3': false}, actorsActions.fetchActorsSucess('actor', [])))
            .toEqual({'0': true, '3': false, 'actor': false});
    });

    it('handle FETCH_FAIL in fetching with defined state', () => {
        expect(actorsReducers.fetching({'0': true, '3': false}, actorsActions.fetchFail('actor', [])))
            .toEqual({'0': true, '3': false, 'actor': false});
    });
});