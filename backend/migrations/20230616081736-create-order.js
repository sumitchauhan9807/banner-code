'use strict';
const { v4: uuidv4 } = require('uuid');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: uuidv4()
      },
      fullname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phonenumber: {
        type: Sequelize.STRING
      },
      cellPhonenumber: {
        type: Sequelize.STRING
      },
      deliveryMethod: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING
      },
      bannerData: {
        type: Sequelize.STRING
      },
      pdf: {
        type: Sequelize.STRING
      },
      printMaterial: {
        type: Sequelize.STRING
      },
      paymentMethod: {
        type: Sequelize.STRING
      },
      isPaid: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      paidAt: {
        type: Sequelize.DATE
      },
      paymentAmount: {
        type: Sequelize.STRING
      },
      paymentVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      merchantTradeNo:{
        type: Sequelize.STRING
      },
      orderAcknowledged:{
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      orderAcknowledgedTimestamp:{
        type: Sequelize.DATE
      },
      logisticsOrderCreated:{
        type: Sequelize.BOOLEAN,
        defaultValue:false
      },
      logisticsOrderData:{
        type: Sequelize.STRING,
      },
      paymentOption:{
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Orders');
  }
};