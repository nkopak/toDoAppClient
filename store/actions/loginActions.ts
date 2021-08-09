import { ThunkAction } from 'redux-thunk';
import authService from '../../services/authService';
import {
  loginAction,
  LOGIN_SET_LOADING,
  SignInData,
  LOGIN_SET_ERROR,
  LOGIN_SET_SUCCESS,
  LOGIN_SIGN_OUT
} from '../../types/login';
import { RootState } from '../index';

// Log in
const signIn =
  (data: SignInData): ThunkAction<void, RootState, null, loginAction> =>
  async (dispatch) => {
    dispatch({ type: LOGIN_SET_ERROR, payload: '' });
    try {
      dispatch({ type: LOGIN_SET_LOADING, payload: true });
      const response = await authService.login(data.email, data.password);
      if (typeof response === 'string') {
        dispatch({ type: LOGIN_SET_SUCCESS, payload: response });
      }
    } catch (err) {
      dispatch({ type: LOGIN_SET_ERROR, payload: err.message });
    } finally {
      dispatch({ type: LOGIN_SET_LOADING, payload: false });
    }
  };

// Log out
export const signout =
  (): ThunkAction<void, RootState, null, loginAction> => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_SET_LOADING, payload: true });
      await authService.logout();
      dispatch({ type: LOGIN_SET_SUCCESS, payload: '' });
      dispatch({ type: LOGIN_SIGN_OUT, payload: false });
    } catch (err) {
      dispatch({ type: LOGIN_SET_ERROR, payload: err.message });
    } finally {
      dispatch({ type: LOGIN_SET_LOADING, payload: false });
    }
  };

export default signIn;
