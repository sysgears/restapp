import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination } from '@restapp/look-client-react';
import { translate, TranslateFunction } from '@restapp/i18n-client-react';
import { Items } from '../containers/DataProvider';

interface PaginationDemo {
  type: string;
  t: TranslateFunction;
  pageSize: number;
  handlePageChange: (_: any, pageNumber: number) => void;
  items: Items | null;
}

const titleColumn = (t: TranslateFunction) => ({
  title: t('list.column.title'),
  dataIndex: 'title',
  key: 'title',
  displayName: 'MyComponent'
});

const PaginationDemoView = ({ items, handlePageChange, type, t, pageSize }: PaginationDemo) => {
  const dataSource = useMemo(() => {
    return items.edges.map(({ node }: { node: { id: number; title: string } }) => node);
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
        defaultPageSize={pageSize}
      />
    </div>
  );
};

PaginationDemoView.propTypes = {
  items: PropTypes.object,
  handlePageChange: PropTypes.func,
  t: PropTypes.func,
  type: PropTypes.string,
  pageSize: PropTypes.number.isRequired
};

export default translate('pagination')(PaginationDemoView);
