const { Model, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')

module.exports = (sequelize) => {
  class Admin extends Model {}

  Admin.init(
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
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: { msg: "L'adresse email n'est pas valide." },
        },
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          const PASSWORD_SALT_ROUNDS = 12
          const salt = bcrypt.genSaltSync(PASSWORD_SALT_ROUNDS)
          const hash = bcrypt.hashSync(value, salt)
          this.setDataValue('password', hash)
        },
      },

      isSuperAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: 'sd_admin',
      modelName: 'sd_admin',

      paranoid: true,
      timestamps: true,
      createdAt: true,
      updatedAt: true,
    },
  )

  return Admin
}
