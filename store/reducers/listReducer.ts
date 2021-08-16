import {
  LIST_SET_LISTS,
  LIST_SET_LOADING,
  LIST_SET_ERROR,
  LIST_ADD_LIST,
  LIST_DELETE_LIST,
  listState,
  listAction,
  LIST_UPDATE_LIST
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

    case LIST_ADD_LIST: {
      const { lists } = state;
      lists.push(action.payload);

      return { ...state, lists };
    }

    case LIST_UPDATE_LIST: {
      const { lists } = state;
      const listForUpdate = lists.find((list) => list.id === action.payload.id);
      // id: '4014cd7d-f511-425a-b568-195c4d8e3961',
      // user_id: '9f2a7270-6115-43c5-9e7a-bb6eb9cbee53',
      // stodoTitle: 'Buy a house'
      const updatedLists = lists.filter(
        (list) => list.id !== action.payload.id
      );

      if (listForUpdate) {
        listForUpdate.todoTitle = action.payload.todoTitle;

        updatedLists.push(listForUpdate);
      }

      return { ...state, lists: updatedLists };
    }

    case LIST_DELETE_LIST: {
      const { lists } = state;
      const updatedLists = lists.filter(
        (list) => list.id !== action.payload.id
      );

      return { ...state, lists: updatedLists };
    }

    case LIST_SET_LOADING:
      return { ...state, loading: action.payload };

    case LIST_SET_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default listReducer;
