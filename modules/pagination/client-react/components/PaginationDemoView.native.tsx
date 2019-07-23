import React, { Component } from 'react';
import { View, ScrollView, FlatList, Text, ListRenderItem } from 'react-native';
import { Pagination } from '@restapp/look-client-react-native';
import { translate, TranslateFunction } from '@restapp/i18n-client-react';

import { Types, Items } from '../containers/DataProvider';
import { viewStyles as styles } from '../styles';

interface PaginationDemo {
  items: Items;
  handlePageChange: (type: string, pageNumber: number) => void;
  renderItem: ListRenderItem<{ cursor: number; node: { id: number; title: string } }>;
  type: string;
  pageSize: number;
  t: TranslateFunction;
}

class PaginationDemoView extends Component<PaginationDemo> {
  public allowDataLoad: boolean = true;
  public render() {
    const { items, handlePageChange, renderItem, type, t, pageSize } = this.props;

    const renderHeader = (text: string) => {
      return <Text style={styles.title}>{text}</Text>;
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
            totalPages={Math.ceil(items.totalCount / pageSize)}
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
            totalPages={Math.ceil(items.totalCount / pageSize)}
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

export default translate('pagination')(PaginationDemoView);
