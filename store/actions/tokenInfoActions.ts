import jwtDecode from 'jwt-decode';
import { ThunkAction } from 'redux-thunk';
import authService from '../../services/authService';
import {
  ITokenInfo,
  tokenInfoAction,
  TOKEN_INFO_SET_ERROR,
  TOKEN_INFO_SET_FIRST_NAME,
  TOKEN_INFO_SET_ID,
  TOKEN_INFO_SET_TOKEN
} from '../../types/tokenInfo';
import { RootState } from '../index';

const getTokenInfo =
  (): ThunkAction<void, RootState, null, tokenInfoAction> => (dispatch) => {
    dispatch({ type: TOKEN_INFO_SET_ERROR, payload: '' });
    try {
      const token = authService.getToken();
      if (typeof token === 'string') {
        const tokenInfo: ITokenInfo = jwtDecode(token);
        dispatch({ type: TOKEN_INFO_SET_ID, payload: tokenInfo.id });
        dispatch({
          type: TOKEN_INFO_SET_FIRST_NAME,
          payload: tokenInfo.firstName
        });
        dispatch({ type: TOKEN_INFO_SET_TOKEN, payload: token });
      }
    } catch (error) {
      dispatch({ type: TOKEN_INFO_SET_ERROR, payload: error.message });
    }
  };

export const deleteTokenInfo =
  (): ThunkAction<void, RootState, null, tokenInfoAction> => (dispatch) => {
    dispatch({ type: TOKEN_INFO_SET_ERROR, payload: '' });
    try {
      dispatch({ type: TOKEN_INFO_SET_ID, payload: '' });
      dispatch({
        type: TOKEN_INFO_SET_FIRST_NAME,
        payload: ''
      });
      dispatch({ type: TOKEN_INFO_SET_TOKEN, payload: '' });
    } catch (error) {
      dispatch({ type: TOKEN_INFO_SET_ERROR, payload: error.message });
    }
  };

export default getTokenInfo;
