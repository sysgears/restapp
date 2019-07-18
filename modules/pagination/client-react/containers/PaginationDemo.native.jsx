import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { translate } from '@restapp/i18n-client-react';
import { Select } from '@restapp/look-client-react-native';

import PaginationDemoView from '../components/PaginationDemoView.native';
import { containerStyles as styles } from '../styles';
import { withDataProvider, Types } from './DataProvider';

@translate('pagination')
@withDataProvider(10, Types.STANDARD)
class PaginationDemo extends Component {
  static propTypes = {
    t: PropTypes.func,
    items: PropTypes.object,
    loadData: PropTypes.func,
    type: PropTypes.string.isRequired,
    updateType: PropTypes.func.isRequired
  };

  options = [
    { value: Types.STANDARD, label: this.props.t('list.title.standard') },
    { value: Types.RELAY, label: this.props.t('list.title.relay') },
    { value: Types.SCROLL, label: this.props.t('list.title.scroll') }
  ];

  onPaginationTypeChange = itemValue => {
    const { loadData, items, updateType } = this.props;
    updateType(itemValue);
    this.setState(loadData(0, items.limit));
  };

  handlePageChange = (pagination, pageNumber) => {
    const { loadData, items } = this.props;
    if (pagination === Types.RELAY) {
      loadData(items.pageInfo.endCursor);
    } else {
      loadData((pageNumber - 1) * items.limit);
    }
  };

  renderItem = ({
    item: {
      node: { title }
    }
  }) => {
    return (
      <TouchableOpacity style={styles.postWrapper}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    const { t, items, type } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <View style={[styles.itemAction, styles.itemSelect]}>
            <Select
              icon
              iconName="caret-down"
              mode="dropdown"
              data={this.options}
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
          />
        )}
      </View>
    );
  }
}

export default PaginationDemo;
