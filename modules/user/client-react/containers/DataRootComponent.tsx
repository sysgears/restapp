import * as React from 'react';

import settings from '../../../../settings';

interface DataRootComponent {
  children?: Element | any;
}

const DataRootComponent: React.FunctionComponent<DataRootComponent> = props => {
  const [isReady, setIsReady] = React.useState(settings.auth.session.enabled);

  // TODO request to get current user
  React.useEffect(() => {
    setIsReady(true);
  }, []);

  return isReady ? props.children : null;
};

export default DataRootComponent;
