import * as React from 'react';
import Helmet from 'react-helmet';

import { LayoutCenter, PageLayout, Card, CardGroup, CardTitle, CardText, Button } from '@restapp/look-client-react';
import { translate, TranslateFunction } from '@restapp/i18n-client-react';

import LoginForm from './LoginForm';
import { LoginSubmitProps } from '..';
import { LoginProps } from '../containers/Login';

import settings from '../../../../settings';

interface LoginViewProps extends LoginProps {
  onSubmit: (values: LoginSubmitProps) => void;
  t: TranslateFunction;
  isRegistered?: boolean;
  hideModal: () => void;
}

const LoginView = ({ onSubmit, t, isRegistered, hideModal }: LoginViewProps) => {
  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t('login.title')}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${t('login.meta')}`
        }
      ]}
    />
  );

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
      {renderMetaData()}
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

export default translate('user')(LoginView);
