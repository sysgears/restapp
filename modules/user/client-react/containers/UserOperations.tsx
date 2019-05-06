import * as React from 'react';
import { connect } from 'react-redux';
import { USERS, DELETE_USER } from '../actions';
import { UserRole } from '..';
import { UserModuleState, ActionType } from '../reducers';

interface OrderBy {
  column: string;
  order: string;
}

interface Filter {
  searchText: string;
  role: string;
  isActive: boolean;
}

const withUsers = (Component: React.ComponentType<any>) =>
  connect(
    ({ loading, users }: UserModuleState) => ({
      loading,
      users
    }),
    dispatch => ({
      getUsers: (orderBy: OrderBy, filter: Filter) =>
        dispatch({
          type: [ActionType.SET_LOADING, ActionType.SET_USERS, null],
          request: () => USERS(orderBy, filter)
        })
    })
  )(Component);

const withUsersDeleting = (Component: React.ComponentType<any>) =>
  connect(
    _state => ({}),
    dispatch => ({
      deleteUser: (id: number) =>
        dispatch({
          type: null,
          request: () => DELETE_USER(id)
        })
    })
  )(Component);

const withOrderByUpdating = (Component: React.ComponentType<any>) => {
  const WithOrderByUpdating: React.ComponentType<any> = ({ orderBy, filter, orderByFunc }) => {
    const onOrderBy = (_orderBy: OrderBy) => orderByFunc(_orderBy, filter);

    return <Component orderBy={orderBy} filter={filter} onOrderBy={onOrderBy} />;
  };
  return connect(
    ({ orderBy, filter }: UserModuleState) => ({
      orderBy,
      filter
    }),
    dispatch => ({
      orderByFunc: (orderBy: OrderBy, filter: Filter) =>
        dispatch({
          type: [ActionType.SET_ORDER_BY, ActionType.SET_USERS, null],
          payload: orderBy,
          request: () => USERS(orderBy, filter)
        })
    })
  )(WithOrderByUpdating);
};

const withFilterUpdating = (Component: React.ComponentType<any>) => {
  const WithFilterUpdating: React.ComponentType<any> = ({ orderBy, filter, changeFilter }) => {
    const onSearchTextChange = (searchText: string) => {
      const _filter: Filter = { searchText, ...filter };
      return changeFilter(orderBy, _filter);
    };

    const onRoleChange = (role: UserRole) => {
      const _filter: Filter = { role, ...filter };
      return changeFilter(orderBy, _filter);
    };

    const onIsActiveChange = (isActive: boolean) => {
      const _filter: Filter = { isActive, ...filter };
      return changeFilter(orderBy, _filter);
    };

    return (
      <Component
        onIsActiveChange={onIsActiveChange}
        onRoleChange={onRoleChange}
        onSearchTextChange={onSearchTextChange}
        filter={filter}
        orderBy={orderBy}
      />
    );
  };

  return connect(
    _state => ({}),
    dispatch => ({
      changeFilter: (orderBy: OrderBy, filter: Filter) =>
        dispatch({
          type: [ActionType.SET_FILTER, ActionType.SET_USERS, null],
          payload: filter,
          request: () => USERS(orderBy, filter)
        })
    })
  )(WithFilterUpdating);
};

export { withUsers, withUsersDeleting, withOrderByUpdating, withFilterUpdating };
