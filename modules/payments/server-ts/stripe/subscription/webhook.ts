import Stripe from 'stripe';
import { TranslationFunction } from 'i18next';

import { mailer } from '@restapp/mailer-server-ts';
import User from '@restapp/user-server-ts/sql';

import settings from '../../../../../settings';
import StripeSubscriptionDAO from './sql';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const sendEmailToUser = async (userId: number, subject: string, html: string) => {
  const { email }: any = await User.getUser(userId);

  mailer.sendMail({
    from: `${settings.app.name} <${process.env.EMAIL_USER}>`,
    to: email,
    subject,
    html
  });
};

const deleteSubscription = async (stripeEvent: any, websiteUrl: string, t: TranslationFunction) => {
  const subscription = await StripeSubscriptionDAO.getSubscriptionByStripeSubscriptionId(stripeEvent.data.object.id);

  if (!subscription) {
    return false;
  }

  const { userId, stripeCustomerId, stripeSourceId } = subscription;
  const url = `${websiteUrl}/subscription`;

  await stripe.customers.deleteSource(stripeCustomerId, stripeSourceId);
  await StripeSubscriptionDAO.editSubscription({
    userId,
    active: false,
    stripeSourceId: null,
    stripeSubscriptionId: null,
    expiryMonth: null,
    expiryYear: null,
    last4: null,
    brand: null
  });

  await sendEmailToUser(
    userId,
    t('stripeSubscription:deleteEmail.subject'),
    `${t('stripeSubscription:deleteEmail.text')} <a href="${url}">${url}</a>`
  );
};

const notifyFailedSubscription = async (stripeEvent: any, websiteUrl: string, t: TranslationFunction) => {
  const subscription = await StripeSubscriptionDAO.getSubscriptionByStripeCustomerId(stripeEvent.data.object.customer);

  if (!subscription) {
    return false;
  }

  const { userId } = subscription;
  const url = `${websiteUrl}/profile`;

  await sendEmailToUser(
    userId,
    t('stripeSubscription:failedEmail.subject'),
    `${t('stripeSubscription:failedEmail.text')} <a href="${url}">${url}</a>`
  );
};

const webhookMiddleware = async (req: any, res: any) => {
  try {
    const websiteUrl = `${req.protocol}://${req.get('host')}`;
    const stripeEvent = process.env.STRIPE_ENDPOINT_SECRET
      ? stripe.webhooks.constructEvent(req.body, req.headers['stripe-signature'], process.env.STRIPE_ENDPOINT_SECRET)
      : req.body;

    if (stripeEvent.type === 'customer.subscription.deleted') {
      await deleteSubscription(stripeEvent, websiteUrl, req.t);
    } else if (stripeEvent.type === 'invoice.payment_failed') {
      await notifyFailedSubscription(stripeEvent, websiteUrl, req.t);
    }

    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export default webhookMiddleware;
