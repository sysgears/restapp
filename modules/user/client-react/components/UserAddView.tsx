import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { translate, TranslateFunction } from '@restapp/i18n-client-react';
import { PageLayout } from '@restapp/look-client-react';

import UserForm from './UserForm';
import settings from '../../../../settings';
import { User } from '..';

interface FormValues extends User {
  password: string;
  passwordConfirmation: string;
}

interface UserAddViewProps {
  t: TranslateFunction;
  onSubmit: (values: FormValues) => Promise<void>;
}

const UserAddView = ({ t, onSubmit }: UserAddViewProps) => {
  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t('userEdit.title')}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${t('userEdit.meta')}`
        }
      ]}
    />
  );

  return (
    <PageLayout>
      {renderMetaData()}
      <Link id="back-button" to="/users">
        Back
      </Link>
      <h2>
        {t('userEdit.form.titleCreate')} {t('userEdit.form.title')}
      </h2>
      <UserForm onSubmit={onSubmit} initialValues={{}} shouldDisplayRole={true} shouldDisplayActive={true} />
    </PageLayout>
  );
};

export default translate('user')(UserAddView);
