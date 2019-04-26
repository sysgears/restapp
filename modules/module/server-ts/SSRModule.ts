import { Express } from 'express';
import CommonModule, { CommonModuleShape } from '@restapp/module-common';

/**
 * A function which registers new middleware.
 *
 * @param app an instance of Express
 * @param appContext application context
 */
type MiddlewareFunc = (app: Express, appContext: { [key: string]: any }) => void;

/**
 * Server feature modules interface
 */
export interface SSRModuleShape extends CommonModuleShape {
  // A list of functions to register SSR middlewares
  ssrMiddleware?: MiddlewareFunc[];
}

interface SSRModule extends SSRModuleShape {}

class SSRModule extends CommonModule {
  /**
   * Constructs backend Node feature module representation, that folds all the feature modules
   * into a single module represented by this instance.
   *
   * @param modules feature modules
   */
  constructor(...modules: SSRModuleShape[]) {
    super(...modules);
  }
}

export default SSRModule;
