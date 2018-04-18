import {combineReducers} from 'redux';
import {assoc} from "ramda";

const initialState = {
    byId: {},
    allIds: []
};

const byId = (state={}, action) => {
    switch (action.type) {
        case 'FETCH_ACTOR__SUCCESS':
            return {
                ...state,
                ...action.actors
            };
        case 'FETCH_MOVIES_FAIL':
            return action;
        default:
            return state;
    }
}

const allIds = (state=[], action) => {
    switch (action.type) {
        case 'FETCH_ACTOR__SUCCESS':
            return [
                ...state,
                ...action.ids
            ].filter((el, i, arr) => arr.indexOf(el) === i)
        case 'FETCH_MOVIES_FAIL':
            return action;
        default:
            return state;
    }
}



export const fetching = (state = {}, action) => {
    switch (action.type) {
        case "FETCH_ACTOR":
            return assoc(action.id, true, state);
        case "FETCH_ACTOR__SUCCESS":
            return assoc(action.id, false, state);
        case "FETCH_MOVIES_FAIL":
            return assoc(action.id, false, state);
        default:
            return state;
    }
};


export const getAllActorsIds = (state) => state.allIds;
export const getActorById = (state, id) => state.byId[id];


export default combineReducers({
    byId,
    allIds,
    fetching
});
