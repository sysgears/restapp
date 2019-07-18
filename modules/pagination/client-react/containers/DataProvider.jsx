import React, { useState, useEffect, useCallback } from 'react';

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
  const edges = data.slice(offset, offset + limit);
  const endCursor = offset + limit;
  const hasNextPage = endCursor < data.length;
  return {
    totalCount: data.length,
    pageInfo: {
      endCursor,
      hasNextPage
    },
    edges,
    offset,
    limit
  };
};

export const useDataProvider = (limit, initialType) => {
  const [items, setItems] = useState(null);
  const [type, setType] = useState(initialType);

  useEffect(() => {
    loadData(0, type);
  }, []);

  const loadData = useCallback(
    offset => {
      const fetchedItems = fetchData({ offset, limit });
      const newItems =
        type === Types.RELAY && items
          ? { ...fetchedItems, edges: items.edges.concat(fetchedItems.edges) }
          : fetchedItems;
      setItems(newItems);
    },
    [items]
  );

  const updateType = newType => setType(newType);

  return { items, loadData, updateType, type };
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
        this.loadData(0, type);
      }

      loadData = offset => {
        const { items } = this.state;
        const fetchedItems = fetchData({ offset, limit });
        const newItems =
          type === Types.RELAY && items
            ? { ...fetchedItems, edges: items.edges.concat(fetchedItems.edges) }
            : fetchedItems;

        this.setState({ items: newItems });
      };

      updateType = newType => this.setState({ ...this.state, type: newType });

      render() {
        return (
          <Component
            {...this.props}
            items={this.state.items}
            loadData={this.loadData}
            updateType={this.updateType}
            type={type}
          />
        );
      }
    };
};
