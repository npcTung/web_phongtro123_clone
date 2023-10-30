"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Overviews", {
      id: { allowNull: false, primaryKey: true, type: Sequelize.STRING },
      code: { type: Sequelize.STRING },
      area: { type: Sequelize.STRING },
      type: { type: Sequelize.STRING },
      target: { type: Sequelize.STRING },
      bonus: { type: Sequelize.STRING },
      created: { type: Sequelize.STRING },
      expired: { type: Sequelize.STRING },
      createdAt: {
        allowNull: false,
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Overviews");
  },
};
