import ClientModule, { ClientModuleShape } from '@restapp/module-client-react';

/**
 * Access module which provides authentication functions
 */
export interface AccessModuleShape extends ClientModuleShape {
  // login handlers from all authentication modules
  login?: Array<() => Promise<void>>;
  // logout handlers from all authentication modules
  logout?: Array<() => Promise<void>>;
}

interface AccessModule extends AccessModuleShape {}

class AccessModule extends ClientModule {
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
   * call all methods of login in authentication modules.
   *
   * @returns merge login methods
   */
  public async doLogin() {
    for (const login of this.login) {
      await login();
    }
  }

  /**
   * call all methods of logout in authentication modules.
   *
   * @returns merge logout methods
   */
  public async doLogout() {
    for (const logout of this.logout) {
      await logout();
    }
  }
}

export default AccessModule;
