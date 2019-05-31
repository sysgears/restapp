import React from 'react';

import { LayoutCenter, PageLayout, Card, CardGroup, CardTitle, CardText, Button } from '@restapp/look-client-react';
import { translate, TranslateFunction } from '@restapp/i18n-client-react';

import LoginForm from './LoginForm';
import { LoginSubmitProps } from '..';
import { LoginProps } from '../containers/Login';
import MetaData from '../../components/MetaData';

interface LoginViewProps extends LoginProps {
  onSubmit: (values: LoginSubmitProps) => void;
  t: TranslateFunction;
  isRegistered?: boolean;
  hideModal: () => void;
}

const LoginView = ({ onSubmit, t, isRegistered, hideModal }: LoginViewProps) => {
  const renderConfirmationModal = () => (
    <Card>
      <CardGroup style={{ textAlign: 'center' }}>
        <CardTitle>{t('reg.successRegTitle')}</CardTitle>
        <CardText>{t('reg.successRegBody')}</CardText>
        <CardText>
          <Button style={{ minWidth: '320px' }} color="primary" onClick={hideModal}>
            {t('login.form.btnSubmit')}
          </Button>
        </CardText>
      </CardGroup>
    </Card>
  );

  return (
    <PageLayout>
      <MetaData title={t('login.title')} meta={t('login.meta')} />
      <LayoutCenter>
        {isRegistered ? (
          renderConfirmationModal()
        ) : (
          <>
            <h1 className="text-center">{t('login.form.title')}</h1>
            <LoginForm onSubmit={onSubmit} />
            <hr />
            <Card>
              <CardGroup>
                <CardTitle>{t('login.cardTitle')}:</CardTitle>
                <CardText>admin@example.com:admin123</CardText>
                <CardText>user@example.com:user1234</CardText>
              </CardGroup>
            </Card>
          </>
        )}
      </LayoutCenter>
    </PageLayout>
  );
};

export default translate('userSignUp')(LoginView);
