import { createStore, combineReducers, applyMiddleware, Store, Reducer, DeepPartial, Middleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

export const getStoreReducer = (reducers: any) =>
  combineReducers({
    router: routerReducer,
    ...reducers
  });

const requestMiddleware: (httpClient?: any) => Middleware = httpClient => _state => next => action => {
  const { types, callAPI, ...rest } = action;

  if (!types) {
    return next(action);
  }

  const [REQUEST, SUCCESS, FAIL] = types;

  next({ type: REQUEST, ...rest });

  const handleCallApi = async () => {
    try {
      const result = await callAPI(httpClient);
      const data = result && result.data;
      next({
        type: SUCCESS,
        payload: data,
        ...rest
      });
      return data;
    } catch (e) {
      const data = e.response && e.response.data;
      next({
        type: FAIL,
        payload: data,
        ...rest
      });
      return data;
    }
  };

  return handleCallApi();
};

const createReduxStore = (
  reducers: Reducer,
  initialState: DeepPartial<any>,
  routerMiddleware?: Middleware,
  httpClient?: (request: () => Promise<any>) => void
): Store => {
  const middleware = routerMiddleware
    ? [routerMiddleware, requestMiddleware(httpClient)]
    : [requestMiddleware(httpClient)];
  return createStore(
    getStoreReducer(reducers),
    initialState, // initial state,
    composeWithDevTools(applyMiddleware(...middleware))
  );
};

export default createReduxStore;
