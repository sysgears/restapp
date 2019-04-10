import React from 'react';

import { translate, TranslateFunction } from '@restapp/i18n-client-react';
import WelcomeView from '../components/WelcomeView';

interface WelcomeProps {
  t: TranslateFunction;
}

class Welcome extends React.Component<WelcomeProps> {
  public render() {
    return <WelcomeView {...this.props} />;
  }
}

export default translate('welcome')(Welcome);
