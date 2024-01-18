'use strict';
const { v4: uuidv4 } = require('uuid');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.hasOne(models.Logistics,{
        foreignKey: 'orderId',
        as:'Logistics'
      });
    }
  }
  Order.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => {
        return uuidv4();
      }
    },
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    cellPhonenumber:DataTypes.STRING,
    deliveryMethod: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    address: DataTypes.STRING,
    bannerData: DataTypes.STRING,
    pdf: DataTypes.STRING,
    printMaterial: DataTypes.STRING,
    paymentMethod: DataTypes.STRING,
    merchantTradeNo: DataTypes.STRING,
    isPaid: DataTypes.BOOLEAN,
    orderAcknowledged:DataTypes.BOOLEAN,
    logisticsOrderCreated:DataTypes.BOOLEAN,
    logisticsOrderData:DataTypes.STRING,
    orderAcknowledgedTimestamp:DataTypes.DATE,
    paymentAmount: DataTypes.STRING,
    paymentVerified :DataTypes.BOOLEAN,
    paymentOption :DataTypes.STRING,
    paidAt: DataTypes.DATE,
    createdAt: { type: DataTypes.DATE, defaultValue: () => new Date() },
    updatedAt: { type: DataTypes.DATE, defaultValue: () => new Date() }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};