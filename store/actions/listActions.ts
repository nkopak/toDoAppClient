import { ThunkAction } from 'redux-thunk';
import listService from '../../services/listService';
import {
  ICreateListData,
  listAction,
  LIST_ADD_LIST,
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

export const createList =
  (data: ICreateListData): ThunkAction<void, RootState, null, listAction> =>
  async (dispatch) => {
    dispatch({ type: LIST_SET_LOADING, payload: true });
    dispatch({ type: LIST_SET_ERROR, payload: '' });
    try {
      const response = await listService.createList(data);
      if (response) {
        dispatch({ type: LIST_ADD_LIST, payload: response });
      }
    } catch (error) {
      dispatch({ type: LIST_SET_ERROR, payload: error.message });
    } finally {
      dispatch({ type: LIST_SET_LOADING, payload: false });
    }
  };

export default getLists;
