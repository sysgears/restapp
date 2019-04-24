import * as React from 'react';
import Helmet from 'react-helmet';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { translate, TranslateFunction } from '@restapp/i18n-client-react';
import { Button, PageLayout } from '@restapp/look-client-react';

import settings from '../../../../settings';
import UsersFilterView from '../components/UsersFilterView';
import UsersListView from '../components/UsersListView';
import { withFilterUpdating, withOrderByUpdating, withUsers, withUsersDeleting } from './UserOperations';

interface UsersProps {
  t: TranslateFunction;
  filter: any;
}

const Users = (props: UsersProps) => {
  const { t } = props;

  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t('users.title')}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${t('users.meta')}`
        }
      ]}
    />
  );

  return (
    <PageLayout>
      {renderMetaData()}
      <h2>{t('users.list.title')}</h2>
      <Link to="/users/new">
        <Button color="primary">{t('users.btn.add')}</Button>
      </Link>
      <hr />
      <UsersFilterView {...props} />
      <hr />
      <UsersListView {...props} />
    </PageLayout>
  );
};

export default compose(
  withUsers,
  withUsersDeleting,
  withOrderByUpdating,
  withFilterUpdating
)(translate('user')(Users));
