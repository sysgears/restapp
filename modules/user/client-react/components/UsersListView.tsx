import * as React from 'react';
import { Link } from 'react-router-dom';
import { translate } from '@restapp/i18n-client-react';
import { Table, Button } from '@restapp/look-client-react';
import { User } from '..';
import { OrderBy, CommonProps } from '..';

export interface UsersViewProps extends CommonProps {
  loading: boolean;
  users?: User[];
  orderBy?: OrderBy;
  onOrderBy: (orderBy: OrderBy) => void;
  deleteUser: (id: number | string) => Promise<any>;
}

const UsersView = ({ deleteUser, orderBy, onOrderBy, loading, users, t, ...rest }: UsersViewProps) => {
  const [errors, setErrors] = React.useState([]);

  const handleDeleteUser = async (id: number | string) => {
    const result = await deleteUser(id);
    if (result && result.errors) {
      setErrors(result.errors);
    } else {
      setErrors([]);
    }
  };

  const renderOrderByArrow = (name: string) => {
    if (orderBy && orderBy.column === name) {
      if (orderBy.order === 'desc') {
        return <span className="badge badge-primary">&#8595;</span>;
      } else {
        return <span className="badge badge-primary">&#8593;</span>;
      }
    } else {
      return <span className="badge badge-secondary">&#8645;</span>;
    }
  };

  const handleOrderBy = (e: React.MouseEvent, name: string) => {
    e.preventDefault();

    let order = 'asc';
    if (orderBy && orderBy.column === name) {
      if (orderBy.order === 'asc') {
        order = 'desc';
      } else if (orderBy.order === 'desc') {
        return onOrderBy({
          column: '',
          order: ''
        });
      }
    }

    return onOrderBy({ column: name, order });
  };

  const columns = [
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'username')} href="#">
          {t('users.column.name')} {renderOrderByArrow('username')}
        </a>
      ),
      dataIndex: 'username',
      key: 'username',
      render: (text: string, record: User) => (
        <Link className="user-link" to={`/users/${record.id}`}>
          {text}
        </Link>
      )
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'email')} href="#">
          {t('users.column.email')} {renderOrderByArrow('email')}
        </a>
      ),
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'role')} href="#">
          {t('users.column.role')} {renderOrderByArrow('role')}
        </a>
      ),
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: (
        <a onClick={e => handleOrderBy(e, 'isActive')} href="#">
          {t('users.column.active')} {renderOrderByArrow('isActive')}
        </a>
      ),
      dataIndex: 'isActive',
      key: 'isActive',
      render: (text: string) => text.toString()
    },
    {
      title: t('users.column.actions'),
      key: 'actions',
      render: (_text: string, record: User) => (
        <Button color="primary" size="sm" onClick={() => handleDeleteUser(record.id)}>
          {t('users.btn.delete')}
        </Button>
      )
    }
  ];

  return (
    <>
      {loading && !users ? (
        <div className="text-center">{t('users.loadMsg')}</div>
      ) : (
        <>
          {errors &&
            errors.map(error => (
              <div className="alert alert-danger" role="alert" key={error.field}>
                {error.message}
              </div>
            ))}
          <Table dataSource={users} columns={columns} />
        </>
      )}
    </>
  );
};

export default translate('user')(UsersView);
