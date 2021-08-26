import {
  LIST_SET_LISTS,
  LIST_START_LOADING,
  LIST_END_LOADING,
  LIST_SET_ERROR,
  LIST_ADD_LIST,
  LIST_DELETE_LIST,
  listState,
  listAction,
  LIST_UPDATE_LIST,
  IList
} from '../../types/list';

const initialState: listState = {
  lists: [],
  loading: false,
  error: ''
};

const arraySortingByListTitle = (arr: Array<IList>) => {
  arr.sort((a: IList, b: IList) => {
    const titleA = a.todoTitle.toUpperCase();
    const titleB = b.todoTitle.toUpperCase();
    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }

    return 0;
  });
};

const listReducer = (state = initialState, action: listAction) => {
  switch (action.type) {
    case LIST_SET_LISTS:
      arraySortingByListTitle(action.payload);
      return { ...state, lists: action.payload };

    case LIST_ADD_LIST: {
      const { lists } = state;
      lists.push(action.payload);
      arraySortingByListTitle(lists);

      return { ...state, lists };
    }

    case LIST_UPDATE_LIST: {
      const { lists } = state;

      const listIndex = lists.findIndex(
        (list) => list.id === action.payload.id
      );

      if (listIndex >= 0) {
        lists[listIndex] = action.payload;
      }

      return { ...state, lists };
    }

    case LIST_DELETE_LIST: {
      const { lists } = state;
      const updatedLists = lists.filter(
        (list) => list.id !== action.payload.id
      );

      return { ...state, lists: updatedLists };
    }

    case LIST_START_LOADING:
      return { ...state, loading: true, error: '' };

    case LIST_END_LOADING:
      return { ...state, loading: false };

    case LIST_SET_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default listReducer;
