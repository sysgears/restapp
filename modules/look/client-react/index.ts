import ClientModule from '@restapp/module-client-react';

import { onAppCreate } from './look';
export * from './look';

export default new ClientModule({ onAppCreate: [onAppCreate] });
