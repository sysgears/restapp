import ServerModule from '@restapp/module-server-ts';

import { createServer } from './entry';

export { serverPromise } from './entry';

export default new ServerModule({
  onAppCreate: [createServer]
});
