import React, { useState, useEffect } from 'react';
import { StripeProvider } from 'react-stripe-elements';
import { Helmet } from 'react-helmet';

import { translate } from '@restapp/i18n-client-react';
import { PLATFORM } from '@restapp/core-common';
import settings from '../../../../../../settings';

import { AddSubscriptionProps } from '../types';
import AddSubscriptionView from '../components/AddSubscriptionView';
import { PageLayout } from '@restapp/look-client-react';

// react-stripe-elements will not render on the server and on the mobile.
const AddSubscription = ({ t }: AddSubscriptionProps) => {
  const [submitting, setSubmitting] = useState(false);

  /* Stripe elements should render only for web*/
  return __CLIENT__ && PLATFORM === 'web' ? (
    <StripeProvider apiKey={settings.stripe.subscription.publicKey}>
      <AddSubscriptionView submitting={submitting} onSubmit={() => {}} t={t} />
    </StripeProvider>
  ) : (
    <AddSubscriptionView submitting={submitting} onSubmit={() => {}} t={t} />
  );
};

const LoadStripeSDK = (props: AddSubscriptionProps) => {
  const [isLoading, setLoading] = useState(!window.Stripe);

  useEffect(() => {
    if (isLoading) {
      const script = document.getElementById('stripe-js');
      const onLoading = () => {
        script.removeEventListener('load', onLoading);
        return setLoading(false);
      };

      script.addEventListener('load', onLoading);
    }
  }, []);

  return (
    <>
      <Helmet>
        <script id="stripe-js" src="https://js.stripe.com/v3/" type="text/javascript" async />
      </Helmet>
      <PageLayout>{isLoading ? props.t('loading') : <AddSubscription {...props} />}</PageLayout>
    </>
  );
};

export default translate('stripeSubscription')(LoadStripeSDK);
