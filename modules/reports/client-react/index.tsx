import React from 'react';
import { NavLink } from 'react-router-dom';
import { translate, TranslateFunction } from '@restapp/i18n-client-react';
import { MenuItem } from '@restapp/look-client-react';
import ClientModule from '@restapp/module-client-react';

import resources from './locales';

const NavLinkWithI18n = translate('report')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/report" className="nav-link" activeClassName="active">
    {t('navLink')}
  </NavLink>
));

export default new ClientModule({
  navItem: [
    <MenuItem key="/report">
      <NavLinkWithI18n />
    </MenuItem>
  ],
  localization: [{ ns: 'report', resources }]
});
