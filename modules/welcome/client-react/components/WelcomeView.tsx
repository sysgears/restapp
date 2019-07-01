import React from 'react';
import Helmet from 'react-helmet';
import { PageLayout } from '@restapp/look-client-react';
import { TranslateFunction } from '@restapp/i18n-client-react';
import settings from '@restapp/config';

interface WelcomeViewProps {
  t: TranslateFunction;
}

const renderMetaData = (t: TranslateFunction) => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

const WelcomeView = ({ t }: WelcomeViewProps) => {
  return (
    <PageLayout>
      {renderMetaData(t)}
      <div className="text-center">
        <p>{t('welcomeText')}</p>
      </div>
    </PageLayout>
  );
};

export default WelcomeView;
