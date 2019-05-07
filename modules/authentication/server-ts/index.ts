import ServerModule from '@restapp/module-server-ts';
import access from './access';

export default new ServerModule(access);
export { access };
