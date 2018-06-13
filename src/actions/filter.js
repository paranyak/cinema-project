import { CHANGE_DATE, ADD_FILTER, SET_FILTERS, REMOVE_FILTER } from "../helpers/actionTypes"

export const changeDate = date => ({ type: CHANGE_DATE, date })
export const addFilter = (key, value) => ({ type: ADD_FILTER, key, value })
export const setFilters = value => ({ type: SET_FILTERS, value })
export const removeFilter = (key, value) => ({ type: REMOVE_FILTER, key, value })
