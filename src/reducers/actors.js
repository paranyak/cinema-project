import {combineReducers} from 'redux';
import {assoc} from "ramda";

const initialState = {
    selectedActor: {}
};

const actors = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_ACTOR__SUCCESS':
            return action.actor;
        default:
            return state;
    }
};

const selectedActor = (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_ACTOR__SUCCESS':
            return action.actor
        default:
            return state
    }
}


const fetching = (state = {}, action) => {
    switch (action.type) {
        case "FETCH_ACTOR":
            return assoc(action.id, true, state);
        case "FETCH_ACTOR__SUCCESS":
            return assoc(action.id, false, state);
        default:
            return state;
    }
};


export const getSelectedActor = (state) => state.selectedActor;


export default combineReducers({
    actors,
    selectedActor,
    fetching
});
