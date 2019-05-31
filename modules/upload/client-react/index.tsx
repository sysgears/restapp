import React from 'react';
import { Route } from 'react-router-dom';

import ClientModule from '@restapp/module-client-react';

import Upload from './containers/Upload';
import resources from './locales';
import uploadReducer from './reducers';

export default new ClientModule({
  reducer: [{ uploadReducer }],
  route: [<Route exact path="/upload" component={Upload} />],
  localization: [{ ns: 'upload', resources }]
});
