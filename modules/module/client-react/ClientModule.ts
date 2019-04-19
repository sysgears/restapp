import React from 'react';
import BaseModule, { BaseModuleShape } from './BaseModule';

/**
 * React client feature modules interface.
 */
export interface ClientModuleShape extends BaseModuleShape {
  // Route list
  route?: Array<React.ReactElement<any>>;
  // Top left navigation links
  navItem?: Array<React.ReactElement<any>>;
  // Top right navigation links
  navItemRight?: Array<React.ReactElement<any>>;
  // URL list to 3rd party css styles
  stylesInsert?: string[];
  // URL list to 3rd party js scripts
  scriptsInsert?: string[];
  login?: Array<() => Promise<void>>;
  logout?: Array<() => Promise<void>>;
}

interface ClientModule extends ClientModuleShape {}

/**
 * React client feature module implementation.
 */
class ClientModule extends BaseModule {
  /**
   * Constructs React client feature module representation, that folds all the feature modules
   * into a single module represented by this instance.
   *
   * @param modules feature modules
   */
  constructor(...modules: ClientModuleShape[]) {
    super(...modules);
  }

  /**
   * @returns client-side React route components list
   */
  get routes() {
    return this.route.map((component: React.ReactElement<any>, idx: number, items: Array<React.ReactElement<any>>) =>
      React.cloneElement(component, { key: component.key || idx + items.length })
    );
  }

  /**
   * @returns client-side top left navbar link component list
   */
  get navItems() {
    return this.navItem
      ? this.navItem.map((component: React.ReactElement<any>, idx: number, items: Array<React.ReactElement<any>>) =>
          React.cloneElement(component, {
            key: component.key || idx + items.length
          })
        )
      : [];
  }

  /**
   * @returns client-side top right navbar link component list
   */
  get navItemsRight() {
    return this.navItemRight
      ? this.navItemRight.map(
          (component: React.ReactElement<any>, idx: number, items: Array<React.ReactElement<any>>) =>
            React.cloneElement(component, {
              key: component.key || idx + items.length
            })
        )
      : [];
  }

  /**
   * @returns URL list to 3rd party css styles
   */
  get stylesInserts() {
    return this.stylesInsert || [];
  }

  /**
   * @returns URL list to 3rd party js scripts
   */
  get scriptsInserts() {
    return this.scriptsInsert || [];
  }

  get authentication() {
    const doLogin = () => this.login && this.login.forEach(login => login());
    const doLogout = () => this.logout && this.logout.forEach(logout => logout());

    return { doLogin, doLogout };
  }
}

export default ClientModule;
