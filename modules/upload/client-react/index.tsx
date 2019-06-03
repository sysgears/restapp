import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { translate, TranslateFunction } from '@restapp/i18n-client-react';
import { MenuItem } from '@restapp/look-client-react';
import ClientModule from '@restapp/module-client-react';

import Upload from './containers/Upload';
import resources from './locales';
import uploadReducer from './reducers';

const NavLinkWithI18n = translate('upload')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/upload" className="nav-link" activeClassName="active">
    {t('navLink')}
  </NavLink>
));

export default new ClientModule({
  reducer: [{ uploadReducer }],
  route: [<Route exact path="/upload" component={Upload} />],
  navItem: [
    <MenuItem key="/upload">
      <NavLinkWithI18n />
    </MenuItem>
  ],
  localization: [{ ns: 'upload', resources }]
});
