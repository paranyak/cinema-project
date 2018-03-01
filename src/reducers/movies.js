import data from "../data/data.js"


const movies = (state = data.Movies, action) => {
    switch (action.type) {
        case "ADD_MOVIE":
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    schedule: action.schedule
                }
            ];
        case "REMOVE_MOVIE":
            console.log("removed item");
            return state.filter(m => m.id !== action.id);
        default:
            return state;
    }
};

export default movies;

export const getAllMovies = (state) => state;
