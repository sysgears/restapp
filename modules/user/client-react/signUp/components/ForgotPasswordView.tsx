import React from 'react';

import { LayoutCenter, PageLayout, MetaData } from '@restapp/look-client-react';

import ForgotPasswordForm from './ForgotPasswordForm';
import { CommonProps } from '../../types';
import { ForgotPasswordSubmitProps } from '../types';

interface ForgotPasswordViewProps extends CommonProps {
  onSubmit: (values: ForgotPasswordSubmitProps) => void;
  sent: boolean;
}

const ForgotPasswordView: React.FunctionComponent<ForgotPasswordViewProps> = ({ onSubmit, t, sent }) => {
  return (
    <PageLayout>
      <MetaData title={t('forgotPass.title')} meta={t('forgotPass.title')} />
      <LayoutCenter>
        <h1 className="text-center">{t('forgotPass.form.title')}</h1>
        <ForgotPasswordForm onSubmit={onSubmit} sent={sent} />
      </LayoutCenter>
    </PageLayout>
  );
};

export default ForgotPasswordView;
