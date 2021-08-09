import {
  registerAction,
  registerState,
  REGISTER_SET_USER,
  REGISTER_SET_LOADING,
  REGISTER_SET_ERROR
} from '../../types/register';

const initialState: registerState = {
  user: null,
  inputError: '',
  registerStatus: false,
  loading: false
};

const registerReducer = (state = initialState, action: registerAction) => {
  switch (action.type) {
    case REGISTER_SET_USER:
      return {
        ...state,
        registerStatus: action.payload
      };
    case REGISTER_SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case REGISTER_SET_ERROR:
      return {
        ...state,
        inputError: action.payload,
        registerStatus: false
      };
    default:
      return state;
  }
};

export default registerReducer;
