import ServerModule from '@restapp/module-server-ts';

import $Module$ from './sql';

export default new ServerModule({
  createContextFunc: [() => ({ $Module$: new $Module$() })]
});
