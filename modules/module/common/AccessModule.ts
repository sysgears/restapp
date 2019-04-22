import CommonModule, { CommonModuleShape } from './CommonModule';

export interface AccessModuleShape extends CommonModuleShape {
  login?: Array<() => Promise<void>>;
  logout?: Array<() => Promise<void>>;
}

interface AccessModule extends AccessModuleShape {}

class AccessModule extends CommonModule {
  constructor(...modules: AccessModuleShape[]) {
    super(...modules);
  }

  get authentication() {
    const doLogin = () => this.login && this.login.forEach(login => login());
    const doLogout = () => this.logout && this.logout.forEach(logout => logout());

    return { doLogin, doLogout };
  }
}

export default AccessModule;
