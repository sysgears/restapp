import ServerModule from '@restapp/module-server-ts';

import Welcome from './sql';

export default new ServerModule({
  createContextFunc: [() => ({ Welcome: new Welcome() })]
});
