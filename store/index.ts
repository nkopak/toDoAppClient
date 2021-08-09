import { createStore, applyMiddleware, combineReducers } from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import loginReducer from './reducers/loginReducer';
import registerReducer from './reducers/registerReducer';

const combinedReducer = combineReducers({
  login: loginReducer,
  register: registerReducer
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

const initStore = () =>
  createStore(reducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

const wrapper = createWrapper(initStore);
export default wrapper;
export type RootState = ReturnType<typeof combinedReducer>;