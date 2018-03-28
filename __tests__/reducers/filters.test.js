import filters from '../../src/reducers/filters'
import * as filterActions from '../../src/actions/filter';

describe('Filters Reducer', () => {
    // it('get default state', () => {
    //     expect(filters(undefined, {})).toEqual({
    //         date: '',
    //         genres: [],
    //         technologies: [],
    //         formats: []
    //     })
    // });
    // it('handle CHANGE_DATE', () => {
    //     expect(filters(undefined, filterActions.changeDate('29-06-2018'))).toEqual({
    //         date: '29-06-2018',
    //         genres: [],
    //         technologies: [],
    //         formats: []
    //     })
    // });

    // it('handle ADD_FILTER genres', () => {
    //     expect(filters(undefined, filterActions.addFilter('genres', 'Action'))).toEqual({
    //         date: '',
    //         genres: ['Action'],
    //         technologies: [],
    //         formats: []
    //     })
    // });
    // it('handle ADD_FILTER technologies', () => {
    //     expect(filters(undefined, filterActions.addFilter('technologies', 'IMAX'))).toEqual({
    //         date: '',
    //         genres: [],
    //         technologies: ['IMAX'],
    //         formats: []
    //     })
    // });
    // it('handle ADD_FILTER formats', () => {
    //     expect(filters(undefined, filterActions.addFilter('formats', '3D'))).toEqual({
    //         date: '',
    //         genres: [],
    //         technologies: [],
    //         formats: ['3D']
    //     })
    // });

    // it('handle REMOVE_FILTER genres', () => {
    //     expect(filters({
    //         date: '',
    //         genres: ['Action', 'Crime', 'Sci-Fi'],
    //         technologies: [],
    //         formats: []
    //     }, filterActions.addFilter('genres', 'Crime'))).toEqual({
    //         date: '',
    //         genres: ['Action', 'Sci-Fi'],
    //         technologies: [],
    //         formats: []
    //     })
    // });
    // it('handle REMOVE_FILTER technologies', () => {
    //     expect(filters({
    //         date: '',
    //         genres: [],
    //         technologies: ['Cinematech+', 'IMAX'],
    //         formats: []
    //     }, filterActions.addFilter('technologies', 'IMAX'))).toEqual({
    //         date: '',
    //         genres: [],
    //         technologies: ['Cinematech+'],
    //         formats: []
    //     })
    // });
    // it('handle REMOVE_FILTER formats', () => {
    //     expect(filters({
    //         date: '',
    //         genres: [],
    //         technologies: [],
    //         formats: ['3D']
    //     }, filterActions.addFilter('formats', '3D'))).toEqual({
    //         date: '',
    //         genres: [],
    //         technologies: [],
    //         formats: []
    //     })
    // });


});