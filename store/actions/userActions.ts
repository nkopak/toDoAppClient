import { ThunkAction } from 'redux-thunk';
import userService from '../../services/userService';
import {
  userAction,
  USER_END_LOADING,
  USER_GET_USER,
  USER_SET_ERROR,
  USER_START_LOADING
} from '../../types/user';

import { RootState } from '../index';

const getUser =
  (
    userId: string,
    token: string
  ): ThunkAction<void, RootState, null, userAction> =>
  async (dispatch) => {
    dispatch({ type: USER_START_LOADING });
    try {
      const response = await userService.getUser(userId, token);

      if (response) {
        console.log(response);
        dispatch({ type: USER_GET_USER, payload: response });
      }
    } catch (error) {
      dispatch({ type: USER_SET_ERROR, payload: error.message });
    } finally {
      dispatch({ type: USER_END_LOADING });
    }
  };

// export const updateList =
//   (data: IUpdateListData): ThunkAction<void, RootState, null, listAction> =>
//   async (dispatch) => {
//     dispatch({ type: LIST_START_LOADING });
//     try {
//       const response = await listService.updateList(data);
//       if (response) {
//         dispatch({ type: LIST_UPDATE_LIST, payload: response });
//       }
//     } catch (error) {
//       dispatch({ type: LIST_SET_ERROR, payload: error.message });
//     } finally {
//       dispatch({ type: LIST_END_LOADING });
//     }
//   };

// export const deleteList =
//   (data: IDeleteListData): ThunkAction<void, RootState, null, listAction> =>
//   async (dispatch) => {
//     dispatch({ type: LIST_START_LOADING });
//     try {
//       const response = await listService.deleteList(data);

//       if (response) {
//         dispatch({ type: LIST_DELETE_LIST, payload: response });
//       }
//     } catch (error) {
//       dispatch({ type: LIST_SET_ERROR, payload: error.message });
//     } finally {
//       dispatch({ type: LIST_END_LOADING });
//     }
//   };

export default getUser;
