import React from 'react';
import ClientModule from '@restapp/module-client-react';
import { AuthRoute } from '@restapp/user-client-react/containers/Auth';
import { UserRole } from '@restapp/user-client-react/types';

import AddSubscription from './containers/AddSubscription';
import reducer from './reducer';

export default new ClientModule({
  route: [<AuthRoute exact path="/add-subscription" role={UserRole.user} component={AddSubscription} />],
  reducer: [{ addSubscription: reducer }]
});
