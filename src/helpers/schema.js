import { schema } from 'normalizr';


const movieSchema = new schema.Entity('movies');

export const moviesListSchema = new schema.Array(movieSchema);
