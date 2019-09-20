import React from 'react';
import { Route } from 'react-router-dom';
import ClientModule from '@restapp/module-client-react';
import { MenuItem } from '@restapp/look-client-react';
import { translate, NavLinkWithTranslate } from '@restapp/i18n-client-react';
import Counter from './containers/Counter';
import counters from './counters';
import resources from './locales';

const NavLinkWithI18n = translate('counter')(NavLinkWithTranslate);

export default new ClientModule(counters, {
  route: [<Route exact path="/counter" component={Counter} />],
  navItem: [
    <MenuItem key="/counter">
      <NavLinkWithI18n path="/counter" />
    </MenuItem>
  ],
  localization: [{ ns: 'counter', resources }]
});
