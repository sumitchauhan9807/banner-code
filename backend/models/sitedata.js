'use strict';
const { v4: uuidv4 } = require('uuid');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SiteData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SiteData.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => {
        return uuidv4();
      }
    },
    bannerImages: DataTypes.TEXT,
    bannerPrices: DataTypes.TEXT,
    materialImages: DataTypes.TEXT,
    siteHeading: DataTypes.TEXT,
    servicesImage: DataTypes.TEXT,
    formImage: DataTypes.TEXT,
    previousBanners: DataTypes.TEXT,
    companyImage: DataTypes.TEXT,
    termsImage: DataTypes.TEXT,
    equipmentImages: DataTypes.TEXT,
    createdAt: { type: DataTypes.DATE, defaultValue: () => new Date() },
    updatedAt: { type: DataTypes.DATE, defaultValue: () => new Date() }
  }, {
    sequelize,
    modelName: 'SiteData',
  });
  return SiteData;
};