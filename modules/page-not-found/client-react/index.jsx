import React from 'react';
import { Route } from 'react-router-dom';
import ClientModule from '@restapp/module-client-react';

import PageNotFound from './containers/PageNotFound';
import resources from './locales';

export default new ClientModule({
  route: [<Route component={PageNotFound} />],
  localization: [{ ns: 'notFound', resources }]
});
