import React from 'react';
import { Provider } from 'react-redux';
import url from 'url';

import ClientModule from '@restapp/module-client-react-native';
import settings from '@restapp/config';
import createReduxStore from '../../../packages/common/createReduxStore';
import log from '../../../packages/common/log';

const { protocol, pathname, port } = url.parse(__API_URL__);

interface MainProps {
  children?: any;
  exp: any;
  modules: ClientModule;
}

export default class Main extends React.Component<MainProps> {
  public render() {
    const { hostname } = url.parse(__API_URL__);
    const { modules } = this.props;

    const apiUrl =
      this.props.exp.manifest.bundleUrl && hostname === 'localhost'
        ? `${protocol}//${url.parse(this.props.exp.manifest.bundleUrl).hostname}:${port}${pathname}`
        : __API_URL__;

    const store = createReduxStore(
      Object.keys(modules.reducers).length > 0 ? modules.reducers : state => state,
      {}, // initial state
      null,
      modules.reduxMiddlewares
    );

    if (!__TEST__ || settings.app.logging.level === 'debug') {
      log.info(`Connecting to REST backend at: ${apiUrl}`);
    }

    return modules.getWrappedRoot(<Provider store={store}>{modules.getDataRoot(modules.router)}</Provider>);
  }
}
