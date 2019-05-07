import * as React from 'react';

interface DataRootComponent {
  children?: Element | any;
}

const DataRootComponent: React.FunctionComponent<DataRootComponent> = props => {
  return props.children;
};

export default DataRootComponent;
