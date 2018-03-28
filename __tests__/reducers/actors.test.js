import * as actorsReducers from '../../src/reducers/actors';
import * as actorsActions from '../../src/actions'
describe('Actors Reducers', () => {
    it('get default state in actors', () => {
        expect(actorsReducers.actors(undefined, {})).toEqual([]);
    });
    it('get default state in selectedActor', () => {
        expect(actorsReducers.selectedActor(undefined, {})).toEqual({});
    });
    it('get default state in fetching', () => {
        expect(actorsReducers.fetching(undefined, {})).toEqual({});
    });
    it('handle FETCH_ACTOR in fetching', () => {
        expect(actorsReducers.fetching(undefined, actorsActions.fetchActorsStart())).toEqual({
            'actor': true
        });
    });
    it('handle FETCH_ACTOR__SUCCESS in fetching', () => {
        expect(actorsReducers.fetching(undefined, actorsActions.fetchActorsSucess({}))).toEqual({
            'actor': false
        });
    });

    it('handle FETCH_ACTOR_FAIL in fetching', () => {
            expect(actorsReducers.fetching(undefined, actorsActions.fetchMoviesFail('Dakota Johnson'))).toEqual({
                'Dakota Johnson': false
            });
        });


});