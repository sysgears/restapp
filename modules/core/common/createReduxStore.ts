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
    return next(rest);
  }

  const { REQUEST = null, SUCCESS = null, FAIL = null } = types;

  next({ type: REQUEST, ...rest });

  const handleAPICall = async () => {
    try {
      const { data: payload } = await APICall();
      next({
        ...rest,
        type: SUCCESS,
        payload
      });

      return payload;
    } catch (e) {
      const { response } = e;
      if (response && response.status === 401) {
        return next({ ...action, type: null, status: response.status });
      }
      next({
        ...rest,
        type: FAIL,
        payload: response && response.data
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
  reduxMiddlewares: Middleware[] = []
): Store => {
  const middlewares: () => Middleware[] = () => {
    const routerMiddlewares = routerMiddleware ? [routerMiddleware] : [];

    return [...routerMiddlewares, requestMiddleware, ...reduxMiddlewares];
  };
  return createStore(
    getStoreReducer(reducers),
    initialState, // initial state,
    composeWithDevTools(applyMiddleware(...middlewares()))
  );
};

export default createReduxStore;
