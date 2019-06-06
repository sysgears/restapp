import React from 'react';
import { connect } from 'react-redux';

import { getItem } from '@restapp/core-common/clientStorage';

import Loading from '../components/Loading.native';
import { getCurrentUser } from '../actions';
import { User } from '../types';
import setting from '../../../../settings';

interface DataRootComponent {
  currentUser: User;
  getCurrentUser: () => void;
}

class DataRootComponent extends React.Component<DataRootComponent> {
  public state = {
    ready: false
  };

  public async componentDidMount() {
    const { currentUser, getCurrentUser: actionGetCurrentUser } = this.props;
    if (!this.state.ready && !currentUser && ((await getItem('refreshToken')) || setting.auth.session.enabled)) {
      await actionGetCurrentUser();
    }
    this.setState({ ready: true });
  }

  public render() {
    return this.state.ready ? this.props.children : <Loading />;
  }
}

export default connect(
  ({ signUpReducer: { currentUser } }: any) => ({
    currentUser
  }),
  { getCurrentUser }
)(DataRootComponent);
