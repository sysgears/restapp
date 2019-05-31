import React from 'react';
import { withRouter } from 'react-router-dom';

import { withLogout, WithLogoutProps } from '../../containers/Auth';
import { translate } from 'react-i18next';

const LogoutLink = ({ logout, history, t }: WithLogoutProps) => (
  <a
    href="javascript:void(0)"
    onClick={e => {
      e.preventDefault();
      (async () => {
        await logout();
        history.push('/');
      })();
    }}
    className="nav-link"
  >
    {t('logout')}
  </a>
);

export default withRouter(withLogout(translate('userSignUp')(LogoutLink)) as any);
