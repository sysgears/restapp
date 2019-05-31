import React from 'react';

import { PageLayout } from '@restapp/look-client-react';

import ResetPasswordForm from './ResetPasswordForm';
import { CommonProps } from '../../types/typings';
import { ResetPasswordSubmitProps } from '..';
import MetaData from '../../components/MetaData';

interface ResetPasswordViewProps extends CommonProps {
  onSubmit: (values: ResetPasswordSubmitProps) => void;
}

const ResetPasswordView: React.FunctionComponent<ResetPasswordViewProps> = ({ t, onSubmit }) => {
  return (
    <PageLayout>
      <MetaData title={t('resetPass.title')} meta={t('resetPass.meta')} />
      <h1>{t('resetPass.form.title')}</h1>
      <ResetPasswordForm onSubmit={onSubmit} />
    </PageLayout>
  );
};

export default ResetPasswordView;
