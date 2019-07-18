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

const fetchData = ({ offset, dataDelivery, items, limit }) => {
  const newEdges = data.slice(offset, offset + limit);
  const edges = dataDelivery === 'add' ? (!items ? newEdges : [...items.edges, ...newEdges]) : newEdges;
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
    (offset, dataDelivery) => {
      setItems(fetchData({ offset, dataDelivery, items, limit }));
    },
    [items]
  );

  const updateType = newType => setType(newType);

  return { items, loadData, updateType, type };
};

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

      loadData = (offset, dataDelivery) => {
        const { items } = this.state;
        this.setState({
          items: fetchData({ offset, dataDelivery, items, limit })
        });
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
