import CommonModule, { CommonModuleShape } from './CommonModule';

/**
 * Access module which provides authentication functions
 */
export interface AccessModuleShape extends CommonModuleShape {
  login?: Array<() => Promise<void>>;
  logout?: Array<() => Promise<void>>;
}

interface AccessModule extends AccessModuleShape {}

class AccessModule extends CommonModule {
  constructor(...modules: AccessModuleShape[]) {
    super(...modules);
  }
  /**
   * authentication allows to call all methods of login and logout in authentication modules.
   *
   * @returns merge login or logout methods
   */
  get authentication() {
    const doLogin = () => this.login && this.login.forEach(login => login());
    const doLogout = () => this.logout && this.logout.forEach(logout => logout());

    return { doLogin, doLogout };
  }
}

export default AccessModule;
