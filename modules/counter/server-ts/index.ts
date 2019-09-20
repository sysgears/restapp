import ServerModule, { RestMethod } from '@restapp/module-server-ts';

import { getCounter, addCounter } from './controllers';

export default new ServerModule({
  apiRouteParams: [
    {
      method: RestMethod.POST,
      route: 'addCounter',
      controller: addCounter
    },
    {
      method: RestMethod.GET,
      route: 'getCounter',
      controller: getCounter
    }
  ]
});
