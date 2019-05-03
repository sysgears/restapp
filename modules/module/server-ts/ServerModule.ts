import { isEmpty } from 'lodash';
import CommonModule, { CommonModuleShape } from '@restapp/module-common';
import { Express, Request, Response } from 'express';

/**
 * Create GraphQL context function params
 */
interface CreateContextFuncProps {
  // HTTP request
  req: Request;
  // HTTP response
  res: Response;
  // Feature modules shared context
  appContext: { [key: string]: any };
}
/**
 * A function to create GraphQL context
 *
 * @param props various params passed to function
 *
 * @returns an object which will be merged into GraphQL context object
 */
type CreateContextFunc = (props: CreateContextFuncProps) => { [key: string]: any };

/**
 * A function which registers new middleware.
 *
 * @param app an instance of Express
 * @param appContext application context
 */
type MiddlewareFunc = (app: Express, appContext: { [key: string]: any }) => void;

/**
 * A function with reuqest.
 *
 * @param req HTTP request
 * @param res HTTP response
 * @param next following handler
 */
type RequestHandler = (req: Request, res: Response, next: any) => void;

export enum RestMethod {
  POST = 'post',
  GET = 'get',
  PUT = 'put',
  DELETE = 'delete'
}

/**
 * Server feature modules interface
 */
export interface ServerModuleShape extends CommonModuleShape {
  // A list of functions to create context
  createContextFunc?: CreateContextFunc[];
  // A list of functions to register high-priority middlewares (happens before registering normal priority ones)
  beforeware?: MiddlewareFunc[];
  // A list of functions to register normal-priority middlewares
  middleware?: MiddlewareFunc[];
  accessMiddleware?: RequestHandler;
  apiRouteParams?: Array<{
    method: RestMethod;
    route: string;
    middleware?: RequestHandler[];
    controller: RequestHandler;
    isAuthRoute?: boolean;
  }>;
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
    return this.apiRouteParams.map(({ method, route, controller, isAuthRoute, middleware }) => {
      return (app: Express, modules: ServerModule) => {
        const handlers = [];

        if (isAuthRoute) {
          handlers.push(modules.accessMiddleware);
        }
        if (!isEmpty(middleware)) {
          handlers.push(...middleware);
        }
        handlers.push(controller);

        app[method](`/api/${route}`, ...handlers);
      };
    });
  }
}

export default ServerModule;
