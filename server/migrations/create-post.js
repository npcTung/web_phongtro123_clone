"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Posts", {
      id: { allowNull: false, primaryKey: true, type: Sequelize.STRING },
      title: { type: Sequelize.STRING },
      slug: { type: Sequelize.STRING },
      star: { type: Sequelize.STRING, defaultValue: "0" },
      address: { type: Sequelize.STRING },
      attributesId: { type: Sequelize.STRING },
      categoryCode: { type: Sequelize.STRING },
      description: { type: Sequelize.TEXT("long") },
      userId: { type: Sequelize.STRING },
      overviewId: { type: Sequelize.STRING },
      images: { type: Sequelize.TEXT("long") },
      fileNameImages: { type: Sequelize.TEXT("long") },
      label: { type: Sequelize.STRING },
      province: { type: Sequelize.STRING },
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
    await queryInterface.dropTable("Posts");
  },
};
