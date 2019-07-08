import React, { useState } from 'react';
import { StripeProvider } from 'react-stripe-elements';

import { translate } from '@restapp/i18n-client-react';
import { PLATFORM } from '@restapp/core-common';
// import { FormError } from '@gqlapp/forms-client-react';

import settings from '../../../../../../settings';
import { AddSubscriptionProps, CreditCardInput } from '../types';
import LoadStripeSDK from './LoadStripeSDK';
import AddSubscriptionView from '../components/AddSubscriptionView';
import { createCreditCardToken } from '../stripeOperations';

// react-stripe-elements will not render on the server and on the mobile.
const AddSubscription = ({ t, history, navigation }: AddSubscriptionProps) => {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (creditCardInput: CreditCardInput, stripe?: any) => {
    setSubmitting(true);

    try {
      const preparedCreditCard = await createCreditCardToken(creditCardInput, stripe);
      setSubmitting(false);
      history ? history.push('/subscriber-page') : navigation.goBack();
    } catch (error) {
      setSubmitting(false);
    }
  };

  /* Stripe elements should render only for web*/
  return (
    <LoadStripeSDK t={t}>
      {__CLIENT__ && PLATFORM === 'web' ? (
        <StripeProvider apiKey={settings.stripe.subscription.publicKey}>
          <AddSubscriptionView submitting={submitting} onSubmit={onSubmit} t={t} />
        </StripeProvider>
      ) : (
        <AddSubscriptionView submitting={submitting} onSubmit={onSubmit} t={t} />
      )}
    </LoadStripeSDK>
  );
};

export default translate('stripeSubscription')(AddSubscription);
