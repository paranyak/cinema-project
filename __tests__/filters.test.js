import filters from '../src/reducers/filters'
import * as filterActions from '../src/actions/filter';

describe('Filters Reducers', () => {
    it('get default state with undefined state', () => {
        expect(filters(undefined, {})).toEqual({
            date: '',
            genres: [],
            technologies: [],
            formats: []
        })
    });
    it('handle CHANGE_DATE with undefined state', () => {
        expect(filters(undefined, filterActions.changeDate('29-06-2018'))).toEqual({
            date: '29-06-2018',
            genres: [],
            technologies: [],
            formats: []
        })
    });

    it('handle ADD_FILTER genres with undefined state', () => {
        expect(filters(undefined, filterActions.addFilter('genres', 'Action'))).toEqual({
            date: '',
            genres: ['Action'],
            technologies: [],
            formats: []
        })
    });
    it('handle ADD_FILTER technologies with undefined state', () => {
        expect(filters(undefined, filterActions.addFilter('technologies', 'IMAX'))).toEqual({
            date: '',
            genres: [],
            technologies: ['IMAX'],
            formats: []
        })
    });
    it('handle ADD_FILTER formats with undefined state', () => {
        expect(filters(undefined, filterActions.addFilter('formats', '3D'))).toEqual({
            date: '',
            genres: [],
            technologies: [],
            formats: ['3D']
        })
    });

    it('handle REMOVE_FILTER genres with defined state', () => {
        expect(filters({
            date: '',
            genres: ['Action', 'Crime', 'Sci-Fi'],
            technologies: [],
            formats: []
        }, filterActions.removeFilter('genres', 'Crime'))).toEqual({
            date: '',
            genres: ['Action', 'Sci-Fi'],
            technologies: [],
            formats: []
        })
    });
    it('handle REMOVE_FILTER technologies with defined state', () => {
        expect(filters({
            date: '',
            genres: [],
            technologies: ['Cinematech+', 'IMAX'],
            formats: []
        }, filterActions.removeFilter('technologies', 'IMAX'))).toEqual({
            date: '',
            genres: [],
            technologies: ['Cinematech+'],
            formats: []
        })
    });
    it('handle REMOVE_FILTER formats with defined state', () => {
        expect(filters({
            date: '',
            genres: [],
            technologies: [],
            formats: ['3D']
        }, filterActions.removeFilter('formats', '3D'))).toEqual({
            date: '',
            genres: [],
            technologies: [],
            formats: []
        })
    });


});