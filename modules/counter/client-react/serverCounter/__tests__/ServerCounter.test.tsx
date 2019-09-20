import chai from 'chai';

import { mock } from '../actions';

chai.should();

const COUNTER_REST_VALUE = 5;

describe('Server counter example UI works', () => {
  it('Get counter', () => {
    mock.onGet('/getCounter').replyOnce(200, { id: 1, amount: COUNTER_REST_VALUE });
  });

  it('Add counter', () => {
    mock.onPost('/addCounter', { amount: COUNTER_REST_VALUE }).replyOnce(200);
  });
});
