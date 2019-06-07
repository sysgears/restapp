import React from 'react';
import Helmet from 'react-helmet';

import settings from '../../../settings';

interface MetaDataProps {
  title: string;
  meta: string;
}

const MetaData = ({ title, meta }: MetaDataProps) => (
  <Helmet
    title={`${settings.app.name} - ${title}`}
    meta={[
      {
        name: 'description',
        content: `${settings.app.name} - ${meta}`
      }
    ]}
  />
);

export default MetaData;
