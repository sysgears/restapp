import * as React from 'react';

interface DataRootComponent {
  children?: Element | any;
}

const DataRootComponent: React.FunctionComponent<DataRootComponent> = props => {
  const [isReady, setIsReady] = React.useState(false);

  // TODO request to get current user
  React.useEffect(() => {
    setIsReady(true);
  }, []);

  return isReady ? props.children : null;
};

export default DataRootComponent;
