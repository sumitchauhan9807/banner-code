'use strict';
const { v4: uuidv4 } = require('uuid');
const { Model } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PreviousBanners', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: uuidv4()
      },
      name: {
        type: Sequelize.STRING
      },
      images: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('PreviousBanners');
  }
};