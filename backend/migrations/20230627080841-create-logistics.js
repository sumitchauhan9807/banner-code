'use strict';
const { v4: uuidv4 } = require('uuid');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Logistics', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: uuidv4()
      },
      orderId: {
        type: Sequelize.UUID
      },
      logisticsSubType: {
        type: Sequelize.STRING
      },
      CVSStoreID: {
        type: Sequelize.STRING
      },
      CVSStoreName: {
        type: Sequelize.STRING
      },
      CVSAddress: {
        type: Sequelize.STRING
      },
      CVSTelephone: {
        type: Sequelize.STRING
      },
      CVSOutSide: {
        type: Sequelize.STRING
      },
      AllPayLogisticsID: {
        type: Sequelize.STRING
      },
      CVSPaymentNo: {
        type: Sequelize.STRING
      },
      CVSValidationNo: {
        type: Sequelize.STRING
      },
      TradeDesc: {
        type: Sequelize.STRING
      },
      // home delivery
      GoodsWeight: {
        type: Sequelize.INTEGER
      },
      ReceiverZipCode: {
        type: Sequelize.STRING
      },
      ReceiverAddress: {
        type: Sequelize.STRING
      },
      ScheduledDeliveryTime: {
        type: Sequelize.STRING
      },
      BookingNote: {
        type: Sequelize.STRING
      },
      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Logistics');
  }
};