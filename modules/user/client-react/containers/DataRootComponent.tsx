import React from 'react';
import { connect } from 'react-redux';

import { getItem } from '@restapp/core-common/clientStorage';

import Loading from '../components/Loading';
import { getCurrentUser } from '../actions';
import { User } from '../types';
import setting from '../../../../settings';

interface DataRootComponent {
  currentUser: User;
  getCurrentUser: () => void;
  children?: Element | any;
}

const DataRootComponent: React.FunctionComponent<DataRootComponent> = ({
  currentUser,
  children,
  getCurrentUser: actionGetCurrentUser
}) => {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      if (!ready && !currentUser && ((await getItem('refreshToken')) || setting.auth.session.enabled)) {
        await actionGetCurrentUser();
      }
      setReady(true);
    })();
  }, []);
  return ready ? children : <Loading />;
};

export default connect(
  ({ signUpReducer: { currentUser } }: any) => ({
    currentUser
  }),
  { getCurrentUser }
)(DataRootComponent);
