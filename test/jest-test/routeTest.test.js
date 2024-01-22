const request = require('supertest');
const {
  app,
  adminHomePageUrl,
  closeDatabaseConnection,
} = require('../../test/jest-test/expressInstance');
const initDb = require('../../test/jest-test/test-models/sequelizeTestInitDb');
const testUser = require('../../test/jest-test/test-models/models');

// création de db de test
it('devrait créer un utilisateur pour les tests', async () => {
  await initDb();
  const usertesting = await testUser.create({
    firstname: 'Test',
    lastname: 'Doe',
  });
  expect(usertesting.firstname).toBe('Test') &&
    expect(usertesting.lastname).toBe('Doe');
});

describe('Test GET /', () => {
  it('Should return 200 OK', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});
describe(`Test GET ${adminHomePageUrl}/dashboard`, () => {
  it('Should return 200 OK', async () => {
    const response = await request(app).get('/administration/dashboard');
    expect(response.statusCode).toBe(200);
  });
});

// admin/auth/login

describe(`Test get ${adminHomePageUrl}/auth/login`, () => {
  it('Should return 200 OK', async () => {
    const response = await request(app).get('/administration/auth/login');
    expect(response.statusCode).toBe(200);
  });
});
describe(`Test post ${adminHomePageUrl}/auth/login`, () => {
  it('Should return 200 OK', async () => {
    const response = await request(app).post('/administration/auth/login');
    expect(response.statusCode).toBe(200);
  });
});
describe(`Test get ${adminHomePageUrl}/auth/logout`, () => {
  it('Should return 200 OK', async () => {
    const response = await request(app).get('/administration/auth/logout');
    expect(response.statusCode).toBe(200);
  });
});

describe(`Test get ${adminHomePageUrl}/superAdmin/user/create`, () => {
  it('Should return 200 OK', async () => {
    const response = await request(app).get(
      '/administration/superAdmin/user/create'
    );
    expect(response.statusCode).toBe(200);
  });
});

afterAll(async () => {
  await closeDatabaseConnection();
});
