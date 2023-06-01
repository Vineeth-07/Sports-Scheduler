"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Sessions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      time: {
        type: Sequelize.DATE,
      },
      venue: {
        type: Sequelize.STRING,
      },
      participants: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      playersNeeded: {
        type: Sequelize.INTEGER,
      },
      sportId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.addConstraint("Sessions", {
      fields: ["sportId"],
      type: "foreign key",
      references: {
        table: "Sports",
        field: "id",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Sessions");
  },
};
