export const USER_GET_USER = 'USER_GET_USER';
export const USER_UPDATE_USER = 'USER_UPDATE_USER';
export const USER_DELETE_USER = 'USER_DELETE_USER';
export const USER_SET_ERROR = 'USER_SET_ERROR';
export const USER_START_LOADING = 'USER_START_LOADING';
export const USER_END_LOADING = 'USER_END_LOADING';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface userState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  loading: boolean;
  error: string;
}

interface SetUserActions {
  type: typeof USER_GET_USER;
  payload: IUser;
}

interface UpdateUserActions {
  type: typeof USER_UPDATE_USER;
  payload: IUser;
}

interface DeleteUserActions {
  type: typeof USER_DELETE_USER;
  payload: IUser;
}

interface SetUserErrorActions {
  type: typeof USER_SET_ERROR;
  payload: string;
}

interface StartUserLoadingActions {
  type: typeof USER_START_LOADING;
}

interface EndUserLoadingActions {
  type: typeof USER_END_LOADING;
}

export type userAction =
  | SetUserActions
  | UpdateUserActions
  | DeleteUserActions
  | SetUserErrorActions
  | StartUserLoadingActions
  | EndUserLoadingActions;
