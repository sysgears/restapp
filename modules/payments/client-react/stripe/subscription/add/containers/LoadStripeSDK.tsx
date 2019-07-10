import React, { useState } from 'react';
import Helmet from 'react-helmet';

import { PageLayout } from '@restapp/look-client-react';

const LoadStripeSDK = ({ children, t }: { [key: string]: any }) => {
  const [isLoading, setLoading] = useState(!window.Stripe);

  const catchStripe = (newState: any, { scriptTags }: any): void => {
    if (scriptTags && isLoading) {
      const script = document.getElementById('stripe-js');
      const onLoading = () => {
        script.removeEventListener('load', onLoading);
        return setLoading(false);
      };

      script.addEventListener('load', onLoading);
    }
  };

  return (
    <>
      <Helmet onChangeClientState={catchStripe}>
        <script id="stripe-js" src="https://js.stripe.com/v3/" type="text/javascript" async />
      </Helmet>
      <PageLayout>{isLoading ? t('loading') : children}</PageLayout>
    </>
  );
};

export default LoadStripeSDK;
