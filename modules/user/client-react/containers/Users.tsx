import * as React from 'react';
import Helmet from 'react-helmet';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { translate, TranslateFunction } from '@restapp/i18n-client-react';
import { Button, PageLayout } from '@restapp/look-client-react';
import settings from '../../../../settings';
import UsersFilterView, { UsersFilterViewProps } from '../components/UsersFilterView';
import UsersListView, { UsersViewProps } from '../components/UsersListView';
import { withSortAndFilter, withUsers, withUsersDeleting } from './UserOperations';

interface UsersProps extends UsersViewProps, UsersFilterViewProps {}

class Users extends React.Component<UsersProps> {
  public renderMetaData = (t: TranslateFunction) => (
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
  public render() {
    const { t } = this.props;

    return (
      <PageLayout>
        {this.renderMetaData(t)}
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
)(translate('user')(Users));
