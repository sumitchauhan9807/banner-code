'use strict';
const { v4: uuidv4 } = require('uuid');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Custom_Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     
    }
  }
  Custom_Order.init({
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
    customizationDetails :DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    deliveryAddress: DataTypes.STRING,
    bannerImage: DataTypes.STRING,
    pdf: DataTypes.STRING,
    printMaterial: DataTypes.STRING,
    paymentMethod: DataTypes.STRING,
    merchantTradeNo: DataTypes.STRING,
    zipCode: DataTypes.STRING,

    isPaid: DataTypes.BOOLEAN,
    orderAcknowledged:DataTypes.BOOLEAN,
    logisticsOrderCreated:DataTypes.BOOLEAN,
    logisticsOrderData:DataTypes.STRING,
    orderAcknowledgedTimestamp:DataTypes.DATE,
    paymentAmount: DataTypes.STRING,
    paidAt: DataTypes.DATE,
    createdAt: { type: DataTypes.DATE, defaultValue: () => new Date() },
    updatedAt: { type: DataTypes.DATE, defaultValue: () => new Date() }
  }, {
    sequelize,
    modelName: 'Custom_Order',
  });
  return Custom_Order;
};