import { createStore, combineReducers, applyMiddleware, Store, Reducer, DeepPartial, Middleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

export const getStoreReducer = (reducers: any) =>
  combineReducers({
    router: routerReducer,
    ...reducers
  });

const requestMiddleware: Middleware = _state => next => action => {
  const { type, promise, ...rest } = action;
  if (!promise) {
    return next(action);
  }
  const [SUCCESS, FAIL] = type;

  (async () => {
    try {
      const result = await promise();

      next({
        type: SUCCESS,
        result,
        ...rest
      });
    } catch (error) {
      next({
        type: FAIL,
        error,
        ...resizeTo
      });
    }
  })();
};

const createReduxStore = (reducers: Reducer, initialState: DeepPartial<any>, routerMiddleware?: Middleware): Store => {
  const middleware = routerMiddleware
    ? composeWithDevTools(applyMiddleware(routerMiddleware, requestMiddleware))
    : composeWithDevTools(applyMiddleware(requestMiddleware));
  return createStore(
    getStoreReducer(reducers),
    initialState, // initial state,
    middleware
  );
};

export default createReduxStore;
