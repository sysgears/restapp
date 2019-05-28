import { createStore, combineReducers, applyMiddleware, Store, Reducer, DeepPartial, Middleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

export const getStoreReducer = (reducers: any) =>
  combineReducers({
    router: routerReducer,
    ...reducers
  });

const requestMiddleware: Middleware = _state => next => action => {
  const { types, APICall, ...rest } = action;
  if (!types) {
    return next(action);
  }

  const { REQUEST, SUCCESS, FAIL } = types;

  next({ type: REQUEST || null, ...rest });

  const handleAPICall = async () => {
    try {
      const result = await APICall();
      const data = result && result.data;
      next({
        ...rest,
        type: SUCCESS || null,
        payload: data
      });

      return data;
    } catch (e) {
      const data = e.response && e.response.data;
      if (data && e.response.status === 401) {
        return next({ ...action, type: null, status: e.response.status });
      }

      next({
        ...rest,
        type: FAIL || null,
        payload: data
      });
      throw e;
    }
  };

  return handleAPICall();
};

const createReduxStore = (
  reducers: Reducer,
  initialState: DeepPartial<any>,
  routerMiddleware?: Middleware,
  reduxMiddlewares?: Middleware[]
): Store => {
  const middleware: () => Middleware[] = () => {
    const routerMiddlewares = routerMiddleware ? [routerMiddleware] : [];
    const reduxMiddleware = reduxMiddlewares && reduxMiddlewares.length ? reduxMiddlewares : [];

    return [...routerMiddlewares, requestMiddleware, ...reduxMiddleware];
  };
  return createStore(
    getStoreReducer(reducers),
    initialState, // initial state,
    composeWithDevTools(applyMiddleware(...middleware()))
  );
};

export default createReduxStore;
