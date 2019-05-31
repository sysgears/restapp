import React from 'react';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import { translate } from '@restapp/i18n-client-react';
import { Button, PageLayout } from '@restapp/look-client-react';

import UsersFilterView, { UsersFilterViewProps } from '../components/UsersFilterView';
import UsersListView, { UsersViewProps } from '../components/UsersListView';
import { withSortAndFilter, withUsers, withUsersDeleting } from './UserOperations';
import MetaData from '../../components/MetaData';

interface UsersProps extends UsersViewProps, UsersFilterViewProps {}

class Users extends React.Component<UsersProps> {
  public render() {
    const { t } = this.props;

    return (
      <PageLayout>
        <MetaData title={t('userEdit.title')} meta={t('userEdit.meta')} />
        <h2>{t('users.list.title')}</h2>
        <Link to="/users/new">
          <Button color="primary">{t('users.btn.add')}</Button>
        </Link>
        <hr />
        <UsersFilterView {...this.props} />
        <hr />
        <UsersListView {...this.props} />
      </PageLayout>
    );
  }
}

export default compose(
  withUsersDeleting,
  withSortAndFilter,
  withUsers
)(translate('userUsers')(Users));
