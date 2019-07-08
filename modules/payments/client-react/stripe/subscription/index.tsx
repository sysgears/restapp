import React from 'react';
import { NavLink } from 'react-router-dom';
import ClientModule from '@restapp/module-client-react';
import { MenuItem } from '@restapp/look-client-react';
import { translate, TranslateFunction } from '@restapp/i18n-client-react';
import { AuthRoute, IfLoggedIn } from '@restapp/user-client-react/containers/Auth';
import { UserRole } from '@restapp/user-client-react/types';

import AddSubscription from './containers/AddSubscription';
import locales from './locales';

const NavLinkWithI18n = translate('stripeSubscription')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/subscriber-page" className="nav-link" activeClassName="active">
    {t('navLink')}
  </NavLink>
));

export default new ClientModule({
  route: [<AuthRoute exact path="/add-subscription" role={UserRole.user} component={AddSubscription} />],
  navItem: [
    <IfLoggedIn role={UserRole.user}>
      <MenuItem key="/subscriber-page">
        <NavLinkWithI18n />
      </MenuItem>
    </IfLoggedIn>
  ],
  localization: [{ ns: 'stripeSubscription', resources: locales }]
});
