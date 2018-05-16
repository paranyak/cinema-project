import {
    EDITING_FAIL,
} from '../helpers/actionTypes';

export const editingFail = () => ({type: EDITING_FAIL, error: true});