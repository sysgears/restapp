const root = __dirname + '/../../../../../..';

require('@babel/register')({
  root,
  cwd: root,
  configFile: root + '/packages/server/babel.config.js',
  extensions: ['.js', '.jsx', '.ts', '.tsx']
});
require('dotenv/config');

const settings = require('../../../../../../settings').default;
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const LIST_LIMIT = 100;
const COINS_IN_DOLLAR = 100;

const createProduct = async newProduct => {
  const product = await stripe.products.create(newProduct);
  console.log(`  | Product - OK -->  '${product.name}' with id '${product.id}' has been created.`);

  return product;
};

const createPlan = async (newPlan, { id }) => {
  const plan = await stripe.plans.create({ product: id, ...newPlan });
  console.log(`  | Plan    - OK -->  '${plan.nickname}' with product id '${plan.product}' has been created.`);

  return plan;
};

const lookLike = (stripePlan, plan, product) =>
  stripePlan.nickname === plan.nickname &&
  stripePlan.amount === plan.amount &&
  stripePlan.interval === plan.interval &&
  stripePlan.currency === plan.currency &&
  stripePlan.product === product.id;

const createOrUpdateProduct = async ({ product }) => {
  const stripeProducts = await stripe.products.list({ limit: LIST_LIMIT });
  const productFromSettings = ({ name }) => name === product.name;
  const stripeProduct = stripeProducts.data.find(productFromSettings);
  const isDifferent = !stripeProduct || (stripeProduct && stripeProduct.type !== product.type);

  if (isDifferent) {
    return createProduct(product);
  }

  console.log(`  | Product - OK -->  '${stripeProduct.name}' with id '${stripeProduct.id}'.`);

  return stripeProduct;
};

const createOrUpdatePlan = async ({ plan }, product) => {
  const stripePlans = await stripe.plans.list({ limit: LIST_LIMIT });
  const planFromSetings = ({ id }) => id === plan.id;
  const stripePlan = stripePlans.data.find(planFromSetings);

  if (!stripePlan) {
    return createPlan(plan, product);
  }

  if (!lookLike(stripePlan, plan, product)) {
    await stripe.plans.del(plan.id);
    return createPlan(plan, product);
  }

  console.log(`  | Plan    - OK -->  '${stripePlan.nickname}' with product id '${stripePlan.product}'.`);

  return stripePlan;
};

const initSubscription = async config => {
  try {
    const product = await createOrUpdateProduct(config);
    const plan = await createOrUpdatePlan(config, product);

    console.log(
      `
  Subscribers will be charged $${plan.amount / COINS_IN_DOLLAR}/${plan.interval}
  You will need to configure a webhook endpoint manually in the Stripe dashboard when ready to deploy.
  This webhook will enable automatic cancellation and automated emails about failed charges.
`
    );
  } catch (err) {
    console.log(err);
  }
};

const start = async () => {
  const {
    stripe: { subscription }
  } = settings;

  if (!process.env.STRIPE_SECRET_KEY) {
    console.log(` Please, add the Stripe Secret Key to the server's .env file.`);
    return false;
  }

  subscription.enabled && initSubscription(subscription);
};

start();
