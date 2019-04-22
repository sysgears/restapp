import CommonModule, { CommonModuleShape } from '@restapp/module-common';

export interface AccessModuleShape extends CommonModuleShape {
  grant?: (user: any) => Promise<[string, string]>;
}

interface AccessModule extends AccessModuleShape {}

class AccessModule extends CommonModule {
  constructor(...modules: AccessModuleShape[]) {
    super(...modules);
  }
}

export default AccessModule;
