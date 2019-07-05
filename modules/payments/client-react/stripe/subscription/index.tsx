import React from 'react';
import { NavLink } from 'react-router-dom';
import ClientModule from '@restapp/module-client-react';
import { MenuItem } from '@restapp/look-client-react';
import { translate, TranslateFunction } from '@restapp/i18n-client-react';

const NavLinkWithI18n = translate('stripeSubscription')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/subscriber-page" className="nav-link" activeClassName="active">
    {t('navLink')}
  </NavLink>
));

export default new ClientModule({
  navItem: [
    <MenuItem key="/subscriber-page">
      <NavLinkWithI18n />
    </MenuItem>
  ]
});
