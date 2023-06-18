'use strict';
const {
  Model
} = require('sequelize');
const { createHash } = require('../helpers/encrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Employee,{foreignKey:'userId'})
      User.hasMany(models.UserJob)
    }
  }
  User.init({
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"Email is required for register"
        },
        notEmpty:{
          msg:"Email is required for register"
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{
          msg:"Password is required for register"
        },
        notEmpty:{
          msg:"Password is required for register"
        }
      }
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    status: DataTypes.STRING,
    profile_picture: DataTypes.STRING
  }, {
    hooks:{
      beforeCreate:(instance)=>{
        const hashedPassword = createHash(instance.password)
        instance.password = hashedPassword
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};