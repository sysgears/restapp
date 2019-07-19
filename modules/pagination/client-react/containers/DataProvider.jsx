import React, { useState, useEffect } from 'react';

export const Types = {
  STANDARD: 'standard',
  RELAY: 'relay',
  SCROLL: 'scroll'
};

const generateDataSet = total =>
  Array.from(Array(total), (_, idx) => {
    const id = idx + 1;
    return { cursor: idx, node: { id, title: 'Item ' + id } };
  });

const data = generateDataSet(47);

const fetchData = ({ offset, limit }) => {
  const endCursor = offset + limit;
  const edges = data.slice(offset, endCursor);
  const hasNextPage = endCursor < data.length;
  return {
    totalCount: data.length,
    pageInfo: {
      endCursor,
      hasNextPage
    },
    edges
  };
};

export const useDataProvider = (initialLimit = 20, initialType = Types.STANDARD) => {
  const [items, setItems] = useState(null);
  const [type, setType] = useState(initialType);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(initialLimit);

  useEffect(() => {
    loadData(offset);
  }, [offset]);

  const loadData = offset => {
    const dataItems = fetchData({ offset, limit });
    const newItems =
      [Types.RELAY, Types.SCROLL].includes(type) && offset > 0
        ? { ...dataItems, edges: items.edges.concat(dataItems.edges) }
        : dataItems;
    setItems(newItems);
  };

  const updateType = newType => {
    setType(newType);
    setOffset(0);
  };

  const updateOffset = newOffset => {
    setOffset(newOffset);
  };

  return { items, updateType, type, limit, updateOffset };
};

/* This HOC is going to be removed once Expo version supports Hooks */
export const withDataProvider = (limit, type) => {
  return Component =>
    class PaginationDemoWithData extends React.Component {
      constructor(props) {
        super(props);
        this.state = { items: null, type: type };
      }

      componentDidMount() {
        this.loadData(0);
      }

      loadData = offset => {
        const { items, type } = this.state;
        const fetchedItems = fetchData({ offset, limit });
        const newItems =
          [Types.RELAY, Types.SCROLL].includes(type) && offset > 0
            ? { ...fetchedItems, edges: items.edges.concat(fetchedItems.edges) }
            : fetchedItems;

        this.setState({ items: newItems });
      };

      updateType = newType => this.setState({ type: newType });

      render() {
        return (
          <Component
            {...this.props}
            items={this.state.items}
            loadData={this.loadData}
            updateType={this.updateType}
            type={this.state.type}
          />
        );
      }
    };
};
