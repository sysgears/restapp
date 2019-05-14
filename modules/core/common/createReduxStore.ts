import { createStore, combineReducers, applyMiddleware, Store, Reducer, DeepPartial, Middleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

export const getStoreReducer = (reducers: any) =>
  combineReducers({
    router: routerReducer,
    ...reducers
  });

const requestMiddleware: Middleware = _state => next => action => {
  const { types, callAPI, ...rest } = action;

  if (!types) {
    return next(action);
  }

  const [REQUEST, SUCCESS, FAIL] = types;

  next({ type: REQUEST, ...rest });

  const handleCallApi = async () => {
    try {
      const result = await callAPI();
      const data = result && result.data;
      if (data.errors) {
        throw { response: result };
      }
      next({
        type: SUCCESS,
        ...rest,
        payload: data
      });
      return data;
    } catch (e) {
      if (e.response && e.response.status === 401) {
        return next({ ...action, status: e.response.status });
      }
      const data = e.response && e.response.data;
      next({
        type: FAIL,
        ...rest,
        payload: data
      });
      throw e;
    }
  };

  return handleCallApi();
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
