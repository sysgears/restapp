import React from 'react';
import Helmet from 'react-helmet';

import { PageLayout } from '@restapp/look-client-react';
import { translate, TranslateFunction } from '@restapp/i18n-client-react';
import settings from '../../../../settings';

import reports from '../reports';

interface ReportProps {
  t: TranslateFunction;
}

const Report = ({ t }: ReportProps) => (
  <PageLayout>
    <Helmet
      title={`${settings.app.name} - ${t('title')}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${t('meta')}`
        }
      ]}
    />
    {reports.reportComponent &&
      reports.reportComponent.map((component: any, idx: number, items: any) =>
        React.cloneElement(component, { key: idx + items.length })
      )}
  </PageLayout>
);

export default translate('report')(Report);
