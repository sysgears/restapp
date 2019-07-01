import { Express } from 'express';
import ServerModule from '@restapp/module-server-ts';
import i18n from 'i18next';
import i18nMiddleware from 'i18next-express-middleware';

import settings from '@restapp/config';
import commonI18n from '@restapp/i18n-common-react';

const beforeware = (app: Express) => {
  if (settings.i18n.enabled) {
    app.use((req: any, res, next) => {
      const lang = req.universalCookies.get(settings.i18n.cookie) || req.acceptsLanguages(settings.i18n.langList);
      req.universalCookies.set(settings.i18n.cookie, lang);
      next();
    });

    app.use(i18nMiddleware.handle(i18n));
  } else {
    app.use((req: any, res, next) => {
      req.t = (key: string) => key;
      next();
    });
  }
};

export default new ServerModule(commonI18n, {
  beforeware: [beforeware]
});
