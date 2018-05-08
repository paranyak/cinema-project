import { schema } from 'normalizr';


const movieSchema = new schema.Entity('movies');
const movieSchemaBySlug = new schema.Entity('movies', {}, {idAttribute: 'slugName'});

export const moviesListSchema = new schema.Array(movieSchema);
export const moviesListSchemaSlug = new schema.Array(movieSchemaBySlug);

const actorSchema = new schema.Entity('actors');
const actorSchemaBySlug = new schema.Entity('actors', {}, {idAttribute: 'slugName'});

export const actorsListSchema = new schema.Array(actorSchema);
export const actorsListSchemaSlug = new schema.Array(actorSchemaBySlug);

