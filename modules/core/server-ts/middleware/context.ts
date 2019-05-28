import ServerModule from '@restapp/module-server-ts';

const contextMiddleware = ({ appContext }: ServerModule) => (req: any, res: any, next: () => void) => {
  res.locals.appContext = appContext;
  next();
};

export default contextMiddleware;
