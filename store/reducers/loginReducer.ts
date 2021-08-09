// import { LoginState, LoginAction, LoginActionTypes } from '../../types/login';

// const initialState: LoginState = {
//   email: '',
//   password: '',
//   loginStatus: false,
//   inputError: false
// };

// const loginReducer = (
//   state = initialState,
//   action: LoginAction
// ): LoginState => {
//   switch (action.type) {
//     case LoginActionTypes.LOGIN_REQUEST: {
//       return { ...state, loginStatus: false };
//     }
//     case LoginActionTypes.LOGIN_SUCCESS: {
//       return { ...state, loginStatus: true };
//     }
//     case LoginActionTypes.LOGIN_FAILURE: {
//       return { ...state, loginStatus: false, inputError: true };
//     }
//     default:
//       return state;
//   }
// };

// export default loginReducer;
// import jwtDecode from 'jwt-decode';

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

// interface UserData {
//   id: string;
//   firstName: string;
//   role: string;
// }

const loginReducer = (state = initialState, action: loginAction) => {
  switch (action.type) {
    // case LOGIN_SET_USER:
    //   return {
    //     ...state,
    //     loginStatus: true
    //   };
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
