import {combineReducers} from 'redux';
import {assoc} from "ramda";
import {
    FETCH_ACTOR,
    FETCH_ACTOR_SLUG,
    FETCH_ACTOR__SUCCESS,
    FETCH_ACTOR_SLUG_SUCCESS,
    FETCH_FAIL,
    FETCH_FAIL_SLUG, EDITING_ACTOR_SUCCESS, EDITING_MOVIE_SUCCESS, EDITING_MOVIE_START, EDITING_ACTOR_START
} from '../helpers/actionTypes';

export const byId = (state = {}, action) => {
    switch (action.type) {
        case FETCH_ACTOR__SUCCESS:
            return {
                ...state,
                ...action.actors
            };
        case FETCH_FAIL:
            return action;
        case EDITING_ACTOR_SUCCESS:
            let newState = state;
            newState[action.id] = action.actor;
            return newState;
        default:
            return state;
    }
};

export const bySlug = (state = {}, action) => {
    switch (action.type) {
        case FETCH_ACTOR_SLUG_SUCCESS:
            return {
                ...state,
                ...action.actors
            };
        case FETCH_FAIL_SLUG:
            return action;
        case EDITING_ACTOR_SUCCESS:
            let newState = state;
            newState[action.slug] = action.actor;
            return newState;
        default:
            return state;
    }
};

export const allIds = (state = [], action) => {
    switch (action.type) {
        case FETCH_ACTOR__SUCCESS:
            return [
                ...state,
                ...action.ids
            ].filter((el, i, arr) => arr.indexOf(el) === i);
        case FETCH_FAIL:
            return action;
        default:
            return state;
    }
};

export const fetching = (state = {}, action) => {
    switch (action.type) {
        case FETCH_ACTOR:
            return assoc(action.id, true, state);
        case FETCH_ACTOR_SLUG:
            return assoc(action.slugName, true, state);
        case FETCH_ACTOR__SUCCESS:
        case FETCH_FAIL:
            return assoc(action.id, false, state);
        case FETCH_ACTOR_SLUG_SUCCESS:
        case FETCH_FAIL_SLUG:
            return assoc(action.slugName, false, state);
        case EDITING_ACTOR_START:
            return assoc(action.actor, true, state);
        case EDITING_ACTOR_SUCCESS:
            return assoc(action.actor, false, state);
        default:
            return state;
    }
};

export const getAllActorsIds = (state) => state.allIds;
export const getActorById = (state, id) => state.byId[id];
export const getActorBySlug = (state, slugName) => state.bySlug[slugName];
export const isActorFetching = (id, state) => state.fetching[id];
export const isActorFetchingSlug = (slugName, state) => state.fetching[slugName];


export default combineReducers({
    byId,
    bySlug,
    allIds,
    fetching
});
