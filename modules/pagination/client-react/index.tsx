import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import { translate, TranslateFunction } from '@restapp/i18n-client-react';
import { MenuItem } from '@restapp/look-client-react';
import ClientModule from '@restapp/module-client-react';
import PaginationDemo from './containers/PaginationDemo.web';

import resources from './locales';

const NavLinkWithI18n = translate('pagination')(({ t }: { [key: string]: TranslateFunction }) => (
  <NavLink to="/pagination" className="nav-link" activeClassName="active">
    {t('pagination:navLink')}
  </NavLink>
));

export default new ClientModule({
  route: [<Route exact path="/pagination" component={PaginationDemo} />],
  navItem: [
    <MenuItem key="/pagination">
      <NavLinkWithI18n />
    </MenuItem>
  ],
  localization: [{ ns: 'pagination', resources }]
});
