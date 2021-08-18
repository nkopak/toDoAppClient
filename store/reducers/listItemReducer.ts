import {
  listItemState,
  listItemAction,
  LIST_ITEM_SET_ERROR,
  LIST_ITEM_SET_LIST_ITEMS,
  LIST_ITEM_SET_LOADING,
  LIST_ITEM_ADD_LIST_ITEM
} from '../../types/listItem';

const initialState: listItemState = {
  listItems: [],
  loading: false,
  error: ''
};

const listItemReducer = (state = initialState, action: listItemAction) => {
  switch (action.type) {
    case LIST_ITEM_SET_LIST_ITEMS:
      return { ...state, listItems: action.payload };
    case LIST_ITEM_ADD_LIST_ITEM: {
      const { listItems } = state;
      listItems.push(action.payload);

      return { ...state, listItems };

      // const { lists } = state;
      // lists.push(action.payload);

      // return { ...state, lists };
    }
    case LIST_ITEM_SET_LOADING:
      return { ...state, loading: action.payload };
    case LIST_ITEM_SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default listItemReducer;
