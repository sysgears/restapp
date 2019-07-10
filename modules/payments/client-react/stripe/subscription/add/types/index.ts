import { TranslateFunction } from '@restapp/i18n-client-react';

export interface CreditCardInput {
  name: string;
  values?: {
    number: string;
    expiry: string;
    cvc: string;
  };
}

export interface AddSubscriptionProps {
  t: TranslateFunction;
  history: any;
  navigation: any;
}
