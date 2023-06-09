"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Player.hasMany(models.Sport, {
        foreignKey: "userId",
      });
      // define association here
    }
    static getUser(role) {
      return this.findAll({
        where: {
          role,
        },
      });
    }
  }
  Player.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Player",
    }
  );
  return Player;
};
