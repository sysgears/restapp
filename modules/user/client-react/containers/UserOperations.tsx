import * as React from 'react';
import { connect } from 'react-redux';
import { USERS, DELETE_USER } from '../actions';
import { UserRole, OrderBy } from '..';

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
    ({ user: { loading, users } }: any) => ({
      loading,
      users
    }),
    { getUsers: USERS }
  )(WithUsers);
};

const withUsersDeleting = (Component: React.ComponentType<any>) =>
  connect(
    null,
    { deleteUser: DELETE_USER }
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
    ({ user: { orderBy, filter } }: any) => ({
      orderBy,
      filter
    }),
    { sortAndFilter: USERS }
  )(WithFilterUpdating);
};

export { withUsers, withUsersDeleting, withSortAndFilter };
