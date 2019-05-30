import React from 'react';
import Helmet from 'react-helmet';

import { LayoutCenter, PageLayout } from '@restapp/look-client-react';

import ForgotPasswordForm from './ForgotPasswordForm';
import settings from '../../../../../settings';
import { CommonProps } from '../..';
import { ForgotPasswordSubmitProps } from '..';

interface ForgotPasswordViewProps extends CommonProps {
  onSubmit: (values: ForgotPasswordSubmitProps) => void;
  sent: boolean;
}

const ForgotPasswordView: React.FunctionComponent<ForgotPasswordViewProps> = ({ onSubmit, t, sent }) => {
  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t('forgotPass.title')}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${t('forgotPass.meta')}`
        }
      ]}
    />
  );

  return (
    <PageLayout>
      {renderMetaData()}
      <LayoutCenter>
        <h1 className="text-center">{t('forgotPass.form.title')}</h1>
        <ForgotPasswordForm onSubmit={onSubmit} sent={sent} />
      </LayoutCenter>
    </PageLayout>
  );
};

export default ForgotPasswordView;
