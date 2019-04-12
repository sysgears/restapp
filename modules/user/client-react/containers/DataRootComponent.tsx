import * as React from 'react';

// import { getItem } from '@restapp/core-common/clientStorage';

import settings from '../../../../settings';

interface DataRootComponent {
  children?: Element | any;
}
// TODO: shouldn't be needed at all when React Apollo will allow rendering
// all queries as loading: true during SSR
const DataRootComponent: React.FunctionComponent<DataRootComponent> = props => {
  const [isReady, setIsReady] = React.useState(settings.auth.session.enabled);

  // TODO request to get current user
  React.useEffect(() => {
    setIsReady(true);
  }, []);

  return isReady ? props.children : null;
};

export default DataRootComponent;
