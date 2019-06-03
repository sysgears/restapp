import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import { translate, TranslateFunction } from '@restapp/i18n-client-react';
import { MenuItem } from '@restapp/look-client-react';

import ReportModule from './ReportModule';
import excel from './excel';
import pdf from './pdf';
import print from './print';
import Report from './containers/Report';
import resources from './locales';

const NavLinkWithI18n = translate('report')(({ t }: { t: TranslateFunction }) => (
  <NavLink to="/report" className="nav-link" activeClassName="active">
    {t('navLink')}
  </NavLink>
));

export default new ReportModule(print, pdf, excel, {
  route: [<Route exact path="/report" component={Report} />],
  navItem: [
    <MenuItem key="/report">
      <NavLinkWithI18n />
    </MenuItem>
  ],
  localization: [{ ns: 'report', resources }]
});
