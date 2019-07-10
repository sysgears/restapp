import { camelizeKeys, decamelizeKeys } from 'humps';
import { knex, returnId } from '@restapp/database-server-ts';

export interface Subscription {
  active: boolean;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  last4: number;
  stripeCustomerId: string;
  stripeSourceId: string;
  stripeSubscriptionId: string;
  userId: number;
}

interface SubscriptionProps {
  userId: number;
  [key: string]: any;
}

class StripeSubscriptionDAO {
  public async editSubscription({ userId, ...subscription }: SubscriptionProps) {
    const subscriptionId = await knex('stripe_subscription')
      .select('id')
      .where({ user_id: userId })
      .first();

    if (subscriptionId) {
      return returnId(knex('stripe_subscription'))
        .update(decamelizeKeys(subscription))
        .where({ user_id: userId });
    } else {
      return returnId(knex('stripe_subscription')).insert(decamelizeKeys({ userId, ...subscription }));
    }
  }

  public async getSubscription(userId: number): Promise<Subscription> {
    return camelizeKeys(
      await knex('stripe_subscription')
        .select('s.*')
        .from('stripe_subscription as s')
        .where('s.user_id', '=', userId)
        .first()
    ) as Subscription;
  }

  public async getSubscriptionByStripeSubscriptionId(stripeSubscriptionId: string): Promise<Subscription> {
    return camelizeKeys(
      await knex('stripe_subscription')
        .select('s.*')
        .from('stripe_subscription as s')
        .where('s.stripe_subscription_id', '=', stripeSubscriptionId)
        .first()
    ) as Subscription;
  }

  public async getSubscriptionByStripeCustomerId(stripeCustomerId: string): Promise<Subscription> {
    return camelizeKeys(
      await knex('stripe_subscription')
        .select('s.*')
        .from('stripe_subscription as s')
        .where('s.stripe_customer_id', '=', stripeCustomerId)
        .first()
    ) as Subscription;
  }

  public async getCreditCard(userId: number): Promise<any> {
    return camelizeKeys(
      await knex('stripe_subscription')
        .select('s.expiry_month', 's.expiry_year', 's.last4', 's.brand')
        .from('stripe_subscription as s')
        .where('s.user_id', '=', userId)
        .first()
    );
  }
}

export default new StripeSubscriptionDAO();
