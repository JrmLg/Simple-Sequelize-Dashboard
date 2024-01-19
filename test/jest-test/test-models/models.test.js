const sequelize = require('../../../lib/models/sequelize-client');
const adminRole = require('../../../lib/models/adminRole');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('Testing AdminRole model', () => {
  test('adminRole entity creation test', async () => {
    const role = await adminRole.create({ name: 'admin' });
    expect(role.name).toBe('admin');
  });
  test('test name validation', async () => {
    await expect(adminRole.create({ name: 'test' })).rejects.toThrow();
  });
});

afterAll(async () => {
  await sequelize.close();
});
