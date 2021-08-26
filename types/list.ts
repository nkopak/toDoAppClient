/* eslint-disable camelcase */
export const LIST_SET_LISTS = 'LIST_SET_LISTS';
export const LIST_START_LOADING = 'LIST_START_LOADING';
export const LIST_END_LOADING = 'LIST_END_LOADING';
export const LIST_SET_ERROR = 'LIST_SET_ERROR';
export const LIST_ADD_LIST = 'LIST_ADD_LIST';
export const LIST_DELETE_LIST = 'LIST_DELETE_LIST';
export const LIST_UPDATE_LIST = 'LIST_UPDATE_LIST';

export interface IList {
  id: string;
  user_id: string;
  todoTitle: string;
}
export interface listState {
  lists: Array<IList>;
  loading: boolean;
  error: string;
}
export interface ICreateListData {
  user_id: string;
  todoTitle: string;
  token: string;
}

export interface IDeleteListData {
  user_id: string;
  id: string;
  todoTitle: string;
  token: string;
}

export interface IUpdateListData {
  user_id: string;
  id: string;
  todoTitle: string;
  token: string;
}

interface SetListsAction {
  type: typeof LIST_SET_LISTS;
  payload: Array<IList>;
}

interface AddListAction {
  type: typeof LIST_ADD_LIST;
  payload: IList;
}

interface UpdateListAction {
  type: typeof LIST_UPDATE_LIST;
  payload: IUpdateListData;
}

interface DeleteListAction {
  type: typeof LIST_DELETE_LIST;
  payload: IDeleteListData;
}

interface StartListLoadingAction {
  type: typeof LIST_START_LOADING;
}

interface EndListLoadingAction {
  type: typeof LIST_END_LOADING;
}

interface SetListErrorAction {
  type: typeof LIST_SET_ERROR;
  payload: string;
}

export type listAction =
  | SetListsAction
  | SetListErrorAction
  | AddListAction
  | UpdateListAction
  | DeleteListAction
  | StartListLoadingAction
  | EndListLoadingAction;
