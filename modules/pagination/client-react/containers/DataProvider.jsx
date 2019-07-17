import React, { useState, useEffect, useCallback } from 'react';

import settings from '../../../../settings';

const generateEdgesArray = quantity => {
  const arr = [];
  for (let i = 1; i <= quantity; i++) {
    arr.push({ cursor: i, node: { id: i, title: 'Item ' + i } });
  }
  return arr;
};

const {
  pagination: {
    web: { limit, type }
  }
} = settings;

const allEdges = generateEdgesArray(47);

const createLoadData = (offset, dataDelivery, items) => {
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

export const useDataProvider = () => {
  const [items, setItems] = useState(null);

  useEffect(() => {
    loadData(0, type);
  }, []);

  const loadData = useCallback(
    (offset, dataDelivery) => {
      setItems(createLoadData(offset, dataDelivery, items));
    },
    [items]
  );

  return { items, loadData };
};

export const withDataProvider = Component => {
  return class PaginationDemoWithData extends React.Component {
    constructor(props) {
      super(props);
      this.state = { items: null };
    }

    componentDidMount() {
      this.loadData(0, type);
    }

    loadData = (offset, dataDelivery) => {
      const { items } = this.state;
      this.setState({
        items: {
          ...createLoadData(offset, dataDelivery, items)
        }
      });
    };

    render() {
      return <Component items={this.state.items} {...this.props} loadData={this.loadData} />;
    }
  };
};
