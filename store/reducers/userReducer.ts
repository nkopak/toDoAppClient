import {
  userAction,
  userState,
  USER_END_LOADING,
  USER_GET_USER,
  USER_SET_ERROR,
  USER_START_LOADING,
  USER_UPDATE_USER
} from '../../types/user';

const initialState: userState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  loading: false,
  error: ''
};

const userReducer = (state = initialState, action: userAction) => {
  switch (action.type) {
    case USER_GET_USER:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        password: action.payload.password
      };
    case USER_UPDATE_USER:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        password: action.payload.password
      };
    case USER_SET_ERROR:
      return { ...state, error: action.payload };
    case USER_START_LOADING: {
      return { ...state, loading: true, error: '' };
    }
    case USER_END_LOADING: {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export default userReducer;
