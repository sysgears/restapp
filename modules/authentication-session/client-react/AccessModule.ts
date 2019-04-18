import ClientModule, { ClientModuleShape } from '@restapp/module-client-react';

export interface AccessModuleShape extends ClientModuleShape {
  login?: () => Promise<void>;
  logout?: () => Promise<void>;
}

interface AccessModule extends AccessModuleShape {}

class AccessModule extends ClientModule {
  constructor(...modules: AccessModuleShape[]) {
    super(...modules);
  }

  public async doLogin() {
    await this.login();
  }

  public async doLogout() {
    await this.logout();
  }
}

export default AccessModule;
