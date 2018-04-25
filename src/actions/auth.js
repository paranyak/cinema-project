import * as fromActions from '../actions/index';
import * as fromApi from '../api/auth';
import {push} from 'react-router-redux';

export const loginUser = (email, password) => async (dispatch) => {
    dispatch(fromActions.authStart());
    try {
      let user = await fromApi.login(email, password)
      dispatch(fromActions.loginSuccess(user));
      dispatch(push('/'));
      dispatch(userAdditionalInfo(user.uid));
    } catch(error) {
      dispatch(fromActions.authFail(error))
    }
}

export const logoutUser = () => async (dispatch) => {
    dispatch(fromActions.authStart());
    try {
      await fromApi.logout()
      dispatch(fromActions.logoutSuccess());
    } catch(error) {
      dispatch(fromActions.authFail(error))
    }
}

export const userAdditionalInfo = (userId) => async (dispatch) => {
  let additionalInfo = (await fromApi.userAdditionalInfo(userId));
  dispatch(fromActions.authAdditionalInfoSuccess(additionalInfo.val()));
}

export const signUpUser = (email, password) => async (dispatch) => {
  dispatch(fromActions.authStart());
  try {
    let user = await fromApi.signUp(email, password)
    dispatch(fromActions.signUpSuccess(user));
    dispatch(push('/'));
  } catch(error) {
    dispatch(fromActions.authFail(error))
  }
}
