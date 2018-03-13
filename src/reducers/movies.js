
const movies = (state = [], action) => {
    switch (action.type) {
        case "ADD_MOVIE":
            let lastItemId = state[state.length - 1] && state[state.length - 1].id;

            return [
                ...state,
                {
                    id: (lastItemId || 0) + 1,
                    name: action.name,
                    schedule: action.schedule
                }
            ];
        case "REMOVE_MOVIE":
            console.log('removed movie')
            return state.filter(m => m.id !== action.id);
        case 'SET_MOVIES':
            return [...action.movies];
        default:
            return state;
    }
};

export default movies;

export const getAllMovies = (state) => state;

export const getById = (state, id) =>{
    return state.filter(m => m.id == id)[0];
};
