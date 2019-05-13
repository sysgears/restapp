import ServerModule from '@restapp/module-server-ts';

import Upload from './sql';

export default new ServerModule({
  createContextFunc: [() => ({ Upload: new Upload() })]
});
