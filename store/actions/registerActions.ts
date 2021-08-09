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

// Create user
const signUp =
  (data: SignUpData): ThunkAction<void, RootState, null, registerAction> =>
  async (dispatch) => {
    dispatch({ type: REGISTER_SET_ERROR, payload: '' });
    try {
      dispatch({ type: REGISTER_SET_LOADING, payload: true });
      const response = await authService.register(data);

      if (response.status === 201) {
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

// Set loading
// export const setLoading =
//   (value: boolean): ThunkAction<void, RootState, null, registerAction> =>
//   (dispatch) => {
//     dispatch({
//       type: REGISTER_SET_LOADING,
//       payload: value
//     });
//   };

// Set error
// export const setError =
//   (msg: string): ThunkAction<void, RootState, null, registerAction> =>
//   (dispatch) => {
//     dispatch({
//       type: REGISTER_SET_ERROR,
//       payload: msg
//     });
//   };

// Set success
// export const setSuccess =
//   (msg: string): ThunkAction<void, RootState, null, registerAction> =>
//   (dispatch) => {
//     dispatch({
//       type: REGISTER_SET_SUCCESS,
//       payload: msg
//     });
//   };

// Send password reset email
// export const sendPasswordResetEmail =
//   (
//     email: string,
//     successMsg: string
//   ): ThunkAction<void, RootState, null, AuthAction> =>
//   async (dispatch) => {
//     try {
//       await firebase.auth().sendPasswordResetEmail(email);
//       dispatch(setSuccess(successMsg));
//     } catch (err) {
//       console.log(err);
//       dispatch(setError(err.message));
//     }
//   };

export default signUp;
