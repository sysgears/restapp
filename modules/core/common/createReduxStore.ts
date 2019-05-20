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
      if (data.errors) {
        throw { response: result };
      }
      next({
        type: SUCCESS || null,
        ...rest,
        payload: data
      });

      return data;
    } catch (e) {
      if (e.response && e.response.data && e.response.data.status === 401) {
        return next({ ...action, type: null, status: e.response.data.status });
      }
      const data = e.response && e.response.data;
      next({
        type: FAIL || null,
        ...rest,
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
