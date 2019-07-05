import ClientModule from '@restapp/module-client-react';

import stripe from './stripe';

export default new ClientModule(stripe);
