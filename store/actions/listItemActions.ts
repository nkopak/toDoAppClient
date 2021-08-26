import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import listItemService from '../../services/listItemService';
import {
  ICreateListItemData,
  IDeleteListItemData,
  IUpdateListItemData,
  listItemAction,
  LIST_ITEM_ADD_LIST_ITEM,
  LIST_ITEM_DELETE_LIST_ITEM,
  LIST_ITEM_SET_ERROR,
  LIST_ITEM_SET_LIST_ITEMS,
  LIST_ITEM_START_LOADING,
  LIST_ITEM_END_LOADING,
  LIST_ITEM_SET_TODO_ID,
  LIST_ITEM_UPDATE_LIST_ITEM
} from '../../types/listItem';

export const setTodoId =
  (todoId: string): ThunkAction<void, RootState, null, listItemAction> =>
  async (dispatch) => {
    dispatch({ type: LIST_ITEM_START_LOADING });
    try {
      dispatch({ type: LIST_ITEM_SET_TODO_ID, payload: todoId });
    } catch (error) {
      dispatch({ type: LIST_ITEM_SET_ERROR, payload: error.message });
    } finally {
      dispatch({ type: LIST_ITEM_END_LOADING });
    }
  };

const getListItems =
  (
    userId: string,
    todoId: string,
    token: string
  ): ThunkAction<void, RootState, null, listItemAction> =>
  async (dispatch) => {
    dispatch({ type: LIST_ITEM_START_LOADING });
    try {
      const response = await listItemService.loadListItems(
        userId,
        todoId,
        token
      );

      if (response) {
        dispatch({ type: LIST_ITEM_SET_LIST_ITEMS, payload: response });
      }
    } catch (error) {
      dispatch({ type: LIST_ITEM_SET_ERROR, payload: error.message });
    } finally {
      dispatch({ type: LIST_ITEM_END_LOADING });
    }
  };

export const createListItem =
  (
    data: ICreateListItemData
  ): ThunkAction<void, RootState, null, listItemAction> =>
  async (dispatch) => {
    dispatch({ type: LIST_ITEM_START_LOADING });
    try {
      const response = await listItemService.createListItem(data);
      if (response) {
        dispatch({ type: LIST_ITEM_ADD_LIST_ITEM, payload: response });
      }
    } catch (error) {
      dispatch({ type: LIST_ITEM_SET_ERROR, payload: error.message });
    } finally {
      dispatch({ type: LIST_ITEM_END_LOADING });
    }
  };

export const updateListItem =
  (
    data: IUpdateListItemData
  ): ThunkAction<void, RootState, null, listItemAction> =>
  async (dispatch) => {
    dispatch({ type: LIST_ITEM_START_LOADING });
    try {
      const response = await listItemService.updateListItem(data);

      if (response) {
        dispatch({ type: LIST_ITEM_UPDATE_LIST_ITEM, payload: response });
      }
    } catch (error) {
      dispatch({ type: LIST_ITEM_SET_ERROR, payload: error.message });
    } finally {
      dispatch({ type: LIST_ITEM_END_LOADING });
    }
  };

export const deleteListItem =
  (
    data: IDeleteListItemData
  ): ThunkAction<void, RootState, null, listItemAction> =>
  async (dispatch) => {
    dispatch({ type: LIST_ITEM_START_LOADING });
    try {
      const response = await listItemService.deleteListItem(data);

      if (response) {
        dispatch({ type: LIST_ITEM_DELETE_LIST_ITEM, payload: response });
      }
    } catch (error) {
      dispatch({ type: LIST_ITEM_SET_ERROR, payload: error.message });
    } finally {
      dispatch({ type: LIST_ITEM_END_LOADING });
    }
  };

export default getListItems;
