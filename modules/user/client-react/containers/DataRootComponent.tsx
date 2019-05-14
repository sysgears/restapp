import * as React from 'react';
import { connect } from 'react-redux';
import { getItem } from '@restapp/core-common/clientStorage';

import Loading from '../components/Loading';
import { UserModuleState } from '../reducers';
import { CURRENT_USER } from '../actions';
import { User } from '..';
import setting from '../../../../settings';

interface DataRootComponent {
  currentUser: User;
  getCurrentUser: () => void;
  children?: Element | any;
}

const DataRootComponent: React.FunctionComponent<DataRootComponent> = ({ currentUser, children, getCurrentUser }) => {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      if (!ready && !currentUser && ((await getItem('refreshToken')) || setting.auth.session.enabled)) {
        try {
          await getCurrentUser();
        } catch (e) {}
      }
      setReady(true);
    })();
  }, []);
  return ready ? children : <Loading />;
};

const mapState = ({ currentUser }: UserModuleState) => ({
  currentUser
});

const withConnect = connect(
  mapState,
  { getCurrentUser: CURRENT_USER }
);

export default withConnect(DataRootComponent);
