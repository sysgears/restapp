import { Express, Request, Response } from 'express';
import CommonModule, { CommonModuleShape } from '@restapp/module-common';

enum RestMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE'
}
interface CreateContextFuncProps {
  req: Request;
  res: Response;
  appContext: { [key: string]: any };
}

export interface ServerModuleShape extends CommonModuleShape {
  createContextFunc?: Array<
    (props: CreateContextFuncProps, appContext?: { [key: string]: any }) => { [key: string]: any }
  >;
  // Middleware
  beforeware?: Array<(app: Express, appContext: { [key: string]: any }) => void>;
  middleware?: Array<(app: Express, appContext: { [key: string]: any }) => void>;
  restApi?: Array<{ route: string; method: RestMethod; controller: (req: Request, res: Response) => void }>;
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
}

export default ServerModule;
