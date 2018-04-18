import { schema } from 'normalizr';


const movieSchema = new schema.Entity('movies');

export const moviesListSchema = new schema.Array(movieSchema);

const actorSchema = new schema.Entity('actors');

export const actorsListSchema = new schema.Array(actorSchema);

