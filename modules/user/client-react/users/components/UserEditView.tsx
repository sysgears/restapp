import React from 'react';
import { Link } from 'react-router-dom';

import { translate, TranslateFunction } from '@restapp/i18n-client-react';
import { PageLayout } from '@restapp/look-client-react';

import UserForm from './UserForm';
import MetaData from '../../components/MetaData';
import { User } from '../../types/typings';

interface FormValues extends User {
  password: string;
  passwordConfirmation: string;
}

interface UserEditViewProps {
  loading: boolean;
  user: User;
  currentUser: User;
  t: TranslateFunction;
  onSubmit: (values: FormValues) => Promise<void>;
}

const UserEditView: React.FunctionComponent<UserEditViewProps> = ({ loading, user, t, currentUser, onSubmit }) => {
  const isNotSelf = !user || (user && user.id !== currentUser.id);

  return (
    <PageLayout>
      <MetaData title={t('userEdit.title')} meta={t('userEdit.meta')} />
      {loading && !user ? (
        <div className="text-center">{t('userEdit.loadMsg')}</div>
      ) : (
        <>
          <Link id="back-button" to={currentUser && currentUser.role === 'admin' ? '/users' : '/profile'}>
            Back
          </Link>
          <h2>
            {t('userEdit.form.titleEdit')} {t('userEdit.form.title')}
          </h2>
          <UserForm
            onSubmit={onSubmit}
            shouldDisplayRole={isNotSelf}
            shouldDisplayActive={isNotSelf}
            initialValues={user}
          />
        </>
      )}
    </PageLayout>
  );
};

export default translate('userUsers')(UserEditView);
