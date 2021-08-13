export const LIST_SET_LISTS = 'LIST_SET_LISTS';
export const LIST_SET_LOADING = 'LIST_SET_LOADING';
export const LIST_SET_ERROR = 'LIST_SET_ERROR';
export const LIST_ADD_LIST = 'LIST_ADD_LIST';

export interface IList {
  listId: string;
  userId: string;
  todoTitle: string;
}
export interface ICreateListData {
  userId: string;
  todoTitle: string;
  token: string;
}
export interface listState {
  lists: Array<IList>;
  loading: boolean;
  error: string;
}

interface SetListsAction {
  type: typeof LIST_SET_LISTS;
  payload: Array<IList>;
}

interface AddListAction {
  type: typeof LIST_ADD_LIST;
  payload: IList;
}

interface SetListLoadingAction {
  type: typeof LIST_SET_LOADING;
  payload: boolean;
}

interface SetListErrorAction {
  type: typeof LIST_SET_ERROR;
  payload: string;
}

export type listAction =
  | SetListsAction
  | SetListLoadingAction
  | SetListErrorAction
  | AddListAction;
