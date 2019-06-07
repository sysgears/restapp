import React from 'react';

import { PageLayout, MetaData } from '@restapp/look-client-react';

import ResetPasswordForm from './ResetPasswordForm';
import { CommonProps } from '../../types';
import { ResetPasswordSubmitProps } from '../types';

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
