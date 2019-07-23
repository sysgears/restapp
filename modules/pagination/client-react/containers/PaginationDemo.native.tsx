import React, { Component, ReactElement } from 'react';
import { compose } from 'redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { translate, TranslateFunction } from '@restapp/i18n-client-react';
import { Select } from '@restapp/look-client-react-native';

import PaginationDemoView from '../components/PaginationDemoView.native';
import { containerStyles as styles } from '../styles';
import { withDataProvider, Types, ComponentWrapper } from './DataProvider';

interface PaginationComponent extends ComponentWrapper {
  t: TranslateFunction;
}

const limit = 10;

class PaginationDemo extends Component<PaginationComponent> {
  public onPaginationTypeChange = (itemValue: string) => {
    const { loadData, updateType } = this.props;
    updateType(itemValue);
    loadData(0);
  };

  public handlePageChange = (_: string, pageNumber: number) => {
    const { items, loadData } = this.props;
    loadData(pageNumber ? (pageNumber - 1) * limit : items.pageInfo.endCursor);
  };

  public renderItem = ({
    item: {
      node: { title }
    }
  }: {
    item: { node: { id: number; title: string } };
  }): ReactElement => {
    return (
      <TouchableOpacity style={styles.postWrapper}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    );
  };

  public getOptions = () => [
    { value: Types.STANDARD, label: this.props.t('list.title.standard') },
    { value: Types.RELAY, label: this.props.t('list.title.relay') },
    { value: Types.SCROLL, label: this.props.t('list.title.scroll') }
  ];

  public render() {
    const { t, items, type } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <View style={[styles.itemAction, styles.itemSelect]}>
            <Select
              icon
              iconName="caret-down"
              mode="dropdown"
              data={this.getOptions()}
              selectedValue={type}
              onChange={this.onPaginationTypeChange}
              okText={t('list.select.ok')}
              dismissText={t('list.select.dismiss')}
              cols={1}
            />
          </View>
        </View>
        {items && (
          <PaginationDemoView
            items={items}
            handlePageChange={this.handlePageChange}
            renderItem={this.renderItem}
            type={type}
            pageSize={limit}
          />
        )}
      </View>
    );
  }
}

export default compose(
  translate('pagination'),
  withDataProvider(limit, Types.STANDARD)
)(PaginationDemo);
