const { Model, DataTypes } = require('sequelize');
const sequelize = require('./sequelize-client');
const bcrypt = require('bcrypt');

class adminUser extends Model {}
adminUser.init(
  {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: { msg: "L'adresse email n'est pas valide." },
      },
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      set(value) {
        const PASSWORD_SALT_ROUNDS = 12;
        const salt = bcrypt.genSaltSync(PASSWORD_SALT_ROUNDS);
        const hash = bcrypt.hashSync(value, salt);
        this.setDataValue('password', hash);
      },
    },
    isSuperAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'adminUser',
    modelName: 'adminUser',
  }
);

module.exports = adminUser;
