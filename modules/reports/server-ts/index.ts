import ServerModule from '@restapp/module-server-ts';

import resources from './locales';

export default new ServerModule({
  localization: [{ ns: 'reports', resources }],
  apiRouteParams: []
});
