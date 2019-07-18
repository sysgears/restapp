import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, FlatList, Text } from 'react-native';
import { Pagination } from '@restapp/look-client-react-native';
import { translate } from '@restapp/i18n-client-react';

import { Types } from '../containers/DataProvider';
import { viewStyles as styles } from '../styles';

@translate('pagination')
class PaginationDemoView extends Component {
  render() {
    const { items, handlePageChange, renderItem, type, t } = this.props;

    const renderHeader = t => {
      return <Text style={styles.title}>{t}</Text>;
    };

    const handleScrollEvent = () => {
      if (this.allowDataLoad) {
        if (items.pageInfo.hasNextPage) {
          this.allowDataLoad = false;
          handlePageChange(Types.RELAY, null);
        }
      }
    };

    const titleText = t('list.column.title');
    this.allowDataLoad = true;

    return type === Types.STANDARD ? (
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <FlatList
            data={items.edges}
            style={styles.list}
            keyExtractor={item => `${item.node.id}`}
            renderItem={renderItem}
            ListHeaderComponent={renderHeader(titleText)}
          />
        </View>
        <View style={styles.pagination}>
          <Pagination
            totalPages={Math.ceil(items.totalCount / items.limit)}
            handlePageChange={handlePageChange}
            pagination={type}
            loadMoreText={t('list.btn.more')}
            hasNextPage={items.pageInfo.hasNextPage}
          />
        </View>
      </View>
    ) : type === Types.RELAY ? (
      <View style={styles.container}>
        <ScrollView>
          <FlatList
            data={items.edges}
            style={styles.list}
            keyExtractor={item => `${item.node.id}`}
            renderItem={renderItem}
            ListHeaderComponent={renderHeader(titleText)}
          />
          <Pagination
            totalPages={Math.ceil(items.totalCount / items.limit)}
            handlePageChange={handlePageChange}
            pagination={type}
            loadMoreText={t('list.btn.more')}
            hasNextPage={items.pageInfo.hasNextPage}
          />
        </ScrollView>
      </View>
    ) : (
      <View style={styles.container}>
        <FlatList
          data={items.edges}
          ref={ref => (this.listRef = ref)}
          style={styles.list}
          keyExtractor={item => `${item.node.id}`}
          renderItem={renderItem}
          ListHeaderComponent={renderHeader(titleText)}
          onEndReachedThreshold={0.5}
          onEndReached={handleScrollEvent}
        />
      </View>
    );
  }
}

PaginationDemoView.propTypes = {
  t: PropTypes.func,
  items: PropTypes.object,
  handlePageChange: PropTypes.func,
  renderItem: PropTypes.func,
  type: PropTypes.string
};

export default PaginationDemoView;
