import ServerModule, { RestMethod } from '@restapp/module-server-ts';

import excel from './exel';
import pdf from './pdf';
import { report } from './controllers';
import resources from './locales';

export default new ServerModule({
  localization: [{ ns: 'reports', resources }],
  apiRouteParams: [
    {
      method: RestMethod.GET,
      route: 'report',
      isAuthRoute: false,
      controller: report
    },
    {
      method: RestMethod.GET,
      route: 'excel',
      isAuthRoute: false,
      controller: excel
    },
    {
      method: RestMethod.GET,
      route: 'pdf',
      isAuthRoute: false,
      controller: pdf
    }
  ]
});
