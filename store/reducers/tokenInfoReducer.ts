import {
  tokenInfoAction,
  tokenInfoState,
  TOKEN_INFO_SET_ID,
  TOKEN_INFO_SET_FIRST_NAME,
  TOKEN_INFO_SET_ERROR,
  TOKEN_INFO_SET_TOKEN
} from '../../types/tokenInfo';

const initialState: tokenInfoState = {
  id: '',
  firstName: '',
  token: '',
  error: ''
};

const tokenInfoReducer = (state = initialState, action: tokenInfoAction) => {
  switch (action.type) {
    case TOKEN_INFO_SET_ID:
      return {
        ...state,
        id: action.payload
      };
    case TOKEN_INFO_SET_FIRST_NAME:
      return {
        ...state,
        firstName: action.payload
      };
    case TOKEN_INFO_SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    case TOKEN_INFO_SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default tokenInfoReducer;
