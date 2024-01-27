const sequelize = require('./sequelize-client');
const { adminPermission, adminRole, adminUser } = require('./association');

async function main() {
  try {
    await sequelize.sync({ force: true });
    // Synchroniser tous les modèles
    console.log('Les modèles ont été synchronisés avec succès.');
  } catch (error) {
    console.error('Impossible de synchroniser les modèles:', error);
  }

  // Créer un utilisateur de test
  const user = await adminUser.create({
    firstname: 'test',
    lastname: 'test',
    email: 'test@test.test',
    password: 'test',
    isSuperAdmin: true,
  });

  // Créer un rôle de test
  const role = await adminRole.create({
    name: 'admin',
  });

  // Créer une permission de test
  const permission = await adminPermission.create({
    tableName: 'test',
    permission: 'create',
  });

  await user.setRoles([role]);
  await user.save();
  await role.setPermissions([permission]);
  await role.save();

  // Afficher les résultats
  console.log('Utilisateur créé:', user.toJSON());
  console.log('Rôle créé:', role.toJSON());
  console.log('Permission créée:', permission.toJSON());

  const users = await adminUser.findAll({ include: ['roles'] });
  for (const user of users) {
    console.log(user.toJSON());
    for (const role of user.roles) {
      console.log(role);
    }
  }
}

main();
