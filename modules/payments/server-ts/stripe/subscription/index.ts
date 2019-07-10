import express, { Express } from 'express';
import stripeLocal from 'stripe-local';

import ServerModule, { RestMethod } from '@restapp/module-server-ts';
import { log } from '@restapp/core-common';

import settings from '../../../../../settings';
import StripeSubscriptionDAO from './sql';
import webhookMiddleware from './webhook';
import resources from './locales';
import { addStripeSubscription } from './controllers';

const { webhookUrl, enabled } = settings.stripe.subscription;
const isDevReady = __DEV__ && enabled && process.env.STRIPE_SECRET_KEY;

if (isDevReady) {
  log.debug('Starting stripe-local proxy');

  stripeLocal({
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookUrl: `http://localhost:${__SERVER_PORT__}${webhookUrl}`
  });
}

const appContext = {
  payments: {
    stripe: {
      subscription: {
        StripeSubscriptionDAO
      }
    }
  }
};

const beforeware = (app: Express): void => {
  app.use(webhookUrl, express.json());
};

const middleware = (app: Express): void => {
  app.post(webhookUrl, webhookMiddleware);
};

export default enabled
  ? new ServerModule({
      appContext,
      beforeware: [beforeware],
      middleware: [middleware],
      localization: [{ ns: 'stripeSubscription', resources }],
      apiRouteParams: [
        {
          method: RestMethod.POST,
          route: 'addStripeSubscription',
          isAuthRoute: true,
          controller: addStripeSubscription
        }
      ]
    })
  : null;
