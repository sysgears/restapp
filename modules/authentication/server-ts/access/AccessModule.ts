import { UserShape } from './index';
import { Request } from 'express';
import { merge } from 'lodash';
import ServerModule, { ServerModuleShape } from '@restapp/module-server-ts';

interface AccessModuleShape extends ServerModuleShape {
  grant?: Array<(identity: UserShape, req: Request, passwordHash: string) => { [key: string]: any } | void>;
}

interface AccessModule extends AccessModuleShape {}

type GrantAccessFunc = (identity: UserShape, req: Request, passwordHash: string) => Promise<any>;

class AccessModule extends ServerModule {
  constructor(...modules: AccessModuleShape[]) {
    super(...modules);
  }

  get grantAccess(): GrantAccessFunc {
    return async (identity: UserShape, req: Request, passwordHash: string) => {
      let result = {};
      if (this.grant) {
        for (const grant of this.grant) {
          result = merge(result, await grant(identity, req, passwordHash));
        }
      }

      return result;
    };
  }
}

export default AccessModule;
