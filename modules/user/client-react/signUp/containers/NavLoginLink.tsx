import React from 'react';
import { NavLink } from 'react-router-dom';

import { translate } from '@restapp/i18n-client-react';
import { CommonProps } from '../../types';

const NavLinkLoginWithI18n = ({ t }: CommonProps) => (
  <NavLink to="/login" className="nav-link" activeClassName="active">
    {t('navLink.signIn')}
  </NavLink>
);

export default translate('userSignUp')(NavLinkLoginWithI18n);
