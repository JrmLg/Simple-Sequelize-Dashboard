const sequelize = require('./sequelize-client');
const { adminPermission, adminRole, adminUser } = require('./association');

async function main() {
  try {
    await sequelize.sync({ force: true });
    // Synchroniser tous les modèles
    console.log('Les modèles ont été synchronisés avec succès.');

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

    user.setRoles([...user.roles, role]);
    user.save();
    role.setPermissions([...user.permissions, permission]);
    role.save();

    // Afficher les résultats
    console.log('Utilisateur créé:', user.toJSON());
    console.log('Rôle créé:', role.toJSON());
    console.log('Permission créée:', permission.toJSON());
  } catch (error) {
    console.error('Impossible de synchroniser les modèles:', error);
  }
}

main();
