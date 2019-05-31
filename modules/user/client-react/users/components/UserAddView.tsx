import React from 'react';
import { Link } from 'react-router-dom';

import { translate, TranslateFunction } from '@restapp/i18n-client-react';
import { PageLayout } from '@restapp/look-client-react';

import UserForm from './UserForm';
import { User } from '../../types';
import MetaData from '../../components/MetaData';

interface FormValues extends User {
  password: string;
  passwordConfirmation: string;
}

interface UserAddViewProps {
  t: TranslateFunction;
  onSubmit: (values: FormValues) => Promise<void>;
}

const UserAddView = ({ t, onSubmit }: UserAddViewProps) => {
  return (
    <PageLayout>
      <MetaData title={t('userEdit.title')} meta={t('userEdit.meta')} />
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

export default translate('userUsers')(UserAddView);
