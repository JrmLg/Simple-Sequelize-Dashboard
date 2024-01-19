const sequelize = require('./sequelizeInstance');
const testUser = require('./models');

const initDb = async () => {
  await sequelize.sync({ alter: true });
  await testUser.create({
    firstname: 'John',
    lastname: 'Doe',
  });
  //jest log
  console.log('Database initialized');
};

module.exports = initDb;
