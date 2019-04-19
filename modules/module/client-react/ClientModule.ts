import React from 'react';
import BaseModule, { BaseModuleShape } from './BaseModule';

export interface ClientModuleShape extends BaseModuleShape {
  route?: Array<React.ReactElement<any>>;
  navItem?: Array<React.ReactElement<any>>;
  navItemRight?: Array<React.ReactElement<any>>;
  stylesInsert?: string[];
  scriptsInsert?: string[];
  login?: Array<() => Promise<void>>;
  logout?: Array<() => Promise<void>>;
}

interface ClientModule extends ClientModuleShape {}

class ClientModule extends BaseModule {
  constructor(...modules: ClientModuleShape[]) {
    super(...modules);
  }

  get routes() {
    return this.route.map((component: React.ReactElement<any>, idx: number, items: Array<React.ReactElement<any>>) =>
      React.cloneElement(component, { key: component.key || idx + items.length })
    );
  }

  get navItems() {
    return this.navItem
      ? this.navItem.map((component: React.ReactElement<any>, idx: number, items: Array<React.ReactElement<any>>) =>
          React.cloneElement(component, {
            key: component.key || idx + items.length
          })
        )
      : [];
  }

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

  get stylesInserts() {
    return this.stylesInsert || [];
  }

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
