import { PLATFORM } from '@restapp/core-common';
export { default as clientOnly } from './clientOnly';

export default (__CLIENT__ && PLATFORM === 'web' ? require('./app').default : {});
