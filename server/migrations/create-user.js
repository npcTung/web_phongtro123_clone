"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: { allowNull: false, primaryKey: true, type: Sequelize.STRING },
      name: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      password: { type: Sequelize.STRING },
      phone: { type: Sequelize.STRING },
      zalo: { type: Sequelize.STRING },
      fbUrl: { type: Sequelize.STRING },
      avatar: { type: Sequelize.STRING },
      filenameAvatar: { type: Sequelize.STRING },
      role: { type: Sequelize.STRING, enum: [2002, 2023], defaultValue: 2023 }, // 2002: Admin,2023: User
      wishlistId: { type: Sequelize.STRING },
      isBlocked: { type: Sequelize.BOOLEAN, defaultValue: false },
      refreshToken: { type: Sequelize.STRING },
      passwordChangeAt: { type: Sequelize.STRING },
      passwordResetToken: { type: Sequelize.STRING },
      passwordResetExpires: { type: Sequelize.STRING },
      registerToken: { type: Sequelize.STRING },
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
    await queryInterface.dropTable("Users");
  },
};
