import React from 'react';
import { NavLink } from 'react-router-dom';

import { translate } from '@restapp/i18n-client-react';

import { CommonProps } from '../../types';

const NavLinkUsersWithI18n = ({ t }: CommonProps) => (
  <NavLink to="/users" className="nav-link" activeClassName="active">
    {t('navLink.users')}
  </NavLink>
);

export default translate('userUsers')(NavLinkUsersWithI18n);
