import React, { useState, useEffect, useCallback } from 'react';

export const Types = {
  STANDARD: 'standard',
  RELAY: 'relay',
  SCROLL: 'scroll'
};

const generateEdgesArray = quantity => {
  const arr = [];
  for (let i = 1; i <= quantity; i++) {
    arr.push({ cursor: i, node: { id: i, title: 'Item ' + i } });
  }
  return arr;
};

const allEdges = generateEdgesArray(47);

const fetchData = ({ offset, dataDelivery, items, limit }) => {
  const newEdges = allEdges.slice(offset, offset + limit);
  const edges = dataDelivery === 'add' ? (!items ? newEdges : [...items.edges, ...newEdges]) : newEdges;
  const endCursor = edges[edges.length - 1].cursor;
  const hasNextPage = endCursor < allEdges[allEdges.length - 1].cursor;
  return {
    totalCount: allEdges.length,
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
