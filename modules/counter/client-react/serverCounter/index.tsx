import React from 'react';
import resources from './locales';
import CounterModule from '../CounterModule';
import ServerCounter from './containers/ServerCounter';
import reducers from './reducers';

export default new CounterModule({
  reducer: [{ counterServer: reducers }],
  localization: [{ ns: 'serverCounter', resources }],
  counterComponent: [<ServerCounter />]
});
