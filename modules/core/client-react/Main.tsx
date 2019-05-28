import React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import ReactGA from 'react-ga';
import { apiUrl } from '@restapp/core-common';
import ClientModule from '@restapp/module-client-react';

import RedBox from './RedBox';
import createReduxStore, { getStoreReducer } from '../../../packages/common/createReduxStore';
import log from '../../../packages/common/log';
import settings from '../../../settings';

log.info(`Connecting to REST backend at: ${apiUrl}`);

const ref: { modules: ClientModule; store: Store } = {
  modules: null,
  store: null
};

export const onAppCreate = (modules: ClientModule, entryModule: NodeModule) => {
  ref.modules = modules;
  if (entryModule.hot && entryModule.hot.data && entryModule.hot.data.store) {
    ref.store = entryModule.hot.data.store;
    ref.store.replaceReducer(getStoreReducer(ref.modules.reducers));
  } else {
    ref.store = createReduxStore(ref.modules.reducers, {}, routerMiddleware(history), ref.modules.reduxMiddlewares);
  }
};

const history = createHistory();
const logPageView = (location: any) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
};

// Initialize Google Analytics and send events on each location change
ReactGA.initialize(settings.analytics.ga.trackingId);
logPageView(window.location);

history.listen(location => logPageView(location));

export const onAppDispose = (_: any, data: any) => {
  data.store = ref.store;
};

class ServerError extends Error {
  constructor(error: any) {
    super();
    for (const key of Object.getOwnPropertyNames(error)) {
      this[key] = error[key];
    }
    this.name = 'ServerError';
  }
}

interface MainState {
  error?: ServerError;
  info?: any;
  ready?: boolean;
}

export class Main extends React.Component<any, MainState> {
  constructor(props: any) {
    super(props);
    const serverError = window.__SERVER_ERROR__;
    serverError ? (this.state = { error: new ServerError(serverError), ready: true }) : (this.state = {});
  }

  public componentDidCatch(error: ServerError, info: any) {
    this.setState({ error, info });
  }

  public render() {
    return this.state.error ? (
      <RedBox error={this.state.error} />
    ) : (
      ref.modules.getWrappedRoot(
        <Provider store={ref.store}>
          {ref.modules.getDataRoot(<ConnectedRouter history={history}>{ref.modules.router}</ConnectedRouter>)}
        </Provider>
      )
    );
  }
}
