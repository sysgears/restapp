import React, { useState } from 'react';
import { StripeProvider } from 'react-stripe-elements';
import { Helmet } from 'react-helmet';

import { translate } from '@restapp/i18n-client-react';
import { PLATFORM } from '@restapp/core-common';
import settings from '../../../../../../settings';

import { AddSubscriptionProps } from '../types';
import AddSubscriptionView from '../components/AddSubscriptionView';

// react-stripe-elements will not render on the server and on the mobile.
const AddSubscription = ({ t, history, navigation }: AddSubscriptionProps) => {
  const [submitting, setSubmitting] = useState(false);

  return (
    <>
      <Helmet>
        <script src="https://js.stripe.com/v3/" type="text/javascript" />
      </Helmet>
      {/* Stripe elements should render only for web*/}
      {__CLIENT__ && PLATFORM === 'web' ? (
        <StripeProvider apiKey={settings.stripe.subscription.publicKey}>
          <AddSubscriptionView submitting={submitting} onSubmit={() => {}} t={t} />
        </StripeProvider>
      ) : (
        <AddSubscriptionView submitting={submitting} onSubmit={() => {}} t={t} />
      )}
    </>
  );
};

export default translate('stripeSubscription')(AddSubscription);
