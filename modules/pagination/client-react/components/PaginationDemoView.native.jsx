import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, FlatList, Text } from 'react-native';
import { Pagination } from '@restapp/look-client-react-native';
import { translate } from '@restapp/i18n-client-react';
import styles from './styles';

@translate('pagination')
class PaginationDemoView extends Component {
  render() {
    const { items, handlePageChange, renderItem, pagination, t } = this.props;

    const renderHeader = t => {
      return <Text style={styles.title}>{t}</Text>;
    };

    const handleScrollEvent = () => {
      if (this.allowDataLoad) {
        if (items.pageInfo.hasNextPage) {
          this.allowDataLoad = false;
          return handlePageChange('relay', null);
        }
      }
    };

    const titleTexti18n = t('list.column.title');
    this.allowDataLoad = true;
    return pagination === 'standard' ? (
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <FlatList
            data={items.edges}
            style={styles.list}
            keyExtractor={item => `${item.node.id}`}
            renderItem={renderItem}
            ListHeaderComponent={renderHeader(titleTexti18n)}
          />
        </View>
        <View style={styles.pagination}>
          <Pagination
            totalPages={Math.ceil(items.totalCount / items.limit)}
            handlePageChange={handlePageChange}
            pagination={pagination}
            loadMoreText={t('list.btn.more')}
            hasNextPage={items.pageInfo.hasNextPage}
          />
        </View>
      </View>
    ) : pagination === 'relay' ? (
      <View style={styles.container}>
        <ScrollView>
          <FlatList
            data={items.edges}
            style={styles.list}
            keyExtractor={item => `${item.node.id}`}
            renderItem={renderItem}
            ListHeaderComponent={renderHeader(titleTexti18n)}
          />
          <Pagination
            totalPages={Math.ceil(items.totalCount / items.limit)}
            handlePageChange={handlePageChange}
            pagination={pagination}
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
          ListHeaderComponent={renderHeader(titleTexti18n)}
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
  pagination: PropTypes.string
};

export default PaginationDemoView;
