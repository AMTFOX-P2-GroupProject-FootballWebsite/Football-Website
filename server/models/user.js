'use strict';
const { encrypt } = require('../helpers/bcryptjs')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: `Name can't be empty`,
        },
        notNull:{
          msg: `Please insert the name`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: `Email can't be empty`,
        },
        notNull:{
          msg: `Please insert the email`
        }
      },
      unique:{
        args: true,
        msg: 'email already exist'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: `Password can't be empty`,
        },
        notNull:{
          msg: `Please insert the password`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate(user){
        user.password = encrypt(user.password)
      }
    }
  });
  return User;
};