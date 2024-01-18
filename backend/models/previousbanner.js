'use strict';
const { v4: uuidv4 } = require('uuid');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PreviousBanner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PreviousBanner.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => {
        return uuidv4();
      }
    },
    name: DataTypes.STRING,
    images: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'PreviousBanner',
  });
  return PreviousBanner;
};