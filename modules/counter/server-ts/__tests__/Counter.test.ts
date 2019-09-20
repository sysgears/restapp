import chai from 'chai';
import { getServer } from '@restapp/testing-server-ts';

describe('Counter example API works', () => {
  let server: any;

  beforeAll(() => {
    server = getServer();
  });

  it('Responds to counter get REST query', async () => {
    const {
      body: { amount }
    } = await chai.request(server).get('/api/getCounter');
    amount.should.be.eql(5);
  });

  it('Increments counter on REST mutation', async () => {
    const { status } = await chai
      .request(server)
      .post('/api/addCounter')
      .attach('amount', 2);
    status.should.be.eql(200);
  });
});
