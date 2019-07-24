import React, { Component } from 'react';
import { translate, TranslateFunction } from '@restapp/i18n-client-react';
import { ClientCounterButton, ClientCounterView } from '../components/ClientCounterView';

interface CounterProps {
  t: TranslateFunction;
}

interface CounterState {
  counterAmount: number;
}

class ClientCounter extends Component<CounterProps, CounterState> {
  public state = { counterAmount: 1 };
  public render() {
    const { counterAmount } = this.state;
    const { t } = this.props;
    return (
      <ClientCounterView text={t('text', { counterAmount })}>
        <ClientCounterButton
          text={t('btnLabel')}
          onClick={() => this.setState(prevState => ({ counterAmount: prevState.counterAmount + 1 }))}
        />
      </ClientCounterView>
    );
  }
}

export default translate('clientCounter')(ClientCounter);
