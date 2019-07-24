import React from 'react';
import { connect } from 'react-redux';
import { translate, TranslateFunction } from '@restapp/i18n-client-react';

import { ReduxCounterButton, ReduxCounterView } from '../components/ReduxCounterView';

interface CounterProps {
  t: TranslateFunction;
  onReduxIncrement: (increment: number) => () => void;
  reduxCount: number;
}

const ReduxCounter = ({ t, onReduxIncrement, reduxCount }: CounterProps) => (
  <ReduxCounterView text={t('text', { reduxCount })}>
    <ReduxCounterButton text={t('btnLabel')} onClick={onReduxIncrement(1)} />
  </ReduxCounterView>
);

export default connect(
  ({ counter: { reduxCount } }: { counter: { reduxCount: number } }) => ({ reduxCount }),
  (dispatch: any) => ({
    onReduxIncrement(value: number): () => void {
      return () =>
        dispatch({
          type: 'COUNTER_INCREMENT',
          payload: Number(value)
        });
    }
  })
)(translate('reduxCounter')(ReduxCounter));
