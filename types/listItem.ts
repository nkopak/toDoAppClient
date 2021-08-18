/* eslint-disable camelcase */
export const LIST_ITEM_SET_LIST_ITEMS = 'LIST_ITEM_SET_LIST_ITEMS';
export const LIST_ITEM_SET_LOADING = 'LIST_ITEM_SET_LOADING';
export const LIST_ITEM_SET_ERROR = 'LIST_ITEM_SET_ERROR';
export const LIST_ITEM_ADD_LIST_ITEM = 'LIST_ITEM_ADD_LIST_ITEM';
export const LIST_ITEM_DELETE_LIST_ITEM = 'LIST_ITEM_DELETE_LIST_ITEM';
export const LIST_ITEM_UPDATE_LIST_ITEM = 'LIST_ITEM_UPDATE_LIST_ITEM';

export interface IListItem {
  id: string;
  todo_id: string;
  user_id: string;
  todoTitle: string;
  isCompleted: boolean;
}

export interface listItemState {
  listItems: Array<IListItem>;
  loading: boolean;
  error: string;
}

interface SetListItemsAction {
  type: typeof LIST_ITEM_SET_LIST_ITEMS;
  payload: Array<IListItem>;
}

// interface AddListItemAction {
//   type: typeof LIST_ITEM_ADD_LIST_ITEM;
//   payload: IListItem;
// }

// interface UpdateListItemAction {
//   type: typeof LIST_ITEM_UPDATE_LIST_ITEM;
//   payload: IListItem;
// }

// interface DeleteListItemAction {
//   type: typeof LIST_ITEM_DELETE_LIST_ITEM;
//   payload: IListItem;
// }

interface SetListItemLoadingAction {
  type: typeof LIST_ITEM_SET_LOADING;
  payload: boolean;
}

interface SetListItemErrorAction {
  type: typeof LIST_ITEM_SET_ERROR;
  payload: string;
}

export type listItemAction =
  | SetListItemsAction
  // | AddListItemAction
  // | UpdateListItemAction
  // | DeleteListItemAction
  | SetListItemLoadingAction
  | SetListItemErrorAction;
