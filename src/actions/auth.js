import * as fromApi from "../api/auth"
import { push } from "react-router-redux"
import {
  AUTH_START,
  LOGIN_SUCCESS,
  AUTH_FAIL,
  LOGOUT_SUCCESS,
  SET_USER,
  ADDITIONAL_INFO,
  SIGN_UP_SUCCESS,
} from "../helpers/actionTypes"

export const authStart = () => ({ type: AUTH_START })

export const loginSuccess = user => ({ type: LOGIN_SUCCESS, user })

export const authFail = error => ({ type: AUTH_FAIL, error })

export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS })

export const setUser = user => ({ type: SET_USER, user })

export const authAdditionalInfoSuccess = info => ({ type: ADDITIONAL_INFO, info })

export const signUpSuccess = user => ({ type: SIGN_UP_SUCCESS, user })

export const loginUser = (email, password) => async dispatch => {
  dispatch(authStart())
  try {
    let user = await fromApi.login(email, password)
    dispatch(loginSuccess(user))
    dispatch(push("/"))
    dispatch(userAdditionalInfo(user.uid))
  } catch (error) {
    dispatch(authFail(error))
  }
}

export const logoutUser = () => async dispatch => {
  dispatch(authStart())
  try {
    await fromApi.logout()
    dispatch(logoutSuccess())
  } catch (error) {
    dispatch(authFail(error))
  }
}

export const userAdditionalInfo = userId => async dispatch => {
  let additionalInfo = await fromApi.userAdditionalInfo(userId)
  dispatch(authAdditionalInfoSuccess(additionalInfo.val()))
}

export const signUpUser = (email, password) => async dispatch => {
  dispatch(authStart())
  try {
    let user = await fromApi.signUp(email, password)
    dispatch(signUpSuccess(user))
    dispatch(push("/"))
  } catch (error) {
    dispatch(authFail(error))
  }
}
