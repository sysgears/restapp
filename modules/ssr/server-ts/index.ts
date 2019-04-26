import { Express } from 'express';
import path from 'path';
import { Request, Response } from 'express';
import reactRenderer from './react';
import ServerModule, { MiddlewareFunc } from '@restapp/module-server-ts';

const renderServerSide = () => async (req: Request, res: Response, next: (e?: Error) => void) => {
  const isDocument = req.path.includes('.');
  const preRender = !isDocument && __SSR__;
  const serveEntryFile = !isDocument && !__SSR__ && req.method === 'GET';

  try {
    if (preRender) {
      return reactRenderer(req, res);
    } else if (serveEntryFile) {
      return res.sendFile(path.resolve(__FRONTEND_BUILD_DIR__, 'index.html'));
    }

    next();
  } catch (e) {
    next(e);
  }
};

const ssrMiddleware: MiddlewareFunc = (app: Express) => {
  app.use(renderServerSide());
};

export default new ServerModule({
  ssrMiddleware: [ssrMiddleware]
});
