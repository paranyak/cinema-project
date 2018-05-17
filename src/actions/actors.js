import {
    FETCH_ACTOR_SLUG,
    FETCH_ACTOR_SLUG_SUCCESS,
    FETCH_FAIL_SLUG,
    EDITING_ACTOR_SUCCESS,
    EDITING_ACTOR_START,
    FETCH_ACTOR_DELETE_SUCCESS,
    FETCH_UNPUBLISHED_ACTORS_SUCCESS
} from '../helpers/actionTypes';
import * as fromApi from "../api/fetch";
import {actorsListSchema, actorsListSchemaSlug} from "../helpers/schema";
import {push} from "react-router-redux";
import {normalize} from 'normalizr';

import * as fromFetch from "./index";


export const editingActorStart = (actor) => ({type: EDITING_ACTOR_START, actor});

export const fetchActorsSlugStart = (slugName) => {
    console.log('in dispatch ', slugName);
    return {type: FETCH_ACTOR_SLUG, slugName};
};

export const fetchUnpublishedActorsSuccess = (slugs, actors) => ({
    type: FETCH_UNPUBLISHED_ACTORS_SUCCESS,
    slugs,
    actors
});

export const fetchActorsDeleteSuccess = (slugName) => ({type: FETCH_ACTOR_DELETE_SUCCESS, slugName});

export const fetchActorsSlugSuccess = (slugName, slugs, actors = []) => ({
    type: FETCH_ACTOR_SLUG_SUCCESS,
    slugName, actors, slugs
});

export const fetchFailSlug = (slugName, slugs, actors = []) => ({
    type: FETCH_FAIL_SLUG,
    error: true,
    slugName, slugs, actors
});

export const editingActorSuccess = (actor, slugName) => ({type: EDITING_ACTOR_SUCCESS, actor, slugName});

// -------------------------------------------------------

export const fetchUnpublishedActors = () => async (dispatch) => {
    dispatch(fetchActorsSlugStart('unpublished'));
    let actors = await fromApi.unpublishedActors();
    actors = normalize(actors, actorsListSchemaSlug);
    dispatch(fetchUnpublishedActorsSuccess(actors.result, actors.entities.actors));
};

export const fetchAdditionalActors = (limit, page) => async (dispatch) => {
    dispatch(fetchActorsSlugStart('additional'));
    let actors = await fromApi.additionalActors(limit, page);
    actors = normalize(actors, actorsListSchemaSlug);
    dispatch(fetchActorsSlugSuccess('additional', actors.result, actors.entities.actors));
};

export const fetchDeleteActor = (slugName) => async (dispatch) => {
    dispatch(fetchActorsSlugStart('delete'));
    await fromApi.deleteActor(slugName);
    dispatch(fetchActorsDeleteSuccess(slugName));
    dispatch(push('/allactors'));
};

export const fetchActorsSlug = (slugName) => async (dispatch) => {
    dispatch(fetchActorsSlugStart(slugName));
    let response = await fromApi.actorsBySlugName(slugName);
    if (!response.ok) {
        let actor = {slugName, error: true};
        let actors = normalize([actor], actorsListSchemaSlug);
        dispatch(fetchFailSlug(slugName, actors.result, actors.entities.actors));
    } else {
        let actors = await ((response).json());
        actors.slugName = actors['slugName'];
        actors = normalize([actors], actorsListSchemaSlug);
        if (actors.entities.actors[slugName].published) {
            dispatch(fetchActorsSlugSuccess(slugName, actors.result, actors.entities.actors));
        } else {
            dispatch(fetchUnpublishedActorsSuccess(actors.result, actors.entities.actors));
        }
    }
};

export const editActorBySlug = (slugName, actor) => async (dispatch) => {
    dispatch(editingActorStart(actor));
    try {
        const result = await fromApi.editActor(slugName, actor);
        dispatch(editingActorSuccess(result, slugName));
    }
    catch (err) {
        dispatch(fromFetch.editingFail());
    }
};
