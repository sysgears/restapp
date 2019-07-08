import settings from '../../../../../settings';
import { CreditCardInput } from './types';

export const createToken = (creditCardInput: CreditCardInput) => {
  const card = {
    'card[number]': creditCardInput.values.number.replace(/ /g, ''),
    'card[exp_month]': creditCardInput.values.expiry.split('/')[0],
    'card[exp_year]': creditCardInput.values.expiry.split('/')[1],
    'card[cvc]': creditCardInput.values.cvc
  };

  return fetch('https://api.stripe.com/v1/tokens', {
    headers: {
      Accept: 'application/json',
      'Content-Type': ' application/x-www-form-urlencoded',
      Authorization: `Bearer ${settings.stripe.subscription.publicKey}`
    },
    method: 'post',
    body: Object.keys(card)
      .map(key => key + '=' + card[key])
      .join('&')
  }).then(response => response.json());
};

export const createCreditCardToken = async (creditCardInput: CreditCardInput, stripe: any) => {
  const { name } = creditCardInput;
  const { token, error } = await stripe.createToken({ name });

  if (Object.keys(error).length) {
    throw error;
  }

  const stripeResponse = { id: token.id, card: token.card };

  return {
    token: stripeResponse.id,
    expiryMonth: stripeResponse.card.exp_month,
    expiryYear: stripeResponse.card.exp_year,
    last4: stripeResponse.card.last4,
    brand: stripeResponse.card.brand
  };
};
