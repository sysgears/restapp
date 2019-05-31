import React from 'react';

import { translate } from '@restapp/i18n-client-react';
import { LayoutCenter } from '@restapp/look-client-react';

import { CommonProps } from '../types';

interface LoadingProps extends CommonProps {}

const Loading = ({ t }: LoadingProps) => (
  <LayoutCenter>
    <div className="text-center">{t('loading')}</div>
  </LayoutCenter>
);

export default translate('user')(Loading);
