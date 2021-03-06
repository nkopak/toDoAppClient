export const LIST_ITEM_SET_LIST_ITEMS = 'LIST_ITEM_SET_LIST_ITEMS';
export const LIST_ITEM_START_LOADING = 'LIST_ITEM_START_LOADING';
export const LIST_ITEM_END_LOADING = 'LIST_ITEM_END_LOADING';
export const LIST_ITEM_SET_ERROR = 'LIST_ITEM_SET_ERROR';
export const LIST_ITEM_ADD_LIST_ITEM = 'LIST_ITEM_ADD_LIST_ITEM';
export const LIST_ITEM_DELETE_LIST_ITEM = 'LIST_ITEM_DELETE_LIST_ITEM';
export const LIST_ITEM_UPDATE_LIST_ITEM = 'LIST_ITEM_UPDATE_LIST_ITEM';
export const LIST_ITEM_SET_TODO_ID = 'LIST_ITEM_SET_TODO_ID';

export interface IListItem {
  id: string;
  todoId: string;
  userId: string;
  todoTitle: string;
  isCompleted: boolean;
}

export interface listItemState {
  listItems: Array<IListItem>;
  doneListItems: Array<IListItem>;
  todoId: string;
  loading: boolean;
  error: string;
}

export interface ICreateListItemData {
  userId: string;
  todoId: string;
  todoTitle: string;
  token: string;
}

export interface IUpdateListItemData {
  userId: string;
  todoId: string;
  id: string;
  todoTitle: string;
  isCompleted: boolean;
  token: string;
}
export interface IDeleteListItemData {
  userId: string;
  todoId: string;
  id: string;
  token: string;
}

interface SetListItemsAction {
  type: typeof LIST_ITEM_SET_LIST_ITEMS;
  payload: Array<IListItem>;
}

interface AddListItemAction {
  type: typeof LIST_ITEM_ADD_LIST_ITEM;
  payload: IListItem;
}

interface UpdateListItemAction {
  type: typeof LIST_ITEM_UPDATE_LIST_ITEM;
  payload: IUpdateListItemData;
}

interface DeleteListItemAction {
  type: typeof LIST_ITEM_DELETE_LIST_ITEM;
  payload: IDeleteListItemData;
}

interface StartListItemLoadingAction {
  type: typeof LIST_ITEM_START_LOADING;
}

interface EndListItemLoadingAction {
  type: typeof LIST_ITEM_END_LOADING;
}

interface SetListItemErrorAction {
  type: typeof LIST_ITEM_SET_ERROR;
  payload: string;
}

interface SetListItemTodoIdAction {
  type: typeof LIST_ITEM_SET_TODO_ID;
  payload: string;
}

export type listItemAction =
  | SetListItemsAction
  | AddListItemAction
  | UpdateListItemAction
  | DeleteListItemAction
  | StartListItemLoadingAction
  | EndListItemLoadingAction
  | SetListItemErrorAction
  | SetListItemTodoIdAction;
