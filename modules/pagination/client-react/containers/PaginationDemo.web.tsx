import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { PageLayout, Select, Option } from '@restapp/look-client-react';
import { translate, TranslateFunction } from '@restapp/i18n-client-react';
import settings from '../../../../settings';
import { useDataProvider, Types } from './DataProvider';
import PaginationDemoView from '../components/PaginationDemoView.web';

const PaginationDemo = ({ t }: { [key: string]: TranslateFunction }) => {
  const { items, updateOffset, updateType, type, limit } = useDataProvider(10, Types.STANDARD);

  const renderMetaData = () => {
    return (
      <Helmet
        title={`${settings.app.name} - ${t('title')}`}
        meta={[
          {
            name: 'description',
            content: `${settings.app.name} - ${t('meta')}`
          }
        ]}
      />
    );
  };

  const handlePageChange = (_: any, pageNumber: number) => {
    updateOffset(pageNumber ? (pageNumber - 1) * limit : items.pageInfo.endCursor);
  };

  const onPaginationTypeChange = (e: { target: { name: string; value: string } }) => {
    updateType(e.target.value);
  };

  return (
    <PageLayout>
      {renderMetaData()}
      <Select onChange={onPaginationTypeChange} className="pagination-select">
        <Option value="standard">{t('list.title.standard')}</Option>
        <Option value="relay">{t('list.title.relay')}</Option>
      </Select>
      {items && <PaginationDemoView items={items} handlePageChange={handlePageChange} type={type} pageSize={limit} />}
    </PageLayout>
  );
};

PaginationDemo.propTypes = {
  t: PropTypes.func
};

export default translate('pagination')(PaginationDemo);
