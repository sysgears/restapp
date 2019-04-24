import update from 'immutability-helper';
import { User } from '..';

const withUsers = (Component: React.ComponentType<any>) => {
  // TODO request for get all users
  return Component;
};

const withUsersDeleting = (Component: React.ComponentType<any>) => {
  // TODO request for deleting user
  return Component;
};

const withOrderByUpdating = (Component: React.ComponentType<any>) => {
  // TODO request for updating order by
  return Component;
};

const withFilterUpdating = (Component: React.ComponentType<any>) => {
  // TODO request for updating filters by
  return Component;
};

export function addUser(prev: any, node: User) {
  // check if it is duplicate
  if (prev.users.some((user: User) => user.id === node.id)) {
    return prev;
  }

  return update(prev, {
    users: {
      $set: [...prev.users, node]
    }
  });
}

export function deleteUser(prev: any, id: number | string) {
  const index = prev.users.findIndex((user: User) => user.id === id);
  // ignore if not found
  if (index < 0) {
    return prev;
  }
  return update(prev, {
    users: {
      $splice: [[index, 1]]
    }
  });
}

export { withUsers, withUsersDeleting, withOrderByUpdating, withFilterUpdating };
