import ServerModule, { ServerModuleShape } from '@restapp/module-server-ts';

interface AuthModuleShape extends ServerModuleShape {}

interface AuthModule extends AuthModuleShape {}

class AuthModule extends ServerModule {
  constructor(...modules: AuthModuleShape[]) {
    super(...modules);
  }
}

export default AuthModule;
