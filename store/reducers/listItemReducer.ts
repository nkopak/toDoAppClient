import {
  listItemState,
  listItemAction,
  LIST_ITEM_SET_ERROR,
  LIST_ITEM_SET_LIST_ITEMS,
  LIST_ITEM_START_LOADING,
  LIST_ITEM_END_LOADING,
  LIST_ITEM_ADD_LIST_ITEM,
  LIST_ITEM_DELETE_LIST_ITEM,
  LIST_ITEM_UPDATE_LIST_ITEM,
  LIST_ITEM_SET_TODO_ID
} from '../../types/listItem';

const initialState: listItemState = {
  listItems: [],
  doneListItems: [],
  todoId: '',
  loading: false,
  error: ''
};

const listItemReducer = (state = initialState, action: listItemAction) => {
  switch (action.type) {
    case LIST_ITEM_SET_LIST_ITEMS: {
      const doneItems = action.payload.filter(
        (item) => item.isCompleted === true
      );
      doneItems.sort((a, b) => {
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

      const undoneItems = action.payload.filter(
        (item) => item.isCompleted === false
      );
      undoneItems.sort((a, b) => {
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

      return { ...state, listItems: undoneItems, doneListItems: doneItems };
    }

    case LIST_ITEM_ADD_LIST_ITEM: {
      const { listItems } = state;
      listItems.push(action.payload);
      listItems.sort((a, b) => {
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

      return { ...state, listItems };
    }

    case LIST_ITEM_UPDATE_LIST_ITEM: {
      const { listItems } = state;

      const itemIndex: number = listItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        listItems[itemIndex] = action.payload;
      }

      return { ...state, listItems };
    }

    case LIST_ITEM_DELETE_LIST_ITEM: {
      const { listItems } = state;

      const updatedListItems = listItems.filter(
        (item) => item.id !== action.payload.id
      );

      return { ...state, listItems: updatedListItems };
    }
    case LIST_ITEM_START_LOADING:
      return { ...state, loading: true, error: '' };

    case LIST_ITEM_END_LOADING:
      return { ...state, loading: false };

    case LIST_ITEM_SET_ERROR:
      return { ...state, error: action.payload };

    case LIST_ITEM_SET_TODO_ID:
      return { ...state, todoId: action.payload };

    default:
      return state;
  }
};

export default listItemReducer;
