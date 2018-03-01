import data from "../data/data.js"

const movies = (state = data.Movies, action) => {
  switch(action.type) {
    default:
      return state;
  }
};

export default movies;

export const getAllMovies = (state) => state;
