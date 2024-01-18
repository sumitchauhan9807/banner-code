'use strict';
const { v4: uuidv4 } = require('uuid');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SiteData', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: uuidv4()
      },
      bannerImages: {
        type: Sequelize.TEXT
      },
      bannerPrices: {
        type: Sequelize.TEXT
      },
      siteHeading: {
        type: Sequelize.TEXT
      },
      materialImages: {
        type: Sequelize.TEXT
      },
      servicesImage: {
        type: Sequelize.TEXT
      },
      formImage: {
        type: Sequelize.TEXT
      },
      previousBanners: {
        type: Sequelize.TEXT
      },
      companyImage: {
        type: Sequelize.TEXT
      },
      termsImage: {
        type: Sequelize.TEXT
      },
      equipmentImages: {
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
    await queryInterface.dropTable('SiteData');
  }
};