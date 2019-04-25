const contextMiddleware = ({ appContext }: any) => (req: any, res: any, next: () => void) => {
  res.locals.appContext = appContext;
  next();
};

export default contextMiddleware;
