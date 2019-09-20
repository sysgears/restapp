import React from 'react';
import { connect } from 'react-redux';

import { users, deleteUser } from '../actions';
import { UserRole } from '../../types';
import { OrderBy } from '../types';

const withUsers = (Component: React.ComponentType<any>) => {
  class WithUsers extends React.Component<any> {
    public state = {
      ready: false
    };

    public async componentDidMount() {
      const { getUsers, orderBy, filter } = this.props;
      if (!this.state.ready) {
        await getUsers(orderBy, filter);
      }
      this.setState({ ready: true });
    }

    public render() {
      const { getUsers, ...props } = this.props;
      return <Component {...props} />;
    }
  }
  return connect(
    ({ usersReducer: { usersLoading, users: usersList } }: any) => ({
      loading: usersLoading,
      users: usersList
    }),
    { getUsers: users }
  )(WithUsers);
};

const withUsersDeleting = (Component: React.ComponentType<any>) =>
  connect(
    null,
    { deleteUser }
  )(Component);

const withSortAndFilter = (Component: React.ComponentType<any>) => {
  const WithFilterUpdating: React.ComponentType<any> = ({ orderBy, filter, sortAndFilter, ...props }) => {
    const onOrderBy = (_orderBy: OrderBy) => sortAndFilter(_orderBy, filter, 'SET_ORDER_BY');
    const onSearchTextChange = (searchText: string) => sortAndFilter(orderBy, { ...filter, searchText }, 'SET_FILTER');
    const onRoleChange = (role: UserRole) => sortAndFilter(orderBy, { ...filter, role }, 'SET_FILTER');
    const onIsActiveChange = (isActive: boolean) => sortAndFilter(orderBy, { ...filter, isActive }, 'SET_FILTER');

    return (
      <Component
        onIsActiveChange={onIsActiveChange}
        onRoleChange={onRoleChange}
        onSearchTextChange={onSearchTextChange}
        onOrderBy={onOrderBy}
        filter={filter}
        orderBy={orderBy}
        {...props}
      />
    );
  };

  return connect(
    ({ usersReducer: { orderBy, filter } }: any) => ({
      orderBy,
      filter
    }),
    { sortAndFilter: users }
  )(WithFilterUpdating);
};

export { withUsers, withUsersDeleting, withSortAndFilter };
