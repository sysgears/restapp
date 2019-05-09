import * as React from 'react';
import { connect } from 'react-redux';
import { getItem } from '@restapp/core-common/clientStorage';

import Loading from '../components/Loading.native';
import { UserModuleState } from '../reducers';
import { CURRENT_USER } from '../actions';
import { User } from '..';

interface DataRootComponent {
  currentUser: User;
  getCurrentUser: () => void;
}

class DataRootComponent extends React.Component<DataRootComponent> {
  public state = {
    ready: false
  };

  public async componentDidMount() {
    const { currentUser, getCurrentUser } = this.props;
    if (!this.state.ready && (await getItem('refreshToken')) && !currentUser) {
      await getCurrentUser();
    }
    this.setState({ ready: true });
  }

  public render() {
    return this.state.ready ? this.props.children : <Loading />;
  }
}

const mapState = ({ currentUser }: UserModuleState) => ({
  currentUser
});

const withConnect = connect(
  mapState,
  { getCurrentUser: CURRENT_USER }
);

export default withConnect(DataRootComponent);
