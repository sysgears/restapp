import ClientModule, { ClientModuleShape } from '@restapp/module-client-react';

/**
 * Access module which provides authentication functions
 */
export interface AccessModuleShape extends ClientModuleShape {
  // login handlers from all authentication modules
  login?: Array<(callback: () => void) => Promise<void>>;
  // logout handlers from all authentication modules
  logout?: Array<(callback: () => void) => Promise<void>>;
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
  public async doLogin(callback: () => void) {
    for (const login of this.login) {
      await login(callback);
    }
  }

  /**
   * call all methods of logout in authentication modules.
   *
   * @returns merge logout methods
   */
  public async doLogout(callback: () => void) {
    for (const logout of this.logout) {
      await logout(callback);
    }
  }
}

export default AccessModule;
