import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import listItemService from '../../services/listItemService';
import {
  ICreateListItemData,
  listItemAction,
  LIST_ITEM_ADD_LIST_ITEM,
  LIST_ITEM_SET_ERROR,
  LIST_ITEM_SET_LIST_ITEMS,
  LIST_ITEM_SET_LOADING
} from '../../types/listItem';

const getListItems =
  (
    userId: string,
    todoId: string,
    token: string
  ): ThunkAction<void, RootState, null, listItemAction> =>
  async (dispatch) => {
    dispatch({ type: LIST_ITEM_SET_ERROR, payload: '' });
    dispatch({ type: LIST_ITEM_SET_LOADING, payload: true });
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
      dispatch({ type: LIST_ITEM_SET_LOADING, payload: false });
    }
  };

export const createListItem =
  (
    data: ICreateListItemData
  ): ThunkAction<void, RootState, null, listItemAction> =>
  async (dispatch) => {
    dispatch({ type: LIST_ITEM_SET_ERROR, payload: '' });
    dispatch({ type: LIST_ITEM_SET_LOADING, payload: true });
    try {
      const response = await listItemService.createListItem(data);
      if (response) {
        dispatch({ type: LIST_ITEM_ADD_LIST_ITEM, payload: response });
      }
    } catch (error) {
      dispatch({ type: LIST_ITEM_SET_ERROR, payload: error.message });
    } finally {
      dispatch({ type: LIST_ITEM_SET_LOADING, payload: false });
    }
  };

export default getListItems;
