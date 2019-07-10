import React from 'react';
import { connect } from 'react-redux';
import { StripeProvider } from 'react-stripe-elements';

import { translate } from '@restapp/i18n-client-react';
import { PLATFORM } from '@restapp/core-common';
// import { FormError } from '@gqlapp/forms-client-react';

import settings from '../../../../../../../settings';
import { CreditCardInput } from '../types';
import LoadStripeSDK from './LoadStripeSDK';
import AddSubscriptionView from '../components/AddSubscriptionView';
import { createCreditCardToken } from '../stripeOperations';
import { addSubscription as addSubscriptionAction } from '../actions';

// react-stripe-elements will not render on the server and on the mobile.
const AddSubscription = ({ t, history, navigation, addSubscription, isLoading }: any) => {
  const onSubmit = async (creditCardInput: CreditCardInput, stripe?: any) => {
    try {
      const card = await createCreditCardToken({ ...creditCardInput }, stripe);
      addSubscriptionAction(card);

      // history ? history.push('/subscriber-page') : navigation.goBack();
    } catch (error) {}
  };

  /* Stripe elements should render only for web*/
  return (
    <LoadStripeSDK t={t}>
      {__CLIENT__ && PLATFORM === 'web' ? (
        <StripeProvider apiKey={settings.stripe.subscription.publicKey}>
          <AddSubscriptionView submitting={isLoading} onSubmit={onSubmit} t={t} />
        </StripeProvider>
      ) : (
        <AddSubscriptionView submitting={isLoading} onSubmit={onSubmit} t={t} />
      )}
    </LoadStripeSDK>
  );
};

export default translate('stripeSubscription')(
  connect(
    ({ addSubscription }: any) => ({ ...addSubscription }),
    { addSubscriptionAction }
  )(AddSubscription)
);
