const request = require('supertest');
const server = require('../server');

describe('Post Endpoints', () => {
  it('should bookmark a folder', async () => {
    const res = await request(server)
      .post('/bookmark/add')
      .send({
        user: '5d9ec846bbf735c6917f737b',
        folder: 'test_folder',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
  });

  it('should fail without folder name', async () => {
    const res = await request(server)
      .post('/bookmark/add')
      .send({
        user: '5d9ec846bbf735c6917f737b'
      });

    expect(res.statusCode).toEqual(400);
  });
});

describe('Get Endpoints', () => {
  it('list bookmarks', async () => {
    const res = await request(server)
      .get('/bookmark/5d9ec846bbf735c6917f737b');
      

    expect(res.statusCode).toEqual(200);
    expect(res.body);
  });

  afterAll(done => {
    server.close(done);
  });
});