import * as React from 'react';

import settings from '../../../../settings';

interface DataRootComponent {
  children?: Element | any;
}

interface DataRootComponentState {
  isReady: boolean;
}

class DataRootComponent extends React.Component<DataRootComponent, DataRootComponentState> {
  public state = {
    isReady: settings.auth.session.enabled
  };

  // TODO request to get current user
  public componentDidMount() {
    this.setState({ isReady: true });
  }

  public render() {
    return this.state.isReady ? this.props.children : null;
  }
}

export default DataRootComponent;
