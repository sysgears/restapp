import { Request } from 'express';
import { merge } from 'lodash';
import ServerModule, { ServerModuleShape } from '@restapp/module-server-ts';

// TODO: Change type of identity variable from any to User type, after converting the User DAO into Typescript
interface AccessModuleShape extends ServerModuleShape {
  grant?: Array<(identity: any, req: Request, passwordHash: string) => { [key: string]: any } | void>;
  // grant?: (user: any) => Promise<[string, string]>;
}

interface AccessModule extends AccessModuleShape {}

type GrantAccessFunc = (identity: any, req: Request, passwordHash: string) => Promise<any>;

class AccessModule extends ServerModule {
  constructor(...modules: AccessModuleShape[]) {
    super(...modules);
  }

  // TODO: Will be reworked on the next iteration
  get grantAccess(): GrantAccessFunc {
    return async (identity: any, req: Request, passwordHash: string) => {
      let result = {};
      for (const grant of this.grant) {
        result = merge(result, await grant(identity, req, passwordHash));
      }
      return result;
    };
  }
}

export default AccessModule;
