import { CHANGE_DATE, ADD_FILTER, SET_FILTERS, REMOVE_FILTER } from "../helpers/actionTypes"

const initialState = {
  date: "",
  genres: [],
  technologies: [],
  formats: [],
}

const filters = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DATE:
      return { ...state, date: action.date }
    case ADD_FILTER:
      let array = state[action.key].slice(0)
      array.push(action.value)
      let newState = { ...state }
      newState[action.key] = array
      return newState
    case SET_FILTERS:
      return { ...state, ...action.value }
    case REMOVE_FILTER:
      let array1 = state[action.key].filter(el => el !== action.value)
      let newState1 = { ...state }
      newState1[action.key] = array1
      return newState1
    default:
      return state
  }
}

export const getAllFilters = state => state

export default filters
