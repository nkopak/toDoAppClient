import { ThunkAction } from 'redux-thunk';
import authService from '../../services/authService';

import {
  SignUpData,
  registerAction,
  REGISTER_SET_LOADING,
  REGISTER_SET_ERROR,
  REGISTER_SET_USER
} from '../../types/register';
import { RootState } from '../index';

const signUp =
  (data: SignUpData): ThunkAction<void, RootState, null, registerAction> =>
  async (dispatch) => {
    dispatch({ type: REGISTER_SET_ERROR, payload: '' });
    dispatch({ type: REGISTER_SET_LOADING, payload: true });
    try {
      const response = await authService.register(data);
      if (response.data.auth) {
        dispatch({ type: REGISTER_SET_USER, payload: true });
      }
    } catch (err) {
      dispatch({
        type: REGISTER_SET_ERROR,
        payload: err.message
      });
    } finally {
      dispatch({ type: REGISTER_SET_LOADING, payload: false });
    }
  };

export default signUp;
