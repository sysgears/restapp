import React from 'react';
import { Route } from 'react-router-dom';

import ClientModule from '@restapp/module-client-react';

import Welcome from './containers/Welcome';
import resources from './locales';

export default new ClientModule({
  route: [<Route exact path="/" component={Welcome} />],
  localization: [{ ns: 'welcome', resources }]
});
