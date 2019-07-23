import React, { useState, useEffect, ComponentType } from 'react';

export interface Items {
  totalCount: number;
  pageInfo: {
    endCursor: number;
    hasNextPage: boolean;
  };
  edges: [{ cursor: number; node: { id: number; title: string } }];
}

interface PaginationState {
  items: Items | null;
  type: string;
}

export interface ComponentWrapper {
  items: Items | null;
  loadData: (offset: number) => void;
  type: string;
  updateType: (newType: string) => void;
}

export const Types = {
  STANDARD: 'standard',
  RELAY: 'relay',
  SCROLL: 'scroll'
};

const generateDataSet = (total: number) =>
  Array.from(Array(total), (_, idx) => {
    const id = idx + 1;
    return { cursor: idx, node: { id, title: `Item ${id}` } };
  });

const data = generateDataSet(47);

const fetchData = ({ offset, limit }: { [key: string]: number }) => {
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
    loadData();
  }, [offset]);

  const loadData = () => {
    const dataItems = fetchData({ offset, limit });
    const newItems =
      [Types.RELAY, Types.SCROLL].includes(type) && offset > 0
        ? { ...dataItems, edges: items.edges.concat(dataItems.edges) }
        : dataItems;
    setItems(newItems);
  };

  const updateType = (newType: string) => {
    setType(newType);
    setOffset(0);
  };

  const updateOffset = (newOffset: number) => {
    setOffset(newOffset);
  };

  return { items, updateType, type, limit, updateOffset };
};

/* This HOC is going to be removed once Expo version supports Hooks */
export const withDataProvider = (limit: number, type: string) => {
  return (Component: ComponentType<ComponentWrapper>) =>
    class PaginationDemoWithData extends React.Component<any> {
      public state: PaginationState = { items: null, type };

      public componentDidMount() {
        this.loadData(0);
      }

      public render() {
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

      private loadData = (offset: number) => {
        const { type: typeState } = this.state;
        const fetchedItems = fetchData({ offset, limit });
        const newItems =
          [Types.RELAY, Types.SCROLL].includes(typeState) && offset > 0
            ? { ...fetchedItems, edges: this.state.items.edges.concat(fetchedItems.edges) }
            : fetchedItems;

        this.setState({ items: newItems });
      };

      private updateType = (newType: string) => this.setState({ type: newType });
    };
};
