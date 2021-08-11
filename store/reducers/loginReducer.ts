import {
  loginAction,
  loginState,
  LOGIN_SIGN_OUT,
  LOGIN_SET_LOADING,
  LOGIN_SET_ERROR,
  LOGIN_SET_SUCCESS
} from '../../types/login';

const initialState: loginState = {
  // email: '',
  // password: '',
  inputError: '',
  loginStatus: false,
  loading: false,
  token: ''
};

const loginReducer = (state = initialState, action: loginAction) => {
  switch (action.type) {
    case LOGIN_SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case LOGIN_SIGN_OUT:
      return {
        ...state,
        loginStatus: action.payload
      };
    case LOGIN_SET_ERROR:
      return {
        ...state,
        inputError: action.payload
      };
    case LOGIN_SET_SUCCESS:
      return {
        ...state,
        loginStatus: true,
        token: action.payload
      };
    default:
      return state;
  }
};

export default loginReducer;
