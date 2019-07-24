import React, { ReactElement } from 'react';
import { Router, Switch } from 'react-router-dom';
import createHistory, { MemoryHistory } from 'history/createMemoryHistory';
import { JSDOM } from 'jsdom';
import { combineReducers, createStore, Store } from 'redux';
import { Provider } from 'react-redux';

import ClientModule from '@restapp/module-client-react';

if (!process.env.JEST_WORKER_ID) {
  const dom = new JSDOM('<!doctype html><html><body><div id="root"><div></body></html>');
  (global as any).document = dom.window.document;
  (global as any).window = dom.window;
  // Needed by Formik >= 1.x
  (global as any).HTMLButtonElement = dom.window.HTMLButtonElement;
  (global as any).navigator = dom.window.navigator;
  process.on('uncaughtException', ex => {
    console.error('Uncaught error', ex.stack);
  });
}

// tslint:disable-next-line
const { render } = require('./testUtils');

const ref: { clientModules: ClientModule } = { clientModules: null };

export const initRenderer = (clientModules: ClientModule) => {
  ref.clientModules = clientModules;
};

export class Renderer {
  private store: Store;
  public history: MemoryHistory<any>;

  constructor(reduxState?: any) {
    const store = createStore(
      combineReducers({
        ...ref.clientModules.reducers
      }),
      reduxState || {}
    );

    const history = createHistory();

    this.store = store;
    this.history = history;
  }

  public withRedux(component: ReactElement<any>) {
    return ref.clientModules.getWrappedRoot(<Provider store={this.store}>{component}</Provider>);
  }

  public mount() {
    return render(
      ref.clientModules.getWrappedRoot(
        <Provider store={this.store}>
          <Router history={this.history}>
            <Switch>{ref.clientModules.routes}</Switch>
          </Router>
        </Provider>
      )
    );
  }
}
