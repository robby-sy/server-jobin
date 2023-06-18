'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserJob extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserJob.belongsTo(models.User)
      UserJob.belongsTo(models.Job)
    }
  }
  UserJob.init({
    UserId: DataTypes.INTEGER,
    JobId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserJob',
  });
  return UserJob;
};