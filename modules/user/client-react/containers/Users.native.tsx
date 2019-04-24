import React from 'react';
import { StyleSheet, View } from 'react-native';
import { compose } from 'redux';
import UsersList from '../components/UsersListView.native';
import UsersFilter from '../components/UsersFilterView.native';
import { withFilterUpdating, withOrderByUpdating, withUsers, withUsersDeleting } from './UserOperations';

import { NavigationOptionsProps } from '../index.native';

interface UsersProps extends NavigationOptionsProps {
  loading: boolean;
}

class Users extends React.Component<UsersProps> {
  public render() {
    const isOpenFilter = !!this.props.navigation.getParam('isOpenFilter');
    return (
      <View style={styles.container}>
        {isOpenFilter && (
          <View style={styles.filterContainer}>
            <UsersFilter {...this.props} />
          </View>
        )}
        <View style={styles.usersListContainer}>
          <UsersList {...this.props} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  filterContainer: {
    flex: 5,
    borderWidth: 1,
    borderColor: '#e3e3e3',
    marginBottom: 15,
    justifyContent: 'center'
  },
  usersListContainer: {
    flex: 8,
    marginTop: 15
  }
});

export default compose(
  withUsers,
  withUsersDeleting,
  withOrderByUpdating,
  withFilterUpdating
)(Users);
