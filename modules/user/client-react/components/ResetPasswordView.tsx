import React from 'react';
import Helmet from 'react-helmet';
import { PageLayout } from '@restapp/look-client-react';

import ResetPasswordForm from '../components/ResetPasswordForm';
import { CommonProps } from '..';
import settings from '../../../../settings';

interface ResetPasswordViewProps extends CommonProps {
  onSubmit: (values: any) => void;
}

const ResetPasswordView: React.FunctionComponent<ResetPasswordViewProps> = ({ t, onSubmit }) => {
  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t('resetPass.title')}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${t('resetPass.meta')}`
        }
      ]}
    />
  );

  return (
    <PageLayout>
      {renderMetaData()}
      <h1>{t('resetPass.form.title')}</h1>
      <ResetPasswordForm onSubmit={onSubmit} />
    </PageLayout>
  );
};

export default ResetPasswordView;
