const bcrypt = require('bcrypt')
const { Model, DataTypes } = require('sequelize')
const sequelize = require('./sequelize-client')

// On hérite du Model Sequelize
class User extends Model {} // Grace à cet extends, on définis implicitement les champs : id, created_at, updated_at

// On initialise notre modèle
User.init(
  {
    // Documentation des correspondances des types Sequelize <-> Postgres : https://sequelize.org/docs/v7/models/data-types/

    firstname: DataTypes.TEXT,

    lastname: DataTypes.TEXT,

    email: {
      type: DataTypes.STRING(100), // -> VARCHAR(100)
      allowNull: false, // -> NOT NULL
      unique: true,
      // Et pleins d'autre option que l'on peut retrouver à l'aide de ALT + ESPACE
    },

    password: {
      type: DataTypes.TEXT,
      allowNull: false,

      set(value) {
        const PASSWORD_SALT_ROUNDS = parseInt(process.env.PASSWORD_SALT_ROUNDS, 10)
        const salt = bcrypt.genSaltSync(PASSWORD_SALT_ROUNDS)
        const hash = bcrypt.hashSync(value, salt)
        this.setDataValue('password', hash)
      },
    },
  },
  {
    sequelize, // Obligatoire : l'instance de connexion à la BDD
    tableName: 'user', // Obligatoire : le nom de la table dans notre BDD
  },
)

// On exporte notre modèle
module.exports = User
