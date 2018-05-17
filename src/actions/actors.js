import {
    FETCH_ACTOR_SLUG,
    FETCH_ACTOR_SLUG_SUCCESS,
    EDITING_ACTOR_SUCCESS,
    EDITING_ACTOR_START,
    FETCH_ACTOR_DELETE_SUCCESS, POST_ACTOR_SUCCESS, POST_ACTOR_START, FETCH_ACTOR_SLUG_FAIL
} from '../helpers/actionTypes';
import * as fromApi from "../api/fetch";
import {actorsListSchemaSlug} from "../helpers/schema";
import {push} from "react-router-redux";
import {normalize} from 'normalizr';

import * as fromFetch from "./index";


export const editingActorStart = (actor) => ({type: EDITING_ACTOR_START, actor});

export const fetchActorsSlugStart = (slugName) => ({type: FETCH_ACTOR_SLUG, slugName});

export const actorPostStart = (actor) => ({type: POST_ACTOR_START, actor});

export const fetchActorsDeleteSuccess = (slugName) => ({type: FETCH_ACTOR_DELETE_SUCCESS, slugName});

export const postActorSuccess = (slugName, actors) => ({
    type: POST_ACTOR_SUCCESS,
    actors, slugName
});

export const fetchActorsSlugSuccess = (slugName, slugs, actors = []) => ({
    type: FETCH_ACTOR_SLUG_SUCCESS,
    slugName, actors, slugs
});

export const fetchActorSlugFail = (slugName, slugs, actors = []) => ({
    type: FETCH_ACTOR_SLUG_FAIL,
    error: true,
    slugName, slugs, actors
});

export const editingActorSuccess = (actor, slugName) => ({type: EDITING_ACTOR_SUCCESS, actor, slugName});

// -------------------------------------------------------


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
        dispatch(fetchActorSlugFail(slugName, actors.result, actors.entities.actors));
    } else {
        let actors = await ((response).json());
        actors.slugName = actors['slugName'];
        actors = normalize([actors], actorsListSchemaSlug);
        dispatch(fetchActorsSlugSuccess(slugName, actors.result, actors.entities.actors));
    }
};

export const postActorToDB = (actor) => async (dispatch) => {
    dispatch(actorPostStart(actor));
    let result = await fromApi.postActor(actor);
    try {
        let res = await result;
        res.slugName = res['slugName'];
        res = normalize([res], actorsListSchemaSlug);
        dispatch(postActorSuccess(res.result, res.entities.actors));
    }
    catch (err) {
        console.error('you got an error!!!', err);
        return null;
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