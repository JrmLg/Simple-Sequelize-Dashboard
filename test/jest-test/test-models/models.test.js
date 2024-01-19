const sequelize = require('../../../lib/models/sequelize-client');
const adminRole = require('../../../lib/models/adminRole');
const adminUser = require('../../../lib/models/adminUser');
const adminPermission = require('../../../lib/models/adminPermission');
const association = require('../../../lib/models/association');
const bcrypt = require('bcrypt');

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

describe('Testing AdminUser model', () => {
  test('adminUser entity creation test', async () => {
    const user = await adminUser.create({
      firstname: 'John',
      lastname: 'Doe',
      email: 'John@Doe.io',
      password: '1234',
      isSuperAdmin: true,
    });

    const isPasswordValid = bcrypt.compareSync('1234', user.password);

    expect(user.firstname).toBe('John');
    expect(user.lastname).toBe('Doe');
    expect(user.email).toBe('John@Doe.io');
    expect(isPasswordValid).toBe(true);
    expect(user.isSuperAdmin).toBe(true);
  });
});

describe('Testing AdminPermission model', () => {
  test('adminPermission entity creation test', async () => {
    const permission = await adminPermission.create({
      permission: 'create',
      tableName: 'simple-dash-test-table',
    });

    expect(permission.permission).toBe('create');
    expect(permission.tableName).toBe('simple-dash-test-table');
  });
});

describe('Testing AdminUser - AdminRole association', () => {
  test('adminUser - adminRole association test', async () => {
    const user = await adminUser.create({
      firstname: 'Jane',
      lastname: 'Doe',
      email: 'Jane@Doe.io',
      password: '1234',
      isSuperAdmin: true,
    });

    const role = await adminRole.create({ name: 'admin' });

    await user.addRole(role);

    const userRoles = await user.getRoles();

    expect(userRoles[0].name).toBe('admin');
  });
});

afterAll(async () => {
  await sequelize.close();
});
