import Stripe from 'stripe';
import { log } from '@restapp/core-common';
import settings from '../../../../../settings';

const { plan } = settings.stripe.subscription;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

interface CreditCard {
  token: string;
  expiryMonth: number;
  expiryYear: number;
  last4: number;
  brand: string;
}

export const addStripeSubscription = async ({ user, body: { card } }: any, res: any): Promise<any> => {
  const {
    payments: {
      stripe: { subscription }
    }
  } = res.locals.appContext;
  const { StripeSubscriptionDAO } = subscription;
  const { token, ...restCard }: CreditCard = card;

  let stripeCustomerId = null;
  let stripeSourceId = null;

  try {
    const userSubscription = await StripeSubscriptionDAO.getSubscription(user.id);
    const isCustomerExist = userSubscription && userSubscription.stripeCustomerId;

    if (isCustomerExist) {
      const { id } = await stripe.customers.createSource(userSubscription.stripeCustomerId, { source: token });
      stripeCustomerId = userSubscription.stripeCustomerId;
      stripeSourceId = id;
    } else {
      const { id, default_source } = await stripe.customers.create({ email: user.email, source: token });
      stripeCustomerId = id;
      stripeSourceId = default_source;
    }

    await StripeSubscriptionDAO.editSubscription({
      userId: user.id,
      active: false,
      stripeCustomerId,
      stripeSourceId,
      ...restCard
    });

    const newSubscriber = await stripe.subscriptions.create({
      customer: stripeCustomerId,
      items: [{ plan: plan.id }]
    });

    await StripeSubscriptionDAO.editSubscription({
      userId: user.id,
      active: true,
      stripeSubscriptionId: newSubscriber.id
    });

    res.json({ active: true });
  } catch (error) {
    log.error(error);
    res.sendStatus(500);
  }
};
