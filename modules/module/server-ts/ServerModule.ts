import { Express, Request, Response } from 'express';
import CommonModule, { CommonModuleShape } from '@restapp/module-common';

interface CreateContextFuncProps {
  req: Request;
  res: Response;
  appContext: { [key: string]: any };
}

export enum RestMethod {
  POST = 'post',
  GET = 'get',
  PUT = 'put',
  DELETE = 'delete'
}

type accessMiddleware = (req: Request, res: Response, next: any) => void;

export interface ServerModuleShape extends CommonModuleShape {
  createContextFunc?: Array<
    (props: CreateContextFuncProps, appContext?: { [key: string]: any }) => { [key: string]: any }
  >;
  // Middleware
  beforeware?: Array<(app: Express, appContext: { [key: string]: any }) => void>;
  accessMiddleware?: accessMiddleware;
  middleware?: Array<(app: Express, appContext: { [key: string]: any }) => void>;
  apiRouteParams?: Array<{
    method: RestMethod;
    route: string;
    middleware: Array<(req: Request, res: Response, next: any) => void>;
    needAuth?: boolean;
  }>;
  // Shared modules data
  data?: { [key: string]: any };
}

interface ServerModule extends ServerModuleShape {}

class ServerModule extends CommonModule {
  public modules?: ServerModule;

  constructor(...modules: ServerModuleShape[]) {
    super(...modules);
  }

  public async createContext(req: Request, res: Response) {
    const appContext = this.appContext;
    let context = {};

    for (const createContextFunc of this.createContextFunc) {
      context = await createContextFunc({ req, res, appContext });
    }
    return context;
  }

  public get apiRoutes() {
    return this.apiRouteParams.map(({ method, route, middleware, needAuth }) => {
      return (app: Express, authMiddleware: accessMiddleware) => {
        const auth = needAuth ? authMiddleware : (req: any, res: any, next: any) => next();
        app[method](`/api/${route}`, auth, ...middleware);
      };
    });
  }
}

export default ServerModule;
