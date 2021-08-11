import { ThunkAction } from 'redux-thunk';
import listService from '../../services/listService';
import {
  listAction,
  LIST_SET_ERROR,
  LIST_SET_LISTS,
  LIST_SET_LOADING
} from '../../types/list';
import { RootState } from '../index';

const getLists =
  (
    userId: string,
    token: string
  ): ThunkAction<void, RootState, null, listAction> =>
  async (dispatch) => {
    dispatch({ type: LIST_SET_LOADING, payload: true });
    dispatch({ type: LIST_SET_ERROR, payload: '' });
    try {
      const response = await listService.loadLists(userId, token);
      if (response) {
        dispatch({ type: LIST_SET_LISTS, payload: response });
      }
    } catch (error) {
      dispatch({ type: LIST_SET_ERROR, payload: error.message });
    } finally {
      dispatch({ type: LIST_SET_LOADING, payload: false });
    }
  };

export default getLists;
