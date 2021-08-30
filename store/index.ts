import { createStore, applyMiddleware, combineReducers } from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import loginReducer from './reducers/loginReducer';
import registerReducer from './reducers/registerReducer';
import listReducer from './reducers/listReducer';
import tokenInfoReducer from './reducers/tokenInfoReducer';
import getTokenInfo from './actions/tokenInfoActions';
import listItemReducer from './reducers/listItemReducer';
import userReducer from './reducers/userReducer';

const combinedReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  list: listReducer,
  tokenInfo: tokenInfoReducer,
  listItem: listItemReducer,
  user: userReducer
});

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload // apply delta from hydration
    };
    if (state.count.count) nextState.count.count = state.count.count; // preserve count value on client side navigation
    return nextState;
  }
  return combinedReducer(state, action);
};

const initStore = () => {
  const tempStore = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
  tempStore.dispatch(getTokenInfo());

  return tempStore;
};

const wrapper = createWrapper(initStore);
export default wrapper;
export type RootState = ReturnType<typeof combinedReducer>;
