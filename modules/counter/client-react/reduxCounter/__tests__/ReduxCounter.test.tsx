import React from 'react';
import chai from 'chai';
import { render } from 'react-testing-library';

import { translate } from '@restapp/i18n-client-react';
import { click, find, Renderer } from '@restapp/testing-client-react';

import ReduxCounter from '../containers/ReduxCounter';

chai.should();

const COUNTER_REDUX_VALUE = 1;

describe('Redux counter example UI works', () => {
  const renderer = new Renderer({});
  let app: any;
  let container: any;
  let content: any;
  const ReduxCounterWithI18n = translate('counter')(ReduxCounter);

  beforeEach(() => {
    if (app) {
      container = app.container;
      content = container.firstChild;
    }
  });

  it('Counter section renders with state data', () => {
    app = render(renderer.withRedux(<ReduxCounterWithI18n />));
    container = app.container;
    content = container.firstChild;
    content.textContent.should.has.string(`The current counter value is ${COUNTER_REDUX_VALUE}.`);
  });

  it('Clicking on increase counter button shows optimistic response', () => {
    const reduxButton = find(container, '#redux-button');
    click(reduxButton);
    content.textContent.should.has.string(`The current counter value is ${COUNTER_REDUX_VALUE + 1}.`);
  });
});
