import ServerModule from '@restapp/module-server-ts';
import middleware from './middleware';
import restApi from './controllers';

export default new ServerModule({
  middleware: [middleware],
  restApi
});
