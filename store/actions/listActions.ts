import { ThunkAction } from 'redux-thunk';
import listService from '../../services/listService';
import {
  ICreateListData,
  IDeleteListData,
  IUpdateListData,
  listAction,
  LIST_ADD_LIST,
  LIST_DELETE_LIST,
  LIST_SET_ERROR,
  LIST_SET_LISTS,
  LIST_UPDATE_LIST,
  LIST_START_LOADING,
  LIST_END_LOADING
} from '../../types/list';
import { RootState } from '../index';

const getLists =
  (
    userId: string,
    token: string
  ): ThunkAction<void, RootState, null, listAction> =>
  async (dispatch) => {
    dispatch({ type: LIST_START_LOADING });
    try {
      const response = await listService.loadLists(userId, token);
      if (response) {
        dispatch({ type: LIST_SET_LISTS, payload: response });
      }
    } catch (error) {
      dispatch({ type: LIST_SET_ERROR, payload: error.message });
    } finally {
      dispatch({ type: LIST_END_LOADING });
    }
  };

export const createList =
  (data: ICreateListData): ThunkAction<void, RootState, null, listAction> =>
  async (dispatch) => {
    dispatch({ type: LIST_START_LOADING });
    try {
      const response = await listService.createList(data);
      if (response) {
        dispatch({ type: LIST_ADD_LIST, payload: response });
      }
    } catch (error) {
      dispatch({ type: LIST_SET_ERROR, payload: error.message });
    } finally {
      dispatch({ type: LIST_END_LOADING });
    }
  };

export const updateList =
  (data: IUpdateListData): ThunkAction<void, RootState, null, listAction> =>
  async (dispatch) => {
    dispatch({ type: LIST_START_LOADING });
    try {
      const response = await listService.updateList(data);
      if (response) {
        dispatch({ type: LIST_UPDATE_LIST, payload: response });
      }
    } catch (error) {
      dispatch({ type: LIST_SET_ERROR, payload: error.message });
    } finally {
      dispatch({ type: LIST_END_LOADING });
    }
  };

export const deleteList =
  (data: IDeleteListData): ThunkAction<void, RootState, null, listAction> =>
  async (dispatch) => {
    dispatch({ type: LIST_START_LOADING });
    try {
      const response = await listService.deleteList(data);

      if (response) {
        dispatch({ type: LIST_DELETE_LIST, payload: response });
      }
    } catch (error) {
      dispatch({ type: LIST_SET_ERROR, payload: error.message });
    } finally {
      dispatch({ type: LIST_END_LOADING });
    }
  };

export default getLists;
