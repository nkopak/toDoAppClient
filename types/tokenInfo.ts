export const TOKEN_INFO_SET_ID = 'TOKEN_INFO_SET_ID';
export const TOKEN_INFO_SET_FIRST_NAME = 'TOKEN_INFO_SET_FIRST_NAME';
export const TOKEN_INFO_SET_ERROR = 'TOKEN_INFO_SET_ERROR';
export const TOKEN_INFO_SET_TOKEN = 'TOKEN_INFO_SET_TOKEN';

export interface ITokenInfo {
  id: string;
  firstName: string;
  token: string;
}

export interface tokenInfoState {
  id: string;
  firstName: string;
  token: string;
  error: string;
}

export interface SetTokenInfoId {
  type: typeof TOKEN_INFO_SET_ID;
  payload: string;
}

export interface SetTokenInfoFirstName {
  type: typeof TOKEN_INFO_SET_FIRST_NAME;
  payload: string;
}

export interface SetTokenInfoError {
  type: typeof TOKEN_INFO_SET_ERROR;
  payload: string;
}

export interface SetTokenInfoToken {
  type: typeof TOKEN_INFO_SET_TOKEN;
  payload: string;
}

export type tokenInfoAction =
  | SetTokenInfoId
  | SetTokenInfoFirstName
  | SetTokenInfoError
  | SetTokenInfoToken;
