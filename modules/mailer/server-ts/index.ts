import ServerModule from '@restapp/module-server-ts';

import mailer from './mailer';

export { mailer };

export default new ServerModule({
  createContextFunc: [() => ({ mailer })]
});
