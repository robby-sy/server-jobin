'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Company.hasMany(models.Employee,{foreignKey:'companyId'})
      Company.hasMany(models.Job,{foreignKey:"companyId"})
    }
  }
  Company.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    logo: DataTypes.STRING,
    description: DataTypes.TEXT,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};