"use strict";
const { Session } = require("express-session");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sport.belongsTo(models.Player, {
        foreignKey: "userId",
      });
      Sport.hasMany(models.Session, {
        foreignKey: "sportId",
      });
      // define association here
    }
    static getSports(userId) {
      return this.findAll({
        where: {
          userId,
        },
        order: [["id", "ASC"]],
      });
    }

    static createSport({ name, userId }) {
      return this.create({
        name,
        userId,
      });
    }

    static editSport({ name, id }) {
      return this.update(
        {
          name,
        },
        {
          where: {
            id,
          },
        }
      );
    }

    static deleteSport(id) {
      return this.destroy({
        where: {
          id,
        },
      });
    }

    static getSport(sportId) {
      return this.findOne({
        where: {
          id: sportId,
        },
      });
    }
  }
  Sport.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Sport",
    }
  );
  return Sport;
};
