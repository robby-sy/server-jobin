'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Job.hasMany(models.UserJob)
      Job.hasMany(models.Skill,{foreignKey:'jobId'})
      Job.belongsTo(models.Company,{foreignKey:"companyId"})
    }
  }
  Job.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    requirements: DataTypes.TEXT,
    companyId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};