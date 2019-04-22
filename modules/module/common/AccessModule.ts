import CommonModule, { CommonModuleShape } from './CommonModule';

/**
 * Access module which provides authentication functions
 */
export interface AccessModuleShape extends CommonModuleShape {
  /** login handlers from all authentication modules */
  login?: Array<() => Promise<void>>;
  /** logout handlers from all authentication modules */
  logout?: Array<() => Promise<void>>;
}

interface AccessModule extends AccessModuleShape {}

class AccessModule extends CommonModule {
  /**
   * Constructs access module representation, that folds all the feature modules
   * into a single module represented by this instance.
   *
   * @param modules feature modules
   */
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
