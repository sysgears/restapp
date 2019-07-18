import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination } from '@restapp/look-client-react';
import { translate } from '@restapp/i18n-client-react';

const titleColumn = t => ({
  title: t('list.column.title'),
  dataIndex: 'title',
  key: 'title',
  displayName: 'MyComponent'
});

const PaginationDemoView = ({ items, handlePageChange, type, t }) => {
  const dataSource = useMemo(() => {
    return items.edges.map(({ node }) => node);
  }, [items]);

  const columns = [titleColumn(t)];

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
      <Pagination
        itemsPerPage={items.edges.length}
        handlePageChange={handlePageChange}
        hasNextPage={items.pageInfo.hasNextPage}
        pagination={type}
        total={items.totalCount}
        loadMoreText={t('list.btn.more')}
        defaultPageSize={items.limit}
      />
    </div>
  );
};

PaginationDemoView.propTypes = {
  items: PropTypes.object,
  handlePageChange: PropTypes.func,
  t: PropTypes.func,
  type: PropTypes.string
};

export default translate('pagination')(PaginationDemoView);
