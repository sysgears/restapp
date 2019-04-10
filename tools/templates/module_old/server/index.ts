import $Module$ from './sql';
import ServerModule from '../ServerModule';

export default new ServerModule({
  createContextFunc: [() => ({ $Module$: new $Module$() })]
});
