const sequelize = require('./sequelize-client')
const { Admin, Role, Permission, Setting } = require('./index')

async function main() {
  try {
    await sequelize.sync({ force: true })
    // Synchroniser tous les modèles
    console.log('Les modèles ont été synchronisés avec succès.')
  } catch (error) {
    console.error('Impossible de synchroniser les modèles:', error)
  }

  // Créer un utilisateur de test
  const admin = await Admin.create({
    firstname: 'test',
    lastname: 'test',
    email: 'test@test.test',
    password: 'test',
    isSuperAdmin: true,
  })

  // Créer un rôle de test
  const role = await Role.create({
    name: 'admin',
  })

  // Créer une permission de test
  const permission = await Permission.create({
    tableName: 'test',
    permission: 'create',
  })

  await admin.setRoles([role])
  await admin.save()
  await role.setPermissions([permission])
  await role.save()

  // Afficher les résultats
  console.log('Utilisateur créé:', admin.toJSON())
  console.log('Rôle créé:', role.toJSON())
  console.log('Permission créée:', permission.toJSON())

  await logAllAdmin('Before destroy admin')

  await admin.destroy()
  console.log('Admin destroyed')

  await logAllAdmin('After destroy admin')

  await logAllAdmin('Destoyed admin', true)
}

async function logAllAdmin(msg, includeDestroyed = false) {
  const admins = await Admin.findAll({
    paranoid: !includeDestroyed,
    include: [
      {
        association: 'roles',
        include: [
          {
            association: 'permissions',
          },
        ],
      },
    ],
  })
  console.log(
    msg,
    '> AdminList :',
    admins.map((a) => a.toJSON()),
  )
}

main()
