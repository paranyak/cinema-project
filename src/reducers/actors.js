import {combineReducers} from 'redux';
import {assoc} from "ramda";
import {
    FETCH_ACTOR_SLUG,
    FETCH_ACTOR_SLUG_SUCCESS,
    FETCH_ACTOR_SLUG_FAIL,
    FETCH_ACTOR_DELETE_SUCCESS,
    EDITING_ACTOR_SUCCESS, EDITING_ACTOR_START, POST_ACTOR_SUCCESS, POST_ACTOR_START
} from '../helpers/actionTypes';

export const bySlug = (state = {}, action) => {
    switch (action.type) {
        case FETCH_ACTOR_SLUG_SUCCESS:
            return {...state, ...action.actors};
        case POST_ACTOR_SUCCESS:
            return {...state, ...action.actors};
        case FETCH_ACTOR_SLUG_FAIL:
            return action;
        case EDITING_ACTOR_SUCCESS:
            let newState = state;
            newState[action.slugName] = action.actor;
            return newState;
        case FETCH_ACTOR_DELETE_SUCCESS:
            let newStateDel = {...state};
            delete newStateDel[action.slugName];
            return newStateDel;
        default:
            return state;
    }
};

export const allSlugs = (state = [], action) => {
    switch (action.type) {
        case FETCH_ACTOR_SLUG_SUCCESS:
            return [
                ...state,
                ...action.slugs
            ].filter((el, i, arr) => arr.indexOf(el) === i);
        case POST_ACTOR_SUCCESS:
            return [...state, ...action.actors];
        case FETCH_ACTOR_SLUG_FAIL:
            return action;
        case FETCH_ACTOR_DELETE_SUCCESS:
            return [...state].filter((el) => el !== action.slugName);
        default:
            return state;
    }
};

export const fetching = (state = {}, action) => {
    switch (action.type) {
        case FETCH_ACTOR_SLUG:
            return assoc(action.slugName, true, state);
        case FETCH_ACTOR_SLUG_SUCCESS:
        case FETCH_ACTOR_SLUG_FAIL:
            return assoc(action.slugName, false, state);
        case EDITING_ACTOR_START:
        case POST_ACTOR_START:
            return assoc(action.actor, true, state);
        case POST_ACTOR_SUCCESS:
        case EDITING_ACTOR_SUCCESS:
            return assoc(action.actor, false, state);
        default:
            return state;
    }
};

export const getAllActorsSlugs = (state) => state.allSlugs;
export const getActorBySlug = (slugName, state) => state.bySlug[slugName];
export const isActorFetchingSlug = (slugName, state) => state.fetching[slugName];


export default combineReducers({
    bySlug,
    allSlugs,
    fetching
});
