export const REGISTER_SET_USER = 'REGISTER_SET_USER';
export const REGISTER_SET_LOADING = 'REGISTER_SET_LOADING';
export const REGISTER_SET_ERROR = 'REGISTER_SET_ERROR';
export const REGISTER_SET_SUCCESS = 'REGISTER_SET_SUCCESS';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface registerState {
  user: User | null;
  inputError: string;
  registerStatus: boolean;
  loading: boolean;
}

export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Actions
interface SetUserAction {
  type: typeof REGISTER_SET_USER;
  payload: boolean;
}

interface SetLoadingAction {
  type: typeof REGISTER_SET_LOADING;
  payload: boolean;
}

interface SetErrorAction {
  type: typeof REGISTER_SET_ERROR;
  payload: string;
}

export type registerAction = SetUserAction | SetLoadingAction | SetErrorAction;
