import ServerModule from '@restapp/module-server-ts';
import { Express } from 'express';

const addControllers = (app: Express, modules: ServerModule) => {
  modules.restApi.forEach(({ route, controller, method }) => {
    switch (method) {
      case 'GET':
        return app.get(route, controller);
      case 'POST':
        return app.post(route, controller);
      case 'PUT':
        return app.put(route, controller);
      case 'DELETE':
        return app.delete(route, controller);
      default:
        return;
    }
  });
};

export default addControllers;
