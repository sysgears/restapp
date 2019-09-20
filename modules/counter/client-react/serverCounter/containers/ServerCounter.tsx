import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { translate, TranslateFunction } from '@restapp/i18n-client-react';
import { ServerCounterView, ServerCounterButton } from '../components/ServerCounterView';
import { getCounter, addCounter } from '../actions';

interface ServerCounterInterface {
  getCounter: () => void;
  addCounter: (amount: number) => void;
  loading: boolean;
  counter: { id: number; amount: number };
  t: TranslateFunction;
}

class ServerCounter extends Component<ServerCounterInterface> {
  public componentDidMount() {
    const { counter, getCounter: get } = this.props;
    if (!counter) {
      get();
    }
  }

  public onClickHandler = async () => {
    const {
      counter: { amount },
      addCounter: add,
      getCounter: get
    } = this.props;
    await add(amount);
    await get();
  };

  public render() {
    const { t, counter, loading } = this.props;
    return (
      <>
        {counter && (
          <ServerCounterView t={t} counter={counter} loading={loading}>
            <ServerCounterButton text={t('btnLabel')} onClick={this.onClickHandler} />
          </ServerCounterView>
        )}
      </>
    );
  }
}

const mapState = ({ counterServer: { counter, loadingCounter: loading, errorCounter: error } }: any) => ({
  counter,
  loading,
  error
});

const mapDispath = { getCounter, addCounter };

export default compose(
  translate('serverCounter'),
  connect(
    mapState,
    mapDispath
  )
)(ServerCounter);
