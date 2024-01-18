'use strict';
const { v4: uuidv4 } = require('uuid');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Logistics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Logistics.belongsTo(models.Order,{
      //   foreignKey: 'orderId',
      // });
    }
  }
  Logistics.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => {
        return uuidv4();
      }
    },
    orderId:DataTypes.UUID,
    logisticsSubType: DataTypes.STRING,
    CVSStoreID: DataTypes.STRING,
    CVSStoreName: DataTypes.STRING,
    CVSAddress: DataTypes.STRING,
    CVSTelephone: DataTypes.STRING,
    CVSOutSide: DataTypes.STRING,
    AllPayLogisticsID: DataTypes.STRING,
    CVSPaymentNo: DataTypes.STRING,
    CVSValidationNo:DataTypes.STRING,

    TradeDesc:DataTypes.STRING,
    // home delivery 
    GoodsWeight:DataTypes.INTEGER,
    ReceiverZipCode:DataTypes.STRING,
    ReceiverAddress:DataTypes.STRING,
    ScheduledDeliveryTime:DataTypes.STRING,
    BookingNote:DataTypes.STRING,



    createdAt: { type: DataTypes.DATE, defaultValue: () => new Date() },
    updatedAt: { type: DataTypes.DATE, defaultValue: () => new Date() }
  }, {
    sequelize,
    modelName: 'Logistics',
  });
  return Logistics;
};