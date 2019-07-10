import ClientModule from '@restapp/module-client-react';

import locales from './locales';
import add from './add';
import subscriber from './subscriber';

export default new ClientModule(add, subscriber, {
  localization: [{ ns: 'stripeSubscription', resources: locales }]
});
