import {
  listItemState,
  listItemAction,
  LIST_ITEM_SET_ERROR,
  LIST_ITEM_SET_LIST_ITEMS,
  LIST_ITEM_SET_LOADING,
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
      const undoneItems = action.payload.filter(
        (item) => item.isCompleted === false
      );

      return { ...state, listItems: undoneItems, doneListItems: doneItems };
    }
    case LIST_ITEM_ADD_LIST_ITEM: {
      const { listItems } = state;
      listItems.push(action.payload);

      return { ...state, listItems };
    }
    case LIST_ITEM_UPDATE_LIST_ITEM: {
      const { listItems } = state;

      const itemForUpdate = listItems.find(
        (item) => item.id === action.payload.id
      );

      const updatedItems = listItems.filter(
        (item) => item.id !== action.payload.id
      );

      if (itemForUpdate) {
        itemForUpdate.todoTitle = action.payload.todoTitle;
        itemForUpdate.isCompleted = action.payload.isCompleted;

        updatedItems.push(itemForUpdate);
      }

      return { ...state, listItems: updatedItems };
    }
    case LIST_ITEM_DELETE_LIST_ITEM: {
      const { listItems } = state;

      const updatedListItems = listItems.filter(
        (item) => item.id !== action.payload.id
      );

      return { ...state, listItems: updatedListItems };
    }
    case LIST_ITEM_SET_LOADING:
      return { ...state, loading: action.payload };
    case LIST_ITEM_SET_ERROR:
      return { ...state, error: action.payload };
    case LIST_ITEM_SET_TODO_ID:
      return { ...state, todoId: action.payload };
    default:
      return state;
  }
};

export default listItemReducer;
