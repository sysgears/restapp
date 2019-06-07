import chai from 'chai';
import fs from 'fs';
import { getServer } from '@restapp/testing-server-ts';

describe('Upload API works', () => {
  const file1 = fs.readFileSync(`${__dirname}/testFiles/test.png`);
  const file2 = fs.readFileSync(`${__dirname}/testFiles/test.png`);
  let server: any;

  beforeAll(() => {
    server = getServer();
  });

  it('Get all files', async () => {
    const { status } = await chai
      .request(server)
      .get('/api/getFiles')
      .set('Accept', 'text/html');
    status.should.be.eql(200);
  });

  it('Upload files', async () => {
    const { status } = await chai
      .request(server)
      .post('/api/uploadFiles')
      .attach('fileInput', file1, 'test.png')
      .attach('fileInput', file2, 'test.doc');
    status.should.be.eql(200);
  });

  it('Remove file', async () => {
    await chai
      .request(server)
      .post('/api/uploadFiles')
      .attach('fileInput', file1, 'test.png');
    const { status } = await chai
      .request(server)
      .delete('/api/removeFile')
      .send({ id: 1 });
    status.should.be.eql(200);
  });
});
