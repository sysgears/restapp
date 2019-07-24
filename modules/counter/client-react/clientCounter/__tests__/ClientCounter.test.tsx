import React from 'react';
import chai from 'chai';

import { click, find, wait, render } from '@restapp/testing-client-react';
import { translate } from '@restapp/i18n-client-react';

import ClientCounter from '../containers/ClientCounter';

chai.should();

const COUNTER_VALUE = 1;
const INCREMENT = 1;

const counterAmount = 2;

describe('Client counter example UI works', () => {
  let app: any;
  let container: any;
  let content;
  const CounterWithI18n = translate('counter')(ClientCounter);

  beforeEach(() => {
    if (app) {
      container = app.container;
      content = container.firstChild;
    }
  });

  it('Counter section renders with link data', () => {
    app = render(<CounterWithI18n />);
    container = app.container;
    content = container.firstChild;
    content.textContent.should.has.string(`The current counter value is ${COUNTER_VALUE}.`);
  });

  it('Clicking on increase counter button increases counter', async () => {
    const counterButton = find(container, '#counter-client-button');
    await click(counterButton);
    await wait();
    counterAmount.should.to.equal(COUNTER_VALUE + INCREMENT);
  });
});
