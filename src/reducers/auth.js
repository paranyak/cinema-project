import {
  AUTH_START,
  LOGIN_SUCCESS,
  AUTH_FAIL,
  LOGOUT_SUCCESS,
  SET_USER,
  ADDITIONAL_INFO,
  SIGN_UP_SUCCESS,
} from "../helpers/actionTypes"

const auth = (state = {}, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        isLoading: true,
      }
    case LOGIN_SUCCESS:
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: {
          uid: action.user.uid,
          displayName: action.user.displayName,
          email: action.user.email,
        },
      }
    case AUTH_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    case LOGOUT_SUCCESS:
      return {
        isLoading: false,
        user: null,
        error: null,
      }
    case SET_USER:
      let user = action.user && {
        uid: action.user.uid,
        displayName: action.user.displayName,
        email: action.user.email,
      }
      return {
        ...state,
        user,
      }
    case ADDITIONAL_INFO:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.info,
        },
      }
    default:
      return state
  }
}

export default auth

export const getAuthError = state => state.error

export const getCurrentUser = state => state.user

export const getIsLoading = state => state.isLoading
