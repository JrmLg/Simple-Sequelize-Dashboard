const request = require('supertest');
const app = require('../../test/jest-test/expressInstance');

describe('Test GET /', () => {
  it('Should return 200 OK', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});
describe('Test GET /administration/dashboard', () => {
  it('Should return 200 OK', async () => {
    const response = await request(app).get('/administration/dashboard');
    expect(response.statusCode).toBe(200);
  });
});
describe('Test get /administration/auth', () => {
  it('Should return 200 OK', async () => {
    const response = await request(app).get('/administration/auth');
    expect(response.statusCode).toBe(200);
  });
});
describe('Test get /administration/dashboard', () => {
  it('Should return 200 OK', async () => {
    const response = await request(app).get('/administration/dashboard');
    expect(response.statusCode).toBe(200);
  });
});
describe('Test get /administration/superAdmin', () => {
  it('Should return 200 OK', async () => {
    const response = await request(app).get('/administration/superAdmin');
    expect(response.statusCode).toBe(200);
  });
});
