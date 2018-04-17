import {combineReducers} from 'redux';
import {assoc} from "ramda";

const initialState = {
    selectedActor: {}
};

export const actors = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_ACTOR__SUCCESS':
            return action.actor;
        default:
            return state;
    }
};

export const selectedActor = (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_ACTOR__SUCCESS':
            return action.actor;
        case 'FETCH_MOVIES_FAIL':
            return action;
        default:
            return state
    }
};

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


export const getSelectedActor = (state) => state.selectedActor;


export default combineReducers({
    actors,
    fetching,
    selectedActor
});