export const LOGIN_SIGN_OUT = 'LOGIN_SIGN_OUT';
export const LOGIN_SET_LOADING = 'LOGIN_SET_LOADING';
export const LOGIN_SET_ERROR = 'LOGIN_SET_ERROR';
export const LOGIN_SET_SUCCESS = 'LOGIN_SET_SUCCESS';
// export const LOGIN_SET_LOGIN = 'LOGIN_SET_LOGIN';

export interface loginState {
  // email: string;
  // password: string;
  inputError: string;
  loginStatus: boolean | null;
  loading: boolean;
  token: string;
  // user: User | null;
  // authenticated: boolean;
  // error: string;
  // needVerification: boolean;
  // success: string;
}

export interface SignInData {
  email: string;
  password: string;
  // loginStatus: boolean;
  // inputError: boolean;
  // token: string;
}

export interface ITokenInfo {
  id: string;
  firstName: string;
}
// Actions
interface SetLoadingAction {
  type: typeof LOGIN_SET_LOADING;
  payload: boolean;
}

interface SignOutAction {
  type: typeof LOGIN_SIGN_OUT;
  payload: boolean;
}

interface SetErrorAction {
  type: typeof LOGIN_SET_ERROR;
  payload: string;
}

interface SetSuccessAction {
  type: typeof LOGIN_SET_SUCCESS;
  payload: string;
}

// interface SetLoginAction {
//   type: typeof SET_LOGIN;
//   payload: string;
// }

export type loginAction =
  | SetLoadingAction
  | SignOutAction
  | SetErrorAction
  | SetSuccessAction;
