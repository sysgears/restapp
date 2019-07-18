import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import { PageLayout, Select, Option } from '@restapp/look-client-react';
import { translate } from '@restapp/i18n-client-react';
import settings from '../../../../settings';

import PaginationDemoView from '../components/PaginationDemoView';
import { useDataProvider, Types } from './DataProvider';

const limit = 10;

const PaginationDemo = ({ t }) => {
  const { items, loadData, updateType, type } = useDataProvider(limit, Types.STANDARD);

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

  const handlePageChange = (_, pageNumber) => {
    loadData(pageNumber ? (pageNumber - 1) * limit : items.pageInfo.endCursor);
  };

  const onPaginationTypeChange = e => {
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
