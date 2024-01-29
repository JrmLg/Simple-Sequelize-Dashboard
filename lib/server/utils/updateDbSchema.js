const fs = require('fs')
const path = require('path')

async function getCurrentDbMigrationNumber(Setting) {
  try {
    const dbMigration = await Setting.findOne({ where: { key: 'db_migration_number' } })
    return parseInt(dbMigration.value, 10)
  } catch (error) {
    return -1
  }
}

function getMigrationFiles() {
  const migrationDir = path.join(__dirname, '../migrations')
  let migrationFiles = fs.readdirSync(migrationDir)

  migrationFiles = migrationFiles.map((mf) => {
    return {
      number: parseInt(mf, 10),
      name: mf,
      path: path.join('../migrations/', mf),
    }
  })

  return migrationFiles.sort((a, b) => a.number - b.number)
}

async function updateDbSchema(sequelize, dashModels) {
  const { Setting } = dashModels

  let currentDbMigrationNumber = await getCurrentDbMigrationNumber(Setting)
  const migrationFiles = getMigrationFiles()
  const queryInterface = sequelize.getQueryInterface()
  console.log('[Simple Dashboard] : Starting schema update.')

  for (const migrationFile of migrationFiles) {
    if (currentDbMigrationNumber >= migrationFile.number) {
      continue
    }

    const makeMigration = require(migrationFile.path)
    console.log('[Simple Dashboard] : Runing migration : ', migrationFile.number)
    await makeMigration(queryInterface)
    await Setting.upsert({ key: 'db_migration_number', value: migrationFile.number })
    currentDbMigrationNumber = migrationFile.number
  }

  console.log('[Simple Dashboard] : Schema is up to date.')
}

module.exports = updateDbSchema
