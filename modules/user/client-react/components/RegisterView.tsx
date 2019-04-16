import React from 'react';
import Helmet from 'react-helmet';
import { translate, TranslateFunction } from '@restapp/i18n-client-react';
import { LayoutCenter, PageLayout, Card, CardGroup, CardTitle, CardText } from '@restapp/look-client-react';

import RegisterForm from '../components/RegisterForm';

import settings from '../../../../settings';

interface RegisterViewProps {
  t: TranslateFunction;
  onSubmit: (values: RegisterOnSubmitProps) => void;
  isRegistered: boolean;
}

export interface RegisterOnSubmitProps {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const RegisterView = ({ t, onSubmit, isRegistered }: RegisterViewProps) => {
  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t('reg.title')}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${t('reg.meta')}`
        }
      ]}
    />
  );

  const renderConfirmationModal = () => (
    <Card>
      <CardGroup style={{ textAlign: 'center' }}>
        <CardTitle>{t('reg.confirmationMsgTitle')}</CardTitle>
        <CardText>{t('reg.confirmationMsgBody')}</CardText>
      </CardGroup>
    </Card>
  );

  return (
    <PageLayout>
      {renderMetaData()}
      <LayoutCenter>
        <h1 className="text-center">{t('reg.form.title')}</h1>
        {isRegistered && settings.auth.password.requireEmailConfirmation ? (
          renderConfirmationModal()
        ) : (
          <RegisterForm onSubmit={onSubmit} />
        )}
      </LayoutCenter>
    </PageLayout>
  );
};

export default translate('user')(RegisterView);
