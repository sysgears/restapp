import ServerModule from '@restapp/module-server-ts';
import stripe from './stripe';

export default new ServerModule(stripe);
