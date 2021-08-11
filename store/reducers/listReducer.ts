import {
  LIST_SET_LISTS,
  LIST_SET_LOADING,
  LIST_SET_ERROR,
  listState,
  listAction
} from '../../types/list';

const initialState: listState = {
  lists: [],
  loading: false,
  error: ''
};

const listReducer = (state = initialState, action: listAction) => {
  switch (action.type) {
    case LIST_SET_LISTS:
      return { ...state, lists: action.payload };
    case LIST_SET_LOADING:
      return { ...state, loading: action.payload };
    case LIST_SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default listReducer;
