import React from 'react';
import { CookiesProvider } from 'react-cookie';

import ClientModule from '@restapp/module-client-react';

import signUp from './signUp';
import profile from './profile';
import users from './users';
import resources from './locales';
import DataRootComponent from './containers/DataRootComponent';

export default new ClientModule(signUp, profile, users, {
  localization: [{ ns: 'user', resources }],
  dataRootComponent: [DataRootComponent],
  rootComponentFactory: [req => (req ? <CookiesProvider cookies={req.universalCookies} /> : <CookiesProvider />)]
});
