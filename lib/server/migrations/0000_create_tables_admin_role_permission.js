const { DataTypes } = require('sequelize')
/**
 * @param {import('sequelize').QueryInterface} queryInterface
 * */
async function makeMigration(queryInterface) {
  await queryInterface.createTable('sd_setting', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    value: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },

    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  })

  await queryInterface.createTable('sd_role_has_permission', {
    sdPermissionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },

    sdRoleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },

    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },

    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  })

  await queryInterface.createTable('sd_admin_has_role', {
    sdAdminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },

    sdRoleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },

    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },

    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  })

  await queryInterface.createTable('sd_admin', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    isSuperAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },

    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },

    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  })

  await queryInterface.createTable('sd_role', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },

    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },

    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  })

  await queryInterface.createTable('sd_permission', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },

    permission: {
      type: DataTypes.ENUM('create', 'read', 'update', 'delete'),
      allowNull: false,
      unique: 'uniquePermissionTableName',
    },

    tableName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'uniquePermissionTableName',
    },

    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },

    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },

    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  })
}

module.exports = makeMigration
