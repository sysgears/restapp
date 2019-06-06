import React from 'react';
import { Route } from 'react-router-dom';
import { MenuItem, NavLink } from '@restapp/look-client-react';
import ClientModule from '@restapp/module-client-react';
import { translate } from '@restapp/i18n-client-react';
import Upload from './containers/Upload';
import resources from './locales';
import uploadReducer from './reducers';

const NavLinkWithI18n = translate('upload')(NavLink);

export default new ClientModule({
  reducer: [{ uploadReducer }],
  route: [<Route exact path="/upload" component={Upload} />],
  navItem: [
    <MenuItem key="/upload">
      <NavLinkWithI18n path="/upload" />
    </MenuItem>
  ],
  localization: [{ ns: 'upload', resources }]
});
