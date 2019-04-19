import { Express } from 'express';
import CommonModule, { CommonModuleShape } from '@restapp/module-common';

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
 * Server feature modules interface
 */
export interface ServerModuleShape extends CommonModuleShape {
  // A list of functions to create context
  createContextFunc?: CreateContextFunc[];
  // A list of functions to register high-priority middlewares (happens before registering normal priority ones)
  beforeware?: MiddlewareFunc[];
  // A list of functions to register normal-priority middlewares
  middleware?: MiddlewareFunc[];
}

interface ServerModule extends ServerModuleShape {}

class ServerModule extends CommonModule {
  /**
   * Constructs backend Node feature module representation, that folds all the feature modules
   * into a single module represented by this instance.
   *
   * @param modules feature modules
   */
  constructor(...modules: ServerModuleShape[]) {
    super(...modules);
  }

  /**
   * Creates context for this module
   *
   * @param req HTTP request
   * @param res HTTP response
   *
   * @returns context
   */
  public async createContext(req: Request, res: Response) {
    const appContext = this.appContext;
    let context = {};

    for (const createContextFunc of this.createContextFunc) {
      context = await createContextFunc({ req, res, appContext });
    }
    return context;
  }
}

export default ServerModule;
