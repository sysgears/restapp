import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { translate } from '@restapp/i18n-client-react';
import { Select } from '@restapp/look-client-react-native';
import PaginationDemoView from '../components/PaginationDemoView.native';
import { withDataProvider } from './DataProvider';
import { stylesContainers as styles } from '../styles';

@translate('pagination')
@withDataProvider(10)
class PaginationDemo extends Component {
  static propTypes = {
    t: PropTypes.func,
    items: PropTypes.object,
    loadData: PropTypes.func
  };

  state = {
    pagination: 'standard'
  };

  options = [
    { value: 'standard', label: this.props.t('list.title.standard') },
    { value: 'relay', label: this.props.t('list.title.relay') },
    { value: 'scroll', label: this.props.t('list.title.scroll') }
  ];

  onPaginationTypeChange = itemValue => {
    const { loadData, items } = this.props;
    this.setState({ pagination: itemValue }, loadData(0, items.limit));
  };

  handlePageChange = (pagination, pageNumber) => {
    const { loadData, items } = this.props;
    if (pagination === 'relay') {
      loadData(items.pageInfo.endCursor, 'add');
    } else {
      loadData((pageNumber - 1) * items.limit, 'replace');
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
    const { t, items } = this.props;
    const { pagination } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <View style={[styles.itemAction, styles.itemSelect]}>
            <Select
              icon
              iconName="caret-down"
              mode="dropdown"
              data={this.options}
              selectedValue={pagination}
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
            pagination={pagination}
          />
        )}
      </View>
    );
  }
}

export default PaginationDemo;
